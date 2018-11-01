<template> 
	<div class="note-style">
		<h2>{{ schema.title }}</h2>  		
			<div class="row scroll-watch">   
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
import TextInput from './input_components/TextInput'
import RadioInput from './input_components/RadioInput'
import bsRadioInput from './input_components/bsRadioInput'
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

<style lang="scss">
.note-style {
  .input-group-text {
    font-size: 14px !important;
  }

  h2 {
    margin-left: -15px;
    text-transform: uppercase;
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
}

#chief-complaint,
#present-illness,
#travel-history,
#note,
#consciousness {
  margin: 0 15px;
}

#birth-date,
#time-of-admission,
#time-of-history-taking {
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -ms-flex-align: center;
  -webkit-box-align: center;
  @media screen and (max-width: 1000px) {
    margin-bottom: 16px !important;
  }
  label {
    font-size: 14px !important;
    align-items: center;
    padding: 0.375rem 0.75rem;
    margin-bottom: 0;
    font-size: 1rem;
    font-weight: 400;
    height: 38px;
    line-height: 24px;
    color: #495057;
    text-align: center;
    white-space: nowrap;
    background-color: #e9ecef;
    border: 1px solid #ced4da;
    border-right: 0;
    border-radius: 0.25rem;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  input {
    font-size: 14px !important;
    display: block;
    width: 100%;
    height: calc(2.25rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    -webkit-transition: border-color 0.15s ease-in-out,
      -webkit-box-shadow 0.15s ease-in-out;
    transition: border-color 0.15s ease-in-out,
      -webkit-box-shadow 0.15s ease-in-out;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
      -webkit-box-shadow 0.15s ease-in-out;
  }
}

#time-of-admission,
#time-of-history-taking {
  margin-bottom: 16px !important;
}
</style>
