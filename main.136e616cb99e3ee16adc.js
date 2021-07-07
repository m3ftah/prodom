(self.webpackChunkprodom_documentation=self.webpackChunkprodom_documentation||[]).push([[179],{91:(n,e,o)=>{"use strict";o.d(e,{Z:()=>a});var t=o(445),i=o.n(t),r=o(352),d=o.n(r)()(i());d.push([n.id,".blog-article-page {\n  display: flex;\n  flex-direction: column;\n  font-size: 1rem;\n}\n.header {\n  align-self: flex-end;\n  margin-bottom: 16px;\n}\n.control {\n  display: inline-flex;\n  cursor: pointer;\n  align-self: flex-end;\n  border-radius: 4px;\n  box-shadow: 2px 2px 8px lightgray;\n  box-sizing: border-box;\n  padding: 8px;\n  margin-right: 8px;\n}\n.control:hover {\n  box-shadow: 2px 2px 8px 2px lightgray;\n}\n.blog-article-container {\n  display: flex;\n  flex: 1;\n  flex-direction: column;\n  align-self: center;\n  position: relative;\n  padding: 16px;\n  width: 100%;\n  border-bottom: 1px dashed blue;\n  box-sizing: border-box;\n}\n@media only screen and (min-width: 600px) {\n  .blog-article-container {\n    width: 80%;\n  }\n}\n.blog-article-container .blog-article-title {\n  font-size: 2rem;\n  font-weight: bold;\n  padding: 16px 16px 0 16px;\n  margin: 0;\n}\n.blog-article-container .blog-article-subtitle {\n  font-size: 1.5rem;\n  font-style: italic;\n  padding: 4px 16px 0px 16px;\n  margin: 0;\n}\n.blog-article-container .blog-article-link {\n  font-size: 1.2rem;\n  font-style: italic;\n  padding: 4px 16px 8px 16px;\n  margin: 0;\n}\n.blog-article-container .blog-article-date {\n  font-size: 1rem;\n  font-style: italic;\n  font-weight: bold;\n  padding: 0 16px 0 16px;\n  margin: 0;\n  color: #888;\n}\n.blog-article-container .blog-article-date.dark {\n  color: #fff;\n}\n.blog-article-container .blog-article-body {\n  font-size: 1rem;\n  padding: 16px;\n  margin-bottom: 16px;\n  line-height: 2rem;\n}\n.blog-article-container code {\n  font-size: 1rem;\n  background-color: #eee;\n  padding: 2px;\n  color: #95c;\n  border-radius: 4px;\n  border-width: 1px;\n  border-color: #bbb;\n  border-style: solid;\n}\n.dev {\n  background-color: #eee;\n  border-width: 1px;\n  border-color: red;\n  border-style: dashed;\n}\n.row {\n  display: flex;\n  flex-direction: row;\n  padding: 8px;\n}\n.rowItem {\n  margin-left: 8px;\n  padding: 8px;\n}\n.grow {\n  flex: 1;\n}\n.blog-article-container .blog-article-image {\n  width: 100px;\n}\n.bold {\n  font-weight: bold;\n}\n.italic {\n  font-style: italic;\n}\n.none {\n  display: none;\n}\n.click {\n  display: inline-block;\n  padding: 16;\n}\n.click:hover {\n  cursor: pointer;\n  background-color: #eee;\n  border-radius: 16px;\n}\n\n.colored {\n  background-color: #fde;\n}\n\n.padding {\n  height: 200px;\n}\n\ncode.dark,\nh1.dark,\nh2.dark,\np.dark,\n.dark {\n  background-color: #222;\n  color: #fff;\n}\n","",{version:3,sources:["webpack://./src/dynamic/blog.article.css"],names:[],mappings:"AAAA;EACE,aAAa;EACb,sBAAsB;EACtB,eAAe;AACjB;AACA;EACE,oBAAoB;EACpB,mBAAmB;AACrB;AACA;EACE,oBAAoB;EACpB,eAAe;EACf,oBAAoB;EACpB,kBAAkB;EAClB,iCAAiC;EACjC,sBAAsB;EACtB,YAAY;EACZ,iBAAiB;AACnB;AACA;EACE,qCAAqC;AACvC;AACA;EACE,aAAa;EACb,OAAO;EACP,sBAAsB;EACtB,kBAAkB;EAClB,kBAAkB;EAClB,aAAa;EACb,WAAW;EACX,8BAA8B;EAC9B,sBAAsB;AACxB;AACA;EACE;IACE,UAAU;EACZ;AACF;AACA;EACE,eAAe;EACf,iBAAiB;EACjB,yBAAyB;EACzB,SAAS;AACX;AACA;EACE,iBAAiB;EACjB,kBAAkB;EAClB,0BAA0B;EAC1B,SAAS;AACX;AACA;EACE,iBAAiB;EACjB,kBAAkB;EAClB,0BAA0B;EAC1B,SAAS;AACX;AACA;EACE,eAAe;EACf,kBAAkB;EAClB,iBAAiB;EACjB,sBAAsB;EACtB,SAAS;EACT,WAAW;AACb;AACA;EACE,WAAW;AACb;AACA;EACE,eAAe;EACf,aAAa;EACb,mBAAmB;EACnB,iBAAiB;AACnB;AACA;EACE,eAAe;EACf,sBAAsB;EACtB,YAAY;EACZ,WAAW;EACX,kBAAkB;EAClB,iBAAiB;EACjB,kBAAkB;EAClB,mBAAmB;AACrB;AACA;EACE,sBAAsB;EACtB,iBAAiB;EACjB,iBAAiB;EACjB,oBAAoB;AACtB;AACA;EACE,aAAa;EACb,mBAAmB;EACnB,YAAY;AACd;AACA;EACE,gBAAgB;EAChB,YAAY;AACd;AACA;EACE,OAAO;AACT;AACA;EACE,YAAY;AACd;AACA;EACE,iBAAiB;AACnB;AACA;EACE,kBAAkB;AACpB;AACA;EACE,aAAa;AACf;AACA;EACE,qBAAqB;EACrB,WAAW;AACb;AACA;EACE,eAAe;EACf,sBAAsB;EACtB,mBAAmB;AACrB;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,aAAa;AACf;;AAEA;;;;;EAKE,sBAAsB;EACtB,WAAW;AACb",sourcesContent:[".blog-article-page {\n  display: flex;\n  flex-direction: column;\n  font-size: 1rem;\n}\n.header {\n  align-self: flex-end;\n  margin-bottom: 16px;\n}\n.control {\n  display: inline-flex;\n  cursor: pointer;\n  align-self: flex-end;\n  border-radius: 4px;\n  box-shadow: 2px 2px 8px lightgray;\n  box-sizing: border-box;\n  padding: 8px;\n  margin-right: 8px;\n}\n.control:hover {\n  box-shadow: 2px 2px 8px 2px lightgray;\n}\n.blog-article-container {\n  display: flex;\n  flex: 1;\n  flex-direction: column;\n  align-self: center;\n  position: relative;\n  padding: 16px;\n  width: 100%;\n  border-bottom: 1px dashed blue;\n  box-sizing: border-box;\n}\n@media only screen and (min-width: 600px) {\n  .blog-article-container {\n    width: 80%;\n  }\n}\n.blog-article-container .blog-article-title {\n  font-size: 2rem;\n  font-weight: bold;\n  padding: 16px 16px 0 16px;\n  margin: 0;\n}\n.blog-article-container .blog-article-subtitle {\n  font-size: 1.5rem;\n  font-style: italic;\n  padding: 4px 16px 0px 16px;\n  margin: 0;\n}\n.blog-article-container .blog-article-link {\n  font-size: 1.2rem;\n  font-style: italic;\n  padding: 4px 16px 8px 16px;\n  margin: 0;\n}\n.blog-article-container .blog-article-date {\n  font-size: 1rem;\n  font-style: italic;\n  font-weight: bold;\n  padding: 0 16px 0 16px;\n  margin: 0;\n  color: #888;\n}\n.blog-article-container .blog-article-date.dark {\n  color: #fff;\n}\n.blog-article-container .blog-article-body {\n  font-size: 1rem;\n  padding: 16px;\n  margin-bottom: 16px;\n  line-height: 2rem;\n}\n.blog-article-container code {\n  font-size: 1rem;\n  background-color: #eee;\n  padding: 2px;\n  color: #95c;\n  border-radius: 4px;\n  border-width: 1px;\n  border-color: #bbb;\n  border-style: solid;\n}\n.dev {\n  background-color: #eee;\n  border-width: 1px;\n  border-color: red;\n  border-style: dashed;\n}\n.row {\n  display: flex;\n  flex-direction: row;\n  padding: 8px;\n}\n.rowItem {\n  margin-left: 8px;\n  padding: 8px;\n}\n.grow {\n  flex: 1;\n}\n.blog-article-container .blog-article-image {\n  width: 100px;\n}\n.bold {\n  font-weight: bold;\n}\n.italic {\n  font-style: italic;\n}\n.none {\n  display: none;\n}\n.click {\n  display: inline-block;\n  padding: 16;\n}\n.click:hover {\n  cursor: pointer;\n  background-color: #eee;\n  border-radius: 16px;\n}\n\n.colored {\n  background-color: #fde;\n}\n\n.padding {\n  height: 200px;\n}\n\ncode.dark,\nh1.dark,\nh2.dark,\np.dark,\n.dark {\n  background-color: #222;\n  color: #fff;\n}\n"],sourceRoot:""}]);const a=d},488:(n,e,o)=>{"use strict";o.d(e,{Z:()=>a});var t=o(445),i=o.n(t),r=o(352),d=o.n(r)()(i());d.push([n.id,".editor-container {\n  padding: 4px 16px 16px 16px;\n  border-radius: 4px;\n  box-shadow: 2px 2px 8px lightgray;\n  box-sizing: border-box;\n  margin-bottom: 40px;\n}\n.editor-container d {\n  background-color: #eee;\n  border-width: 1px;\n  border-color: red;\n  border-style: dashed;\n}\n.editor-container:hover {\n  box-shadow: 2px 2px 8px 2px lightgray;\n}\n.editor-container .header {\n  display: flex;\n  flex-direction: row;\n  padding: 8px 8px 8px 8px;\n  font-size: 1.5rem;\n  justify-content: space-between;\n}\n.editor-container .title {\n  padding: 0px 8px 8px 8px;\n  font-size: 1.5rem;\n  align-self: center;\n}\n\n.editor-container .record {\n  display: inline-flex;\n  border-radius: 32px;\n  cursor: pointer;\n  box-shadow: 2px 2px 8px lightgray;\n}\n.editor-container .record:hover {\n  border-radius: 32px;\n  box-shadow: 2px 2px 8px 2px lightgray;\n}\n\n.editor-container .recording {\n  background-color: lightgray;\n}\n\n.demo-container {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  flex: 1 0 auto;\n  word-break: break-all;\n  align-content: space-between;\n}\n\n.demo-container .left-demo {\n  font-size: 1rem;\n  flex-basis: 600px;\n  padding: 8px;\n  min-height: 150px;\n  border-radius: 4px;\n  overflow-x: scroll;\n  overflow-y: hidden;\n  border: 1px solid #ccc;\n  margin: 4px;\n  white-space: pre;\n}\n\n.demo-container .right-demo {\n  display: flex;\n  flex-basis: 600px;\n\n  align-self: stretch;\n  font-size: 1rem;\n  padding: 8px;\n  border-color: lightgrey;\n  border-width: 1px;\n  border-style: solid;\n  border-radius: 4px;\n  word-break: break-all;\n  overflow: hidden;\n  margin: 4px;\n}\n@media only screen and (min-width: 600px) {\n  .demo-container .left-demo {\n    flex: 1;\n  }\n  .demo-container .right-demo {\n    flex: 1;\n  }\n}\n\n.tooltip {\n  position: relative;\n  cursor: pointer;\n  border-radius: 4px;\n  box-shadow: 2px 2px 8px lightgray;\n}\n\n.tooltip .tooltiptext {\n  visibility: hidden;\n  display: flex;\n  background-color: black;\n  color: #fff;\n  text-align: center;\n  border-radius: 4px;\n  padding: 8px;\n  box-shadow: 2px 2px 8px 2px lightgray;\n\n  /* Position the tooltip */\n  position: absolute;\n  z-index: 1;\n  top: 100%;\n  left: 50%;\n  margin-left: -60px;\n}\n\n.tooltip:hover .tooltiptext {\n  visibility: visible;\n}\n\n.tooltip:hover {\n  box-shadow: 2px 2px 8px 2px lightgray;\n}\n","",{version:3,sources:["webpack://./src/dynamic/editor.css"],names:[],mappings:"AAAA;EACE,2BAA2B;EAC3B,kBAAkB;EAClB,iCAAiC;EACjC,sBAAsB;EACtB,mBAAmB;AACrB;AACA;EACE,sBAAsB;EACtB,iBAAiB;EACjB,iBAAiB;EACjB,oBAAoB;AACtB;AACA;EACE,qCAAqC;AACvC;AACA;EACE,aAAa;EACb,mBAAmB;EACnB,wBAAwB;EACxB,iBAAiB;EACjB,8BAA8B;AAChC;AACA;EACE,wBAAwB;EACxB,iBAAiB;EACjB,kBAAkB;AACpB;;AAEA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,eAAe;EACf,iCAAiC;AACnC;AACA;EACE,mBAAmB;EACnB,qCAAqC;AACvC;;AAEA;EACE,2BAA2B;AAC7B;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,eAAe;EACf,cAAc;EACd,qBAAqB;EACrB,4BAA4B;AAC9B;;AAEA;EACE,eAAe;EACf,iBAAiB;EACjB,YAAY;EACZ,iBAAiB;EACjB,kBAAkB;EAClB,kBAAkB;EAClB,kBAAkB;EAClB,sBAAsB;EACtB,WAAW;EACX,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,iBAAiB;;EAEjB,mBAAmB;EACnB,eAAe;EACf,YAAY;EACZ,uBAAuB;EACvB,iBAAiB;EACjB,mBAAmB;EACnB,kBAAkB;EAClB,qBAAqB;EACrB,gBAAgB;EAChB,WAAW;AACb;AACA;EACE;IACE,OAAO;EACT;EACA;IACE,OAAO;EACT;AACF;;AAEA;EACE,kBAAkB;EAClB,eAAe;EACf,kBAAkB;EAClB,iCAAiC;AACnC;;AAEA;EACE,kBAAkB;EAClB,aAAa;EACb,uBAAuB;EACvB,WAAW;EACX,kBAAkB;EAClB,kBAAkB;EAClB,YAAY;EACZ,qCAAqC;;EAErC,yBAAyB;EACzB,kBAAkB;EAClB,UAAU;EACV,SAAS;EACT,SAAS;EACT,kBAAkB;AACpB;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,qCAAqC;AACvC",sourcesContent:[".editor-container {\n  padding: 4px 16px 16px 16px;\n  border-radius: 4px;\n  box-shadow: 2px 2px 8px lightgray;\n  box-sizing: border-box;\n  margin-bottom: 40px;\n}\n.editor-container d {\n  background-color: #eee;\n  border-width: 1px;\n  border-color: red;\n  border-style: dashed;\n}\n.editor-container:hover {\n  box-shadow: 2px 2px 8px 2px lightgray;\n}\n.editor-container .header {\n  display: flex;\n  flex-direction: row;\n  padding: 8px 8px 8px 8px;\n  font-size: 1.5rem;\n  justify-content: space-between;\n}\n.editor-container .title {\n  padding: 0px 8px 8px 8px;\n  font-size: 1.5rem;\n  align-self: center;\n}\n\n.editor-container .record {\n  display: inline-flex;\n  border-radius: 32px;\n  cursor: pointer;\n  box-shadow: 2px 2px 8px lightgray;\n}\n.editor-container .record:hover {\n  border-radius: 32px;\n  box-shadow: 2px 2px 8px 2px lightgray;\n}\n\n.editor-container .recording {\n  background-color: lightgray;\n}\n\n.demo-container {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  flex: 1 0 auto;\n  word-break: break-all;\n  align-content: space-between;\n}\n\n.demo-container .left-demo {\n  font-size: 1rem;\n  flex-basis: 600px;\n  padding: 8px;\n  min-height: 150px;\n  border-radius: 4px;\n  overflow-x: scroll;\n  overflow-y: hidden;\n  border: 1px solid #ccc;\n  margin: 4px;\n  white-space: pre;\n}\n\n.demo-container .right-demo {\n  display: flex;\n  flex-basis: 600px;\n\n  align-self: stretch;\n  font-size: 1rem;\n  padding: 8px;\n  border-color: lightgrey;\n  border-width: 1px;\n  border-style: solid;\n  border-radius: 4px;\n  word-break: break-all;\n  overflow: hidden;\n  margin: 4px;\n}\n@media only screen and (min-width: 600px) {\n  .demo-container .left-demo {\n    flex: 1;\n  }\n  .demo-container .right-demo {\n    flex: 1;\n  }\n}\n\n.tooltip {\n  position: relative;\n  cursor: pointer;\n  border-radius: 4px;\n  box-shadow: 2px 2px 8px lightgray;\n}\n\n.tooltip .tooltiptext {\n  visibility: hidden;\n  display: flex;\n  background-color: black;\n  color: #fff;\n  text-align: center;\n  border-radius: 4px;\n  padding: 8px;\n  box-shadow: 2px 2px 8px 2px lightgray;\n\n  /* Position the tooltip */\n  position: absolute;\n  z-index: 1;\n  top: 100%;\n  left: 50%;\n  margin-left: -60px;\n}\n\n.tooltip:hover .tooltiptext {\n  visibility: visible;\n}\n\n.tooltip:hover {\n  box-shadow: 2px 2px 8px 2px lightgray;\n}\n"],sourceRoot:""}]);const a=d},700:(n,e,o)=>{"use strict";var t=o(701),i=o.n(t),r=o(488);i()(r.Z,{insert:"head",singleton:!1}),r.Z.locals},746:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var prodom__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(725),_editor_css__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(700),_icons__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(266),Editor=function(_a,_b,demoProp,titleProp,link,devMode,dark){var demo=_a.demo,title=_a.title,onDemoChange=_b.onDemoChange,setTitle=_b.setTitle,resolvedDemo=void 0!==demo?demo:demoProp,resolvedTitle=void 0!==title?title:titleProp,dom=function(n){return document.createElement(n)},buildStore=prodom__WEBPACK_IMPORTED_MODULE_1__.cM,titleDOM={dom:"div",className:["title",devMode&&"dev",dark&&"dark"],innerText:resolvedTitle,contentEditable:devMode},linkDOM={dom:"div",className:["title","tooltip",devMode&&"dev",dark&&"dark"],children:[{dom:"span",innerText:"edit on codepen",className:["tooltiptext"]},{dom:"a",href:link,className:["link"],children:[(0,_icons__WEBPACK_IMPORTED_MODULE_2__.d)(dark,"#666","#bbb",16,16)]}],contentEditable:devMode},headerDOM={dom:"div",className:["header",devMode&&"dev",dark&&"dark"],children:[titleDOM,link&&linkDOM],contentEditable:devMode},leftDemoDOM={dom:"div",className:["left-demo",devMode&&"dev",dark&&"dark"],innerText:demoProp,oninput:function(n){onDemoChange(n.target.innerText)},contentEditable:"true"},rightDemoDOM=(0,prodom__WEBPACK_IMPORTED_MODULE_1__.O3)({dom:"div",className:["right-demo",devMode&&"dev",dark&&"dark"],children:[eval("("+resolvedDemo+")")],contentEditable:devMode}),demoContainerDOM={dom:"div",className:["demo-container",devMode&&"dev",dark&&"dark"],children:[leftDemoDOM,rightDemoDOM],contentEditable:devMode};return{dom:"div",className:["editor-container",devMode&&"dev",dark&&"dark"],children:[headerDOM,demoContainerDOM],contentEditable:devMode}},actions=function(n){return{onDemoChange:function(e){n.demo=e},setTitle:function(e){n.title=e}}};const __WEBPACK_DEFAULT_EXPORT__=(0,prodom__WEBPACK_IMPORTED_MODULE_1__.cM)(Editor,actions)},266:(n,e,o)=>{"use strict";o.d(e,{F:()=>i,d:()=>r});var t="http://www.w3.org/2000/svg",i=function(n,e,o){return{init:function(){return document.createElementNS(t,"svg")},setAttribute:{width:"48",height:"48",viewBox:"0 0 100 100",fill:"none"},children:[{init:function(){return document.createElementNS(t,"circle")},setAttribute:{cx:"50",cy:"50",r:"45",fill:n?"#000":"#FFF",stroke:n?"#000":"#FFF"}},{init:function(){return document.createElementNS(t,"circle")},setAttribute:{cx:"50",cy:"50",r:"40",fill:n?o:"#FFF"}},{init:function(){return document.createElementNS(t,"path")},setAttribute:{d:"M 50 10 A 40 40 0 0 0 50 90",fill:n?"#000":e,stroke:n?"#000":e}},{init:function(){return document.createElementNS(t,"circle")},setAttribute:{cx:"50",cy:"50",r:"20",fill:n?o:"#FFF"}},{init:function(){return document.createElementNS(t,"path")},setAttribute:{d:"M 50 30 A 20 20 0 0 1 50 70",fill:n?"#000":e,stroke:n?"#000":e}}]}},r=function(n,e,o,i,r){return{init:function(){return document.createElementNS(t,"svg")},setAttribute:{width:void 0!==i?""+i:"48",height:void 0!==r?""+r:"48",viewBox:"0 0 100 100",fill:"none"},children:[{init:function(){return document.createElementNS(t,"path")},setAttribute:{d:"M 25 25 L 0 50, 25 75, 35 65, 20 50, 35 35 Z",fill:n?o:e,stroke:n?o:e}},{init:function(){return document.createElementNS(t,"path")},setAttribute:{d:"M 35 95 L 55 2, 65 5, 45 98 Z",fill:n?o:e,stroke:n?o:e}},{init:function(){return document.createElementNS(t,"path")},setAttribute:{d:"M 75 25 L 100 50, 75 75, 65 65, 80 50, 65 35 Z",fill:n?o:e,stroke:n?o:e}}]}}},622:(n,e,o)=>{"use strict";var t=o(725),i=o(701),r=o.n(i),d=o(91);r()(d.Z,{insert:"head",singleton:!1}),d.Z.locals;var a=o(746),A=o(266),l=o(514),c=function(){return(c=Object.assign||function(n){for(var e,o=1,t=arguments.length;o<t;o++)for(var i in e=arguments[o])Object.prototype.hasOwnProperty.call(e,i)&&(n[i]=e[i]);return n}).apply(this,arguments)},s={title:"An easy to use web app framework",subtitle:"Prodom, the next open web app framework",date:'July 7th - 2021 - <a href=" https://github.com/m3ftah/prodom/commits/master/website">Changelog</a>',link:"https://github.com/m3ftah/prodom",body:"\n  Prodom is a <code>2kB</code> library that helps you build web apps.\n  By design, it is a declarative framework, component based and easy to use.\n  Moreover, it can be integrated into already existing projects with no lock-in, as it only works on a dom object,\n  and exports a dom object.\n  </br>\n  Prodom allows you to to compose and manage complex dom elements using pure idiomatic javascript.\n  You do not need to learn anything new, aside from the prototype concept and the store structure.\n  </br>\n  Prodom follows a <i>Flux Architecture</i> concept by providing you with a built-in store/actions design.\n  </br>\n  The main motivation behind providing such a framework is the complexity and the overhead given by popular web frameworks.\n  Not to mention the lock-in, the library size and the complex buggy APIs.\n  </br>\n  If you are already familiar with some standard web concepts like: <i>Flux Architecture</i>, pure components and HTML5.\n  Then you are ready to use Prodom.\n  <h3>Some <i>behind the scene</i> considerations</h3>\n \n  <b>Reconciliation and virtual DOM:</b> these are used to automatically apply diffing whenever a new render is called.\n  Thus, minimizing the number of DOM operations.\n  </br>\n  <b>Concurrent Mode:</b> you can specify a timeout for which, the rendering will not block the UI for more than that timeout.\n  This feature was only available very late in React.js (just after I gave up on it).\n  </br>\n  <b>Differed rendering:</b> you can provide a promise on a component that will be rendered after a data is fetched. Meanwhile,\n  you can provide another component as a placeholder.\n  </br>\n  <b>Automatic batching:</b> when multiple store actions are called in the time, the store state will be updated accordingly,\n  but only one rendering function will be called at the end.\n  While this feature is not yet available in React.js; it is provided by Prodom out of the box.\n  </br>\n  <b>Carried Context:</b> this means you can render from every where, the context object needed to render is provided to you\n  in every component.\n  This may come handy if you want to extend Prodom.\n  </br>\n  <b>Finally,</b> while Prodom has been heavily inspired by React.js, this is not a swiss army knife solution as React.js.\n  The main reason behind building such framework is effeciency.\n  With small size, few concepts to get around; you can code web apps faster with out of the box production performance.\n  ",devMode:!1,dark:window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches};const p=(0,t.sY)((0,t.cM)((function(n,e){var o=n.title,i=n.subtitle,r=n.date,d=n.link,s=n.body,p=n.devMode,b=void 0===p||p,m=n.dark,x=e.setDark,B=e.setDevMode,C={dom:"div",className:["control"],style:{backgroundColor:m?"#bbb":"#666"},onclick:function(){return x(!m)},contentEditable:""+b,children:[(0,A.F)(m,"#666","#bbb")]},g={dom:"div",className:["header"],children:[{dom:"div",className:["control"],onclick:function(){return B(!b)},contentEditable:""+b,children:[(0,A.d)(m,"#666","#bbb")]},C]},E={dom:"h1",className:["blog-article-title",b&&"dev",m&&"dark"],style:c(c({},function(n){return{backgroundColor:n&&"gray"}}(b)),b&&{fontSize:"3rem"}),innerText:o,contentEditable:b},h={dom:"p",className:["blog-article-subtitle",b&&"dev",m&&"dark"],innerText:i,contentEditable:b},f={dom:"a",className:["blog-article-link",b&&"dev",m&&"dark"],innerText:d,href:d,contentEditable:b},u={dom:"p",className:["blog-article-date",b&&"dev",m&&"dark"],innerHTML:r,contentEditable:b},k={dom:"p",className:["blog-article-body",b&&"dev",m&&"dark"],innerHTML:s,contentEditable:""+b},y=(t.cM,{dom:"div",className:["blog-article-container",b&&"dev",m&&"dark"],children:[E,h,f,u,{dom:"img",src:l,style:{display:"inline-block",alignSelf:"center",width:"96px",height:"96px"}},k,{dom:"h2",innerText:"Some examples",style:{marginBottom:"50px"}},(0,a.Z)("{\n    dom: 'code',\n    innerText: 'Hello world',\n}","A simple prototype","https://codepen.io/m3ftah/pen/PopdwaG",b,m),(0,a.Z)("{\n  dom: 'div',\n  children:\n  [\n    {\n      dom: 'label',\n      innerText: 'First child: ',\n    },\n    {\n      dom: 'input',\n      value: 'Second child',\n    },\n    {\n      dom: 'button',\n      innerText: 'Third child',\n    },\n  ]\n}","Composing prototypes","https://codepen.io/m3ftah/pen/ZEeexea",b,m),(0,a.Z)("{\n  dom: 'code',\n  innerText: 'Hello world',\n  className: ['bold', dark && 'dark']\n}","Dynamic CSS Classes","https://codepen.io/m3ftah/pen/YzZOPez",b,m),(0,a.Z)("{\n  dom: 'button',\n  innerText: 'Click me!',\n  onclick: ()=> setTitle('Title has been modified')\n}","Events","https://codepen.io/m3ftah/pen/RwpBXzG",b,m),(0,a.Z)("{\n  dom: 'div',\n  innerText: 'I am styled',\n  style: {display: 'flex' , alignSelf: ' center', padding: '16px', borderRadius: '8px', backgroundColor: '#29f'}\n}","Styling","https://codepen.io/m3ftah/pen/jOBvEmw",b,m),(0,a.Z)("() => {\n        const prototype = ({ name }, { setName }) => ({\n          dom: 'div',\n          children: [\n            {\n              dom: 'input',\n              value: name,\n              oninput: (e) => setName(e.target.value)\n            },\n            {\n              dom: 'div',\n              innerText: 'Name: ' + name,\n              onclick: () => setName('User 1')\n            }\n          ]\n        })\n        const actions = (state) => ({\n          setName: (name) => state.name = name\n        })\n        return buildStore(prototype, actions, { name: 'NAME' })(resolvedDemo)\n      }","Store","https://codepen.io/m3ftah/pen/NWpLKdz",b,m)],contentEditable:""+b});return{init:function(){return window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",(function(n){var e=n.matches;x(e)})),document.createElement("body")},className:["blog-article-page",b&&"dev",m&&"dark"],children:[g,y,{dom:"div",className:["padding",m&&"dark"],contentEditable:""+b}],contentEditable:""+b}}),(function(n){return{setDark:function(e){n.dark=e},setDevMode:function(e){n.devMode=e}}}),s)(),{});document.body.replaceWith(p)},514:(n,e,o)=>{"use strict";n.exports=o.p+"10d888264b6e9dd3d5c0.png"}},n=>{"use strict";n.O(0,[216],(()=>(622,n(n.s=622)))),n.O()}]);
//# sourceMappingURL=main.136e616cb99e3ee16adc.js.map