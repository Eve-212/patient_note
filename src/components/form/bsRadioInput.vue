<template>
<div :class="getBsColSize">
  <div 
    :id="anchorIdFormat(schema)" 
    :class="[getStyleClass]">    
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
        v-model="val">
      <label class="form-check-label"  :for="getId(index)">{{ item }}</label>
    </div>
  </div>
</div>
</template>

<script>
import Proto from '@/components/mixins/Proto.js'

export default {
  name: 'bsRadioInput',
  mixins: [Proto],
  watch: {
    schema: {
      handler: function() {
        if (!this.schema.attrs.values) {
          if (this.schema.type == 'boolean') {
            this.schema.attrs.values = ['Yes', 'No']
          }
        }
      },
      deep: true
    }
  },  
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
