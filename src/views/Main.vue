<template>
    <div>
      <div style="position: absolute; z-index: 1;">
        <header-component @isExpanded="toggleExpand" :user="user" :hide="hide"></header-component>
      </div>  
      <div class="container-fluid">
        <div class="row">
          <sidemenu class="col-md-2" :isExpanded="isExpanded"></sidemenu>
          <router-view :isExpanded="isExpanded"></router-view>
        </div>
      </div>
      <back-to-top @hide="hideSearch"></back-to-top> 
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
