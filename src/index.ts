/**
 * Context to be used to render the dom Node
 */
export interface Context<T extends Node> {
  init?: string;
  dom?: T;
  children?: Context<T>[];
  oldProps?: Record<string, any>;
  store?: any;
  actions?: any;
  oldArgs?: any[];
  oldKeys?: any[];
  virtual?: boolean;
  ticket?: number;
}
export const inferType = <T extends HTMLElement>(
  b: Prototype<T>
): Prototype<T> => {
  return b;
};
export type Prototype<T extends Node> = {
  tag?: string;
  virtual?: boolean;
  init?: () => T;
  children?: Prototype<Node>[] | [Prototype<Node>, string][];
  component?: (...args: any[]) => Prototype<T>;
  asyncComponent?: (...args: any[]) => Promise<Prototype<T>>;
  className?: string[];
  style?: { [P in keyof CSSStyleDeclaration]?: CSSStyleDeclaration[P] };
  freeze?: boolean;
  setAttribute?: Record<string, string>;
  placeHolder?: Prototype<HTMLElement>;
  args?: any[];
  resolve?: any;
} & {
  [P in Exclude<
    keyof T,
    'className' | 'children' | 'style' | 'setAttribute'
  >]?: T[P];
};
/**
 *
 * The render function
 * @param toRender A prototype, or a method taking context and returning the prototype
 * @param context the context in which to render this prototype
 * @param timeout render per time chunks of timeout (ms), in order to not block the thread.
 * @returns The actual dom node
 */
