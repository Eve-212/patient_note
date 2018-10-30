<template> 
	<div>		
		<!-- <h2>{{ jsonSchema.title }}</h2>  
		{{ jsonSchema.title }}      
		<div v-for="(field, key) in jsonSchema.properties" :key="key">   	
		
			<component 				
				:is="getComponentName(field)"
				:schema="field"
				:currentKey="key"
				v-model="jsonSchemaData" ></component>

		</div> -->

		<h2>{{ schema.title }}</h2>   		   
		<div class="container-fluid"> 
			<div v-scroll-spy="{ offset: 100 } " class="row">        
			<component 
				class="col-md-12"
				v-for="(field, key) in jsonSchema.properties" :key="key"
				:is="getComponentName(field)"
				:schema="field" 
				:path="path.concat(key)"
				:currentKey="key"
				v-model="jsonSchemaData">
			</component>
			</div>

			

		</div>
			
		
		
		
		
		  
	</div>
</template>

<script>
import TextInput from './input_components/TextInput'
import RadioInput from './input_components/RadioInput'
import Checkbox from './input_components/Checkbox'
import CheckList from './input_components/CheckList'
import CheckListWithOther from './input_components/CheckListWithOther'
import NumberInput from './input_components/NumberInput'
import SelectDate from './input_components/SelectDate'
import SelectList from './input_components/SelectList'
import ObjectComponent from './utility_components/ObjectComponent'
import FamilyTree from './input_components/FamilyTree'
import bsLabTable from './input_components/bsLabTable'
export default {
  name: 'Note',
  components: {
    TextInput,
    RadioInput,
    Checkbox,
    CheckList,
    NumberInput,
    SelectDate,
    SelectList,
    ObjectComponent,
    CheckListWithOther,
    FamilyTree,
    bsLabTable
  },
  props: {
    schema: {
      type: Object,
      default() {
        return {}
      }
    },
    schemaData: {
      type: Object,
      default() {
        return {}
      }
    },
    path: {
      type: Array,
      default() {
        return []
      }
    },
    currentKey: {
      type: String,
      default() {
        return ''
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
      this.jsonSchema = this.schema.properties.content
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
        radio: 'RadioInput',
        checkbox: 'Checkbox',
        checklist: 'CheckList',
        selectList: 'SelectList',
        object: 'ObjectComponent',
        number: 'NumberInput',
        date: 'SelectDate',
        labtable: 'bsLabTable'
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
      /*
      return $field_com[field.attrs.fieldType] || 'TextInput'
      /*
>>>>>>> bcd65a79b814cd037ed462df2606a6154b9bdc29
			if (!(field.attrs && field.attrs.fieldType)) {
				if (field.type === 'string') {
					return "TextInput"
				}
				else if (field.type === 'number' || field.type === 'integer') {
					return "NumberInput"
				}			
				else if (field.type === 'object') {
					return "ObjectComponent"
				}		
				else if (field.type === 'array') {
					return "CheckList"
				}	
			}

			switch (field.attrs.fieldType) {
				case "text":
					return "TextInput"
				case "checklistwithother":
					return "CheckListWithOther"
				case "radio":
					return "RadioInput"
				case "checkbox":
					return "Checkbox"
				case "checklist":
					return "CheckList"
				case "selectList":
					return "SelectList"
				case "object": 
					return "ObjectComponent"
				case "number": 
					return "NumberInput"
				case "date": 
					return "SelectDate"
			}
			*/
    }
  }
}
</script>

<style>
.display-inline {
  display: inline-block;
}
.padding-left {
  padding-left: 3px;
}
.padding-left-large {
  padding-left: 20px;
}
/* change family tree styles */
/* .avat {
  border: none !important;
<<<<<<< HEAD
} */
</style>
