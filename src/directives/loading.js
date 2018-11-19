import Vue from 'vue'
import LoadingComponent from '../components/loading.vue'
const Loading = Vue.extend(LoadingComponent)

export default {
  inserted (el, binding, vnode, oldVnode) {
    const child = document.createElement('div')
    const loadingText = el.getAttribute('loading-text')
    if (binding.arg === 'fullPage') {
      document.body.appendChild(child)
    } else {
      el.appendChild(child)
    }
    const loading = new Loading({
      el: child
    })
    if (loadingText) {
      loading.loadingText = loadingText
    }
    el.loading = loading
  },
  update (el, binding, vnode, oldVnode) {
    // 更新loading组件的值
    el.loading.isShow = binding.value
  }
}