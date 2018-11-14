<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'App',
  mounted() {
    if (!this.$store.state.user.name) {
      this.$router.replace({ name: 'signIn' })
    }
  }
}
</script>
