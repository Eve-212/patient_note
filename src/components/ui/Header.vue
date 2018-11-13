<template>
    <nav class="navbar fixed-top">
      <div class="hamburger" v-on:click="toggleExpand()"><i class="fa fa-bars"></i></div>
      <router-link :to="{name: 'ptlists'}" class="navbar-brand mr-auto" href="#">
        <img class="logo-sm ml-3 mr-1" src="@/assets/logo-sm.png">病摘
      </router-link>
      <form class="form-inline search-wrap" :class="{hide:hide}">
        <input 
          type="text" 
          class="form-control" 
          v-model="no" 
          v-focus
          placeholder="病歷號/床號/ 身分證">
        <div class="input-group-append">
          <button 
            type="submit" 
            class="input-group-text search" 
            @keyup.prevent="load" 
            @click.prevent="load">
            <i class="fa fa-search"></i>
          </button>
        </div>
      </form>
      <div class="actions">
        <div class="mx-2 ml-sm-4 mr-sm-2">Hi, {{ user }}</div>
        <router-link class="badge mx-1" :to="{name: 'ptlists'}">
          <i class="fa fa-bell"></i><span class="mx-1 badge badge-danger text-white">9</span>
          <span class="sr-only">note lists</span>
        </router-link>
        <div class="mx-1 logout" @click="logout">
          <i class="fa fa-sign-out-alt"></i><span class="ml-sm-1 mb-1">Logout</span>
        </div>
      </div>
    </nav>
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
@import '@/assets/global.scss';


nav {
  background: #f4f6f7;
  padding-left: 10px;
  padding-right: 10px;
  width: 100%;
  font-size: 14px;
  height: 55px;
  .hamburger {
    border-radius: 50%;
    margin: 0 11px;
    @media screen and (max-width: $break-medium) {
      margin: 0 10px 0 6px;
    }
    i {
      padding-top: 5px;
      font-size: 20px;
      color: dimgrey;
    }
  }
  .navbar-brand {
    &:hover {
      color: inherit;
    }
    img {
      width: 20px;
      height: auto;
    }
  }
  .search-wrap {
    @media screen and (max-width: $break-small) {
      &.hide {
        display: none;
      }
    }
    @media screen and (max-width: $break-small) {
      position: absolute;
      top: 55px;
      right: 31px;
    }
    .search {
      display: flex;
      justify-content: center;
      padding: 0;
      @media screen and (max-width: $break-small) {
        position: absolute;
        right: -31px;
        top: 0;
      }
      i {
        width: 31px;
        line-height: 31px;
        height: 31px;
        @media screen and (max-width: $break-small) {
          height: 32px;
          line-height: 32px;
        }
      }
    }
  }

  .actions {
    display: flex;
    align-items: center;
    .badge {
      font-weight: normal;
      &:hover {
        text-decoration: none;
        color: inherit;
      }
    }
    .logout {
      display: flex;
      align-items: center;
      span {
        cursor: pointer;
      }
      @media screen and (max-width: $break-medium) {
        span {
          display: none;
        }
      }
    }
  }
}
</style>
