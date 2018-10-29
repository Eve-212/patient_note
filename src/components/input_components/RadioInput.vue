<template>
  <div :id="anchorIdFormat(schema.title)" :class="[bsColSize, styleClass]" v-if="showInputField">    
    <label>{{ schema.title }}</label>
    <div 
      v-for="(item, index) in schema.attrs.values" 
      :key="index"
      class="form-check form-check-inline">
      <input 
        type="radio" 
        class="form-check-input"
        :id="getId(index)" 
        :value="item" 
        v-model="value[currentKey]">
      <label class="form-check-label"  :for="item">{{ item }}</label>
    </div>
  </div>
</template>

<script>
import Proto from './Proto'
export default {
  name: 'RadioInput',
  mixins:[Proto],
  created(){
    if(!this.schema.attrs.values){
      if (this.schema.type=="boolean"){
        this.schema.attrs.values=['Yes','No']
      }
    }
  },
  data() {
    return {
      
    }
  }
}
</script>

<style>

</style>
