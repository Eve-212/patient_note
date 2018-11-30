<template>
<div :class="getBsColSize">
  <slot name="section-title" :childIsSection="isSection"></slot>
  
  <div 
    :id="anchorIdFormat(schema)" 
    :class="[getStyleClass]">    
    <!-- <label class="radio-label">{{ schema.title }}</label> -->
    <slot name="label" :childIsSection="isSection" :getId="getId" :classes="['radio-label']"></slot>      

    <div 
      v-for="(item, index) in schema.attrs.values" 
      :key="index"
      class="form-check form-check-inline">
      <input 
        type="radio" 
        class="form-check-input"
        :id="getId(index)" 
        :value="item" 
         v-model="val">
      <label class="form-check-label" :for="getId(index)">{{ item }}</label>
    </div>
  </div>
</div>
</template>

<script>
import Proto from '@/components/mixins/Proto.js'
export default {
  name: 'RadioInput',
  mixins: [Proto],
  created() {
    if (!this.schema.attrs.values) {
      if (this.schema.type == 'boolean') {
        this.schema.attrs.values = ['Yes', 'No']
      }
    }
  },
  data() {
    return {}
  }
}
</script>

<style>
.radio-label {
  font-size: 1.1rem;
  margin-right: 15px;
}
</style>
