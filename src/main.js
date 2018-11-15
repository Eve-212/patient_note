// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'
import OneAPI from './lib/oneapi'
import { store } from './store/store.js'
// import 'vue-orgchart/dist/style.min.css'
import { VueScrollTo } from './lib/scroll'
import { VueScrollWatch } from './lib/scroll'



Vue.directive('focus', {
  inserted: function (el) {
    el.focus()
  }
})

Vue.directive('scroll-to', {
  inserted: function (el) {
    VueScrollTo(el, 500, 79)
    //el, duration, offset
  }
})

Vue.directive('scroll-watch', {
  inserted: function (el) {
    VueScrollWatch(el)
    
  }
})

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
  // el: '#app',  
  router,  
  store,  
  // components: { App },
  // template: '<App/>'
  render: h => h(App)
}).$mount('#app')
