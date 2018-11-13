<template>
<div :class="getBsColSize">
  <div 
    :id="anchorIdFormat(schema)" 
    :class="[getStyleClass]"> 
    
    <label
      :for="currentKey">
      {{ schema.attrs.label }}
      <input
        :id="currentKey"
        type="checkbox"
        :name="currentKey"
        v-model="value[currentKey]">
    </label>
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


