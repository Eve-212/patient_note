<template>
<div :class="getBsColSize">
  <div 
    :id="anchorIdFormat(schema)" 
    :class="[getStyleClass]">
    <div class="checklist-label" :for="currentKey">{{ schema.title }}</div>
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
        v-model="val">
      <label  class="form-check-label" :for="getId(index)">{{ item }}</label>
    </div>
  </div>
</div>
</template>

<script>
import Proto from '@/components/mixins/Proto.js'

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
    // if (!(this.currentKey in this.value)) {
    //   // this.value[this.currentKey] = {}
    //   // this.$emit('input', this.value)
    //   this.$set(this.value, this.currentKey, [])
    //   //this.value["keyOnCreate"] = {};
    // }
  }
   
}
</script>

<style>
.checklist-label {
  font-size: 1.1rem;  
}
/* .margin-bot-small {
  margin-bottom: 10px;
} */
</style>