<template>
<div :class="getBsColSize">  
  <slot name="section-title" :childIsSection="isSection"></slot>
  <div :id="anchorIdFormat(schema)">     
    <template v-if="inputGroup">    
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <!-- <div class="input-group-text text-label" >{{ schema.title }}</div> -->
          <slot name="label" :getId="getId" :childIsSection="isSection" :classes="['input-group-text', 'text-label']"></slot>
        </div>
        <input 
          :id="getId()" 
          type="text" 
          v-model="val"
          class="form-control"
          :aria-describedby="helpText(schema)"
          :placeholder="placeholder">
        <slot name="subTitle" :description="schema.description"></slot>
      </div>

    </template>
    <div class="form-group" v-if="!inputGroup">
      <!-- <div class="row"> -->
    
      <!-- <label 
        class=" col-form-label"
        :for="getId()">
        {{ schema.title }}
      </label> -->
        <div class="text-input-container">
          <slot name="label" :childIsSection="isSection" :getId="getId" :classes="['col-form-label', 'text-input-label']"></slot>      

          <div class="text-input-input">
            <input 
              :id="getId()" 
              type="text" 
              v-model="val"
              class="form-control"
              :aria-describedby="helpText(schema)"
              :placeholder="getPlaceholder">
            <slot name="subTitle" :description="schema.description"></slot>          
          </div>
        </div>
        
      <!-- </div> -->
    </div>
  </div>	
</div>
</template>

<script>
import Proto from '@/components/mixins/Proto.js'
export default {
  name: 'TextInput',
  mixins: [Proto],
  props: {
    inputGroup: {
      default() {
        return false
      }
    }
  }    
}
</script>

<style>
.w-10 {
  width: 10%;
}

.text-input-container {
  display: flex;
  width: 100%;
  
}

.text-input-label {
  padding-right: 1rem !important;
}

.text-input-input {
  flex: 1;
}
</style>


