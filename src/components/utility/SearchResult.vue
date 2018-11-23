<template>
  <div class="wrap" :class="{isExpanded: $store.state.sideExpanded}">
    {{this.status}}
    <div class="my-lg-3 my-5" v-if="sortedData.length > 0">
      <h3 class="title my-4">Department：{{$route.params.dept_id}}</h3> 
        <table class="table table-sm">   
          <thead>
            <tr>
              <th>#</th>
              <th>Id</th>
              <th>Name</th>
              <th>Admission time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in sortedData.slice(pageStart, pageStart + countOfPage)">
              <td>{{ (currPage-1) * countOfPage + index + 1 }}</th>
              <td>
                <router-link 
                  :to="{ name: 'edit', params: { fee_no: item.fee_no }}">{{item.chr_no}}
                </router-link>
              </td>
              <td>
                <router-link 
                  class="font-weight-bold"
                  :to="{ name: 'edit', params: { fee_no: item.fee_no }}">{{item.ipd.name}}
                </router-link>
              </td>
              <td>{{getDate(item.init_time)}}</td>
              <td class="actions">
                <router-link 
                  :to="{ name: 'edit', params: { fee_no: item.fee_no }}"><i class="fa fa-pen"></i>
                </router-link>
                <i class="fa fa-star"></i>
              </td>
            </tr>
          </tbody>
        </table>
        <paginate :totalPage=this.totalPage v-on:currPage="setCurrPage"></paginate>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
Vue.component('paginate', require('@/components/ui/Paginate.vue').default)
export default {
  props: ['dept_id'],
  data() {
    return {
      status: '',
      rowData: {},
      sortedData: [],
      countOfPage: 6,
      currPage: null,
      totalPage: null
    }
  },
  computed: {
    pageStart() {
      return (this.currPage - 1) * this.countOfPage
    }
  },
  methods: {
    load(dept_id) {
      this.status = 'Loading...'
      this.$wf.ready().then($api => {
        return $api.note.list().then($raw => {
          this.rowData = $raw.data
          this.sortRawData(dept_id)
        })
      })
    },
    sortRawData(dept_id) {
      this.rowData.forEach(function(item) {
        if (item.ipd.dept_id == dept_id) {
          this.sortedData.push(item)
          this.totalPage = Math.ceil(this.sortedData.length / this.countOfPage)
        }
      }, this)
      if (this.sortedData.length == 0) {
        this.status = 'No data'
      } else {
        this.status = ''
      }
    },
    setCurrPage(val) {
      this.currPage = val
    },
    getDate(val) {
      let res = new Date(val)
      return res.toLocaleDateString().replace(/\//g, '-')
    }
  },
  mounted() {
    this.load(this.$route.params.dept_id)
  },
  watch: {
    dept_id() {
      this.sortedData = []
      this.load(this.$route.params.dept_id)
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/sass/main.scss';
.wrap {
  @media screen and (max-width: $break-medium) {
    width: 100%;
  }
  .table {
    a {
      color: $color-black;
      text-decoration: underline;
    }
    .actions {
      i {
        color: $color-primary;
        cursor: pointer;
        width: 30px;
        height: 30px;
        line-height: 30px;
      }
    }
    @media screen and (max-width: $break-small) {
      thead {
        display: none;
      }

      th,
      td {
        display: block;
      }

      tr {
        display: block;
        position: relative;
        margin: 1.5em 0;
        &:first-child {
          margin-top: 0;
        }
      }

      td:nth-child(1),
      td:nth-child(4) {
        display: none;
      }

      td:nth-child(2):before,
      td:nth-child(3):before {
        position: absolute;
        left: 0.5em;
      }

      td:nth-child(2):before {
        content: 'Id';
      }

      td:nth-child(3):before {
        content: 'Name';
      }

      td:nth-child(2),
      td:nth-child(3) {
        padding-left: 35%;
      }

      td:nth-child(2) {
        background: $color-primary;
        color: $color-white;
        a {
          color: $color-white;
          text-decoration: none;
        }
      }

      td:nth-child(3) {
        border: 1px solid #ccc;
      }

      td.actions {
        position: absolute;
        top: 0;
        right: 0;
        border: none;
        background: none;

        i {
          color: $color-white;
        }
      }
    }
  }
}
</style>