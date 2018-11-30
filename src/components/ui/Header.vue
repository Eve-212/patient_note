<template>
  <div>
    <header
      class="header fixed-top d-flex justify-content-between align-items-center"
      :class="{hideSearch:hide}"
    >
      <div class="d-flex">
        <!-- Hamburger menu -->
        <div class="header_handler-box" @click="toggleSideMenu">
          <i class="fa fa-bars"></i>
        </div>
        <!-- Logo -->
        <router-link
          @click.native="resetSearch"
          :to="{name: 'dashBoard'}"
          class="header_logo-box d-flex justify-content-between align-items-center"
        >
          <img class="header_logo-box-logo mr-1" src="@/assets/img/logo-sm.png">病摘
        </router-link>
      </div>
      <!-- Search -->
      <div class="d-flex align-items-center " style="min-width: 40rem;">
        <model-list-select 
          style="flex: 6;"
          :list="patients"
          option-value="fee_no"
          v-model="selectedPatient"
          :custom-text="optionDisplayText"
          placeholder="科別 / 姓名/ 病歷號 / 床號"
          @searchchange="printSearchText"
          ref="mselect">
        </model-list-select>
        <!-- <div class="header_search-wrap d-flex align-items-center" :class="{hideSearch:hide}">
          <span class="radio-box">
            <input id="pt" type="radio" value="pt" name="searchKey" v-model="searchKey" checked>
            <label for="pt" onmousedown="event.preventDefault()">by Patient</label>
            <input id="dept" type="radio" value="dept" name="searchKey" v-model="searchKey">
            <label for="dept" onmousedown="event.preventDefault()">by Dept.</label>
          </span>
          <form class="search-box">
            <input 
              v-focus 
              type="text" 
              v-model="no" 
              :placeholder="holder" 
              ref="searchInput"
              @keyup="showPtList">
            <button type="submit" @keyup.enter.prevent="load" @click.prevent="load">
              <i class="fa fa-search"></i>
            </button>
          </form>
        </div> -->
        <div class="header_user">Hi, {{ user }}</div>
        <!-- Badge and reminder -->
        <div class="header_badge-box d-flex align-items-center">
          <div
            @click="toggleReminder"
            class="header_badge-box-badge d-flex justify-content-center align-items-center"
          >
            <i class="fa fa-bell"></i>
            <span class="badge badge-danger">9</span>
          </div>
          <!-- badge reminder box -->
          <div class="header_badge-box-reminder" :class="{show:showReminder}">
            <router-link to class="d-flex justify-content-between">
              <span>Admission</span>
              <span class="text-danger font-weight-bold">10</span>
            </router-link>
            <router-link to class="d-flex justify-content-between">
              <span>Progress</span>
              <span class="text-danger font-weight-bold">10</span>
            </router-link>
            <router-link to class="d-flex justify-content-between">
              <span>Discharge</span>
              <span class="text-danger font-weight-bold">10</span>
            </router-link>
            <router-link to class="d-flex justify-content-between">
              <span>Withdrawal</span>
              <span class="text-danger font-weight-bold">10</span>
            </router-link>
          </div>
        </div>
        <!-- Sign Out -->
        <div
          class="header_logout-box d-flex justify-content-center align-items-center"
          v-on:click="singOut()"
        >
          <i class="fa fa-sign-out-alt"></i>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import Vue from 'vue'
import { ModelListSelect } from 'vue-search-select'

