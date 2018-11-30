<template>
<div :class="getBsColSize">
  <slot name="section-title" :childIsSection="isSection"></slot>
  <slot name="title" :childIsSection="isSection"></slot>    
  <div 
    :id="anchorIdFormat(schema)" 
    :class="[getStyleClass]"> 
    
    <!-- <label
      :for="currentKey">
      {{ schema.attrs.label }}
    </label> -->

    <slot name="label" :childIsSection="isSection" :getId="getId" :classes="[]"></slot>      

    <input 
      :id="getId()"
      type="checkbox"
      :name="currentKey"
      v-model="val">    
  </div>
</div>
</template>

<script>
import Proto from '@/components/mixins/Proto.js'

export default {
  name: 'Checkbox',
  mixins: [Proto],
  data() {
    return {
      
    }
  }
}
</script>

<style>
</style>


