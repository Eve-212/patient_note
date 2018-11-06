<template>
  <div v-if="showInputField" :class="[bsColSize]">
    <h5 :id="anchorIdFormat(schema)" :class="[styleClass]">{{ schema.title }}</h5>
    <div class="obj_box row scroll-watch">
      <component 
        v-for="(field, key) in schema.properties" 
        :key="key" 
        :is="getComponentName(field)" 
        :schema="field" 
        :path="path.concat(key)" 
        :currentKey="key" 
        v-model="value[currentFieldName]">
      </component>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Proto from '@/components/mixin/Proto.js'
import * as fields from '@/components/form_components/fieldsLoader'

function register (name) {
  Vue.component(name, require('@/components/form_components/' + name).default)
}
for(let importField in fields) {
  register(importField)
}

export default {
  name: 'ObjectComponent',
  mixins: [Proto],
  props: {
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
      sectionKeys: null
    }
  },
  created() {
    if (!(this.currentFieldName in this.value)) {
      // this.value[this.currentFieldName] = {}
      // this.$emit('input', this.value)
      this.$set(this.value, this.currentFieldName, {})
      //this.value["keyOnCreate"] = {};
    }

    this.sectionKeys = this.sectsKeys
  },
  methods: {
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
        text: 'TextInput',
        checklistwithother: 'CheckListWithOther',
        radio: 'bsRadioInput',
        checkbox: 'Checkbox',
        checklist: 'CheckList',
        selectList: 'SelectList',
        object: 'ObjectComponent',
        number: 'NumberInput',
        date: 'SelectDate',
        labtable: 'bsLabTable',
        familytree: 'FamilyTree',
        funcassess: 'FuncAssess'
      }
      if (!field.attrs) {
        field.attrs = {}
      }
      if (!field.attrs.fieldType) {
        if (field.type) {
          field.attrs.fieldType = $type_field[field.type]
        } else {
          field.attrs.fieldType = 'text'
        }
      }
      return $field_com[field.attrs.fieldType] || 'TextInput'
    },
    clearInput() {
      // this.value[this.schema.attrs.fieldName] = null
      if (this.currentFieldName in this.value) {
        this.$set(this.value, this.currentFieldName, {})
      }
    }
  },
  computed: {
    showInputField() {
      let schemaAttrs = this.schema.attrs
      //dependsOn name is Array?
      if (schemaAttrs) {
        if (schemaAttrs.dependsOn) {
          if (schemaAttrs.dependsOn.values && schemaAttrs.dependsOn.name) {
            if (Array.isArray(this.value[schemaAttrs.dependsOn.name])) {
              for (let i = 0; i < schemaAttrs.dependsOn.values.length; i++) {
                if (
                  this.value[schemaAttrs.dependsOn.name].indexOf(
                    schemaAttrs.dependsOn.values[i]
                  ) !== -1
                ) {
                  return true
                } else {
                  this.clearInput()
                  return false
                }
              }
            } else {
              if (
                schemaAttrs.dependsOn.values.indexOf(
                  this.value[schemaAttrs.dependsOn.name]
                ) !== -1
              ) {
                return true
              } else {
                this.clearInput()
                return false
              }
            }
          }
          return true
        }
        return true
      }
      return true
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


