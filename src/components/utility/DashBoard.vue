<template>
  <div :class="{isExpanded: $store.state.sideExpanded}">
      <span>{{status}}</span>
      <div v-if="Object.keys(sortedData).length > 0" class="switch my-md-3 mt-5 mb-4 d-flex align-items-center justify-content-xl-end">
        <span class="h5 my-0" >Group By：</span>
        <div>
          <button
            v-for="(value, index) in sortTypes"
            :key="index"
            type="button" 
            class="btn mr-1"
            :class="{clicked: sortType == value}" 
            @click="switchType(value)">
            <span v-if="value == 'doc_id'">Doctor</span>
            <span v-else-if="value == 'bed_no'">Floor</span>
          </button>
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
      sortTypes: ['doc_id', 'bed_no'],
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
      this.rowData.forEach(function(value) {
        if (this.sortType === 'bed_no') {
          let floor = Number(value.ipd.bed_no.slice(0, 2))
          sortedData[floor] == undefined && (sortedData[floor] = [])
          sortedData[floor].push(value)
        } else {
          let doctor = value.ipd.doc_id
          sortedData[doctor] == undefined && (sortedData[doctor] = [])
          sortedData[doctor].push(value)
        }
      }, this)
      this.sortedData = sortedData
    },
    switchType(value) {
      this.sortType = value
      this.sortRawData()
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
  border: 1px solid #17a2b8;
  color: #17a2b8;
  &.clicked {
    color: #fff;
    background: #17a2b8;
  }
}
</style>