<template>
  <div class="container-fluid">
    <header-component 
      class="navbar fixed-top"
      @isExpanded="toggleExpand" 
      :user="user" 
      :hide="hide">
    </header-component>
    <div class="row content">
      <div class="col-2 col-sm-1 px-0">
        <sidemenu :isExpanded="isExpanded"></sidemenu>
      </div>
      <div class="col-10 col-sm-11">
        <router-view :isExpanded="isExpanded"></router-view>
      </div>
      <back-to-top @hide="hideSearch"></back-to-top>
    </div>    
  </div>
</template>
<script>
import Vue from 'vue'
Vue.component('header-component', require('@/components/Header.vue').default)
Vue.component('sidemenu', require('@/components/SideMenu.vue').default)
Vue.component('back-to-top', require('@/components/BackToTop.vue').default)
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