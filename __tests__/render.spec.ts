/**
 * @jest-environment jsdom
 */
import {
  asyncPure,
  buildStore,
  Prototype,
  pure,
  render,
  asyncRender,
  Context,
  inferType,
} from '../src';

test('render innerText', () => {
  const expected = 'hello';
  const receivedDOM = render({ tag: 'div', innerText: expected }, {});
  expect(receivedDOM.innerText).toBe(expected);
});

test('render one child', () => {
  const expected = 'child text';
  const receivedDOM = render(
    {
      tag: 'div',
      children: [
        { tag: 'p', textContent: expected } as Prototype<HTMLParagraphElement>,
      ],
    },
    {}
  );
  expect((receivedDOM.firstChild as HTMLParagraphElement).textContent).toBe(
    expected
  );
  expect(receivedDOM).toMatchSnapshot();
});

test('render two children', () => {
  const child1Text = 'child 1';
  const child2Text = 'child 2';
  const receivedDOM = render(
    {
      tag: 'div',
      className: ['form-item'],
      children: [
        {
          tag: 'input',
          type: 'label',
          textContent: child1Text,
          className: ['form'],
        } as Prototype<HTMLInputElement>,
        {
          tag: 'input',
          textContent: child2Text,
          className: ['selected'],
        } as Prototype<HTMLInputElement>,
      ],
    },
    {}
  );
  expect(receivedDOM.classList).toContain('form-item');
  expect(receivedDOM.children[0].tagName).toBe('INPUT');
  expect(receivedDOM.children[0].getAttribute('type')).toBe('label');
  expect((receivedDOM.children[0] as HTMLInputElement).textContent).toBe(
    child1Text
  );
  expect(receivedDOM.children[1].tagName).toBe('INPUT');
  expect((receivedDOM.children[1] as HTMLInputElement).textContent).toBe(
    child2Text
  );
  expect(receivedDOM).toMatchSnapshot();
});

test('render component', () => {
  const UserImage = (
    name: string,
    imageUrl: string
  ): Prototype<HTMLDivElement> => ({
    tag: 'div',
    children: [
      { tag: 'span', textContent: name },
      { tag: 'img', src: imageUrl } as Prototype<HTMLImageElement>,
    ],
  });
  const userInfo = {
    name: 'Mike',
    imageUrl: 'https://i.picsum.photos/id/320/200/300.jpg',
  };
  const receivedDOM = render(UserImage(userInfo.name, userInfo.imageUrl), {});
  expect(receivedDOM.children[0].tagName).toBe('SPAN');
  expect(receivedDOM.children[0].textContent).toBe(userInfo.name);
  expect(receivedDOM.children[1].tagName).toBe('IMG');
  expect(receivedDOM.children[1].getAttribute('src')).toBe(userInfo.imageUrl);
  expect(receivedDOM).toMatchSnapshot();
});

test('render store', () => {
  interface StoreActionsType {
    increase: () => void;
    decrease: () => void;
  }
  interface StoreType {
    count: number;
  }
  const actions = (store: StoreType): StoreActionsType => ({
    increase: () => {
      store.count++;
    },
    decrease: () => store.count--,
  });

  const store: StoreType = { count: 1 };
  const Counter = (
    { count }: StoreType,
    { increase, decrease }: StoreActionsType,
    devMode: boolean
  ) => ({
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
  });
  const context = {};
  const receivedDOM = render(
    buildStore(Counter, actions, store)(true),
    context
  );
  expect(receivedDOM).toMatchSnapshot();
  expect(receivedDOM.children[0].textContent).toBe('1');
  return (receivedDOM.children[1] as HTMLButtonElement)
    .onclick(this)
    .then(() => {
      expect(receivedDOM.children[0].textContent).toBe('2');
      expect(receivedDOM).toMatchSnapshot();
      render(buildStore(Counter, actions, store)(), context);
      expect(receivedDOM.children[0].textContent).not.toBe('1');
    });
});

