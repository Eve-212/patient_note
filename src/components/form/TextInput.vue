<template>
<div :class="getBsColSize">  
  <div :id="anchorIdFormat(schema)">   
    <template v-if="inputGroup">    
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
        <slot name="subTitle" :description="schema.description"></slot>
      </div>
    </template>
    <div class="form-group row" v-if="!inputGroup">
    
      <label 
        class=" col-form-label"
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
  mixins: [Proto],
  props: {
    inputGroup: {
      default() {
        return false
      }
    }
  },
  // watch: {
  //   schema: {     
  //     handler: function() {
  //       console.log("TEXTINPUT")
  //       console.log(this.schema)
  //     },
  //     deep: true
  //   }
  // },
  updated() {
    console.log("UPDATED")
  },
  // created() {
  //   console.log("CREATED")
  // }
}
</script>

<style>
.w-10 {
  width: 10%;
}
</style>


