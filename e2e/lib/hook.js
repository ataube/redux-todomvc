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
  update(component)
})

hook.sub('unmount', function(component) {
  unmount(component)
})

hook.sub('update', function(component) {
  update(component)
})

// We must attach to get notified about mount/update events
hook.sub('renderer-attached', function() {})

function unmount({element}) {
  if (element && element.getName) {
    const components = nodes.get(element.getName())
    const index = components.findIndex((component) =>
      component.element === element
    )
    if (index !== -1) {
      components.splice(index, 1) // remove
    }
  }
}

function update(component) {
  const {data: {name}} = component

  if (isCompositeComponent(component)) {
    const components = nodes.get(name)

    if (components && components.length > 0) {
      const index = findIndex(components, component)

      if (index !== -1) {
        components.splice(index, 1, component) // update
      } else {
        components.push(component) // mount
      }
    } else {
      nodes.set(name, [component])
    }
  }
}

function findIndex(components, component) {
  const {element: {_rootNodeID}} = component

  return components.findIndex(({element}) =>
    element._rootNodeID === _rootNodeID
  )
}

function isCompositeComponent(component) {
  return component.data.nodeType === 'Composite'
}

// Inject the backend
backend(hook)

window.ReactNodes = nodes
