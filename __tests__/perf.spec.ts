/**
 * @jest-environment jsdom
 */
import { buildStore, Prototype, render } from '../src';

test('multiple blocking store render', () => {
  interface StoreActionsType {
    increase: () => void;
    decrease: () => void;
  }
  interface StoreType {
    count: number;
  }
  const actions = (store: StoreType): StoreActionsType => ({
    increase: () => store.count++,
    decrease: () => store.count--,
  });

  const store: StoreType = { count: 1 };
  const mockable = jest.fn(() => {});
  const Counter = (
    { count }: StoreType,
    { increase, decrease }: StoreActionsType,
    devMode: boolean
  ) => {
    mockable();
    const start = Date.now();
    while (Date.now() - start < 100) {
      continue;
    }
    return {
      tag: 'div',
      children: [
        devMode &&
          ({
            tag: 'span',
            textContent: '' + count,
            className: [devMode && 'dev'],
          } as Prototype<HTMLSpanElement>),
        {
          tag: 'button',
          textContent: 'increase',
          onclick: increase,
        } as Prototype<HTMLButtonElement>,
        {
          tag: 'button',
          textContent: 'decrease',
          onclick: decrease,
        } as Prototype<HTMLButtonElement>,
      ],
    };
  };
  const context = {};
  const receivedDOM = render(
    buildStore(Counter, actions, store)(true),
    context
  );
  expect(receivedDOM).toMatchSnapshot();
  expect(receivedDOM.children[0].textContent).toBe('1');

  return new Promise((accept, reject) => {
    const start = Date.now();
    let i = 0;
    for (i = 0; i < 21; i++) {
      const tempI = i;
      setTimeout(() => {
        (receivedDOM.children[tempI % 2 ? 1 : 2] as HTMLButtonElement)
          .onclick(this)
          .then(() => {
            expect(mockable.mock.calls.length).toBe(2);
            expect(receivedDOM.children[0].textContent).toBe('0');
            render(buildStore(Counter, actions, store)(), context);
            if (tempI === 20) {
              const duration = Date.now() - start;
              expect(duration).toBeLessThan(1000);
              accept(true);
            }
          })
          .catch(() => {});
      });
    }
  });
});

test('multiple blocking store render with chunks', () => {
  const heavyComponent = () => {
    const start = Date.now();
    while (Date.now() - start < 100) {
      continue;
    }
    return { tag: 'div', textContent: 'Hello' };
  };
  interface StoreActionsType {
    increase: () => void;
    decrease: () => void;
  }
  interface StoreType {
    count: number;
  }
  const actions = (store: StoreType): StoreActionsType => ({
    increase: () => store.count++,
    decrease: () => store.count--,
  });

  const store: StoreType = { count: 1 };
  const mockable = jest.fn(() => {});
  const Counter = (
    { count }: StoreType,
    { increase, decrease }: StoreActionsType,
    devMode: boolean
  ) => {
    mockable();
    const start = Date.now();
    while (Date.now() - start < 100) {
      continue;
    }
    const children = [];
    children.push(
      devMode &&
        ({
          tag: 'span',
          textContent: '' + count,
          className: [devMode && 'dev'],
        } as Prototype<HTMLSpanElement>),
      {
        tag: 'button',
        textContent: 'increase',
        onclick: increase,
      } as Prototype<HTMLButtonElement>,
      {
        tag: 'button',
        textContent: 'decrease',
        onclick: decrease,
      } as Prototype<HTMLButtonElement>
    );

    let i = 0;
    for (i = 0; i < 20; i++) {
      children.push(heavyComponent);
    }
    return {
      tag: 'div',
      children,
    };
  };

  const context = {};
  const receivedDOM = render(
    buildStore(Counter, actions, store, 100)(true),
    context
  );
  expect(receivedDOM).toMatchSnapshot();
  expect(receivedDOM.children[0].textContent).toBe('1');

  return new Promise((accept, reject) => {
    const start = Date.now();
    let i = 0;
    for (i = 0; i < 21; i++) {
      const tempI = i;
      setTimeout(() => {
        const startChunk = Date.now();

        const element = receivedDOM.children[
          tempI % 2 ? 1 : 2
        ] as HTMLButtonElement;
        element
          .onclick(this)
          .then(() => {
            const duration = Date.now() - startChunk;
            expect(duration).toBeLessThan(300);
            expect(mockable.mock.calls.length).toBe(2);
            expect(receivedDOM.children[0].textContent).toBe('0');
            render(buildStore(Counter, actions, store)(), context);
            if (tempI === 20) {
              const duration = Date.now() - start;
              expect(duration).toBeLessThan(5000);
              accept(true);
            }
          })
          .catch(() => {});
      }, 2000);
    }
  });
});

test('render component with chunks', () => {
  const heavyComponent = () => {
    const start = Date.now();
    while (Date.now() - start < 100) {
      continue;
    }
    return { tag: 'span', textContent: 'Hello' };
  };
  const Component = (): Prototype<HTMLDivElement> => {
    const children = [];
    let i = 0;
    for (i = 0; i < 20; i++) {
      children.push(heavyComponent);
    }
    return {
      tag: 'div',
      children,
    };
  };

  const start = Date.now();
  const receivedDOM = render(Component(), {}, 300);

  const duration = Date.now() - start;
  expect(duration).toBeLessThan(600);

  return new Promise(accept => {
    setTimeout(() => {
      expect(receivedDOM.children.length).toBe(20);
      accept(true);
    }, 2000);
  });
});
