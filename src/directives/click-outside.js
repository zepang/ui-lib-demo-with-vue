let clickHandleOutside
export default {
  bind (el, binding) {
    if (typeof binding.value !== 'function') {
      throw new TypeError('v-clickOutside 的值必须是一个函数')
    }
    clickHandleOutside = function (e) {
      e.stopPropagation()
      if (!el.contains(e.target)) {
        binding.value()
      }
    }
    document.addEventListener('click', clickHandleOutside, false)
  },

  unbind () {
    document.removeEventListener('click', clickHandleOutside, false)
  }
}