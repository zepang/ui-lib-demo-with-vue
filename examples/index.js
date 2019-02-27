import Vue from 'vue'
import LaiUi from '../src/index.js'
import router from './routes.js'
import App from './app.vue'
import Box from './components/box'

Vue.component('box', Box)
Vue.use(LaiUi)
const vue =new Vue({
  router,
  render: h => h(App)
}).$mount(app)
