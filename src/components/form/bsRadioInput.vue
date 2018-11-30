<template>
<div :class="getBsColSize">
  <slot name="section-title" :childIsSection="isSection"></slot>
  
  <div 
    :id="anchorIdFormat(schema)" 
    :class="[getStyleClass]"
    class="form-group">
    <div class="row">
      <!-- <label class="col-form-label col-lg-2 col-sm-4">{{ schema.title }}</label> -->
      <slot name="label" :childIsSection="isSection" :getId="getId" :classes="['col-form-label', 'col-lg-2', 'col-sm-4' ]"></slot>      

      <div class="col-lg-10 col-sm-8">
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

<style scoped>
.form-check-input {
  margin-top: .2rem;
}
.form-check-label {
  margin-top: .4rem;

}

</style>