export const render = <U extends HTMLElement>(
  toRender: Prototype<U> | ((context: Context<U>) => Prototype<U>),
  context: Context<U>,
  timeout?: number,
  startedTime?: number
): U => {
  let startedTimeCalculated = startedTime;
  if (timeout !== undefined && startedTimeCalculated == undefined) {
    startedTimeCalculated = Date.now();
  }
  if (typeof toRender === 'function') {
    return render(toRender(context), context, timeout, startedTimeCalculated);
  }
  if (
    toRender.component !== undefined ||
    toRender.asyncComponent !== undefined
  ) {
    //Pure component
    if (arraysEqual(context.oldArgs, toRender.args)) {
      return context.dom;
    }
    const oldArgs = context.oldArgs || [];
    context.oldArgs = [...toRender.args];
    if (toRender.component !== undefined) {
      return render(
        toRender.component?.(...toRender.args, ...oldArgs),
        context,
        timeout,
        startedTimeCalculated
      );
    }
    if (toRender.asyncComponent !== undefined) {
      //Async component
      toRender
        .asyncComponent(...toRender.args, ...oldArgs)
        .then(prototype =>
          render(prototype, context, timeout, startedTimeCalculated)
        )
        .then(toRender.resolve);
      if (context.dom === undefined) {
        if (toRender.placeHolder !== undefined) {
          return render(
            toRender.placeHolder,
            context,
            timeout,
            startedTimeCalculated
          ) as any;
        }
        return render(
          { tag: 'input', type: 'hidden' } as any,
          context,
          timeout,
          startedTimeCalculated
        );
      } else {
        return context.dom;
      }
    }
  }
  if (toRender.freeze === true) {
    return;
  }
  const { tag, children, virtual, ...props } = toRender;
  if (context === undefined || context === null) {
    console.error('A context has not been provided');
    return;
  }

  context.oldProps = context.oldProps || {};
  context.children = context.children || [];

  const childrenComponents =
    (children as any[])?.filter((child: any) => child) || [];

  const keys: any[] = [];
  const simplifiedChildren = [];
  childrenComponents.forEach((child: Prototype<HTMLElement>, index: number) => {
    if (Array.isArray(child)) {
      keys.push(child[1]);
      //Keyed arrays
      if (context.children[child[1]] === undefined) {
        context.children[child[1]] = {} as Context<U>;
      }
      simplifiedChildren.push({
        child: child[0],
        context: context.children[child[1]],
      });
    } else {
      keys.push(index);
      if (context.children[index] === undefined) {
        context.children[index] = {} as Context<U>;
      }
      simplifiedChildren.push({ child, context: context.children[index] });
    }
  });

  let i = 0;
  const childrenDom = [];
  let tempStartedTime = startedTimeCalculated;
  let dettached = false;
  const count = () => {
    while (
      i < simplifiedChildren.length &&
      (tempStartedTime === undefined || Date.now() - tempStartedTime < timeout)
    ) {
      const simplified = simplifiedChildren[i];
      childrenDom[i] = render(
        simplified.child,
        simplified.context,
        timeout,
        startedTimeCalculated
      );
      if (dettached && context.dom !== undefined) {
        context.dom.append(childrenDom[i]);
      }
      i++;
    }
    if (i < simplifiedChildren.length) {
      dettached = true;
      tempStartedTime = Date.now();
      setTimeout(count);
    }
  };
  count();

  context.oldKeys = context.oldKeys || keys;

  let creatorStr;
  if (!Object.prototype.hasOwnProperty.call(toRender, 'init')) {
    toRender.init = () => document.createElement(tag) as any;
    creatorStr = '' + tag;
  } else {
    creatorStr = '' + toRender.init;
  }
  const init = toRender.init;

  if (context.dom === undefined || context.init !== creatorStr) {
    // rerender the init
    context.init = creatorStr;
    if (context.dom) {
      const newDOM = init();
      context.dom.replaceWith(newDOM);
      context.dom = newDOM;
      context.oldProps = {};
    } else {
      context.dom = init();
    }
    if (childrenDom.length > 0) {
      context.dom.append(
        ...childrenDom.filter(domChild => domChild !== undefined)
      );
    }
  } else {
    //Add or remove children
    const newKeys = childrenComponents.map((child, index) =>
      Array.isArray(child) ? child[1] : index
    );
    if (!arraysEqual(newKeys, context.oldKeys)) {
      context.oldKeys = context.oldKeys.filter(oldKey => {
        //remove items
        const newIndex =
          newKeys.indexOf(oldKey) >= 0
            ? newKeys.indexOf(oldKey)
            : newKeys.indexOf(parseInt(oldKey));
        if (newIndex < 0) {
          context.children[oldKey]?.dom?.remove?.();
          context.children[oldKey] = undefined as Context<U>;
          return false;
        }
        return true;
      });

      newKeys.forEach((newKey, newIndex) => {
        //Add items
        const oldIndex =
          context.oldKeys.indexOf(newKey) >= 0
            ? context.oldKeys.indexOf(newKey)
            : context.oldKeys.indexOf(parseInt(newKey));

        if (oldIndex < 0) {
          if (!context.children[newKey]?.virtual) {
            insertChildAtIndex(
              context?.dom,
              context.children[newKey]?.dom,
              newIndex
            );
          }
          context.oldKeys.splice(newIndex, 0, newKey);
        }
      });

      let countPositives = 0;
      const diffItem = newKeys.reduce((arr, current, newIndex) => {
        const oldIndex =
          context.oldKeys.indexOf(current) >= 0
            ? context.oldKeys.indexOf(current)
            : context.oldKeys.indexOf(parseInt(current));
        const diff = newIndex - oldIndex || 0;
        if (diff > 0) {
          countPositives++;
        }
        if (diff !== 0) {
          arr.push({ diff, current, newIndex, oldIndex });
        }
        return arr;
      }, []) as any[];

      const countNegative = diffItem.length - countPositives;
      if (countPositives > countNegative) {
        diffItem.sort((a, b) => a.newIndex - b.newIndex);
      } else {
        diffItem.sort((a, b) => b.newIndex - a.newIndex);
      }

      diffItem.forEach(diffItem => {
        if (context.oldKeys[diffItem.newIndex] !== diffItem.current) {
          context.oldKeys.splice(context.oldKeys.indexOf(diffItem.current), 1);
          if (!context.children[diffItem.current]?.virtual) {
            insertChildAtIndex(
              context?.dom,
              context.children[diffItem.current]?.dom,
              diffItem.newIndex
            );
          }
          context.oldKeys.splice(diffItem.newIndex, 0, diffItem.current);
        }
      });
    }
  }

  Object.keys(context.oldProps).forEach(oldKey => {
    //Resetting unused properties to default
    if (!Object.prototype.hasOwnProperty.call(props, oldKey)) {
      (context.dom as any)[oldKey] = '';
      delete context.oldProps[oldKey];
    } else {
      const oldValue = context.oldProps[oldKey];
      if (typeof oldValue === 'object' && oldValue !== null) {
        Object.keys(oldValue).forEach(oldStyleKey => {
          if (
            !Object.prototype.hasOwnProperty.call(
              (props as any)[oldKey],
              oldStyleKey
            ) ||
            (props as any)[oldKey][oldStyleKey] === false
          ) {
            if (oldKey === 'setAttribute') {
              context.dom.setAttribute(oldStyleKey, '');
            } else {
              (context.dom as any)[oldKey][oldStyleKey] = '';
            }
            delete context.oldProps[oldKey][oldStyleKey];
          }
        });
      }
    }
  });

  Object.keys(props).forEach(key => {
    //diffing props
    const calculatedProp = (props as any)[key];
    let nonArrayProps = calculatedProp;
    if (Array.isArray(nonArrayProps)) {
      nonArrayProps = nonArrayProps.filter(Boolean).join(' ');
    }
    if (typeof nonArrayProps === 'object' && nonArrayProps !== null) {
      if (context.oldProps[key] === undefined) {
        context.oldProps[key] = {};
      }
      Object.keys(nonArrayProps).forEach(styleKey => {
        if (context.oldProps[key][styleKey] !== nonArrayProps[styleKey]) {
          context.oldProps[key][styleKey] = nonArrayProps[styleKey];
          if (key === 'setAttribute') {
            context.dom.setAttribute(styleKey, nonArrayProps[styleKey]);
          } else {
            (context.dom as any)[key][styleKey] = nonArrayProps[styleKey];
          }
        }
      });
    } else {
      if (context.oldProps[key] !== nonArrayProps) {
        (context.dom as any)[key] = nonArrayProps;
        context.oldProps[key] = nonArrayProps;
      }
    }
  });

  if (virtual) {
    context.virtual = true;
    return;
  }
  return context.dom;
};
const insertChildAtIndex = (
  parent: HTMLElement,
  child: HTMLElement,
  index: number
) => {
  if (child === undefined) {
    return;
  }
  if (index + 1 >= parent?.children.length) {
    parent?.appendChild(child);
  } else {
    parent?.insertBefore(child, parent?.children[index]);
  }
};
/**
 *
 * @param component is a method that returns a prototype
 * @param actions an object that contains methods that receive the store
 * @param store an object that will be passed to the component and the actions
 * @param timeout render per time chunks of timeout in ms, in order to not block the thread.
 * @returns a component that can be passed to the render method
 */
