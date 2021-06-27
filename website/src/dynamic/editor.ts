import { buildStore as buildIt, inferType, Prototype } from 'prodom'
import './editor.css'
import { devIcon } from './icons'
export interface EditorProps {
  demo: string
  title: string
}

const Editor = (
  { demo, title }: EditorProps,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  { onDemoChange, setTitle }: EditorActions,
  demoProp: string,
  titleProp: string,
  link: string,
  devMode: boolean,
  dark: boolean,
) => {
  const resolvedDemo = demo !== undefined ? demo : demoProp
  const resolvedTitle = title !== undefined ? title : titleProp
  const dom = (str: string) => document.createElement(str)
  const buildStore = buildIt
  const titleDOM = {
    dom: 'div',
    className: ['title', devMode && 'dev', dark && 'dark'],
    innerText: resolvedTitle,
    contentEditable: devMode,
  }

  const linkDOM = {
    dom: 'div',
    className: ['title', 'tooltip', devMode && 'dev', dark && 'dark'],
    children: [
      { dom: 'span', innerText: 'edit on codepen', className: ['tooltiptext'] },
      {
        dom: 'a',
        href: link,
        className: ['link'],
        children: [devIcon(dark, '#666', '#bbb', 16, 16)],
      },
    ],
    contentEditable: devMode,
  }

  const headerDOM: Prototype<HTMLDivElement> = {
    dom: 'div',
    className: ['header', devMode && 'dev', dark && 'dark'],
    children: [titleDOM, link && linkDOM],
    contentEditable: devMode,
  }

  const leftDemoDOM: Prototype<HTMLDivElement> = {
    dom: 'div',
    className: ['left-demo', devMode && 'dev', dark && 'dark'],
    innerText: demoProp,
    oninput: (e: Event) => {
      onDemoChange((e.target as HTMLDivElement).innerText)
    },
    contentEditable: 'true',
  }
  const rightDemoDOM = inferType({
    dom: 'div',
    className: ['right-demo', devMode && 'dev', dark && 'dark'],
    children: [eval('(' + resolvedDemo + ')')],
    contentEditable: devMode,
  })

  const demoContainerDOM: Prototype<HTMLDivElement> = {
    dom: 'div',
    className: ['demo-container', devMode && 'dev', dark && 'dark'],
    children: [leftDemoDOM, rightDemoDOM],
    contentEditable: devMode,
  }
  return {
    dom: 'div',
    className: ['editor-container', devMode && 'dev', dark && 'dark'],
    children: [headerDOM, demoContainerDOM],
    contentEditable: devMode,
  }
}

type EditorActions = {
  onDemoChange: (demo: string) => void
  setTitle: (title: string) => void
}

const actions = (state: EditorProps): EditorActions => ({
  onDemoChange: (demo: string) => {
    state.demo = demo
  },
  setTitle: (title: string) => {
    state.title = title
  },
})

export default buildIt(Editor, actions)
