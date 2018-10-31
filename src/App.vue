<template>
    <div id="app" class="container-fluid">
        <router-view @authenticated="setAuthenticated" :user="authenticated.user"></router-view>
    </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'App',
  data() {
    return {
      authenticated: {
        status: false,
        user: ''
      }
    }
  },
  mounted() {
    if (!this.authenticated.status) {
      this.$router.replace({ name: 'login' })
    }
  },
  methods: {
    setAuthenticated(v) {
      this.authenticated.status = v.status
      this.authenticated.user = v.user
    }
  }
}
</script>
