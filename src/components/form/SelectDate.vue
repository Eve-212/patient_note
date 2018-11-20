
<template>
  <div :class="getBsColSize">
    <div :id="anchorIdFormat(schema)" :class="[getStyleClass]">
      <div v-if="inputGroup">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <div class="input-group-text text-label">{{ schema.title }}</div>
          </div>
          <input 
            :id="getId()" 
            type="date"
            :name="currentKey" 
            v-model="val"
            :aria-describedby="helpText(schema)"
            class="form-control">
        <slot name="subTitle" :description="schema.description"></slot>
        </div>
      </div>
      <div class="form-group row" v-if="!inputGroup">
        <label 
          class="col-md-4 col-form-label"
          :for="getId()">
          {{ schema.title }}
        </label>
        <input 
          :id="getId()" 
          type="date" 
          :name="currentKey"  
          v-model="val"
          class="form-control col-md-8"
          :aria-describedby="helpText(schema)">
        <slot name="subTitle" :description="schema.description"></slot>
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

<style scoped>
input[type="date"] {
  display:block;
  -webkit-appearance: textfield;
  -moz-appearance: textfield;
  min-height: 1.2em;
}
  
</style>


