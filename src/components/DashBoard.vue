
<template>
    
    <div class="container-fluid">
        <!--
            <button v-on:click="load">Load</button>
        -->
        <div class="box_wrap" v-for="sess in list" :key="sess.fee_no">
            <span>{{status}}</span>
            <sess-card :sess="sess"></sess-card>

        </div>
        
    </div>
</template>
<script>
import SessCard from './sys/SessCard'
import ICDSpan from './sys/ICDSpan'

export default {
  name: 'DashBoard',
  components: {
    'sess-card': SessCard
  },
  data() {
    return {
      list: [],
      status: ''
    }
  },
  methods: {
    load() {
      this.status = 'Loading...'
      this.$wf.ready().then($api => {
        return $api.note.list().then($raw => {
          this.list = $raw.data
          this.status = ''
        })
      })
    }
  },
  mounted() {
    this.load()
  }
}
</script>
<style>
.container-fluid {
  padding-top: 10px;
}

.box_wrap {
  float: left;
  margin-right: 15px;
  width: 18rem;
}
.box_group {
  clear: both;
  padding-bottom: 50px;
}

.box_group::after {
  clear: both;
}
.group_title {
  border-bottom: 1px #cccaca solid;
  margin-bottom: 10px;
}
</style>