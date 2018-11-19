import Vue from 'vue'
import Router from 'vue-router'

import Switch from './pages/switch.vue'

Vue.use(Router)

const routes = [
  {
    path: '/switch',
    component: Switch
  }
]

export default new Router({
  routes
})
