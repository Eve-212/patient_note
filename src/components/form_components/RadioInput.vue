<template>
  <div 
    :id="anchorIdFormat(schema)" 
    :class="[bsColSize, styleClass]" 
    v-if="showInputField">    
    <label class="radio-label">{{ schema.title }}</label>
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
import Proto from '@/components/mixin/Proto.js'
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
