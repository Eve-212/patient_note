<template>
<div :class="getBsColSize">
  <div  :id="anchorIdFormat(schema)"  >
    <div v-if="inputGroup">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <div class="input-group-text text-label" >{{ schema.title }}</div>
        </div>
        <input 
          :id="getId()" 
          type="text" 
          v-model="val"
          class="form-control"
          :aria-describedby="helpText(schema)"
          :placeholder="placeholder">
      </div>
      <slot name="subTitle"></slot>
    </div>
    <div class="form-group row" v-if="!inputGroup">
    
      <label 
        class="col-md-2 col-form-label"
        :for="getId()">
        {{ schema.title }}
      </label>
      <div class="col-md-10">
        <input 
          :id="getId()" 
          type="text" 
          v-model="val"
          class="form-control"
          :aria-describedby="helpText(schema)"
          :placeholder="getPlaceholder">
          <slot name="subTitle"></slot>
      </div>
    </div>
  </div>	
</div>
</template>

<script>
import Proto2 from '@/components/mixins/Proto2.js'
export default {
  name: 'TextInput2',
  mixins:[Proto2],
  props:{
      inputGroup:{
          default(){
              return false
        }
      },
      value:{
        default(){
        return ""
        }
      }
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


