<template>
  <div :class="{isExpanded: $store.state.sideExpanded}">
      <span>{{status}}</span>
      <div class="switch my-sm-3 mt-5 mb-4 d-flex align-items-center justify-content-sm-end">
        <span class="h5 my-0" >Group By：</span>
        <div>
          <button 
            class="btn btn-outline-info mr-1"
            :class="{clicked: sortType == 'doc_id'}" 
            type="button" 
            @click="switchType('doc_id')">Doctor</button>
          <button 
            class="btn btn-outline-info"
            :class="{clicked: sortType == 'bed_no'}"  
            type="button" 
            @click="switchType('bed_no')">Floor</button>
        </div>
      </div>
      <card-component :sortType="sortType" :list="sortedData"></card-component>
  </div>
</template>

<script>
import Vue from 'vue'

Vue.component(
  'card-component',
  require('@/components/ui/CardComponent.vue').default
)
export default {
  data() {
    return {
      sortType: 'doc_id',
      status: '',
      rowData: {},
      sortedData: {}
    }
  },
  methods: {
    load() {
      this.status = 'Loading...'
      this.$wf.ready().then($api => {
        return $api.note.list().then($raw => {
          this.rowData = $raw.data
          this.status = ''
          this.sortRawData()
        })
      })
    },
    sortRawData() {
      let sortedData = {}
      this.rowData.forEach(function(v, k) {
        if (this.sortType === 'bed_no') {
          sortedData[Number(v.ipd.bed_no.slice(0, 2))] == undefined &&
            (sortedData[Number(v.ipd.bed_no.slice(0, 2))] = [])
          sortedData[Number(v.ipd.bed_no.slice(0, 2))].push(v)
        } else {
          sortedData[v.ipd.doc_id] == undefined &&
            (sortedData[v.ipd.doc_id] = [])
          sortedData[v.ipd.doc_id].push(v)
        }
      }, this)
      this.sortedData = sortedData
    },
    switchType(value) {
      this.sortType = value
      this.sortRawData()
      // console.log(1)
      // if (sortType == 'completed') {
      //   // sort data by if it's completed first
      //   let sortByProgress = this.pt.sort(function(a, b) {
      //     if (a.completed !== b.completed) {
      //       return a.completed ? 1 : -1
      //     } else {
      //       return 0
      //     }
      //   })
      //   this.pt = sortByProgress
      // }
      // let sortedData = {}
      // this.pt.forEach(function(v, k) {
      //     let status = v[sortType] ? 'completed' : 'incompleted'
      //     sortedData[status] == undefined && (sortedData[status] = [])
      //     sortedData[status].push(v)
      // })
      // this.lists = sortedData
    }
  },
  mounted() {
    this.load()
  }
}
</script>

<style lang="scss" scoped>
button {
  font-size: 14px;
  cursor: pointer;
  &.clicked {
    color: #fff;
    background: #17a2b8;
  }
}
</style>