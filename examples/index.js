import Vue from 'vue'
import LaiUi from '../src/index.js'
import router from './routes.js'
import App from './app.vue'

Vue.use(LaiUi)

// function createVue () {
//   let app = document.getElementById('app')
//   if (!app) {
//     app = document.createElement('div')
//     app.setAttribute('id', '#app')
//     document.body.appendChild(app)
//   }
//   new Vue({
//     router,
//     render: h => h(App)
//   }).$mount(app)
// }
//
// createVue()

const vue =new Vue({
  router,
  render: h => h(App)
}).$mount(app)
