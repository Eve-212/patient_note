<template>
  <div class="note-toolbar">
    <div class="toolbar-left">
      <div class="toolbar-group">
        <div :title="save" class="toolbar-item" @click="saveData">
          <i class="far fa-save"></i> Save
        </div>
        <div :title="undo" class="toolbar-item">
          <i class="fas fa-undo"></i> Undo
        </div>
      </div>

      <div class="toolbar-group">
        <div :title="view" class="toolbar-item">
          <i class="far fa-eye"></i> View
        </div>
        <div :title="edit" class="toolbar-item">
          <i class="far fa-edit"></i> Edit
        </div>
      </div>

      <div class="toolbar-group">
        <div class="set-schema">
          <div :title="setSchema" class="toolbar-item" @click.prevent="toggleSchemaSelect">
            <i class="far fa-plus-square"></i> Add Schemas
          </div>

          <modal v-if="modalShow" @close="modalShow = false">
            <div class="modal-custom" slot="body">
              <div>
                <div class="alert alert-primary">
                  <ul>
                    <li>
                      <strong>Applied schemas：</strong>
                      <span
                        v-for="tag in appliedSchemas"
                        :key="tag"
                        v-if="tag != base.tag"
                        @click="removeSchema($event, tag)"
                      >
                        <div>&#35;{{ tag }}</div>
                      </span>
                    </li>
                    <li>
                      <strong>Available schemas：</strong>
                      <span
                        v-for="schema in availableSchemas"
                        :key="schema.tag"
                        v-if="schema.tag != base.tag"
                        @click="addSchema($event, schema.tag)"
                      >
                        <div>&#35;{{ schema.tag }}</div>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </modal>
        </div>

        <div :title="reset" class="toolbar-item" @click.prevent="resetSchema">
          <i class="far fa-file"></i> Reset Schema
        </div>
      </div>
    </div>

    <div class="toolbar-right">
      <div class="toolbar-group">
        <div :title="bookmarkAdd" class="toolbar-item toolbar-item__bookmark">
          <i class="far fa-bookmark"></i> Bookmark
        </div>
        <div :title="submit" class="toolbar-item">
          <i class="fas fa-check"></i> Submit
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mergeWith from 'lodash/mergeWith'
import isArray from 'lodash/isArray'

import Modal from '../ui/Modal'

export default {
  name: 'Toolbar',
  components: {
    Modal
  },
  props: ['value', 'base'],
  data() {
    return {
      modalShow: false,
      save: 'Save',
      bookmarkAdd: '加入病人清單',
      bookmarkRemove: 'Remove patient from dashboard',
      // admission: "Go to Admission Note",
      // progress: "Go to Progress Note",
      // discharge: "Go to Discharge Note",
      setSchema: 'Select form schemas',
      edit: 'Edit',
      view: 'View',
      submit: 'Submit',
      undo: 'Undo',
      reset: 'Reset to base schema',
      appliedSchemas: [],
      availableSchemas: []
    }
  },
  methods: {
    saveData() {
      this.$emit('saveData')
    },
    // makeCall() {              
    //   this.$wf.ready().then($api => {
    //     console.log(this.data)
    //      $api.note.update({
    //       id: 'razvCeG',
    //       content: this.data,
    //       }).then($api => {
    //       console.log($api)
    //     }).catch(err => {
    //       console.log(err)
    //     })
    //   })
    // },
    toggleToolbar() {},
    toggleSchemaSelect() {
      // this.$emit('input', !this.value)
      this.modalShow = !this.modalShow
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
    }
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

        this.$emit(
          'input',
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

<style lang="scss" scoped>
@import '@/assets/sass/main.scss';

.modal-container {
  width: 600px !important;
}

.note-toolbar {
  margin: -1.5rem 0 0 -2.4rem;
  width: 100%;
  position: fixed;
  display: flex;
  justify-content: space-between;
  background-color: $color-white;
  box-shadow: 0px 2px 7px -3px rgba(0, 0, 0, 0.3);
}

.toolbar-left {
  display: flex;
}

.toolbar-right {
  display: flex;
  padding-right: 3.7rem;
}

.toolbar-group {
  display: flex;
  margin: 5px 0;
  align-items: center;
  z-index: 999;  
  color: #666666;      
}

.toolbar-item {
  padding: 0.3rem 0.4rem 0.3rem 0.4rem;
  font-size: 0.9rem; 
  margin: 0 3px 0 3px; 
  cursor: pointer;
  &__bookmark {
    justify-self: flex-end;
  }
}

.set-schema {
  position: relative;
  user-select: none;
}

.set-schema__popover {
  position: absolute;
  top: 42px;
  background-color: darken($color-grey-light, 5%);
  padding: 0.7rem 0.5rem 0;
  color: #aaacac;
  min-width: 300px;
  /* box-shadow: 7px 8px 5px -3px rgba(0, 0, 0, 0.1); */
  box-shadow: 0px 0px 15px -3px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
}

.set-schema__popover:before {
  position: absolute;
  content: '';
  left: 3%;
  top: -11px;
  border-style: solid;
  border-width: 0 12px 15px 5px;
  border-color: transparent transparent darken($color-grey-light, 5%)
    transparent;
}

.reset-btn {
  margin-right: 5px;
  padding: 0 3px;
  background-color: white;
  color: black;
}

.alert {
  font-size: $default-font-size;
  background-color: white;
  border: none !important;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 15px;
  margin: 0 auto 0.5rem;
  color: black;
  @media screen and (max-width: $break-medium) {
    margin: 1rem auto 0rem;
  }
  float: none;
  &-primary {
    ul {
      padding-left: 0;
      list-style: none;
      margin: auto 0;
      li {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        padding: 3px 0;
        span {
          letter-spacing: 0.05rem;
          cursor: pointer;
          padding: 0 0.3rem;
          border: 1px solid #004085;
          border-radius: 3px;
          margin-right: 0.3rem;
          opacity: 0.7;
          &:hover {
            opacity: 1;
          }
        }
      }
    }
  }
}

.modal-custom {
  input {
    position: absolute;
    top: -999px;
  }
  label {
    margin: 0 5px;
  }
}
</style>




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