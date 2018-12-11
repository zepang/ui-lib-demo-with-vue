// 组件
import components from './components'
// 指令
import directives from './directives'
// 过滤器
const filters = {}
// 实列方法
import prototypes from './prototypes'

import { camlToParam } from './utils'

export default {
  install (Vue, options) {
    // 注册组件
    for (let key in components) {
      Vue.component(`lai-${key.toLowerCase()}`, components[key])
    }
    // 注册指令
    for (let key in directives) {
      Vue.directive(camlToParam(key), directives[key])
    }
    // 注册过滤器
    for (let key in filters) {
      Vue.filter(key, filters[key])
    }
    // 绑定实力方法
    for (let key in prototypes) {
      Vue.prototype[`$${key}`] = prototypes[key]
    }
  }
}
