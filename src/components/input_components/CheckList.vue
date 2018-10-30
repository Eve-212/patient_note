<template>
  <div 
    :id="anchorIdFormat(schema.title)" 
    :class="[bsColSize, styleClass]" 
    v-if="showInputField">
    <span :for="currentKey">{{ schema.title }}</span>
    <div 
      :id="currentKey"			
      class="form-check form-check-inline" 
      v-for="(item, index) in schema.attrs.values" 
      :key="index">
      
      <input 
        class="form-check-input"
        type="checkbox" 
        :id="getId(index)" 
        :value="item"
        v-model="value[currentKey]">
      <label  class="form-check-label" :for="getId(index)">{{ item }}</label>
    </div>
  </div>
</template>

<script>
import Proto from './Proto'
export default {
  name: 'CheckList',
  mixins:[Proto],
  data() {
    return {
      
    }
  },
  created: function() {
    if(!this.schema.attrs.values){
      if (this.schema.items.enum){
        this.schema.attrs.values=this.schema.items.enum
      }
    }
    if (!(this.currentKey in this.value)) {
      // this.value[this.currentKey] = {}
      // this.$emit('input', this.value)
      this.$set(this.value, this.currentKey, [])
      //this.value["keyOnCreate"] = {};
    }
  }
   
}
</script>

<style>
</style>