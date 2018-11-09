<template>
  <header class="header fixed-top d-flex justify-content-between align-items-center">
    <div class="header_left d-flex">
      <div class="header_handler-box" v-on:click="toggleExpand()">
        <i class="fa fa-bars"></i>
      </div>
      <router-link :to="{name: 'ptlists'}" class="header_logo-box px-4 d-flex justify-content-between align-items-center">
        <img class="header_logo mr-1" src="@/assets/img/logo-sm.png">病摘
      </router-link>
    </div>
    <div class="header_right d-flex align-items-center">
      <form class="header_search-box" :class="{hideSearch:hide}">
        <input type="text" class="py-1 px-4" v-model="no" placeholder="病歷號/床號/ 身分證">
        <button class="py-1 px-3" type="button" @click="load">
          <i class="fa fa-search"></i>
        </button>
      </form>
      <div class="ml-4">Hi,{{ user }}</div>
      <router-link class="ml-4" :to="{name: 'ptlists'}">
        <i class="fa fa-bell"></i><span class="badge badge-danger header_badge">9</span>
      </router-link>
      <div class="ml-4" v-on:click="logout()">
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
      isExpanded: false,
      no: '',
      status: ''
    }
  },
  methods: {
    toggleExpand() {
      //Side Menu Toggle
      this.isExpanded = !this.isExpanded
      this.$emit('isExpanded', this.isExpanded)
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
  padding: 10px;
  background-color: $color-grey-light;
  font-size: $default-font-size;
  color: $color-black;
  @media screen and (max-width: $break-small) {
    padding: 6px;
  }
  a {
    color: $color-black;
  }
  &_handler-box {
    border-radius: 50%;
    cursor: pointer;
    height: 3rem;
    width: 3rem;
    line-height: 3rem;
    background: rgba($color-grey-dark, 0.4);
    text-align: center;
    i {
      color: $color-white;
    }
  }
  &_logo-box {
    text-decoration: none;
  }
  &_logo {
    width: 1.6rem;
  }
  &_search-box {
    @media screen and (max-width: $break-small) {
      // hide search function in small device when scroll down
      &.hideSearch {
        display: none;
      }
    }
    input,
    button {
      border: 1px solid rgba($color-grey-dark, 0.6);
    }
    button {
      color: $color-grey-dark;
      margin-left: -4px;
      border-left: none;
    }
    @media screen and (max-width: $break-small) {
      position: absolute;
      right: 0;
      top: 48px;
    }
  }
  &_badge {
    padding: 0.3rem;
  }
}
</style>
