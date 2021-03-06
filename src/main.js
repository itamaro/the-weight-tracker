import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import App from './App'
import router from './router'
import store from './store'
import { FirebaseApp, FirebaseUIApp } from './helpers/firebaseConfig'

Vue.config.productionTip = false

Vue.use(BootstrapVue)

store.commit('set_firebase_app', FirebaseApp)
store.commit('set_firebase_ui_app', FirebaseUIApp)

window.$vm = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
