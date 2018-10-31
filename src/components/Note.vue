<template> 
<<<<<<< HEAD
	<div class="padding-left-temp">		
		<!-- <h2>{{ jsonSchema.title }}</h2>  
		{{ jsonSchema.title }}      
		<div v-for="(field, key) in jsonSchema.properties" :key="key">   	
		
			<component 				
				:is="getComponentName(field)"
				:schema="field"
				:currentKey="key"
				v-model="jsonSchemaData" ></component>

		</div> -->

		
=======
	<div class="scroll-watch">
>>>>>>> 4ba80cde14f0da1de31368188e59fe21f1d012af
		<h2>{{ schema.title }}</h2>  		
			<div class="row">   
			<component 
				v-for="(field, key) in jsonSchema.properties" 
				:key="key"
				:is="getComponentName(field)"
				:schema="field" 
				:path="path.concat(key)"
				:currentKey="key"			
				v-model="jsonSchemaData">
			</component>
			</div>
	</div>
</template>

<script>
<<<<<<< HEAD
import TextInput from "./input_components/TextInput"
import bsRadioInput from "./input_components/bsRadioInput"
import Checkbox from "./input_components/Checkbox"
import CheckList from "./input_components/CheckList"
import CheckListWithOther from "./input_components/CheckListWithOther"
import NumberInput from "./input_components/NumberInput"
import SelectDate from "./input_components/SelectDate"
import SelectList from "./input_components/SelectList"
import ObjectComponent from "./utility_components/ObjectComponent"
import FamilyTree from "./input_components/FamilyTree"
import bsLabTable from "./input_components/bsLabTable"
import OrgChart from "./input_components/OrgChart"
import FuncAssess from "./input_components/FuncAssess"
=======
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
import OrgChart from './input_components/OrgChart'
import FuncAssess from './input_components/FuncAssess'
>>>>>>> 4ba80cde14f0da1de31368188e59fe21f1d012af

export default {
  name: 'Note',
  components: {
    TextInput,
    bsRadioInput,
    Checkbox,
    CheckList,
    NumberInput,
    SelectDate,
    SelectList,
    ObjectComponent,
    CheckListWithOther,
    FamilyTree,
    bsLabTable,
    FuncAssess
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
      /*
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

<<<<<<< HEAD
<style>
.display-inline {
	display: inline-block;
}
.padding-left {
	padding-left: 3px;
}
.padding-left-temp {
	padding-left: 50px !important;
}
/* change family tree styles */
.avat {
  border: none !important;
=======
<style lang="scss">
.scroll-watch {
  .paddingY30 {
    padding: 0 30px;
  }

  .input-group-text {
    font-size: 14px !important;
  }

  h5 {
    margin-top: 15px;
    margin-bottom: 0;
    display: flex;
    align-items: center;
    &::before {
      font-family: 'Font Awesome 5 Free';
      font-weight: 600;
      content: '\f0c5';
      font-size: 14px;
      margin-right: 5px;
      color: #495057;
    }
  }

  /* change family tree styles */
  .avat {
    border: none !important;
  }
<<<<<<< HEAD

  // individual settings for demo
  #information-source .input-group,
  #rr--min- .input-group,
  #pain-score .input-group {
    margin-bottom: 0 !important;
  }

  #rr--min- .input-group {
    @media screen and (max-width: 1000px) {
      margin-bottom: 16px !important;
    }
  }
=======
>>>>>>> 4ba80cde14f0da1de31368188e59fe21f1d012af
}
.subsection-title {
  font-size: 1.0rem;
>>>>>>> 3a5975ed8abd79970ac633e3945f88f5fc07e279
}


</style>
