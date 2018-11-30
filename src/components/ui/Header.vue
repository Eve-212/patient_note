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
      <div class="header-right">
        <!-- Search -->
        <model-list-select
          class="header-right__search-box"
          :list="patients"
          option-value="fee_no"
          v-model="selectedPatient"
          :custom-text="optionDisplayText"
          placeholder="科別 / 姓名/ 病歷號 / 床號"
          @searchchange="printSearchText"
          ref="mselect"
        ></model-list-select>
        <!-- Greeting -->
        <div class="header-right__user-box">Hi, {{ user }}</div>
        <!-- Badge and reminder -->
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
        <!-- Sign Out -->
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
  watch: {
    selectedPatient() {
      this.no = this.selectedPatient.fee_no
      this.load()
    }
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
              console.log(res)
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
                    console.log($sess)
                    console.log(res)
                    $sess = res.data
                    console.log($sess)
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
    }
  },
  mounted() {
    this.$wf.ready().then($api => {
      this.user = $wf.auth.data.name
    })
  },
  created() {
    this.$wf.ready().then(api => {
      api.dept.list().then(res => {
        this.departments = res.data
        console.log(this.departments)
        api.note.list().then(res => {
          console.log(res)
          this.patients = res.data
          console.log(this.patients)
          this.$nextTick(() => {
            console.log(this.$refs.mselect)
            const el = this.$refs.mselect.$children[0].$refs.input
            el.focus()
          })
        })
      })
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  &.hideSearch {
    box-shadow: 0 5px 5px -1px rgba(0, 0, 0, 0.1);
  }
  @media screen and (max-width: $break-medium) {
    z-index: 100;
  }
  &-left {
    display: flex;
    &__handler-box {
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
    &__logo-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      text-decoration: none;
      color: $color-black;
      &-img {
        width: 1.2rem;
      }
    }
  }

  &-right {
    min-width: 40rem;
    display: flex;
    align-items: center;
    &__search-box {
      flex: 6;
    }
    &__user-box {
      margin: 0 0.8rem 0 1.5rem;
      @media screen and (max-width: $break-small) {
        margin-left: 0;
      }
    }
    &__badge-box {
      display: flex;
      align-items: center;
      &-badge {
        display: flex;
        align-items: center;
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
          display: flex;
          align-items: center;
          justify-content: space-between;
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
      align-items: center;
      justify-content: space-between;
      @media screen and (max-width: $break-small) {
        height: 3rem;
      }
    }
  }
}
</style>
