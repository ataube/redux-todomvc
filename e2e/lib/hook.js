const backend = require('./react-devtools/backend/backend')
const globalHook = require('./react-devtools/backend/installGlobalHook')

let hook

if (window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
  hook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__
} else {
  const tempGlobal = {}
  globalHook(tempGlobal)
  hook = tempGlobal.__REACT_DEVTOOLS_GLOBAL_HOOK__
}

const nodes = new Map()

hook.sub('mount', function(component) {
  mount(component)
})

hook.sub('update', function(component) {
  //TODO update
})

hook.sub('renderer-attached', function(args) {
  //TODO
})

function mount(component) {
  const {data: {name}} = component

  if (isCompositeComponent(component)) {
    const components = nodes.get(name)
    if (components) {
      components.push(component)
    } else {
      nodes.set(name, [component])
    }
  }
}

function isCompositeComponent(component) {
  return component.data.nodeType === 'Composite'
}

// Inject the backend
backend(hook)

window.ReactNodes = nodes
