import Vue from 'vue'

import app from './app'
import store from './store'
import router from './router'

import backendURL from './backend-url.js'
import axios from 'axios'

/* bootstrap */
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

/* base css */
import './css/input.css'

import Storage from 'vue-ls'

Vue.use(Storage, { name: 'ls', namespace: 'vuejs__', storage: 'local' })
Vue.use(BootstrapVue)

/* set backend address */
axios.defaults.baseURL = backendURL

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<app/>',
  components: { app }
})
