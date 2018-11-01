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
// import 'vue-orgchart/dist/style.min.css'

var VueScrollTo = require('vue-scrollto');

import Scrollspy from 'vue2-scrollspy';
// use default options
Vue.use(Scrollspy);

Vue.use(VueScrollTo, {
  container: "body",
  duration: 500,
  easing: "ease",
  offset: -60,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
})

//Vue.use(Vuex)

Vue.prototype.$http = axios
let $wf=OneAPI({
  spec_url:"http://10.65.1.228:3000/api/spec.get",
  server_url:"http://10.65.1.228:3000/api"
})
Vue.prototype.$wf =  $wf
window.$wf=$wf
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
//  store,
  router,
  components: { App },
  template: '<App/>'
})
