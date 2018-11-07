<template>
    <span class="emp_span">
        <span class="id" v-if="hide_id!==true">{{id}}</span> <span class="name">{{name}}</span>
    </span>

</template>

<script>
//import moment from 'moment'

export default {
  name: 'EmpSpan',
  props: ['id', 'hide_id'],
  data() {
    return {
      name: ''
    }
  },
  created() {
    this.$wf.emp
      .local_get(this.id)
      .then($emp => (this.name = $emp.name || this.id))
  }
}
</script>

<style>
</style>
