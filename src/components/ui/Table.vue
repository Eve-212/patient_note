<template>
  <div class="wrap">
    {{this.status}}
    <div v-if="sortedData.length > 0">
      <h3 class="title my-4">Department：{{$route.params.id}}</h3> 
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
            <tr v-for="(item, index) in sortedData.slice(pageStart, pageStart + items.countOfPage)">
              <td>{{index+1}}</th>
              <td>{{item.chr_no}}</td>
              <td>{{item.ipd.name}}</td>
              <td>{{item.init_time}}</td>
              <td class="actions">
                <i class="fa fa-pen"></i>
                <i class="fa fa-star"></i>
              </td>
            </tr>
          </tbody>
        </table>
    </div>
    <paginate></paginate>
  </div>
</template>
<script>
import Vue from 'vue'
Vue.component('paginate', require('@/components/ui/Paginate.vue').default)
export default {
  data() {
    return {
      status: '',
      rowData: {},
      sortedData: [],
      countOfPage: 5,
      currPage: 1,
      totalPage: null
    }
  },
  computed: {
    pageStart() {
      return (this.items.currPage - 1) * this.items.countOfPage
    }
  },
  methods: {
    load(id) {
      this.status = 'Loading...'
      this.$wf.ready().then($api => {
        return $api.note.list().then($raw => {
          this.rowData = $raw.data
          console.log(this.rowData)
          this.sortRawData(id)
        })
      })
    },
    sortRawData(id) {
      this.rowData.forEach(function(item) {
        if (item.ipd.dept_id == id) {
          this.sortedData.push(item)
        }
      }, this)
      if (this.sortedData.length == 0) {
        this.status = 'No data'
      } else {
        this.status = ''
      }
    }
  },
  mounted() {
    this.load(this.$route.params.id)
  }
}
</script>
<style lang="scss">
@import '@/assets/sass/main.scss';
.wrap {
  width: 90%;
  margin: 0 auto;
  table {
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
      tr {
        display: block;
        position: relative;
        margin-bottom: 1.5em;
      }
      th,
      td {
        display: block;
      }
      td:nth-child(1),
      td:nth-child(4) {
        display: none;
      }

      td:nth-child(2):before,
      td:nth-child(3):before,
      td:nth-child(5):before {
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
        color: #fff;
      }

      td:nth-child(3) {
        border: 1px solid #ddd;
      }

      td.actions {
        position: absolute;
        top: 0;
        right: 0;
        border: none;
        i {
          color: #fff;
        }
      }
    }
  }
}
</style>