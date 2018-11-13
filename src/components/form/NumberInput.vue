<template>
<div :class="getBsColSize">
  <div 
    :id="anchorIdFormat(schema)" 
    :class="[getStyleClass]">
    <div v-if="schema.attrs.inputGroup">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <div class="input-group-text" >{{ schema.title}}</div>
        </div>
        <input 
          :id="getId()" 
          type="number" 
          :name="currentKey" 
          v-model="value[currentKey]"
          class="form-control"
          :aria-describedby="helpText(schema)"
          :placeholder="placeholder">
      </div>
      <slot name="subTitle" :description="schema.description"></slot>      
    </div>
    <div class="form-group row" v-if="!schema.attrs.inputGroup">
    
      <label 
        class="col-md-2 col-form-label"
        :for="currentKey">
        {{ schema.title }}
      </label>
      <div class="col-md-10">
        <input 
          id="text-input" 
          type="number" 
          :name="currentKey" 
          v-model="value[currentKey]"
          class="form-control"
          :aria-describedby="helpText(schema)"
          :placeholder="placeholder">
      </div>
      <slot name="subTitle" :description="schema.description"></slot>      
    </div>
  </div>	
</div>
</template>




<script>
import Proto from '@/components/mixins/Proto.js'

export default {
  name: 'NumberInput',
  mixins: [Proto],
  data() {
    return {
    
    }
  } 
}
</script>

<style>
</style>


