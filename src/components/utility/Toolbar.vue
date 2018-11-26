<template>
  <div class="btn-toolbar" role="toolbar" aria-label="Toolbar">
        
      <div class="mr-2">
        <!-- <div>
          File
        </div> -->
        <div class="btn-group" role="group" aria-label="First group">
          <button :title="save" type="button" class="btn btn-secondary"><i class="far fa-save"></i></button>      
          <button :title="bookmark" type="button" class="btn btn-secondary"><i class="far fa-bookmark"></i></button>
        </div>
      </div>    
      <div class="mr-2">
        <!-- <div>
          Note Types
        </div> -->
        <div class="btn-group" role="group" aria-label="Second group">
          <button :title="admission" type="button" class="btn btn-secondary">Admission</button>
          <button :title="progress" type="button" class="btn btn-secondary">Progress</button>
          <button :title="discharge" type="button" class="btn btn-secondary">Discharge</button>
        </div>
      </div>
      
      <div class="mr-2">
        <!-- <div>
          Settings
        </div> -->
        <div class="btn-group" role="group" aria-label="Third group">
          <button :title="setSchema" @click="toggleSchemaSelect" type="button" class="btn btn-secondary"><i class="far fa-clone"></i></button>
          <!-- <button type="button" class="btn btn-secondary"><i class="far fa-clone"></i></button>
          <button type="button" class="btn btn-secondary"><i class="far fa-clone"></i></button> -->
         
        </div>
      </div> 

      <div class="mr-2">
        <!-- <div>
          Mode
        </div> -->
        <div class="btn-group" role="group" aria-label="Third group">
          <button :title="edit" type="button" class="btn btn-secondary"><i class="far fa-edit"></i></button>
          <button :title="view" type="button" class="btn btn-secondary"><i class="far fa-eye"></i></button>
        </div>
      </div>             

      <!-- <div v-if="show" class="alert alert-primary">
        <ul>
          <li>
            <strong>Applied form schemas：</strong>
            <button class="btn btn-sm btn-secondary reset" @click="resetSchema">reset</button>
            <span v-for="tag in appliedSchemas" :key="tag" v-if="tag != base.tag" @click="removeSchema($event, tag)">
              <div>&#35;{{ tag }}</div>
            </span>              
          </li>
          <li>
            <strong>Available form schemas：</strong>
            <span v-for="schema in availableSchemas" :key="schema.tag" v-if="schema.tag != base.tag" @click="addSchema($event, schema.tag)">
              <div>&#35;{{ schema.tag }}</div>
            </span>                
          </li>
        </ul>
      </div>                        -->
  </div>
</template>

<script>
import mergeWith from 'lodash/mergeWith'
import isArray from 'lodash/isArray'

export default {
  name: "Toolbar",
  props: [ 'value', 'base' ],
  data() {
    return {
      show: false,
      save: "Save",
      bookmark: "Bookmark",
      admission: "Go to Admission Note",
      progress: "Go to Progress Note",
      discharge: "Go to Discharge Note",
      setSchema: "Select schemas to apply to form",
      edit: "Edit",
      view: "View",
      appliedSchemas: [],
      availableSchemas: [],
    }
  },
  methods: {
    toggleToolbar() {

    },
    toggleSchemaSelect() {
      // this.$emit('input', !this.value)
      this.show = !this.show
    },
    resetSchema() {
      this.appliedSchemas = [this.base.tag]
    },
    // update schema when a tag is clicked
    // https://stackoverflow.com/questions/49079170/how-to-get-values-of-an-item-in-the-loop-in-vue
    addSchema(event, tag) {
      if (!this.appliedSchemas.includes(tag)) {
        this.appliedSchemas.push(tag) // adds to list
      }
    },
    removeSchema(event, tag) {
      if (this.appliedSchemas.includes(tag)) {
        this.appliedSchemas = this.appliedSchemas.filter(item => item != tag)
      }
    },
  },
  watch: {
    appliedSchemas: {
      handler: function() {
        function customizer(objValue, srcValue) {
          if (isArray(objValue)) {
            // use Set to ensure uniqueness            
            return [...new Set(objValue.concat(srcValue))]
          }
        }         
        
        this.$emit('input', 
          mergeWith(
            {},
            ...this.availableSchemas.filter(sch =>
              this.appliedSchemas.includes(sch.tag)
            ),
            customizer
          )
        )      
      },
      deep: true
    }
  },
  created() {
    this.availableSchemas.push(
      require('../../../static/fake_data/sch.note.adm2.json')
    )
    this.availableSchemas.push(
      require('../../../static/fake_data/cardio_schema.json')
    )
    this.availableSchemas.push(
      require('../../../static/fake_data/er_schema.json')
    )
    
    // add base schema to availableSchemas
    this.appliedSchemas.push(this.base.tag)
  }
}
</script>

<style>
.btn-toolbar {
  font-size: 0.8rem;    
}



</style>
