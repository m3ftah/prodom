/**
 * @jest-environment jsdom
 */
import { Prototype, render } from '../src';

test('embed inside dom', () => {
  const childID = 'profileNameDOM';
  const className1 = 'activated';
  const containerDOM = document.createElement('div');
  const prototype = {
    tag: 'span',
    id: childID,
    className: [className1],
  };
  const receivedDOM = render(prototype, {});
  containerDOM.append(receivedDOM);
  expect(containerDOM.children[0].id).toBe(childID);
  expect(containerDOM.children[0].classList).toContain(className1);
  expect(receivedDOM).toMatchSnapshot();
});

test('embed inside dom by id', () => {
  const childID = 'profileNameDOM';
  const className1 = 'activated';
  const containerDOM = document.createElement('div');
  const profileNameDOM = document.createElement('span');
  profileNameDOM.id = childID;
  containerDOM.append(profileNameDOM);
  const prototype: Prototype<HTMLSpanElement> = {
    init: () => containerDOM.querySelector('#' + childID),
    className: [className1],
  };
  const receivedDOM = render(prototype, {});
  expect(receivedDOM.id).toBe(childID);
  expect(receivedDOM).toMatchSnapshot();
});

test('use third-party dom element', () => {
  const expectedText1 = 'child text';
  const imageSRC = 'https://i.picsum.photos/id/320/200/300.jpg';
  const className1 = 'selected';
  const context = {};
  const generateImageDOM = (src: string) => {
    const imageDOM = document.createElement('img');
    imageDOM.src = src;
    return imageDOM;
  };
  const receivedDOM = render(
    {
      tag: 'div',
      className: ['highlighted'],
      children: [
        { tag: 'p', textContent: expectedText1 },
        {
          init: () => generateImageDOM(imageSRC),
          className: [className1],
        },
      ],
    } as Prototype<HTMLDivElement>,
    context
  );
  expect((receivedDOM.children[0] as HTMLParagraphElement).textContent).toBe(
    expectedText1
  );
  expect((receivedDOM.children[1] as HTMLImageElement).classList).toContain(
    className1
  );
  expect((receivedDOM.children[1] as HTMLImageElement).src).toBe(imageSRC);
  expect(receivedDOM).toMatchSnapshot();
});
