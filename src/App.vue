<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'App',
  mounted() {
    if (!window.localStorage.user) {
      this.$router.replace({ name: 'signIn' })
    }
  }
}
</script>
