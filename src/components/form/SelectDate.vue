
<template>
  <div :id="anchorIdFormat(schema)" :class="[bsColSize, styleClass]" v-if="showInputField">
    <label :for="currentKey">{{ schema.title }}</label>
    <input
      id="number-input" 
      type="date" 
      :name="currentKey" 
      v-model="value[currentKey]">
  </div>
</template>

<script>
import Proto from '@/components/mixins/Proto.js'
export default {
  name: 'SelectDate',
  mixins: [Proto],
  data() {
    return {}
  }
}
</script>

<style>
</style>


