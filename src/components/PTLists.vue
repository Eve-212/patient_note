<template>
  <div :class="{isExpanded: isExpanded}">
      <span>{{status}}</span>
      <div class="selectBtn_wrap mt-5 mt-sm-0 mb-sm-1 mb-3 d-flex align-items-center justify-content-sm-end">
        <span class="h5 my-0" >Group By：</span>
        <div class="switchBtn">
          <button 
            class="btn btn-outline-info mr-1"
            :class="{clicked: sortType == 'doc_id'}" 
            type="button" 
            @click="switchType('doc_id')">Doctor</button>
          <button 
            class="btn btn-outline-info mr-1"
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

Vue.component('card-component', require('./CardComponent.vue').default)
export default {
  props: ['isExpanded'],
  data() {
    return {
      sortType: 'doc_id',
      status: '',
      rowData: {},
      sortedData: {},
      aaa: {},
      pt: [
        {
          pt_id: 'K221111111',
          pt_name: '黃一番',
          age: 50,
          gender: 'female',
          bed_no: '10012',
          chr_no: '00000001',
          doc_id: 107900,
          doc_name: '張四番',
          illness: 'Acute myocardial infraction',
          completed: true
        },
        {
          pt_id: 'K221111112',
          pt_name: '黃二番',
          age: 60,
          gender: 'male',
          bed_no: '08052',
          chr_no: '00000002',
          doc_id: 106900,
          doc_name: '張二番',
          illness: 'Attention Deficit Hyperactivity Disorder',
          completed: false
        },
        {
          pt_id: 'K221111111',
          pt_name: '黃三番',
          age: 5,
          gender: 'female',
          bed_no: '09012',
          chr_no: '00000003',
          doc_id: 107912,
          doc_name: '張五番',
          illness: 'Acute myocardial infraction',
          completed: false
        },
        {
          pt_id: 'K221111111',
          pt_name: '黃四番',
          age: 20,
          gender: 'female',
          bed_no: '09032',
          chr_no: '00000004',
          doc_id: 107900,
          doc_name: '張四番',
          illness: 'Flu',
          completed: true
        },
        {
          pt_id: 'K221111111',
          pt_name: '黃五番',
          age: 40,
          gender: 'male',
          bed_no: '08042',
          chr_no: '00000005',
          doc_id: 107912,
          doc_name: '張五番',
          illness: 'Broken bones',
          completed: false
        },
        {
          pt_id: 'K221111111',
          pt_name: '黃六番',
          age: 40,
          gender: 'male',
          bed_no: '10042',
          chr_no: '00000005',
          doc_id: 107900,
          doc_name: '張四番',
          illness: 'Broken legs',
          completed: true
        }
      ]
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
.switchBtn {
  button {
    cursor: pointer;
    &.clicked {
      color: #fff;
      background: #17a2b8;
    }
  }
}
</style>