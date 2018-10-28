// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'
//import APIClient from 'moleculer-openapi-client'
import OneAPI from './lib/oneapi'
//import Vuex from 'vuex'

//Vue.use(Vuex)
Vue.prototype.$http = axios
Vue.prototype.$wf =  OneAPI({
  spec_url:"http://127.0.0.1:3000/api/spec.get",
  server_url:"http://127.0.0.1:3000/api"
})
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
//  store,
  router,
  components: { App },
  template: '<App/>'
})
