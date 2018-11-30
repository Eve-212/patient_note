<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'App',
  mounted() {
    // ->使用auth.data判斷是否已經登入, 若登入直接進入首頁
    // ->沒有登入 進入登入頁，呼叫 auth.login()
    // ->此時auth.data也會自動更新
    this.$wf.ready().then($api => {
      let logged_in = $api.auth.data.auth
      if (!logged_in) {
        this.$router.replace({ name: 'signIn' })
      } else {
        this.$router.replace({ name: 'dashBoard' })
      }
    })
  }
}
</script>

<style lang="scss">
@import '~vue-awesome-notifications/dist/styles/style.scss';
body {
  background: #f4f6f7;
}
</style>
