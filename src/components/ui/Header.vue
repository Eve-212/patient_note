<template>
  <div>
    <header class="header fixed-top d-flex justify-content-between align-items-center">
      <div class="d-flex">
        <!-- Hamburger menu -->
        <div class="header_handler-box" @click="toggleSideMenu">
          <i class="fa fa-bars"></i>
        </div>
        <!-- Logo -->
        <router-link 
          @click.native="resetSearch"
          :to="{name: 'dashBoard'}" 
          class="header_logo-box px-4 d-flex justify-content-between align-items-center">
          <img class="header_logo-box-logo mr-1" src="@/assets/img/logo-sm.png">病摘
        </router-link>
      </div>
      <div class="d-flex align-items-center">
        <span class="header_radio-box mr-2" :class="{hideSearch:hide}">
          <input id="pt" type="radio" value="pt" name="searchKey" v-model="searchKey" checked>
          <label for="pt">by Patient</label>
          <input id="dept" type="radio" value="dept" name="searchKey" v-model="searchKey">
          <label for="dept">by Dept.</label>
        </span>
        <form class="header_search-box" :class="{hideSearch:hide}">
          <input v-focus type="text" v-model="no" :placeholder="holder">
          <button type="submit" @keyup.enter.prevent="load" @click.prevent="load">
            <i class="fa fa-search"></i>
          </button>
        </form>
        <div class="header_user">Hi, {{ user.name }}</div>
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
    <modal v-if="modalShow" @close="modalShow = false">
      <div slot="body">{{modalMessage}}</div>
    </modal>
  </div>
</template>

<script>
import Vue from 'vue'
Vue.component('modal', require('@/components/ui/Modal.vue').default)
export default {
  props: ['hide'],
  data() {
    return {
      showReminder: false,
      no: '',
      holder: '病歷號/ 床號/ 身分證',
      searchKey: 'pt',
      user: {},
      modalShow: false,
      modalMessage: ''
    }
  },
  watch: {
    searchKey() {
      if (this.searchKey === 'pt') {
        this.holder = '病歷號/ 床號/ 身分證'
      } else {
        this.holder = '科別代號'
      }
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
      let signOut = confirm('Sure you want to sign out?')
      if (signOut) {
        this.$store.dispatch('Sign_Out')
        this.$router.replace({ name: 'signIn' })
      }
    },
    load() {
      if (this.no) {
        if (this.searchKey == 'pt') {
          this.$wf.note
            .sess({ no: this.no })
            .then($raw => {
              let $sess = $raw.data
              if ($sess.fee_no) {
                this.$router.push({
                  name: 'edit',
                  params: { fee_no: $sess.fee_no }
                })
                this.resetSearch()
              }
            })
            .catch(error => {
              let error_code = error.response.status
              if (error_code == 412) {
                this.modalShow = true
                this.modalMessage = `Patient with Id ${this.no} does not exist`
              }
              this.resetSearch()
            })
        } else {
          this.$router.push({
            name: 'search',
            params: { dept_id: this.no }
          })
          this.resetSearch()
        }
      } else {
        this.modalShow = true
        this.modalMessage = `Please enter your search keyword`
      }
    },
    resetSearch() {
      this.searchKey = 'pt'
      this.no = ''
    }
  },
  mounted() {
    this.user = JSON.parse(window.sessionStorage.getItem('user'))
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/main.scss';

.header {
  padding-left: 0.9rem;
  background-color: $color-grey-light;
  color: $color-black;
  font-size: $default-font-size;
  @media screen and (max-width: $break-small) {
    z-index: 100;
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
    color: $color-black;
    &-logo {
      width: 1.2rem;
    }
  }
  &_radio-box {
    input {
      opacity: 0;
      position: absolute;
      &:checked + label:before {
        background: $color-primary;
        border: 1px solid $color-primary;
        box-shadow: inset 0px 0px 0px 3px #fff;
      }
    }
    label {
      position: relative;
      display: inline-block;
      vertical-align: middle;
      margin: 5px;
      cursor: pointer;
      &:before {
        content: '';
        background: #fff;
        border: 2px solid #ccc;
        display: inline-block;
        vertical-align: middle;
        width: 15px;
        height: 15px;
        margin-right: 5px;
        text-align: center;
        border-radius: 50%;
      }
    }
    @media screen and (max-width: $break-small) {
      background: $color-white;
      position: absolute;
      right: 0;
      top: 3rem;
      left: 0;
      box-shadow: 0 0.2rem 0.5rem rgba($color-black, 0.1);
      font-size: 12px;
      &.hideSearch {
        display: none;
      }
    }
  }
  &_search-box {
    box-shadow: 0 0.2rem 0.5rem rgba($color-black, 0.1);
    @media screen and (max-width: $break-small) {
      position: absolute;
      right: 0;
      top: 3rem;
      box-shadow: none;
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
        padding: 0.2rem 0.5rem;
      }
    }
    button {
      color: $color-grey-dark;
      margin-left: -4px;
      border-left: none;
      background: $color-white;
    }
    input {
      @media screen and (max-width: $break-small) {
        border-left: 1px solid rgba($color-black, 0.1);
      }
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
      width: 2.5rem;
      height: 3rem;
      span {
        padding: 0.2rem;
      }
    }
    &-reminder {
      display: none;
      position: absolute;
      right: 0;
      top: 3rem;
      width: 11rem;
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
        text-decoration: none;
        color: $color-black;
        &:hover {
          border-color: $color-black;
        }
      }
    }
  }
  &_logout-box {
    width: 2.5rem;
    height: 3rem;
  }
}
</style>
