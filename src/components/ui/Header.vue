<template>
  <header class="header fixed-top d-flex justify-content-between align-items-center">
    <div class="header_left d-flex">
      <!-- Hamburger menu -->
      <div class="header_handler-box" v-on:click="toggleSideMenu()">
        <i class="fa fa-bars"></i>
      </div>
      <!-- Logo -->
      <router-link :to="{name: 'dashBoard'}" class="header_logo-box px-4 d-flex justify-content-between align-items-center">
        <img class="header_logo-box-logo mr-1" src="@/assets/img/logo-sm.png">病摘
      </router-link>
    </div>
    <div class="header_right d-flex align-items-center">
      <form class="header_search-box" :class="{hideSearch:hide}">
        <input 
          type="text" 
          v-model="no" 
          v-focus
          placeholder="病歷號/床號/ 身分證">
        <button 
          type="submit"  
          @keyup.enter.prevent="load" 
          @click.prevent="load">
          <i class="fa fa-search"></i>
        </button>
      </form>
      <div class="header_user text-muted">Hi, {{ this.$store.state.user.name }}</div>
      <!-- Badge and reminder -->
      <div class="header_badge-box d-flex align-items-center">
        <div
          @click="toggleReminder"
          class="header_badge-box-badge d-flex justify-content-center align-items-center"
        >
          <i class="fa fa-bell"></i><span class="badge badge-danger">9</span>
        </div>
        <!-- badge reminder box -->
        <div class="header_badge-box-reminder" :class="{show:showReminder}">
          <router-link to="" class="d-flex justify-content-between">
            <span>Admission</span><span class="text-danger font-weight-bold">10</span>
          </router-link>
          <router-link to="" class="d-flex justify-content-between">
            <span>Progress</span><span class="text-danger font-weight-bold">10</span>
          </router-link>
          <router-link to="" class="d-flex justify-content-between">
            <span>Discharge</span><span class="text-danger font-weight-bold">10</span>
          </router-link>
          <router-link to="" class="d-flex justify-content-between">
            <span>Withdrawal</span><span class="text-danger font-weight-bold">10</span>
          </router-link>
        </div>
      </div>
      <!-- Sign Out -->
      <div 
        class="header_logout-box d-flex justify-content-center align-items-center" 
        v-on:click="singOut()">
        <i class="fa fa-sign-out-alt"></i>
      </div>
    </div>
  </header>
</template>
<script>
export default {
  props: ['hide'],
  data() {
    return {
      showReminder: false,
      no: '',
      status: ''
    }
  },
  methods: {
    toggleSideMenu() {
      this.$store.dispatch('Toogle_Main_Sec')
    },
    toggleReminder() {
      this.showReminder = !this.showReminder
    },
    singOut() {
      let singOut = confirm('Sure you want to sign out?')
      if (singOut) {
        this.$store.dispatch('Sign_Out')
        this.$router.replace({ name: 'signIn' })
      }
    },
    load() {
      if (this.no) {
        this.status = ''
        this.$wf.note.sess({ no: this.no }).then($raw => {
          let $sess = $raw.data
          if ($sess.fee_no) {
            this.$router.push({
              name: 'edit',
              params: { fee_no: $sess.fee_no }
            })
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/sass/main.scss';

.header {
  padding: 0 0 0 0.9rem;
  background-color: $color-grey-light;
  color: $color-black;
  font-size: $default-font-size;
  a {
    color: $color-black;
  }
  &_handler-box {
    border-radius: 50%;
    cursor: pointer;
    height: 2rem;
    width: 2rem;
    line-height: 2rem;
    background: rgba($color-grey-dark, 0.4);
    text-align: center;
    font-size: 1rem;
    i {
      color: $color-white;
    }
  }
  &_logo-box {
    text-decoration: none;
    &-logo {
      width: 1.2rem;
    }
  }
  &_search-box {
    box-shadow: 0 0.2rem 0.5rem rgba($color-black, 0.1);
    @media screen and (max-width: $break-small) {
      // hide search function in small device when scroll down
      &.hideSearch {
        display: none;
      }
    }
    input,
    button {
      border: none;
      padding: 0.3rem 0.8rem;
      @media screen and (max-width: $break-small) {
        padding: 0.3rem 0.5rem;
      }
    }
    button {
      @media screen and (max-width: $break-small) {
        padding-left: 0;
      }
    }
    input {
      @media screen and (max-width: $break-small) {
        padding-right: 0;
      }
    }
    button {
      color: $color-grey-dark;
      margin-left: -4px;
      border-left: none;
    }
    @media screen and (max-width: $break-small) {
      position: absolute;
      right: 0;
      top: 3.5rem;
    }
  }
  &_user {
    margin: 0 0.8rem 0 1.5rem;
    @media screen and (max-width: $break-small) {
      margin-left: 0;
    }
  }
  &_badge-box {
    &-badge {
      @media screen and (min-width: $break-large) {
        // [hover and show reminder block] only on large device (>1200px)
        &:hover ~ div {
          display: block;
        }
      }
      cursor: pointer;
      width: 3rem;
      height: 3.5rem;
      span {
        padding: 0.2rem;
      }
    }
    &-reminder {
      display: none;
      position: absolute;
      right: 0;
      top: 3.5rem;
      width: 12rem;
      background-color: $color-grey-light;
      padding: 0 2rem;
      box-shadow: 0 0.2rem 0.5rem rgba($color-black, 0.1);
      &:hover {
        display: block;
      }
      @media screen and (max-width: $break-large) {
        &.show {
          // [click and show reminder block] only on small device(<1200px)
          display: block;
        }
      }
      a {
        cursor: pointer;
        border-bottom: 1px solid lighten($color-grey-dark, 15%);
        padding: 0.5rem 0;
        margin: 0.5rem 0;
        opacity: 0.6;
        &:hover {
          text-decoration: none;
          opacity: 1;
        }
      }
      @media screen and (max-width: $break-large) {
        padding: 0 1.5rem;
        width: 11.5rem;
      }
    }
  }
  &_logout-box {
    width: 3rem;
    height: 3.5rem;
  }
}
</style>
