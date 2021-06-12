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
      dom: 'div',
      children: [
        devMode &&
          ({
            dom: 'span',
            textContent: '' + count,
            className: [devMode && 'dev'],
          } as Prototype<HTMLSpanElement>),
        {
          dom: 'button',
          textContent: 'increase',
          onclick: increase,
        } as Prototype<HTMLButtonElement>,
        {
          dom: 'button',
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
