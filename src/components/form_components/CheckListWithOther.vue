<template>
  <div>
    <div :class="[bsColSize ,styleClass]" v-if="showInputField">          
      <div    
        class="display-inline" 
        v-for="(item, index) in schema.attrs.values" 
        :key="index">
        <input 
          type="checkbox" 
          :id="item" 
          :value="item" 
          v-model="value[currentKey]">
        <label :for="item">{{ item }}</label>
      </div>
      <div class="display-inline padding-left">
        <label 
          for="other">Other:				
        </label>
        <input 
          id="other" 
          type="text" 
          name="other" 
          v-model="other">
      </div>    	 
      {{ other }}  
      
    </div>
    {{ value }}
  </div>
</template>

<script>

import Proto from '@/components/mixin/Proto.js'



export default {
  name: 'CheckListWithOther',
  mixins: [Proto],
  components: {
    
  },
  data() {
    return {
      other: null,
      
    }
  },
  created: function() {
    if (!(this.currentKey in this.value)) {
      // this.value[this.currentKey] = {}
      // this.$emit('input', this.value)
      this.$set(this.value, this.currentKey, [])
      //this.value["keyOnCreate"] = {};
    }
  },
  methods: {
    clearInput() {
      let initValue = []
      this.$set(this.value, this.currentKey, initValue)
    }
  },
  computed: {
    addUpdateOther() {
      if (this.value[currentKey].includes(this.other)) {
      }
    }
  }
}
</script>

<style>
</style>