<template>
  <div 
    :id="anchorIdFormat(schema)" 
    :class="[bsColSize, styleClass]" 
    v-if="showInputField">
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
</template>

<script>
import Proto from './Proto'

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


