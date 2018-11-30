<template>
<div :class="getBsColSize">
  <slot name="section-title" :childIsSection="isSection"></slot>
  <div 
    :id="anchorIdFormat(schema)" 
    :class="[getStyleClass]">
    <div v-if="inputGroup">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <!-- <div class="input-group-text" >{{ schema.title}}</div> -->
          <slot name="label" :getId="getId" :childIsSection="isSection" :classes="['input-group-text']"></slot>
        </div>
        <input 
          :id="getId()" 
          type="number" 
          :name="currentKey" 
           v-model="val"
          class="form-control"
          :aria-describedby="helpText(schema)"
          :placeholder="placeholder">
        <slot name="subTitle" :description="schema.description"></slot>      
      </div>
    </div>
    <div class="form-group row" v-if="!inputGroup">
    
      <!-- <label 
        class="col-md-2 col-form-label"
        :for="getId()">
        {{ schema.title }}
      </label> -->

      <slot name="label" :childIsSection="isSection" :getId="getId" :classes="['col-form-label', 'col-md-2']"></slot>      

      <div class="col-md-10">
        <input 
          :id="getId()"
          type="number" 
          :name="currentKey" 
           v-model="val"
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


