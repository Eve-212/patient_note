<template>
    <span class="icd_span">
        <span class="code">{{icd}}</span> <span class="desc">{{desc}}</span>
    </span>

</template>

<script>
//import moment from 'moment'

export default {
  name: 'ICDSpan',
  props: ['icd'],
  data() {
    return {
      desc: ''
    }
  },
  created() {
    this.$wf.icd.local_get(this.icd).then($icd => (this.desc = $icd.label))
  }
}
</script>

<style>
</style>