test('render pure component', () => {
  const expectedText = '2, was: 1';
  const mockable = jest.fn((x: number) => x);
  const CounterInternal = (count: number, oldCount: number) => {
    mockable(count);
    return {
      tag: 'div',
      children: [
        {
          tag: 'span',
          textContent:
            '' + count + (oldCount !== undefined ? ', was: ' + oldCount : ''),
          className: ['dev'],
        } as Prototype<HTMLSpanElement>,
        {
          tag: 'button',
          textContent: 'increase',
        } as Prototype<HTMLButtonElement>,
        {
          tag: 'button',
          textContent: 'decrease',
        } as Prototype<HTMLButtonElement>,
      ],
    };
  };
  const Counter = pure(CounterInternal);
  const context = {};
  const receivedDOM = render(Counter(1), context);
  render(Counter(1), context);
  render(Counter(1), context);
  expect(receivedDOM).toMatchSnapshot();
  expect(receivedDOM.children[0].textContent).toBe('1');
  const receivedDOM2 = render(Counter(1), context);
  expect(mockable.mock.calls.length).toBe(1);
  expect(receivedDOM2.children[0].textContent).toBe('1');
  const receivedDOM3 = render(Counter(2), context);
  render(Counter(2), context);
  render(Counter(2), context);
  expect(mockable.mock.calls.length).toBe(2);
  expect(receivedDOM3.children[0].textContent).toBe(expectedText);
  expect(receivedDOM).toMatchSnapshot();
});

test('render async pure component', async () => {
  const expectedText = '2, was: 1';
  const mockable = jest.fn((x: number) => x);
  const CounterInternal = (count: number, oldCount: number) => {
    return new Promise(resolve => {
      mockable(count);
      setTimeout(
        () =>
          resolve({
            tag: 'div',
            children: [
              {
                tag: 'span',
                textContent:
                  '' +
                  count +
                  (oldCount !== undefined ? ', was: ' + oldCount : ''),
                className: ['dev'],
              } as Prototype<HTMLSpanElement>,
              {
                tag: 'button',
                textContent: 'increase',
              } as Prototype<HTMLButtonElement>,
              {
                tag: 'button',
                textContent: 'decrease',
              } as Prototype<HTMLButtonElement>,
            ],
          }),
        100
      );
    });
  };
  const Counter = asyncPure(CounterInternal);
  const context = {};
  const receivedDOM = await asyncRender(Counter(1), context);
  render(Counter(1), context);
  render(Counter(1), context);
  expect(receivedDOM).toMatchSnapshot();
  expect(receivedDOM.children[0].textContent).toBe('1');
  const receivedDOM2 = render(Counter(1), context);
  expect(mockable.mock.calls.length).toBe(1);
  expect(receivedDOM2.children[0].textContent).toBe('1');
  const receivedDOM3 = await asyncRender(Counter(2), context);
  render(Counter(2), context);
  render(Counter(2), context);
  expect(mockable.mock.calls.length).toBe(2);
  expect(receivedDOM3.children[0].textContent).toBe(expectedText);
  expect(receivedDOM).toMatchSnapshot();
});

test('render contextual component', () => {
  const newName = 'Max';
  const UserImage = (name: string) => (
    context: Context<HTMLDivElement>
  ): Prototype<HTMLDivElement> => ({
    tag: 'div',
    children: [
      { tag: 'span', textContent: name },
      inferType({
        tag: 'button',
        onclick: () => render(UserImage(newName), context),
      }),
    ],
  });
  const userInfo = {
    name: 'Mike',
  };
  const receivedDOM = render(UserImage(userInfo.name), {});
  expect(receivedDOM.children[0].textContent).toBe(userInfo.name);
  expect(receivedDOM).toMatchSnapshot();
  (receivedDOM.children[1] as HTMLButtonElement).onclick(this);
  expect(receivedDOM.children[0].textContent).toBe(newName);
  expect(receivedDOM).toMatchSnapshot();
});
