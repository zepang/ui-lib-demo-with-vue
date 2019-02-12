export function camlToParam (str) {
  let newStr = str.replace(/([A-Z])/g, function (cur) {
    return `-${cur.toLowerCase()}`
  })
  return newStr
}

export function findParent (comp, compName) {
  let parent = comp.$parent 
  if (!parent) return undefined
  if (parent.$options.name === compName) {
    return parent
  } else {
    return findParent(parent, compName)
  }
}

export function findParents (comp, compName) {
  let parents = []
  let parent = comp.$parent
  if (parent) {
    if (parent.$options.name === compName) parents.push(parent)
    parents.concat(findParents(parent, compName))
  }
  return parents
}

export function findChild (comp, compName) {
  let children = comp.$children
  if (!children || !children.length) return undefined
  for (let child of children) {
    if (child.$options.name === compName) {
      return child
    } else {
      return findChild(child, compName)
    }
  }
}

export function findChildren (comp, compName) {
  let result = []
  let children = comp.$children
  if (children && children.length) {
    for (let child of children) {
      if (child.$options.name === compName) {
        result.push(child)
      } else {
        let res = findChildren(child, compName)
        result = result.concat(res)
      }
    }
  }
  return result
}

export function findBrothers (comp, compName, exceptCur) {
  let result = comp.$parent.$children.filter(item => item.$options.name === compName)
  if (exceptCur) result = result.filter(item => item._uid !== comp._uid)
  return result
}