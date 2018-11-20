<template>
  <div class="wrap">
    {{this.status}}
    <div v-if="sortedData.length > 0">
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
              <td>{{item.chr_no}}</td>
              <td>{{item.ipd.name}}</td>
              <td>{{getDate(item.init_time)}}</td>
              <td class="actions">
                <i class="fa fa-pen"></i>
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