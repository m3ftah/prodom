/**
 * @jest-environment jsdom
 */
import { Prototype, pure, render } from '../src';

test('update textContent', () => {
  const expectedText1 = 'child text';
  const expectedText2 = 'modified by diff';
  const context = {};
  const receivedDOM = render(
    { dom: 'p', textContent: expectedText1 } as Prototype<HTMLParagraphElement>,
    context
  );
  expect((receivedDOM as HTMLParagraphElement).textContent).toBe(expectedText1);
  render(
    { dom: 'p', textContent: expectedText2 } as Prototype<HTMLParagraphElement>,
    context
  );
  expect((receivedDOM as HTMLParagraphElement).textContent).toBe(expectedText2);
  expect(receivedDOM).toMatchSnapshot();
});

test('remove one className', () => {
  const expectedText1 = 'child text';
  const expectedText2 = 'modified by diff';
  const className1 = 'selected';
  const context = {};
  const receivedDOM = render(
    {
      dom: 'p',
      textContent: expectedText1,
      className: [className1, 'highlighted'],
    } as Prototype<HTMLParagraphElement>,
    context
  );
  expect((receivedDOM as HTMLParagraphElement).textContent).toBe(expectedText1);
  expect((receivedDOM as HTMLParagraphElement).classList).toContain(className1);
  render(
    {
      dom: 'p',
      textContent: expectedText2,
      className: ['highlighted'],
    } as Prototype<HTMLParagraphElement>,
    context
  );
  expect((receivedDOM as HTMLParagraphElement).textContent).toBe(expectedText2);
  expect((receivedDOM as HTMLParagraphElement).classList).not.toContain(
    className1
  );
  expect(receivedDOM).toMatchSnapshot();
});

test('remove all classNames', () => {
  const expectedText1 = 'child text';
  const expectedText2 = 'modified by diff';
  const className1 = 'selected';
  const context = {};
  const receivedDOM = render(
    {
      dom: 'p',
      textContent: expectedText1,
      className: [className1, 'highlighted'],
    } as Prototype<HTMLParagraphElement>,
    context
  );
  expect((receivedDOM as HTMLParagraphElement).textContent).toBe(expectedText1);
  expect((receivedDOM as HTMLParagraphElement).classList).toContain(className1);
  render(
    { dom: 'p', textContent: expectedText2 } as Prototype<HTMLParagraphElement>,
    context
  );
  expect((receivedDOM as HTMLParagraphElement).textContent).toBe(expectedText2);
  expect((receivedDOM as HTMLParagraphElement).classList).not.toContain(
    className1
  );
  expect(receivedDOM).toMatchSnapshot();
});

test('update style', () => {
  const expectedText1 = 'child text';
  const expectedText2 = 'modified by diff';
  const expectedColor1 = 'white';
  const expectedColor2 = 'black';
  const backgroundColor = 'black';
  const context = {};
  const receivedDOM = render(
    {
      dom: 'p',
      textContent: expectedText1,
      style: {
        backgroundColor,
      },
    } as Prototype<HTMLParagraphElement>,
    context
  );
  const defaultColor = receivedDOM.style.color;
  render(
    {
      dom: 'p',
      textContent: expectedText1,
      style: {
        color: expectedColor1,
        backgroundColor: 'blue',
      },
    } as Prototype<HTMLParagraphElement>,
    context
  );
  expect((receivedDOM as HTMLParagraphElement).textContent).toBe(expectedText1);
  expect((receivedDOM as HTMLParagraphElement).style.color).toBe(
    expectedColor1
  );
  render(
    {
      dom: 'p',
      textContent: expectedText2,
      className: ['highlighted'],
      style: {
        color: expectedColor2,
        backgroundColor: 'blue',
      },
    } as Prototype<HTMLParagraphElement>,
    context
  );
  expect((receivedDOM as HTMLParagraphElement).textContent).toBe(expectedText2);
  expect((receivedDOM as HTMLParagraphElement).style.color).toBe(
    expectedColor2
  );
  expect(receivedDOM).toMatchSnapshot();

  render(
    {
      dom: 'p',
      textContent: expectedText2,
      className: ['highlighted'],
      style: {
        color: expectedColor2,
        backgroundColor,
      },
    } as Prototype<HTMLParagraphElement>,
    context
  );
  expect((receivedDOM as HTMLParagraphElement).textContent).toBe(expectedText2);
  expect((receivedDOM as HTMLParagraphElement).style.color).toBe(
    expectedColor2
  );
  expect((receivedDOM as HTMLParagraphElement).style.backgroundColor).toBe(
    backgroundColor
  );
  expect(receivedDOM).toMatchSnapshot();

  render(
    {
      dom: 'p',
      textContent: expectedText2,
      className: ['highlighted'],
    } as Prototype<HTMLParagraphElement>,
    context
  );
  expect((receivedDOM as HTMLParagraphElement).textContent).toBe(expectedText2);
  expect((receivedDOM as HTMLParagraphElement).style.color).toBe(defaultColor);
  expect(receivedDOM).toMatchSnapshot();
});

