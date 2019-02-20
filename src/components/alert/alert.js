import Alert from './index'
import Vue from 'vue'

let alertInstance 

const defaultOptions = {
  duration: 2000
}

const getAlertInstance= () => {
  alertInstance = alertInstance || createAlertInstance()
  return alertInstance
}

const createAlertInstance = (options) => {
  options = options || defaultOptions
  const instance = new Vue({
    render: h => {
      return h(Alert, {
        props: options
      })
    }
  })
  const component = instance.$mount()
  document.body.appendChild(component.$el)
  return instance.$children[0]
}

const alertFunc = (options) => {
  const instance = getAlertInstance()
  instance.add(options)
}

export default alertFunc