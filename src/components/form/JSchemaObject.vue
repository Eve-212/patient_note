<template>
  <div v-if="isReady" class="row">
    <h5 :id="anchorIdFormat(schema)">{{ schema.title }}</h5>
    <div class="obj_box col-md-12">
      <div class="row">
        <component 
          v-for="(field, key) in schema.properties" 
          v-if="isVisible[key]"
          :rootObj="$rootObj"
          :key="key" 
          :is="getComponentName(field)" 
          :schema="field"
          v-bind="field.attrs" 
          :path="path.concat(key)" 
          :currentKey="key" 
          v-model="val[key]">
          <template slot="subTitle">
            <small 
              v-if="field.description" 
              :id="helpText(field)" 
              class="form-text text-muted reminder">
              {{ field.description }}
            </small>
          </template>
        </component>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Proto from '@/components/mixins/Proto.js'
import * as fields from '@/components/form/fieldsLoader'
import JSchemaObject from '@/components/form/JSchemaObject'
import TextInput2 from '@/components/form/TextInput2'
//fields['TextInput2']=TextInput2fields['JSchemaObject']=JSchemaObject
Vue.component('JSchemaObject',JSchemaObject)
Vue.component('TextInput2',TextInput2)
for(let cmp_name in fields) {
  Vue.component(cmp_name, fields[cmp_name])
}

export default {
  name: 'JSchemaObject',
  mixins: [Proto],
  props: {
    rootObj:{
      default(){
        return null;
      }
    },
    value: {
      type: Object,
      default() {
        return {}
      }
    },
    sectsKeys: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentFieldName: this.currentKey,
      sectionKeys: null,
      isReady:false,
      isVisible:{}
    }
  },
  created() {
    
    if (this.rootObj){
      //assign local root object variavle to avoid changing prop

      this.$rootObj=this.rootObj;
    }else{
      //receive nothing from rootObc prop
      //i am root myself

      //assign local root object variavle to avoid changing prop, try this.rootObj=this
      this.$rootObj=this;
      this.isRoot=true;
      this.toWatch=[];
    }
    for (let $child_key in this.schema.properties){
      let $child_schema=this.schema.properties[$child_key];
      let $this=this;
      this.$set(this.isVisible,$child_key,true);
      if ($child_schema.attrs){
        if ($child_schema.attrs.dependsOn){
          // render initial depend status
          let $vis=this.$rootObj.checkVisible($child_schema.attrs.dependsOn);
          if (!$vis){
            this.$set(this.isVisible,$child_key,$vis);
          }
          // hook the watch
          this.$rootObj.$watch(
              'value.'+$child_schema.attrs.dependsOn.name,
              function($oldVal,$newVal){
                console.log("Change",$child_schema.attrs.dependsOn.name,)
                $this.$set($this.isVisible,$child_key,this.checkVisible($child_schema.attrs.dependsOn));
              }
          );
        }
      }
    }

    this.sectionKeys = this.sectsKeys
    this.isReady=true
  },
  methods: {
    getRootObj(){
      if (this.$rootObj){
        return this.$rootObj;
      }else{
        return this;
      }
    },
    getComponentName(field) {
      let $com = 'TextInput'
      let $type_field = {
        object: 'object',
        string: 'text',
        number: 'number',
        integer: 'number',
        array: 'checklist',
        boolean: 'radio'
      }
      let $field_com = {
        text: 'TextInput2',
        checklistwithother: 'CheckListWithOther',
        radio: 'bsRadioInput',
        checkbox: 'Checkbox',
        checklist: 'CheckList',
        selectList: 'SelectList',
        object: 'JSchemaObject',
        number: 'NumberInput',
        date: 'SelectDate',
        labtable: 'bsLabTable',
        familytree: 'FamilyTree',
        funcassess: 'FuncAssess'
      }
      if (field.type == 'object'){
        return 'JSchemaObject'
      }else{
        return 'TextInput2'
      }
        

    },
    clearInput() {
      // this.value[this.schema.attrs.fieldName] = null
      if (this.currentFieldName in this.value) {
        this.$set(this.value, this.currentFieldName, {})
      }
    },
    getPathVal($path){
      //get value with path like "personal_hx.cigarette.used"
      let segments = $path.split('.');
      let val=this.value;
      for (let seg of segments){
        val=val[seg]
        if (!val){
          return;
        }
      }
      return val;

    },
    checkVisible($dependsOn) {

      if ($dependsOn.values && $dependsOn.name) {
        let val=this.getPathVal($dependsOn.name);
        if (Array.isArray(val)) {
          
          for (let $dep_val of $dependsOn.values) {
            if ( val.includes($dep_val)) {
              return true
            } else {
              //do nothing the check next $dep_val
            }
          }
          //this.clearInput()
          return false;
        } else {
          if ( $dependsOn.values.includes(val)) {
            return true
          } else {
            //this.clearInput()
            return false
          }
        }
      }
      return true
    }

  },
  computed: {
    val:{
      get() { return this.value },
      set(val) {
        this.$emit('input', val)
      }
    }
  }

}
</script>

<style>
.obj_box {
  padding: 1rem;
}
.display-inline {
  display: inline-block;
}
.padding-left {
  padding-left: 3px;
}
</style>


