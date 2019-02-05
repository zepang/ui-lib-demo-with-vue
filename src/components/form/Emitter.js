function findParent (comp, compName) {
  let parent = comp.$parent 
  if (!parent) return undefined
  if (parent.$options.name === compName) {
    return parent
  } else {
    return findParent(parent, compName)
  }
}
function findChild (comp, compName) {
  let children = comp.$children
  if (!comp.$children || !comp.$children.length) return undefined
  for (let child of children) {
    if (child.$options.name === compName) {
      return child
    } else {
      return findChild(child, compName)
    }
  }
}
export default {
  methods: {
    broadcase (compName, eName, params) {
      let child = findChild(this, compName)
      if (child) child.$emit(eName, params)
    },
    dispatch (compName, eName, params) {
      let parent = findParent(this, compName)
      if (parent) parent.$emit(eName, params)
    }
  }
}