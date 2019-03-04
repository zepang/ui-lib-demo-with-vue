import Vue from 'vue'
import Router from 'vue-router'

import Switch from './pages/switch.vue'
import Loading from './pages/loading.vue'
import Select from './pages/select.vue'
import Button from './pages/button.vue'
import Form from './pages/form.vue'
import Modal from './pages/modal.vue'
import ImgLoader from './pages/imgLoader.vue'
import Table from './pages/table.vue'
import Tree from './pages/tree.vue'

Vue.use(Router)

const routes = [
  {
    path: '/switch',
    component: Switch
  },
  {
    path: '/loading',
    component: Loading
  },
  {
    path: '/select',
    component: Select
  },
  {
    path: '/button',
    component: Button
  },
  {
    path: '/form',
    component: Form
  },
  {
    path: '/modal',
    component: Modal
  },
  {
    path: '/imgLoader',
    component: ImgLoader
  },
  {
    path: '/table',
    component: Table
  },
  {
    path: '/tree',
    component: Tree
  }
]

export default new Router({
  routes
})
