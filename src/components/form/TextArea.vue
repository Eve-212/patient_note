<template>
  <div :class="getBsColSize">    
    <div class="form-group"
        :id="anchorIdFormat(schema)" 
        :class="[getStyleClass]">      

      <label           
        :for="getId()">{{ schema.title }}
      </label>           
      <textarea :id="getId()" 
                :name="currentKey" 
                v-model="val" 
                :placeholder="hint"
                :aria-describedby="helpText(schema)"
                rows="10">        
      </textarea>      
     
    </div>     
  </div>
</template>

<script>
import Proto from '@/components/mixins/Proto.js'

export default {
  name: 'TextArea',
  mixins: [Proto],
  data() {
    return {
      hint: "Insert text here ..."
    }
  }  
}
</script>

<style>
textarea {
  width: 100%;
  height: 17rem;
}

</style>


