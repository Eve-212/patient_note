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
      <!-- Search form -->
      <form class="header_search-box" :class="{hideSearch:hide}">
        <input type="text" v-model="no" placeholder="病歷號/床號/ 身分證" ref="search">
        <button class="py-2 px-3" type="button" @click="load" ref="searchs">
          <i class="fa fa-search"></i>
        </button>
      </form>
      <div class="header_user">Hi, {{ user }}</div>
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
      <!-- Logout -->
      <div 
        class="header_logout-box d-flex justify-content-center align-items-center" 
        v-on:click="logout()">
        <i class="fa fa-sign-out-alt"></i>
      </div>
    </div>
  </header>
</template>
<script>
export default {
  props: ['user', 'hide'],
  data() {
    return {
      showReminder: false,
      no: '',
      status: ''
    }
  },
  mounted() {
    this.$refs.search.focus()
  },
  methods: {
    toggleSideMenu() {
      this.$store.dispatch('Toogle_Main_Sec')
    },
    toggleReminder() {
      this.showReminder = !this.showReminder
    },
    logout() {
      //Logout
      let logout = confirm('Sure you want to log out?')
      if (logout == true) {
        this.$emit('authenticated', false)
        this.$router.replace({ name: 'login' })
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
  font-size: $default-font-size;
  color: $color-black;
  @media screen and (max-width: $break-small) {
    padding-left: 0.65rem;
  }
  a {
    color: $color-black;
  }
  &_handler-box {
    border-radius: 50%;
    cursor: pointer;
    height: 2.5rem;
    width: 2.5rem;
    line-height: 2.5rem;
    background: rgba($color-grey-dark, 0.4);
    text-align: center;
    i {
      color: $color-white;
    }
  }
  &_logo-box {
    text-decoration: none;
    &-logo {
      width: 1.6rem;
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
    }
    input {
      padding: 0.6rem 1.8rem;
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
      top: 4.5rem;
    }
  }
  &_user {
    margin: 0 1rem 0 2rem;
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
      width: 4rem;
      height: 5rem;
      @media screen and (max-width: $break-small) {
        width: 3.5rem;
        height: 4.5rem;
      }
      span {
        padding: 0.3rem;
      }
    }
    &-reminder {
      display: none;
      position: absolute;
      right: 0;
      top: 5rem;
      width: 17.5rem;
      background-color: $color-grey-light;
      padding: 1rem 3rem;
      box-shadow: 0 0.2rem 0.5rem rgba($color-black, 0.1);
      &:hover {
        display: block;
      }
      @media screen and (max-width: $break-large) {
        top: 4.5rem;
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
    }
  }
  &_logout-box {
    width: 3.5rem;
    height: 5rem;
    @media screen and (max-width: $break-small) {
      height: 4.5rem;
    }
  }
}
</style>
