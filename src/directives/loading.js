import Vue from 'vue'
import LoadingComponent from '../components/loading.vue'
const Loading = Vue.extend(LoadingComponent)

export default {
  inserted (el, binding, vnode, oldVnode) {
    const child = document.createElement('div')
    const loadingText = el.getAttribute('loading-text')
    document.body.appendChild(child2)
    if (binding.arg === 'fullPage') {
      document.body.appendChild(child)
    } else {
      el.appendChild(child)
    }
    // const loading = new Loading({
    //   el: child
    // })
    const loading = new Vue({
      render: (h) => {
        return h(LoadingComponent)
      }
    }).$mount(child)
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