<template>
  <div :class="{isExpanded: $store.state.sideExpanded}">
    <div v-if="status" class="loading">
      <p>{{status}}</p>
    </div>
    <div
      v-if="Object.keys(sortedData).length > 0"
      class="my-md-4 mt-5 mb-3 d-flex align-items-center justify-content-xl-end"
    >
      <span class="h5 my-0">Group By：</span>
      <div>
        <button
          v-for="(value, index) in sortTypes"
          :key="index"
          type="button"
          class="btn mr-1"
          :class="{clicked: sortType == value}"
          @click="switchType(value)"
        >
          <span v-if="value == 'doc_id'">Doctor</span>
          <span v-else-if="value == 'bed_no'">Floor</span>
        </button>
      </div>
    </div>
    <card-component
      :sortType="sortType"
      v-for="(lists, title, index) in sortedData"
      :lists="lists"
      :title="title"
      :key="index"
      @deletePt="deletePt"
    ></card-component>
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
      status: null,
      rowData: {},
      sortedData: {},
      selectedPt: null
    }
  },
  methods: {
    load() {
      this.status = 'loading'
      this.$wf.ready().then($api => {
        return $api.note.list().then($raw => {
          this.rowData = $raw.data
          this.status = ''
          this.sortRawData()
        })
      })
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
    deletePt(ptInfo) {
      this.$awn.confirm(
        `
        <p>Delete patient with Id 
          <u class="font-weight-bold mx-1">${ptInfo[2]}</u> 
          from your lists?
        </p> `,
        this.confirmDelete
      )
      let listsIndex = ptInfo[0]
      let ptIndex = ptInfo[1]
      this.selectedPt = [this.sortedData[listsIndex], ptIndex]
    },
    confirmDelete() {
      Vue.delete(this.selectedPt[0], this.selectedPt[1])
      // this.$wf.ready().then($api => {
      //   $api.note
      //     .update({
      //       id: 'I0724474',
      //       content: {},
      //       type: 'admission',
      //       sch_ver: '0'
      //     })
      //     .then($api => {
      //       console.log($api)
      //     })
      //     .catch(err => {
      //       console.log(err)
      //     })
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