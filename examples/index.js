import Vue from 'vue'
import LaiUi from '../src/index.js'
import router from './routes.js'
import App from './app.vue'

Vue.use(LaiUi)
const vue =new Vue({
  router,
  render: h => h(App)
}).$mount(app)
