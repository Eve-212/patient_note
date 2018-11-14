<template>
  <div class="signin">
    <h2 class="h2">Login Page</h2>
    <form>
      <fieldset label="User Name" label-for="username">
        <input id="username" type="text" name="username" v-model="input.username" placeholder="User name">
        </input>
      </fieldset>
      <fieldset label="Password" label-for="password">
        <input id="password" type="password" name="password" v-model="input.password" placeholder="Password">
        </input>
      </fieldset>
      <div class="text-danger">{{message}}</div>
      <button class="btn btn-block btn-info" type="button" v-on:click="signIn()">Sign In</button>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: '',
      input: {
        username: '萬小芳',
        password: '11111'
      },
      mockAccount: {
        username: '萬小芳',
        password: '11111'
      }
    }
  },
  methods: {
    signIn() {
      if (this.input.username != '' && this.input.password != '') {
        if (
          this.input.username == this.mockAccount.username &&
          this.input.password == this.mockAccount.password
        ) {
          let user = {
            name: this.input.username
          }
          this.$store.dispatch('Sign_In', user)
          this.$router.replace({
            name: 'dashBoard'
          })
        } else {
          this.message = 'The username and / or password is incorrect'
        }
      } else {
        this.message = 'A username and password must be present'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/sass/main.scss';

.signin {
  margin: 120px auto 0 auto;
  border: 1px solid lighten($color-grey-dark, 20%);
  border-radius: 0.2rem;
  padding: 1.5rem;
  width: 27rem;
  @media screen and (max-width: $break-medium) {
    width: px-to-vw(550, 800);
  }
  @media screen and (max-width: $break-small) {
    width: px-to-vw(400, 450);
  }
  h2 {
    border-left: 5px solid $color-primary;
    padding: 1rem 0 1rem 2rem;
    margin-left: -1.5rem;
    margin-bottom: 2rem;
    @media screen and (max-width: $break-small) {
      margin-bottom: 1rem;
    }
  }
  input {
    width: 100%;
    border-top: none;
    border-right: none;
    border-left: none;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    margin: 1rem 0;
    padding: 0.5rem 0;
  }
  button {
    color: $color-white;
    height: 2.5rem;
    margin: 1rem 0;
  }
}
</style>