export default {
  components: {
    ModelListSelect
  },
  props: ['hide'],
  data() {
    return {
      showReminder: false,
      no: '',
      user: '',
      holder: '病歷號/ 床號/ 身分證',
      searchKey: 'pt',
      modalShow: false,
      modalMessage: '',
      departments: [],
      patients: [],
      selectedPatient: {},
      searchText: '',
    }
  },
  created() {
  this.$wf.ready()
    .then(api => {
      api.dept.list()
        .then(res => {
          this.departments = res.data
      api.note.list()
        .then(res => {
          this.patients = res.data
          this.$nextTick(() => {
            const el = this.$refs.mselect.$children.find(el => {
              return el.$refs.input._prevClass === 'search'
            }).$refs.input
            el.focus()
          })
        })
      })
    })
  },
  watch: {
    searchKey() {
      if (this.searchKey === 'pt') {
        this.holder = '病歷號/ 床號/ 身分證'
      } else {
        this.holder = '科別名稱/ 代號'
      }
      this.$nextTick(() => {
        this.$refs.searchInput.focus()
      })
    },
    selectedPatient() {
      this.no = this.selectedPatient.fee_no
      this.load()
    }
  },
  methods: {
    optionDisplayText (patient) {
      let ipd = patient.ipd
      return `${ this.matchDept(ipd.dept_id) }(${ipd.dept_id}) - ${ ipd.name } - ${ ipd.chr_no } - 床號${ ipd.bed_no }`
    },
    printSearchText(searchText) {
      this.searchText = searchText
    },
    matchDept(dept) {
      let deptTitle = this.departments.filter(department => {
        return department.id === dept
      })
      return deptTitle[0].title
    },
    toggleSideMenu() {
      this.$store.dispatch('Toogle_Main_Sec')
    },
    toggleReminder() {
      this.showReminder = !this.showReminder
    },
    singOut() {
      this.$awn.confirm(`Sure you want to sign out?`, this.confirmSignOut)
    },
    confirmSignOut() {
      $wf.auth.logout()
      this.$router.replace({ name: 'signIn' })
    },
    load() {
      if (this.no) {
        if (this.searchKey == 'pt') {
          this.$wf.note
            .sess({ no: this.no })
            .then(res => {
              let $sess = res.data
              // have note
              if ($sess.adm) {
                this.$router.push({
                  name: 'edit',
                  params: { id: $sess.adm.id }
                })
                this.resetSearch()
                // no note
              } else {
                this.no = $sess.fee_no
                this.$wf.note
                  .get({ fee_no: this.no, type: 'adm' })
                  .then(res => {
                    $sess = res.data
                    this.$router.push({
                      name: 'edit',
                      params: { id: $sess.id, fee_no: this.no }
                    })
                  })
                  .catch(error => {
                    console.log(error)
                  })
              }
            })
            .catch(error => {
              let error_code = error.response.status
              if (error_code == 412) {
                this.$awn.warning('Patient does not exist')
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
        this.$awn.tip('Please enter keywords for searching...')
      }
    },
    resetSearch() {
      this.searchKey = 'pt'
      this.no = ''
    }
  },
  mounted() {
    this.$wf.ready().then($api => {
      this.user = $wf.auth.data.name
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/main.scss';

.header {
  background-color: $color-white;
  color: $color-black;
  font-size: $default-font-size;
  border-bottom: 1px solid #e0e0e0;
  &.hideSearch {
    box-shadow: 0 5px 5px -1px rgba(0, 0, 0, 0.1);
  }
  @media screen and (max-width: $break-medium) {
    z-index: 100;
  }
  &_handler-box {
    width: 3.5rem;
    height: 3.5rem;
    line-height: 3.5rem;
    cursor: pointer;
    text-align: center;
    font-size: 1.2rem;
    @media screen and (max-width: $break-small) {
      height: 3rem;
      line-height: 3rem;
      width: 2.5rem;
    }
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
      top: 3.5rem;
      font-size: 12px;
      border-top: 1px solid #e0e0e0;
      border-bottom: 1px solid #e0e0e0;
      &.hideSearch {
        opacity: 0;
      }
    }
    @media screen and (max-width: $break-small) {
      top: 3rem;
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
          vertical-align: sub;
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
        @media screen and (max-width: $break-small) {
          padding: 0.1rem;
        }
      }
      button {
        color: $color-grey-dark;
        background: $color-white;
        @media screen and (max-width: $break-medium) {
          padding: 0.2rem 0.5rem;
        }
        @media screen and (max-width: $break-small) {
          padding: 0.1rem;
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
      padding: 0;
      box-shadow: 0 0.2rem 0.5rem rgba($color-black, 0.1);
      border-top: 1px solid $color-black;
      &:hover {
        display: block;
      }
      @media screen and (max-width: $break-large) {
        &.show {
          // [click and show reminder block] only on small device(<1200px)
          display: block;
        }
      }
      @media screen and (max-width: $break-small) {
        top: 3rem;
      }
      a {
        cursor: pointer;
        padding: 0.5rem 1.5rem;
        text-decoration: none;
        color: $color-black;
        &:hover {
          background-color: darken($color-grey-light, 5%);
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
