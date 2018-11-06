<template>
  <div>
    <vo-basic :data="chartData"></vo-basic>
  </div>
</template>

<script>
import { VoBasic } from 'vue-orgchart'

export default {
  name: "OrgChart",
  components: { VoBasic },
  data() {
    return {
      chartData: null
    }
  },
  created () {
    this.chartData = {
      name: 'JavaScript',
        children: [
          { name: 'Angular' },
          {
            name: 'React',
            children: [{ name: 'Preact' }]
          },
          {
            name: 'Vue',
            children: [{ name: 'Moon' }]
          }
        ]
    }
  }
}
</script>

<style>
#chart-container {
  width: 100%;
  height: auto;
}
</style>
