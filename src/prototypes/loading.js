import Vue from 'vue'
import LoadingComponent from '../components/loading'
const Loading = Vue.extend(LoadingComponent)

const loading = (options) => {
  if (Vue.prototype.loadingComponent && Vue.prototype.loadingComponent.$el) {
    return Vue.prototype.loadingComponent
  }
  const child = document.createElement('div')
  if (options.el) {
    if (options.el.nodeType === 1) {
      options.el.appendChild(child)
    } else {
      document.querySelector(el).appendChild(child)
    }
  } else {
    document.body.appendChild(child)
  }
  const loading = new Loading({
    el: child,
    data: options
  })
  Vue.prototype.loadingComponent = loading
  return loading
}

export default loading