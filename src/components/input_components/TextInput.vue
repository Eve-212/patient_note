<template>
  <div 
    :id="anchorIdFormat(schema)" 
    :class="[bsColSize, styleClass, paddingY15]" 
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
          :aria-describedby="helpText(schema)">
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
        class="col-lg-2 col-form-label"
        :for="currentKey">
        {{ schema.title }}
      </label>
      <div class="col-lg-10">
        <input 
          :id="getId()" 
          type="text" 
          :name="currentKey" 
          v-model="value[currentKey]"
          class="form-control"
          :aria-describedby="helpText(schema)">
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
import Proto from './Proto'
export default {
  name: 'TextInput',
  mixins: [Proto],

  data() {
    return {
      placeholder: this.getPlaceholder()
    }
  },
  methods: {
    getPlaceholder() {
      if (typeof this.schema.attrs !== 'undefined') {
        if (typeof this.schema.attrs.placeholder !== 'undefined') {
          return this.schema.attrs.placeholder
        }
      }
      return ''
    }
  } /*
  computed: {
    showInputField() {
      let schemaAttrs = this.schema.attrs

      // dependsOn name is Array?
      if (schemaAttrs) {
        if (schemaAttrs.dependsOn) {
          if (schemaAttrs.dependsOn.values && schemaAttrs.dependsOn.name) {
            // if(typeof schemaAttrs.dependsOn.values !== 'undefined' && typeof schemaAttrs.dependsOn.name !== 'undefined'){
            if (Array.isArray(this.value[schemaAttrs.dependsOn.name])) {
              for (let i = 0; i < schemaAttrs.dependsOn.values.length; i++) {
                if (
                  this.value[schemaAttrs.dependsOn.name].indexOf(
                    schemaAttrs.dependsOn.values[i]
                  ) !== -1
                ) {
                  return true
                } else {
                  this.clearInput()
                  return false
                }
              }
            } else {
              if (
                schemaAttrs.dependsOn.values.indexOf(
                  this.value[schemaAttrs.dependsOn.name]
                ) !== -1
              ) {
                return true
              } else {
                this.clearInput()
                return false
              }
            }
          }
          return true
        }
        return true
      }
      return true
    }
  }
  */
}
</script>

<style>
.text-label {
  font-size: 1.1rem;
}
</style>


