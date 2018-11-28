<template>
  <div :class="getBsColSize">
    HELLO
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
  props: {
    
  },
  data() {
    return {
      placeholder: "Insert text here ..."
    }
  },
  methods: {

  },
  created() {
    console.log("TEXTAREA CREATED")
  }

}
</script>

<style>

</style>


