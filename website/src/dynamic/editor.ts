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
  const buildStore = buildIt
  const titleDOM = {
    tag: 'div',
    className: ['title', devMode && 'dev', dark && 'dark'],
    innerText: resolvedTitle,
    contentEditable: devMode,
  }

  const linkDOM = {
    tag: 'div',
    className: ['title', 'tooltip', devMode && 'dev', dark && 'dark'],
    children: [
      { tag: 'span', innerText: 'edit on codepen', className: ['tooltiptext'] },
      {
        tag: 'a',
        href: link,
        className: ['link'],
        children: [devIcon(dark, '#666', '#bbb', 16, 16)],
      },
    ],
    contentEditable: devMode,
  }

  const headerDOM: Prototype<HTMLDivElement> = {
    tag: 'div',
    className: ['header', devMode && 'dev', dark && 'dark'],
    children: [titleDOM, link && linkDOM],
    contentEditable: devMode,
  }

  const leftDemoDOM: Prototype<HTMLDivElement> = {
    tag: 'div',
    className: ['left-demo', devMode && 'dev', dark && 'dark'],
    innerText: demoProp,
    oninput: (e: Event) => {
      onDemoChange((e.target as HTMLDivElement).innerText)
    },
    contentEditable: 'true',
  }
  const rightDemoDOM = inferType({
    tag: 'div',
    className: ['right-demo', devMode && 'dev', dark && 'dark'],
    children: [eval('(' + resolvedDemo + ')')],
    contentEditable: devMode,
  })

  const demoContainerDOM: Prototype<HTMLDivElement> = {
    tag: 'div',
    className: ['demo-container', devMode && 'dev', dark && 'dark'],
    children: [leftDemoDOM, rightDemoDOM],
    contentEditable: devMode,
  }
  return {
    tag: 'div',
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
