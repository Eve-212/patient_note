<template>
<div :class="getBsColSize">
  <slot 
    name="group" 
    :inputGroup="inputGroup"
    :schema="schema"></slot>
  <div 
    :id="anchorIdFormat(schema)" 
    v-if="showInputField">
    <div v-if="schema.attrs.inputGroup">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <div class="input-group-text text-label" >{{ schema.title }}</div>
        </div>
        <input 
          :id="getId()" 
          type="text" 
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
          :id="getId()" 
          type="text" 
          :name="currentKey" 
          v-model="value[currentKey]"
          class="form-control"
          :aria-describedby="helpText(schema)"
          :placeholder="getPlaceholder">
        <slot name="subTitle" :description="schema.description"></slot>          
      </div>
    </div>
  </div>	
</div>
</template>

<script>
import Proto from '@/components/mixins/Proto.js'
export default {
  name: 'TextInput',
  mixins:[Proto],
  data() {
    return {
    }
  },
  methods: {

  }
}
</script>

<style>
.text-label {
  font-size: 1.1rem;
}
.w-10 {
  width: 10%
}
</style>


