import { buildStore as buildIt, Prototype, render } from 'prodom'
import './blog.article.css'
import Editor from './editor'
import { darkIcon, devIcon } from './icons'
import icon from '../icon-trans.png'
export interface BlogArticleProps {
  title: string
  subtitle: string
  date: string
  body: string
  devMode: boolean
  dark: boolean
}

const article: BlogArticleProps = {
  title: 'An easy to use web app framework',
  subtitle: 'Prodom, the next open web app framework',
  date: 'June 27 - 2021',
  body: `
  Prodom is a <code>2kB</code> library that helps you build web apps.
  By design, it is a declarative framework, component based and easy to use.
  Moreover, it can be integrated into already existing projects with no lock-in, as it only works on a dom object,
  and exports a dom object.
  </br>
  Prodom allows you to to compose and manage complex dom elements using pure idiomatic javascript.
  You do not need to learn anything new, aside from the prototype concept and the store structure.
  </br>
  Prodom follows a <i>Flux Architecture</i> concept by providing you with a built-in store/actions design.
  </br>
  The main motivation behind providing such a framework is the complexity and the overhead given by popular web frameworks.
  Not to mention the lock-in, the library size and the complex buggy APIs.
  </br>
  If you are already familiar with some standard web concepts like: <i>Flux Architecture</i>, pure components and HTML5.
  Then you are ready to use Prodom.
  <h3>Some <i>behind the scene</i> considerations</h3>
 
  <b>Reconciliation and virtual DOM:</b> these are used to automatically apply diffing whenever a new render is called.
  Thus, minimizing the number of DOM operations.
  </br>
  <b>Concurrent Mode:</b> you can specify a timeout for which, the rendering will not block the UI for more than that timeout.
  This feature was only available very late in React.js (just after I gave up on it).
  </br>
  <b>Differed rendering:</b> you can provide a promise on a component that will be rendered after a data is fetched. Meanwhile,
  you can provide another component as a placeholder.
  </br>
  <b>Automatic batching:</b> when multiple store actions are called in the time, the store state will be updated accordingly,
  but only one rendering function will be called at the end.
  While this feature is not yet available in React.js; it is provided by Prodom out of the box.
  </br>
  <b>Carried Context:</b> this means you can render from every where, the context object needed to render is provided to you
  in every component.
  This may come handy if you want to extend Prodom.
  </br>
  <b>Finally,</b> while Prodom has been heavily inspired by React.js, this is not a swiss army knife solution as React.js.
  The main reason behind building such framework is effeciency.
  With small size, few concepts to get around; you can code web apps faster with out of the box production performance.
  `,
  devMode: false,
  dark:
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches,
}

