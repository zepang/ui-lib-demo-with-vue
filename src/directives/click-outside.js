let nodeList = []

document.addEventListener('click', e => {
  nodeList.forEach(node => {
    if (!node.el.contains(e.target)) {
      node.callback()
    }
  })
})

export default {
  inserted (el, binding, vnode) {
    if (typeof binding.value !== 'function') {
      throw new TypeError('v-clickOutside 的值必须是一个函数')
    }
    let node = {
      el: el,
      uid: vnode.context._uid,
      callback: binding.value
    }
    nodeList.push(node)
  },
  unbind (el, binding, vnode) {
    for (let i =0; i < nodeList.length; i++) {
      if (nodeList[i].uid = vnode.context._uid) {
        nodeList.splice(i, 1)
      }
    }
  }
}