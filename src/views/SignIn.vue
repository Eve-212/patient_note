<template>
  <div class="signin">
    <h2 class="h2">Login Page</h2>
    <form>
      <fieldset label="User id" label-for="id">
        <input id="id" type="text" v-model="input.id" placeholder=" User id" v-focus ref="id">
      </fieldset>
      <fieldset label="pw" label-for="pw">
        <input id="pw" type="password" v-model="input.pw" placeholder=" Password" ref="pw">
      </fieldset>
      <div class="text-danger">{{message}}</div>
      <button
        class="btn btn-block"
        type="submit"
        @keyup.enter.prevent="signIn"
        @click.prevent="signIn"
      >Sign In</button>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: '',
      input: {
        id: '99356',
        pw: '0000000'
      }
    }
  },
  watch: {
    input: {
      handler() {
        this.message = ''
      },
      deep: true
    }
  },
  methods: {
    signIn() {
      if (this.input.id && this.input.pw) {
        $wf.auth
          .login({
            //id:'99356',pw:'0000000'
            id: this.input.id,
            pw: this.input.pw
          })
          .then($raw => {
            let login_status = $raw.data.auth
            if (login_status) {
              this.$router.replace({
                name: 'dashBoard'
              })
              let user_info = $raw.data
              this.$store.dispatch('Sign_In', user_info)
            } else {
              this.message =
                'Either username or password is incorrect, please try again!'
            }
          })
      } else {
        if (!this.input.id) {
          this.message = 'A user Id must be present'
          this.setFocus('id')
        } else {
          this.message = 'A password must be present'
          this.setFocus('pw')
        }
      }

      // if (this.input.username != '' && this.input.password != '') {
      //   if (
      //     this.input.username == this.mockAccount.username &&
      //     this.input.password == this.mockAccount.password
      //   ) {
      //     let user = {
      //       name: this.input.username
      //     }
      //     this.$store.dispatch('Sign_In', user)
      //     this.$router.replace({
      //       name: 'dashBoard'
      //     })
      //   } else {
      //     this.message = 'The username and / or password is incorrect'
      //   }
      // } else {
      //   this.message = 'A username and password must be present'
      // }
    },
    setFocus(el) {
      this.$nextTick(() => {
        this.$refs[el].focus()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/main.scss';

.signin {
  margin: 120px auto 0 auto;
  border-radius: 0.2rem;
  padding: 1.5rem;
  width: 27rem;
  background: $color-white;
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
    background: $color-primary;
    height: 2.5rem;
    margin: 1rem 0;
  }
}
</style>