const createBlogArticle = (
  { title, subtitle, date, body, devMode = true, dark }: BlogArticleProps,
  { setDark, setDevMode }: BlogActions,
): Prototype<HTMLBodyElement> => {
  const darkModeDOM: Prototype<HTMLDivElement> = {
    dom: 'div',
    className: ['control'],
    style: { backgroundColor: dark ? '#bbb' : '#666' },
    onclick: () => setDark(!dark),
    contentEditable: '' + devMode,
    children: [darkIcon(dark, '#666', '#bbb')],
  }
  const devModeDOM: Prototype<HTMLDivElement> = {
    dom: 'div',
    className: ['control'],
    onclick: () => setDevMode(!devMode),
    contentEditable: '' + devMode,
    children: [devIcon(dark, '#666', '#bbb')],
  }
  const headerDOM: Prototype<HTMLDivElement> = {
    dom: 'div',
    className: ['header'],
    children: [devModeDOM, darkModeDOM],
  }

  const style1 = (devMode: boolean) => ({
    backgroundColor: devMode && 'gray',
  })

  const style2 = {
    fontSize: '3rem',
  }

  const titleDOM = {
    dom: 'h1',
    className: ['blog-article-title', devMode && 'dev', dark && 'dark'],
    style: { ...style1(devMode), ...(devMode && style2) },
    innerText: title,
    contentEditable: devMode,
  }

  const subtitleDOM = {
    dom: 'p',
    className: ['blog-article-subtitle', devMode && 'dev', dark && 'dark'],
    innerText: subtitle,
    contentEditable: devMode,
  }

  const dateDOM = {
    dom: 'p',
    className: ['blog-article-date', devMode && 'dev', dark && 'dark'],
    innerText: date,
    contentEditable: devMode,
  }

  const bodyDOM: Prototype<HTMLParagraphElement> = {
    dom: 'p',
    className: ['blog-article-body', devMode && 'dev', dark && 'dark'],
    innerHTML: body,
    contentEditable: '' + devMode,
  }

  const exampleTitle = {
    dom: 'h2',
    innerText: 'Some examples',
    style: {
      marginBottom: '50px',
    },
  }

  const buildStore = buildIt
  const container = {
    dom: 'div',
    className: ['blog-article-container', devMode && 'dev', dark && 'dark'],
    children: [
      titleDOM,
      subtitleDOM,
      dateDOM,
      {
        dom: 'img',
        src: icon,
        style: {
          display: 'inline-block',
          alignSelf: 'center',
          width: '96px',
          height: '96px',
        },
      },
      bodyDOM,
      exampleTitle,
      Editor(
        `{
    dom: 'code',
    innerText: 'Hello world',
}`,
        'A simple prototype',
        'https://codepen.io/m3ftah/pen/PopdwaG',
        devMode,
        dark,
      ),
      Editor(
        `{
  dom: 'div',
  children:
  [
    {
      dom: 'label',
      innerText: 'First child: ',
    },
    {
      dom: 'input',
      value: 'Second child',
    },
    {
      dom: 'button',
      innerText: 'Third child',
    },
  ]
}`,
        'Composing prototypes',
        'https://codepen.io/m3ftah/pen/ZEeexea',
        devMode,
        dark,
      ),
      Editor(
        `{
  dom: 'code',
  innerText: 'Hello world',
  className: ['bold', dark && 'dark']
}`,
        'Dynamic CSS Classes',
        'https://codepen.io/m3ftah/pen/YzZOPez',
        devMode,
        dark,
      ),
      Editor(
        `{
  dom: 'button',
  innerText: 'Click me!',
  onclick: ()=> setTitle('Title has been modified')
}`,
        'Events',
        'https://codepen.io/m3ftah/pen/RwpBXzG',
        devMode,
        dark,
      ),
      Editor(
        `{
  dom: 'div',
  innerText: 'I am styled',
  style: {display: 'flex' , alignSelf: ' center', padding: '16px', borderRadius: '8px', backgroundColor: '#29f'}
}`,
        'Styling',
        'https://codepen.io/m3ftah/pen/jOBvEmw',
        devMode,
        dark,
      ),
      Editor(
        `() => {
        const prototype = ({ name }, { setName }) => ({
          dom: 'div',
          children: [
            {
              dom: 'input',
              value: name,
              oninput: (e) => setName(e.target.value)
            },
            {
              dom: 'div',
              innerText: 'Name: ' + name,
              onclick: () => setName('User 1')
            }
          ]
        })
        const actions = (state) => ({
          setName: (name) => state.name = name
        })
        return buildStore(prototype, actions, { name: 'NAME' })(resolvedDemo)
      }`,
        'Store',
        'https://codepen.io/m3ftah/pen/NWpLKdz',
        devMode,
        dark,
      ),
    ],
    contentEditable: '' + devMode,
  }
  const padding = {
    dom: 'div',
    className: ['padding', dark && 'dark'],
    contentEditable: '' + devMode,
  }
  return {
    init: () => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (e) => {
          const mode = e.matches
          setDark(mode)
        })
      return document.createElement('body')
    },
    className: ['blog-article-page', devMode && 'dev', dark && 'dark'],
    children: [headerDOM, container, padding],
    contentEditable: '' + devMode,
  }
}
type BlogActions = {
  setDark: (dark: boolean) => void
  setDevMode: (devMode: boolean) => void
}
const actions = (state: BlogArticleProps): BlogActions => ({
  setDark: (dark: boolean) => {
    state.dark = dark
  },
  setDevMode: (devMode: boolean) => {
    state.devMode = devMode
  },
})
export default render(buildIt(createBlogArticle, actions, article)(), {})