export function buildStore<T extends Node>(
  component: (...args: any[]) => Prototype<T>,
  actions?: (store: any, mappedActions: any) => any,
  store?: any,
  timeout?: number
): any {
  //Called in export default
  //Put shared store here
  return (...args: any[]) => {
    //Called every time
    return (goodContext: Context<T>) => ({
      args: args,
      component: (...newArgs: any) => {
        //Called inside render
        const goodStore =
          goodContext.store !== undefined
            ? goodContext.store
            : store !== undefined
            ? store
            : {};
        if (goodContext.store === undefined) {
          goodContext.store = goodStore;
        }
        goodContext.ticket = goodContext.ticket || 0;
        const simpleActions = {};
        const goodActions =
          goodContext.actions !== undefined
            ? goodContext.actions
            : actions(goodStore, simpleActions);
        if (goodContext.actions === undefined) {
          goodContext.actions = goodActions;
          if (goodActions.init !== undefined) {
            goodActions.init();
          }
        }

        const mappedActions = {};
        Object.keys(goodActions).forEach(key => {
          (simpleActions as any)[key] = (...value: any[]) =>
            Promise.resolve(goodActions[key](...value));

          (mappedActions as any)[key] = (...value: any[]) =>
            Promise.resolve(goodActions[key](...value)).then(() => {
              return new Promise((resolve, reject) => {
                goodContext.ticket = goodContext.ticket + 1;
                const localTicket = goodContext.ticket;
                setTimeout(() => {
                  if (localTicket === goodContext.ticket) {
                    resolve(
                      render(
                        component(
                          goodContext.store,
                          mappedActions,
                          ...(newArgs || [])
                        ) as any,
                        goodContext as any,
                        timeout
                      )
                    );
                  } else {
                    reject('Rendering was abondoned in favor of another');
                  }
                });
              });
            });
        });
        return component(goodContext.store, mappedActions, ...(newArgs || []));
      },
    });
  };
}
/**
 * This method can be used to only call the component method if the parameters are changed.
 * @param component A method returning the prototype
 * @returns a pure component that can be passed to the render method
 */
export const pure = (component: any) => (...args: any[]) => ({
  component,
  args,
});
/**
 * This method can be used to display async components
 * @param asyncComponent an async method that returns a promise on a prototype
 * @param placeHolder a prototype that will be displayed while waiting for the promise
 * @returns an async pure component that can be passed to the render method
 */
export const asyncPure = <T extends Node>(
  asyncComponent: any,
  placeHolder?: Prototype<T>
) => (...args: any[]) => ({
  asyncComponent,
  args,
  placeHolder,
});

/**
 *
 * This helper function can be used to wait for an async pure component rendering,
 * which has been created using the asyncPure function
 * @param toRender A prototype, or a method taking context and returning the prototype
 * @param context the context in which to render this prototype
 * @param timeout render per time chunks of timeout (ms), in order to not block the thread.
 * @returns a promise on the actual rendered dom node
 */
export const asyncRender = <U extends HTMLElement>(
  toRender: Prototype<U> | ((context: Context<U>) => Prototype<U>),
  context: Context<U>,
  timeout?: number
): Promise<U> => {
  return new Promise(resolve =>
    render({ ...toRender, resolve } as Prototype<U>, context, timeout)
  );
};

function arraysEqual(a: any[], b: any[]) {
  if (a === undefined) return false;
  if (b === undefined) return false;
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
