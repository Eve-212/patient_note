
<template>
  <div :class="getBsColSize">
    <div :id="anchorIdFormat(schema)" :class="[getStyleClass]">
      <div v-if="schema.attrs.inputGroup">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <div class="input-group-text text-label">{{ schema.title }}</div>
          </div>
          <input id="number-input" type="date" :name="currentKey" v-model="value[currentKey]">
        </div>
      </div>
      <div v-if="!schema.attrs.inputGroup">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <div class="input-group-text text-label">{{ schema.title }}</div>
          </div>
          <input id="number-input" type="date" :name="currentKey" v-model="value[currentKey]">
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
import Proto from '@/components/mixins/Proto.js'
export default {
  name: 'SelectDate',
  mixins: [Proto],
  data() {
    return {}
  }
}
</script>

<style>
</style>


