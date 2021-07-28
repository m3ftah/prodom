/**
 * @jest-environment jsdom
 */
import { Prototype, pure, render } from '../src';

test('remove one child', () => {
  const child1Text = 'child 1';
  const child2Text = 'child 2';
  const child3Text = 'child 3';
  const context = {};
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
        {
          tag: 'span',
          textContent: child3Text,
          className: ['warning'],
        } as Prototype<HTMLSpanElement>,
      ],
    },
    context
  );
  expect((receivedDOM.children[0] as HTMLInputElement).textContent).toBe(
    child1Text
  );
  expect((receivedDOM.children[1] as HTMLInputElement).textContent).toBe(
    child2Text
  );
  expect((receivedDOM.children[2] as HTMLSpanElement).textContent).toBe(
    child3Text
  );
  expect(receivedDOM).toMatchSnapshot();
  render(
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
          tag: 'span',
          textContent: child3Text,
          className: ['warning'],
        } as Prototype<HTMLSpanElement>,
      ],
    },
    context
  );
  expect(receivedDOM.children.length).toBe(2);
  expect((receivedDOM.children[1] as HTMLInputElement).textContent).toBe(
    child3Text
  );
  expect(receivedDOM).toMatchSnapshot();
});

test('move one keyed child - keep pure', () => {
  const child1Text = 'child 1';
  const child2Text = 'child 2';
  const child3Text = 'child 3';
  const context = {};
  const mockable = jest.fn((x: string) => x);
  const Warning = pure((text: string) => {
    mockable(text);
    return {
      tag: 'span',
      textContent: text,
      className: ['warning'],
    } as Prototype<HTMLSpanElement>;
  });
  const receivedDOM = render(
    {
      tag: 'div',
      className: ['form-item'],
      children: [
        [
          {
            tag: 'input',
            type: 'label',
            textContent: child1Text,
            className: ['form'],
          } as Prototype<HTMLInputElement>,
          'child1',
        ],
        [
          {
            tag: 'input',
            textContent: child2Text,
            className: ['selected'],
          } as Prototype<HTMLInputElement>,
          'child2',
        ],
        [Warning(child3Text), 'child3'],
      ],
    },
    context
  );
  expect((receivedDOM.children[0] as HTMLInputElement).textContent).toBe(
    child1Text
  );
  expect((receivedDOM.children[1] as HTMLInputElement).textContent).toBe(
    child2Text
  );
  expect((receivedDOM.children[2] as HTMLSpanElement).textContent).toBe(
    child3Text
  );
  expect(receivedDOM).toMatchSnapshot();
  render(
    {
      tag: 'div',
      className: ['form-item'],
      children: [
        [
          {
            tag: 'input',
            type: 'label',
            textContent: child1Text,
            className: ['form'],
          } as Prototype<HTMLInputElement>,
          'child1',
        ],
        [Warning(child3Text), 'child3'],
        [
          {
            tag: 'input',
            textContent: child2Text,
            className: ['selected'],
          } as Prototype<HTMLInputElement>,
          'child2',
        ],
      ],
    },
    context
  );
  expect(receivedDOM).toMatchSnapshot();
  expect((receivedDOM.children[1] as HTMLInputElement).textContent).toBe(
    child3Text
  );
  expect(mockable.mock.calls.length).toBe(1);

  render(
    {
      tag: 'div',
      className: ['form-item'],
      children: [
        [Warning(child3Text), 'child3'],
        [
          {
            tag: 'input',
            type: 'label',
            textContent: child1Text,
            className: ['form'],
          } as Prototype<HTMLInputElement>,
          'child1',
        ],
      ],
    },
    context
  );
  expect(receivedDOM).toMatchSnapshot();
  expect((receivedDOM.children[1] as HTMLInputElement).textContent).toBe(
    child1Text
  );
  expect(mockable.mock.calls.length).toBe(1);
});

test('render with condition', () => {
  const context = {};
  const Form = (withText: boolean): Prototype<HTMLDivElement> => {
    return {
      tag: 'div',
      className: ['form-item'],
      children: [
        withText &&
          ({
            tag: 'p',
            textContent: 'some text',
            className: ['form'],
          } as Prototype<HTMLInputElement>),
        {
          tag: 'input',
          textContent: 'other input',
          className: ['selected'],
        } as Prototype<HTMLInputElement>,
      ],
    };
  };
  const receivedDOM = render(Form(true), context);
  expect(receivedDOM.tagName).toBe('DIV');
  expect(receivedDOM.children.length).toBe(2);
  expect(receivedDOM.children[0].tagName).toBe('P');
  expect(receivedDOM.children[1].tagName).toBe('INPUT');
  expect(receivedDOM).toMatchSnapshot();

  render(Form(false), context);
  expect(receivedDOM.tagName).toBe('DIV');
  expect(receivedDOM.children.length).toBe(1);
  expect(receivedDOM.children[0].tagName).toBe('INPUT');
  expect(receivedDOM).toMatchSnapshot();

  render(Form(true), context);
  expect(receivedDOM.children.length).toBe(2);
  expect(receivedDOM.children[0].tagName).toBe('P');
  expect(receivedDOM.children[1].tagName).toBe('INPUT');
  expect(receivedDOM).toMatchSnapshot();
});
