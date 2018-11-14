<template>
<div :class="getBsColSize">
  <div 
    :id="anchorIdFormat(schema)" 
    :class="[getStyleClass]">    
    <div class="checklist-label" :for="currentKey">{{ schema.title }}</div>
    <div 
      :id="currentKey"			
      class="form-check form-check-inline" 
      v-for="(item, index) in checklistOptions" 
      :key="index">      
      <input 
        class="form-check-input"
        type="checkbox" 
        :id="getId(index)" 
        :value="item"
         v-model="val">
      <label  class="form-check-label" :for="getId(index)">{{ item }}</label>
    </div>

    <!-- add Other input box -->
    <input type="text" placeholder="Other..." @keyup.enter="add_item" v-model="other_val">
    <button v-if="other_val" v-on:click="add_item">+</button>
    
  </div>
  {{ currentKey }}
  <br>
  {{ value }}
</div>
</template>

<script>
import Proto from '@/components/mixins/Proto.js'

export default {
  name: 'CheckListWithOther',
  mixins: [Proto],
  components: {},
  data() {
    return {
      other_val: null      
    }    
  },  
  methods: {    
    // add new item to checklist and reset value of Other input box to null
    add_item(){
      if (this.other_val){
        this.val.push(this.other_val)
        this.other_val = null
      }
    }
  },
  computed: {
    checklistOptions() {
      // if (this.value[this.currentKey]) {
      //    return this.schema.attrs.values.concat(this.value[this.currentKey].filter((x) => !this.schema.attrs.values.includes(x)));
      // }    
      if (this.val) {
         return this.schema.attrs.values.concat(this.val.filter((x) => !this.schema.attrs.values.includes(x)));
      }                 
      
      
    },  
    
    // items(){
    //   if (this.value) {
    //      return this.def_items.concat(this.values.filter((x)=> !this.def_items.includes(x)));
    //   }
    //   // return this.def_items.concat(this.values.filter((x)=> !this.def_items.includes(x)));
    // }
  },
  created: function() {
    if (!this.schema.attrs.values) {
      if (this.schema.items.enum) {
        this.schema.attrs.values = this.schema.items.enum
      }
    }
    // if (!(this.currentKey in this.value)) {
    //   // this.value[this.currentKey] = {}
    //   // this.$emit('input', this.value)
    //   this.$set(this.value, this.currentKey, [])
    //   //this.value["keyOnCreate"] = {};
    // }
  }
}
</script>

<style>
.checklist-label {
  font-size: 1.1rem;
}
/* .margin-bot-small {
  margin-bottom: 10px;
} */
</style>