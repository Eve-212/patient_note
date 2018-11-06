<template> 
	<div class="note-style" v-if="jsonSchema">
		<h2>{{ jsonSchema.title }}</h2>
			<div class="scroll-watch">
        <component 
          v-for="(field, key) in jsonSchema.properties.content.properties" 
          :key="key"
          :is="getComponentName(field)"
          :schema="field"
          :path="path.concat(key)"
          :currentKey="key"			
          v-model="jsonSchemaData">
        </component>
			</div>
      {{ schemaData }}
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
  name: 'Form',
  mixins: [Proto],
  props: {
    schemaData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      jsonSchemaData: this.schemaData,
      jsonSchema: this.schema
    }
  },
  created() {},
  watch: {
    schemaData($data) {
      this.jsonSchemaData = this.schemaData
    },
    schema($schema) {
      //this.jsonSchema = this.schema.properties.content
      this.jsonSchema = this.schema
    }
  },
  methods: {
    // TODO: should be able to default to JSON type (string, int, array etc.) if no custom fieldType given
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

    }
  }
}
</script>

<style lang="scss">
.note-style {
  .text-label {
    font-size: 14px !important;
  }

  h5 {
    margin-top: 15px;
    margin-bottom: 0;
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    &::before {
      font-family: 'Font Awesome 5 Free';
      font-weight: 600;
      content: '\f0c5';
      font-size: 1rem;
      margin-right: 5px;
      color: #17a2b8;
    }
    &.subsection-title {
      font-size: 1.3rem;
      padding-left: 15px;
      margin-bottom: -10px;
      &::before {
        font-family: 'Font Awesome 5 Free';
        font-weight: 600;
        content: '\f0da';
        font-size: 1rem;
        margin-right: 5px;
        color: orangered;
      }
    }
  }
  .reminder {
    margin-top: -15px;
    margin-bottom: 15px;
  }
  /* change family tree styles */
  .avat {
    border: none !important;
  }
}
</style>
