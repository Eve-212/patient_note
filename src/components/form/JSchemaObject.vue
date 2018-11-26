<template>
  <div v-if="isReady">   
    <h5 :id="anchorIdFormat(schema)" >{{ schema.title }}</h5>
    <div class="col-md-12">
      <div class="row">      
        <component
          v-for="(field, key) in schema.properties"           
          :rootObj="$rootObj"
          :key="key"
          :currentKey="key" 
          :is="getComponentName(field)" 
          :schema="field"
          v-bind="field.attrs" 
          :path="path.concat(key)"           
          v-model="val[key]"
          v-if="isVisible[key]"
          class="object-width">          
          <template slot="subTitle" slot-scope="{ description }">
            <small 
              v-if="description" 
              :id="helpText(field)" 
              class="text-muted reminder w-100">
              {{ description }}              
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

function register(name) {
  Vue.component(name, require('@/components/form/' + name).default)
}
for (let importField in fields) {
  register(importField)
}

export default {
  name: 'JSchemaObject',
  mixins: [Proto],
  props: {
    rootObj: {
      default() {
        return null
      }
    },
    rowGroup: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      getRowGroup: this.rowGroup,
      isReady: false,
      isVisible: {},
      child_key: null // for clarity, use child_key in obj comp and currentKey in input components
    }
  },  
  updated() {
    // console.log("UPDATED")
  },
  watch: {
    schema: {
      handler: function() {
        this.setVisible()
      },
      deep: true
    }    
  },
  created() {
    this.child_key = this.currentKey
    // set first object component instance as root object
    if (this.rootObj) {
      //assign local root object variable to avoid changing prop
      this.$rootObj = this.rootObj
    } else {
      // if no value is received in rootObj prop, then assign current object component as root
      this.$rootObj = this
      this.isRoot = true
      this.toWatch = []
    }

    for (let $child_key in this.schema.properties) {
      let $child_schema = this.schema.properties[$child_key]
      let $this = this
      this.$set(this.isVisible, $child_key, true)
      if ($child_schema.attrs) {
        if ($child_schema.attrs.dependsOn) {
          // render initial visibility tracker object
          let $vis = this.$rootObj.checkVisible($child_schema.attrs.dependsOn)
          if (!$vis) {
            this.$set(this.isVisible, $child_key, $vis) // $vis === false here
          }
          // set up watch for values in dependsOn
          // how to add watchers dynamically:
          // https://codingexplained.com/coding/front-end/vue-js/adding-removing-watchers-dynamically
          this.$rootObj.$watch(
            'value.' + $child_schema.attrs.dependsOn.name,
            function($oldVal, $newVal) {
              console.log('Change', $child_schema.attrs.dependsOn.name)
              let visibility = this.checkVisible($child_schema.attrs.dependsOn)
              $this.$set($this.isVisible, $child_key, visibility)

              console.log($child_schema)

              // if corrresponding isVisible value is false then clear data
              if (!visibility) {
                $this.clearInput($child_key, $child_schema)
              }
            }
          )
        }
      }
    }
    this.isReady = true
  },
  methods: {
    getRootObj() {
      if (this.$rootObj) {
        return this.$rootObj
      } else {
        return this
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
        textarea: 'quillTextArea',
        text: 'TextInput',
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
    clearInput(child_key, child_schema) {
      let initValue = null

      let child_schema_type = this.getComponentName(child_schema)

      switch (child_schema_type) {
        case 'TextInput':
          initValue = ''
          break
        case 'JSchemaObject':
          initValue = {}
          break
        case 'NumberInput':
          initValue = ''
          break
        case 'Checkbox':
          initValue = false
          break
        case 'CheckList':
          initValue = []
          break
        case 'CheckListWithOther':
          initValue = []
          break
        case 'RadioInput':
          initValue = ''
          break
        case 'SelectDate':
          initValue = ''
          break
        case 'SelectList':
          initValue = ''
          break
        case 'bsRadioInput':
          initValue = ''
          break
        case 'quillTextArea':
          initValue = ''
          break
      }

      this.$set(this.val, child_key, initValue)
    },
    setVisible() {
      for (let $child_key in this.schema.properties) {
        let $child_schema = this.schema.properties[$child_key]
        let $this = this
        this.$set(this.isVisible, $child_key, true)
        if ($child_schema.attrs) {
          if ($child_schema.attrs.dependsOn) {
            // render initial visibility tracker object
            let $vis = this.$rootObj.checkVisible($child_schema.attrs.dependsOn)
            if (!$vis) {
              this.$set(this.isVisible, $child_key, $vis) // $vis === false here
            }
            // set up watch for values in dependsOn
            // how to add watchers dynamically:
            // https://codingexplained.com/coding/front-end/vue-js/adding-removing-watchers-dynamically
            this.$rootObj.$watch(
              'value.' + $child_schema.attrs.dependsOn.name,
              function($oldVal, $newVal) {
                console.log('Change', $child_schema.attrs.dependsOn.name)
                let visibility = this.checkVisible($child_schema.attrs.dependsOn)
                $this.$set($this.isVisible, $child_key, visibility)

                console.log($child_schema)

                // if corrresponding isVisible value is false then clear data
                if (!visibility) {
                  $this.clearInput($child_key, $child_schema)
                }
              }
            )
          }
        }
      }
    },    
    getPathVal($path) {
      //get value with path like "personal_hx.cigarette.used"
      let segments = $path.split('.')
      let val = this.value
      for (let seg of segments) {
        val = val[seg]
        if (!val) {
          return
        }
      }
      return val
    },
    checkVisible($dependsOn) {
      if ($dependsOn.values && $dependsOn.name) {
        let val = this.getPathVal($dependsOn.name)
        if (Array.isArray(val)) {
          for (let $dep_val of $dependsOn.values) {
            if (val.includes($dep_val)) {
              return true
            }
          }
          return false
        } else {
          if ($dependsOn.values.includes(val)) {
            return true
          } else {
            return false
          }
        }
      }
      return true
    }
  }
}
</script>

<style>
.object-width {
  width: 100%;
}
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


