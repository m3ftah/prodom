import { Prototype } from 'prodom'

const svgNS = 'http://www.w3.org/2000/svg'

export const darkIcon = (
  dark: boolean,
  darkColor?: string,
  lightColor?: string,
): Prototype<Node> => {
  return {
    init: () => document.createElementNS(svgNS, 'svg'),
    setAttribute: {
      width: '48',
      height: '48',
      viewBox: '0 0 100 100',
      fill: 'none',
    },
    children: [
      {
        init: () => document.createElementNS(svgNS, 'circle'),
        setAttribute: {
          cx: '50',
          cy: '50',
          r: '45',
          fill: dark ? '#000' : '#FFF',
          stroke: dark ? '#000' : '#FFF',
        },
      },
      {
        init: () => document.createElementNS(svgNS, 'circle'),
        setAttribute: {
          cx: '50',
          cy: '50',
          r: '40',
          fill: dark ? lightColor : '#FFF',
        },
      },
      {
        init: () => document.createElementNS(svgNS, 'path'),
        setAttribute: {
          d: `M 50 10 A 40 40 0 0 0 50 90`,
          fill: dark ? '#000' : darkColor,
          stroke: dark ? '#000' : darkColor,
        },
      },
      {
        init: () => document.createElementNS(svgNS, 'circle'),
        setAttribute: {
          cx: '50',
          cy: '50',
          r: '20',
          fill: dark ? lightColor : '#FFF',
        },
      },
      {
        init: () => document.createElementNS(svgNS, 'path'),
        setAttribute: {
          d: `M 50 30 A 20 20 0 0 1 50 70`,
          fill: dark ? '#000' : darkColor,
          stroke: dark ? '#000' : darkColor,
        },
      },
    ],
  }
}

export const devIcon = (
  dark: boolean,
  darkColor?: string,
  lightColor?: string,
  width?: number,
  height?: number,
): Prototype<HTMLElement> => {
  return {
    init: () => document.createElementNS(svgNS, 'svg'),
    setAttribute: {
      width: width !== undefined ? '' + width : '48',
      height: height !== undefined ? '' + height : '48',
      viewBox: '0 0 100 100',
      fill: 'none',
    },
    children: [
      {
        init: () => document.createElementNS(svgNS, 'path'),
        setAttribute: {
          d: `M 25 25 L 0 50, 25 75, 35 65, 20 50, 35 35 Z`,
          fill: dark ? lightColor : darkColor,
          stroke: dark ? lightColor : darkColor,
        },
      },
      {
        init: () => document.createElementNS(svgNS, 'path'),
        setAttribute: {
          d: `M 35 95 L 55 2, 65 5, 45 98 Z`,
          fill: dark ? lightColor : darkColor,
          stroke: dark ? lightColor : darkColor,
        },
      },
      {
        init: () => document.createElementNS(svgNS, 'path'),
        setAttribute: {
          d: `M 75 25 L 100 50, 75 75, 65 65, 80 50, 65 35 Z`,
          fill: dark ? lightColor : darkColor,
          stroke: dark ? lightColor : darkColor,
        },
      },
    ],
  }
}
