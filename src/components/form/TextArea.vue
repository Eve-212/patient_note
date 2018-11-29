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
                :placeholder="msg"
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
      msg: "Insert text here ..."
    }
  }, 
  created() {
  }

}
</script>

<style>

</style>


