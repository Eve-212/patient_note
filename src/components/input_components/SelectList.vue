
<template>
  <div 
    :id="anchorIdFormat(schema)" 
    :class="[bsColSize, styleClass]" 
    v-if="showInputField">
    <select v-model="value[currentKey]">
      <template v-if="schema.attrs.placeholder">
        <option value="">{{ schema.attrs.placeholder }}</option>
      </template>
      <option 
        v-for="(item, index) in schema.attrs.values" 
        :key="index" 
        :value="item">
        {{ item }}
      </option>
    </select>
  </div>
</template>

<script>
import Proto from './Proto'

export default {
  name: 'SelectList',
  mixins: [Proto],
  data() {
    return {
      placeholder: this.getPlaceholder()
    }
  },
  created: function() {
    if (!(this.currentKey in this.value)) {
      // this.value[this.currentKey] = {}
      this.$set(this.value, this.currentKey, '')
      //this.value["keyOnCreate"] = {};
    }
  }
}
</script>

<style>
</style>