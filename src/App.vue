<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'App',
  mounted() {
    if (!window.sessionStorage.user) {
      this.$router.replace({ name: 'signIn' })
    }
  }
}
</script>

<style>
body {
  background: #f4f6f7;
}
</style>
