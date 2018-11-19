import Vue from 'vue'
import Router from 'vue-router'

import Switch from './pages/switch.vue'
import Loading from './pages/loading.vue'

Vue.use(Router)

const routes = [
  {
    path: '/switch',
    component: Switch
  },
  {
    path: '/loading',
    component: Loading
  }
]

export default new Router({
  routes
})
