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
        <div class="header_search-wrap d-flex align-items-center" :class="{hideSearch:hide}">
          <span class="radio-box">
            <input id="pt" type="radio" value="pt" name="searchKey" v-model="searchKey" checked>
            <label for="pt">by Patient</label>
            <input id="dept" type="radio" value="dept" name="searchKey" v-model="searchKey">
            <label for="dept">by Dept.</label>
          </span>
          <form class="search-box">
            <input v-focus type="text" v-model="no" :placeholder="holder">
            <button type="submit" @keyup.enter.prevent="load" @click.prevent="load">
              <i class="fa fa-search"></i>
            </button>
          </form>
        </div>
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
  background-color: $color-white;
  color: $color-black;
  font-size: $default-font-size;
  border-bottom: 1px solid #e0e0e0;
  @media screen and (max-width: $break-small) {
    z-index: 100;
  }
  &_handler-box {
    cursor: pointer;
    height: 2rem;
    width: 1.8rem;
    line-height: 2rem;
    text-align: center;
    font-size: 1.2rem;
  }
  &_logo-box {
    text-decoration: none;
    color: $color-black;
    &-logo {
      width: 1.2rem;
    }
  }
  &_search-wrap {
    background: $color-white;
    padding: 5px;
    @media screen and (max-width: $break-medium) {
      justify-content: space-between;
      width: 100%;
      position: absolute;
      left: 0;
      top: 3.7rem;
      box-shadow: 0 0.2rem 0.5rem rgba($color-black, 0.1);
      font-size: 12px;
      &.hideSearch {
        opacity: 0;
      }
    }
    @media screen and (max-width: $break-small) {
      top: 3.2rem;
    }
    .radio-box {
      margin-right: 8px;
      @media screen and (max-width: $break-medium) {
        margin-right: 0;
      }
      input {
        opacity: 0;
        position: absolute;
        &:checked + label:before {
          background: $color-primary;
          border: 1px solid $color-primary;
          box-shadow: inset 0px 0px 0px 3px $color-white;
        }
      }
      label {
        position: relative;
        display: inline-block;
        vertical-align: middle;
        margin: 0 5px;
        cursor: pointer;
        @media screen and (max-width: $break-medium) {
          margin-left: 0;
        }
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
    }
    .search-box {
      box-shadow: 0 0.2rem 0.5rem rgba($color-black, 0.1);
      @media screen and (max-width: $break-medium) {
        box-shadow: none;
        border-bottom: 1px solid $color-grey-dark;
      }
      input,
      button {
        border: none;
        padding: 0.2rem 1rem;
      }
      input {
        @media screen and (max-width: $break-medium) {
          padding: 0.2rem;
        }
      }
      button {
        color: $color-grey-dark;
        background: $color-white;
        @media screen and (max-width: $break-medium) {
          padding: 0.2rem 0.5rem;
        }
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
      @media screen and (max-width: $break-small) {
        height: 3rem;
      }
      cursor: pointer;
      width: 2.5rem;
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
      width: 11rem;
      background-color: $color-white;
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
    height: 3.5rem;
    @media screen and (max-width: $break-small) {
      height: 3rem;
    }
  }
}
</style>