test('update children content and type', () => {
  const child1Text = 'child 1';
  const child2Text = 'child 2';
  const expectedText1 = 'modified for new item';
  const expectedText2 = 'modified by diff';
  const context = {};
  const receivedDOM = render(
    {
      dom: 'div',
      className: ['form-item'],
      children: [
        {
          dom: 'input',
          type: 'label',
          textContent: child1Text,
          className: ['form'],
        } as Prototype<HTMLInputElement>,
        {
          dom: 'input',
          textContent: child2Text,
          className: ['selected'],
        } as Prototype<HTMLInputElement>,
      ],
    },
    context
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
  render(
    {
      dom: 'div',
      className: ['form-item'],
      children: [
        {
          dom: 'p',
          textContent: expectedText1,
          className: ['form'],
        } as Prototype<HTMLInputElement>,
        {
          dom: 'input',
          textContent: expectedText2,
          className: ['selected'],
        } as Prototype<HTMLInputElement>,
      ],
    },
    context
  );
  expect(receivedDOM.classList).toContain('form-item');
  expect(receivedDOM.children[0].tagName).toBe('P');
  expect((receivedDOM.children[0] as HTMLInputElement).textContent).toBe(
    expectedText1
  );
  expect(receivedDOM.children[0].classList).toContain('form');
  expect(receivedDOM.children[1].tagName).toBe('INPUT');
  expect((receivedDOM.children[1] as HTMLInputElement).textContent).toBe(
    expectedText2
  );
  expect(receivedDOM).toMatchSnapshot();
});

test('update pure component', () => {
  const expectedText1 = 'Hello world';
  const expectedText2 = 'Updated text';
  const context = {};
  const mockable = jest.fn((x: string) => x);
  const Warning = pure((text: string) => {
    mockable(text);
    return {
      dom: 'span',
      textContent: text,
      className: ['warning'],
    } as Prototype<HTMLSpanElement>;
  });
  const receivedDOM = render(Warning(expectedText1), context);
  render(Warning(expectedText1), context);
  render(Warning(expectedText1), context);
  expect((receivedDOM as HTMLSpanElement).textContent).toBe(expectedText1);
  expect(mockable.mock.calls.length).toBe(1);
  expect(receivedDOM).toMatchSnapshot();

  render(Warning(expectedText2), context);
  render(Warning(expectedText2), context);
  expect((receivedDOM as HTMLSpanElement).textContent).toBe(expectedText2);
  expect(mockable.mock.calls.length).toBe(2);
  expect(receivedDOM).toMatchSnapshot();

  render(Warning(expectedText1), context);
  render(Warning(expectedText1), context);
  expect((receivedDOM as HTMLSpanElement).textContent).toBe(expectedText1);
  expect(mockable.mock.calls.length).toBe(3);
  expect(receivedDOM).toMatchSnapshot();
});
