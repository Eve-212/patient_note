<template>
  <div>
    <header-component 
      @isExpanded="toggleExpand" 
      :user="user" 
      :hide="hide">
    </header-component>
    <main class="row">
      <div class="col-2 col-sm-1 px-0">
        <sidemenu :isExpanded="isExpanded"></sidemenu>
      </div>
      <div class="col-sm-10 mb-5">
        <router-view :isExpanded="isExpanded"></router-view>
      </div>
      <back-to-top @hide="hideSearch"></back-to-top>
    </main>    
  </div>
</template>
<script>
import Vue from 'vue'
Vue.component('header-component', require('@/components/ui/Header.vue').default)
Vue.component('sidemenu', require('@/components/ui/SideMenu.vue').default)
Vue.component('back-to-top', require('@/components/ui/BackToTop.vue').default)
import axios from 'axios'
export default {
  props: ['user'],
  data() {
    return {
      isExpanded: false,
      hide: false
    }
  },
  methods: {
    toggleExpand(status) {
      this.isExpanded = status
    },
    hideSearch(status) {
      this.hide = status
    }
  }
}
</script>

<style>
.content {
  margin-top: 80px;
}
</style>