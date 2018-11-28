<template>
  <div :class="getBsColSize">    
    <div 
    :id="anchorIdFormat(schema)" 
    :class="[getStyleClass]">
      <label           
        :for="currentKey">{{ schema.title }}
      </label>     
            
      <textarea :id="getId()" 
                :name="currentKey" 
                v-model="val" 
                :placeholder="placeholder"
                :aria-describedby="helpText(schema)">
        It was a dark and stormy night...
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
      placeholder: "Insert text here ..."
    }
  }, 
  created() {
    console.log("TEXTAREA CREATED")
  }

}
</script>

<style>

</style>


