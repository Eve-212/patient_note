<template>
  <div>
    <header-component :user="user" :hide="hide"></header-component>
    <main class="row">
      <div class="col-2 col-sm-1 px-0"><sidemenu></sidemenu></div>
      <div class="col-sm-10 mb-5"><router-view></router-view></div>
      <back-to-top @hide="hideSearch"></back-to-top>
    </main>    
  </div>
</template>
<script>
import Vue from 'vue'
Vue.component('header-component', require('@/components/ui/Header.vue').default)
Vue.component('sidemenu', require('@/components/ui/SideMenu.vue').default)
Vue.component('back-to-top', require('@/components/ui/BackToTop.vue').default)
export default {
  props: ['user'],
  data() {
    return {
      hide: false
    }
  },
  methods: {
    hideSearch(status) {
      this.hide = status
    }
  }
}
</script>