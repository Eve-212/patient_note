<template>
  <div 
    :id="anchorIdFormat(schema)" 
    :class="[bsColSize, styleClass]" 
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
      <small 
        v-if="schema.description" 
        :id="helpText(schema)" 
        class="form-text text-muted reminder">
        {{ schema.description }}
      </small>
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
          :placeholder="placeholder">
        <small 
          v-if="schema.description" 
          :id="helpText(schema)" 
          class="form-text text-muted reminder">
          {{ schema.description }}
        </small>
      </div>
    </div>
  </div>	
</template>

<script>
import Proto from '@/components/mixin/Proto.js'
export default {
  name: 'TextInput',
  mixins:[Proto],
  
  data() {
    return {
      placeholder: this.getPlaceholder()     
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


