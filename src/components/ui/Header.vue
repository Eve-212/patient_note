<template>
  <div>
    <header class="header fixed-top" :class="{hideSearch:hide}">
      <div class="header-left">
        <!-- Hamburger menu -->
        <div class="header-left__handler-box" @click="toggleSideMenu">
          <i class="fa fa-bars"></i>
        </div>
        <!-- Logo -->
        <router-link class="header-left__logo-box" :to="{name: 'dashBoard'}">
          <img class="header-left__logo-box-img mr-1" src="@/assets/img/logo-sm.png">病摘
        </router-link>
      </div>
      <!-- Search -->
      <div class="header-right">
        <model-list-select
          :class="{hideSearch:hide}"
          class="header-right__search-box"
          :list="patients"
          option-value="fee_no"
          v-model="selectedPatient"
          :custom-text="optionDisplayText"
          placeholder="科別 / 姓名/ 病歷號 / 床號"
          @searchchange="printSearchText"
          @input="handleOnInput"
          ref="mselect"
        ></model-list-select>
        <div class="header-right__user-box">Hi, {{ user }}</div>
        <div class="header-right__badge-box">
          <div class="header-right__badge-box-badge" @click="toggleReminder">
            <i class="fa fa-bell"></i>
            <span class="badge badge-danger">9</span>
          </div>
          <!-- badge reminder box -->
          <div class="header-right__badge-box-reminder" :class="{show:showReminder}">
            <router-link to>
              <span>Admission</span>
              <span>10</span>
            </router-link>
            <router-link to>
              <span>Progress</span>
              <span>10</span>
            </router-link>
            <router-link to>
              <span>Discharge</span>
              <span>10</span>
            </router-link>
            <router-link to>
              <span>Withdrawal</span>
              <span>10</span>
            </router-link>
          </div>
        </div>
        <div class="header-right__logout-box" v-on:click="singOut()">
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
      departments: [],
      patients: [],
      selectedPatient: {},
      searchText: ''
    }
  },
  created() {
    this.$wf.ready().then(api => {
      api.dept.list().then(res => {
        this.departments = res.data
        api.note.list().then(res => {
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
  methods: {
    optionDisplayText(patient) {
      let ipd = patient.ipd
      return `${this.matchDept(ipd.dept_id)}(${ipd.dept_id}) - ${ipd.name} - ${
        ipd.chr_no
      } - 床號${ipd.bed_no}`
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
    handleOnInput ($event) {
      this.no = $event.ipd.fee_no
      this.load()
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
        this.$wf.note.sess({ no: this.no }).then(res => {
          let $sess = res.data
          // have note
          if ($sess.adm) {
            this.$router.push({
              name: 'edit',
              params: { id: $sess.adm.id }
            })
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
              .catch(error => {})
          }
        })
      }
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: $color-white;
  color: $color-black;
  border-bottom: 1px solid #e0e0e0;
  // &.hideSearch {
  //   box-shadow: 0 5px 5px -1px rgba(0, 0, 0, 0.1);
  // }
  @media screen and (max-width: $break-medium) {
    z-index: 100;
  }
  &-left {
    display: flex;
    align-items: center;
    &__handler-box {
      width: 3.5rem;
      height: 3.5rem;
      line-height: 3.7rem;
      cursor: pointer;
      text-align: center;
      font-size: 1.2rem;
      @media screen and (max-width: $break-small) {
        height: 3rem;
        line-height: 3rem;
        width: 2.5rem;
      }
    }
    &__logo-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-decoration: none;
      color: $color-black;
      &-img {
        width: 1.2rem;
      }
    }
  }
  &-right {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    &__search-box {
      flex: 1;
      width: 25rem !important;
    }
    &__user-box {
      margin: 0 0.8rem 0 1.5rem;
      @media screen and (max-width: $break-small) {
        margin-left: 0;
      }
    }
    &__badge-box {
      &-badge {
        display: flex;
        align-items: center;
        justify-content: center;
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
        font-size: $default-font-size;
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
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          padding: 0.5rem 1.5rem;
          text-decoration: none;
          color: $color-black;
          &:hover {
            background-color: darken($color-grey-light, 5%);
          }
          span:nth-child(2) {
            font-weight: 600;
            color: #dc3545;
          }
        }
      }
    }
    &__logout-box {
      width: 2.5rem;
      height: 3.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      @media screen and (max-width: $break-small) {
        height: 3rem;
      }
    }
  }

  // &_search-wrap {
  //   background: $color-white;
  //   padding: 5px;
  //   @media screen and (max-width: $break-medium) {
  //     justify-content: space-between;
  //     width: 100%;
  //     position: absolute;
  //     left: 0;
  //     top: 3.5rem;
  //     font-size: 12px;
  //     border-top: 1px solid #e0e0e0;
  //     border-bottom: 1px solid #e0e0e0;
  //     &.hideSearch {
  //       opacity: 0;
  //     }
  //   }
  //   @media screen and (max-width: $break-small) {
  //     top: 3rem;
  //   }
  //   .radio-box {
  //     margin-right: 8px;
  //     @media screen and (max-width: $break-medium) {
  //       margin-right: 0;
  //     }
  //     input {
  //       opacity: 0;
  //       position: absolute;
  //       &:checked + label:before {
  //         background: $color-primary;
  //         border: 1px solid $color-primary;
  //         box-shadow: inset 0px 0px 0px 3px $color-white;
  //       }
  //     }
  //     label {
  //       position: relative;
  //       display: inline-block;
  //       margin: 0 5px;
  //       cursor: pointer;
  //       @media screen and (max-width: $break-medium) {
  //         margin-left: 0;
  //       }
  //       &:before {
  //         content: '';
  //         background: #fff;
  //         border: 2px solid #ccc;
  //         display: inline-block;
  //         vertical-align: sub;
  //         width: 15px;
  //         height: 15px;
  //         margin-right: 5px;
  //         text-align: center;
  //         border-radius: 50%;
  //       }
  //     }
  //   }
  //   .search-box {
  //     box-shadow: 0 0.2rem 0.5rem rgba($color-black, 0.1);
  //     @media screen and (max-width: $break-medium) {
  //       box-shadow: none;
  //       border-bottom: 1px solid $color-grey-dark;
  //     }
  //     input,
  //     button {
  //       border: none;
  //       padding: 0.2rem 1rem;
  //     }
  //     input {
  //       @media screen and (max-width: $break-medium) {
  //         padding: 0.2rem;
  //       }
  //       @media screen and (max-width: $break-small) {
  //         padding: 0.1rem;
  //       }
  //     }
  //     button {
  //       color: $color-grey-dark;
  //       background: $color-white;
  //       @media screen and (max-width: $break-medium) {
  //         padding: 0.2rem 0.5rem;
  //       }
  //       @media screen and (max-width: $break-small) {
  //         padding: 0.1rem;
  //       }
  //     }
  //   }
  // }
}

.header .item {
  font-size: 12px !important;
}
</style>
