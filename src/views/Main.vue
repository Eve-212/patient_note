<template>
  <div>
    <header-component :user="user" :hide="hide"></header-component>
    <main>
      <sidemenu></sidemenu>
      <div class="main_content container-fluid">
        <router-view></router-view>
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
export default {
  props: ['user'],
  data() {
    return {
      hide: false
    }
  },
  methods: {
    hideSearch(status) {
      // this.hide = status
    }
  }
}
</script>

<style lang="scss" scoped>
main {
  padding-top: 4rem;
  .main_content {
    padding-left: 5.9rem;
    @media screen and (max-width: 1024px) {
      padding-left: 16px;
    }
  }
}
</style>