/**
 * @jest-environment jsdom
 */
import { Prototype, render } from '../src';

test('init property', () => {
  const context = {};
  const mockable = jest.fn(() => 0);
  const receivedDOM = render(
    {
      init: () => {
        mockable();
        return document.createElement('div');
      },
      className: ['form-item'],
      children: [
        {
          dom: 'p',
          textContent: 'some text',
          className: ['form'],
        } as Prototype<HTMLInputElement>,
      ],
    },
    context
  );
  expect(mockable.mock.calls.length).toBe(1);
  expect(receivedDOM.tagName).toBe('DIV');
  expect(receivedDOM.children[0].tagName).toBe('P');
  expect(receivedDOM).toMatchSnapshot();

  const existingDOM1 = document.createElement('input');
  const classList1 = 'form-item';
  const receivedDOM2 = render(
    {
      init: () => {
        mockable();
        return existingDOM1;
      },
      className: [classList1],
    },
    context
  );
  expect(mockable.mock.calls.length).toBe(2);
  expect(receivedDOM2.tagName).toBe('INPUT');
  expect(receivedDOM2.classList).toContain(classList1);
  expect(receivedDOM2).toMatchSnapshot();

  render(
    {
      init: () => {
        mockable();
        return existingDOM1;
      },
      className: ['hi'],
    },
    context
  );
  expect(mockable.mock.calls.length).toBe(2);
  expect(receivedDOM2.classList).not.toContain(classList1);
  expect(receivedDOM2).toMatchSnapshot();
});

test('dom property', () => {
  const receivedDOM = render(
    {
      dom: 'div',
      className: ['form-item'],
      children: [
        {
          dom: 'p',
          textContent: 'some text',
          className: ['form'],
        } as Prototype<HTMLInputElement>,
        {
          dom: 'input',
          textContent: 'other input',
          className: ['selected'],
        } as Prototype<HTMLInputElement>,
      ],
    },
    {}
  );
  expect(receivedDOM.tagName).toBe('DIV');
  expect(receivedDOM.children[0].tagName).toBe('P');
  expect(receivedDOM.children[1].tagName).toBe('INPUT');
  expect(receivedDOM).toMatchSnapshot();
});

test('virtual property', () => {
  const childID = 'profileNameDOM';
  const className1 = 'activated';
  const textContext1 = 'Hello world';
  const containerDOM = document.createElement('div');
  const profileNameDOM = document.createElement('span');
  profileNameDOM.id = childID;
  containerDOM.append(profileNameDOM);
  const prototype: Prototype<HTMLSpanElement> = {
    dom: 'div',
    children: [
      {
        init: () => containerDOM.querySelector('#' + childID),
        className: [className1],
        virtual: true,
      },
      {
        dom: 'span',
        textContent: textContext1,
      },
    ],
  };
  const receivedDOM = render(prototype, {});
  expect(receivedDOM.children.length).toBe(1);
  expect(containerDOM.children.length).toBe(1);
  expect(containerDOM.children[0].id).toBe(childID);
  expect(containerDOM.children[0].classList).toContain(className1);
  expect(receivedDOM.children[0].textContent).toBe(textContext1);
  expect(receivedDOM).toMatchSnapshot();
});

test('freeze property', () => {
  const expectedText1 = 'child text';
  const expectedText2 = 'modified by diff';
  const context = {};
  const receivedDOM = render(
    { dom: 'p', textContent: expectedText1 } as Prototype<HTMLParagraphElement>,
    context
  );
  expect((receivedDOM as HTMLParagraphElement).textContent).toBe(expectedText1);
  render(
    {
      dom: 'p',
      textContent: expectedText2,
      freeze: true,
    } as Prototype<HTMLParagraphElement>,
    context
  );
  expect((receivedDOM as HTMLParagraphElement).textContent).toBe(expectedText1);
  expect(receivedDOM).toMatchSnapshot();
});

test('setAttribute property', () => {
  const context = {};
  const receivedDOM = render(
    {
      dom: 'input',
      textContent: 'other input',
      className: ['selected'],
    } as Prototype<HTMLInputElement>,
    context
  );
  expect(receivedDOM.tagName).toBe('INPUT');
  const defaultType = receivedDOM.type;
  expect(receivedDOM).toMatchSnapshot();

  render(
    {
      dom: 'input',
      setAttribute: {
        type: 'radio',
      },
      textContent: 'other input',
      className: ['selected'],
    } as Prototype<HTMLInputElement>,
    context
  );
  expect(receivedDOM.tagName).toBe('INPUT');
  expect(receivedDOM.type).toBe('radio');
  expect(receivedDOM).toMatchSnapshot();

  render(
    {
      dom: 'input',
      setAttribute: {
        type: 'checkbox',
      },
      textContent: 'other input',
      className: ['selected'],
    } as Prototype<HTMLInputElement>,
    context
  );
  expect(receivedDOM.tagName).toBe('INPUT');
  expect(receivedDOM.type).toBe('checkbox');
  expect(receivedDOM).toMatchSnapshot();

  render(
    {
      dom: 'input',
      setAttribute: {
        data: 'here',
      },
      textContent: 'other input',
      className: ['selected'],
    } as Prototype<HTMLInputElement>,
    context
  );
  expect(receivedDOM.tagName).toBe('INPUT');
  expect(receivedDOM.type).toBe(defaultType);
  expect(receivedDOM).toMatchSnapshot();

  render(
    {
      dom: 'input',
      textContent: 'other input',
      className: ['selected'],
    } as Prototype<HTMLInputElement>,
    context
  );
  expect(receivedDOM.tagName).toBe('INPUT');
  expect(receivedDOM.type).toBe(defaultType);
  expect(receivedDOM).toMatchSnapshot();
});
