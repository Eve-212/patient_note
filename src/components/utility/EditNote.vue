<template>      
 
    <div class="row" :class="{isExpanded: $store.state.sideExpanded}" v-if="isLoaded"> 
      
      <div class="editor-toolbar col-md-9 col-lg-10 position-fixed">
        <!-- FIXME: consider moving schema select section into toolbar -->
        <!-- <Toolbar v-model="showSchemaSelect"></Toolbar> -->
        <div class="row">
          <div class="col-md-12">
            <Toolbar v-model="currentSchema" :base="noteSchema"></Toolbar>
          </div>
        </div>
        
        
        <!-- <div v-if="showSchemaSelect" class="alert alert-primary col-md-2">
                <ul>
                  <li>
                    <strong>Applied form schemas：</strong>
                    <button class="btn btn-sm btn-secondary reset-btn" @click="resetSchema">reset</button>
                    <span v-for="tag in appliedSchemas" :key="tag" v-if="tag != noteSchema.tag" @click="removeSchema($event, tag)">
                      <div>&#35;{{ tag }}</div>
                    </span>              
                  </li>
                  <li>
                    <strong>Available form schemas：</strong>
                    <span v-for="schema in availableSchemas" :key="schema.tag" v-if="schema.tag != noteSchema.tag" @click="addSchema($event, schema.tag)">
                      <div>&#35;{{ schema.tag }}</div>
                    </span>                
                  </li>
                </ul>
              </div> -->

      </div>

      
      
      <div class="col-md-9 col-lg-10 my-sm-3 mt-4 editor-main">        
          <div class="row">
            <div class="col-md-12">                                       
              <!-- <div v-if="showSchemaSelect" class="alert alert-primary">
                <ul>
                  <li>
                    <strong>Applied form schemas：</strong>
                    <button class="btn btn-sm btn-secondary reset-btn" @click="resetSchema">reset</button>
                    <span v-for="tag in appliedSchemas" :key="tag" v-if="tag != noteSchema.tag" @click="removeSchema($event, tag)">
                      <div>&#35;{{ tag }}</div>
                    </span>              
                  </li>
                  <li>
                    <strong>Available form schemas：</strong>
                    <span v-for="schema in availableSchemas" :key="schema.tag" v-if="schema.tag != noteSchema.tag" @click="addSchema($event, schema.tag)">
                      <div>&#35;{{ schema.tag }}</div>
                    </span>                
                  </li>
                </ul>
              </div> -->
              
              <div v-if="showAlert" class="alert alert-danger">
                <strong>
                  是否加入您的病人清單?
                </strong>
                <div>
                  <button @click="closeAlert" class="btn btn-sm btn-danger" type="button" value="yes">Yes</button>
                  <button @click="closeAlert" class="btn btn-sm btn-danger" type="button" value="no">No</button>
                  <button @click="closeAlert" class="btn btn-sm btn-danger" type="button" value="showLater">Ask me later</button>
                </div>
              </div>
            </div>

            <JSchemaObject 
              class="col-md-12"   
              v-model="data" 
              :schema="currentSchema.properties.content">
            </JSchemaObject>

          </div>
      </div>
      
      <SectionNav 
        class="col-md-3 col-lg-2 d-none d-md-block mb-5" 
        :schema="currentSchema">
      </SectionNav>
    </div>
  
</template>

<script>
import Vue from 'vue'

import SectionNav from '@/components/ui/SectionNav.vue'
import JSchemaObject from '@/components/form/JSchemaObject'
// import mergeWith from 'lodash/mergeWith'
// import isArray from 'lodash/isArray'
import cloneDeep from 'lodash/cloneDeep'
import Toolbar from './Toolbar.vue'

export default {
  name: 'EditNote',
  props: ['fee_no'],
  components: {
    SectionNav,
    JSchemaObject,
    Toolbar
  },
  data() {
    return {
      showAlert: true,
      noteSchema: {},
      data: {},
      meta: {},
      sess: null,
      isLoaded: false,
      // appliedSchemas: [],
      // availableSchemas: [],
      currentSchema: null,
      status: '',
      showSchemaSelect: false
    }
  },
  methods: {
    // resetSchema() {
    //   this.appliedSchemas = [this.noteSchema.tag]
    // },
    // // update schema when a tag is clicked
    // // https://stackoverflow.com/questions/49079170/how-to-get-values-of-an-item-in-the-loop-in-vue
    // addSchema(event, tag) {
    //   if (!this.appliedSchemas.includes(tag)) {
    //     this.appliedSchemas.push(tag) // adds to list
    //   }
    // },
    // removeSchema(event, tag) {
    //   if (this.appliedSchemas.includes(tag)) {
    //     this.appliedSchemas = this.appliedSchemas.filter(item => item != tag)
    //   }
    // },
    // updateSchema(event, tag) {
    //   if (this.appliedSchemas.includes(tag)) {
    //     // removes from list
    //     this.appliedSchemas = this.appliedSchemas.filter(
    //       item => item != tag
    //     )
    //   } else {
    //     this.appliedSchemas.push(tag) // adds to list
    //   }
    // },
    // package structure of patient data so that it fits our schema
    prepare_data($schema, $data) {
      //let $tmps=$sch;
      //let $tmpd=$data;
      let $queue = [
        {
          sch: $schema,
          d: $data
        }
      ]
      while ($queue.length > 0) {
        let { sch: $sch, d: $d } = $queue.shift()
        if ($sch.properties) {
          for (let $child_name in $sch.properties) {
            if ($d[$child_name] === undefined) {
              switch ($sch.properties[$child_name].type) {
                case 'object':
                  $d[$child_name] = {}
                  break
                case 'array':
                  $d[$child_name] = []
                  break
                default:
                  $d[$child_name] = ''
              }
            }
            if ($sch.properties[$child_name]) {
              $queue.push({
                sch: $sch.properties[$child_name],
                d: $d[$child_name]
              })
            }
          }
        }
      }
    },
    // check if patient has a fee_no
    // use fee_no to get patient data
    // FIXME: need to handle error when no fee_no
    init() {
      if (this.fee_no) {
        // attempt to get patient data from sess_cache using fee_no
        this.sess = this.$wf.note.sess_cache[this.fee_no]
        if (!this.sess) {
          // if patient data does not exist in sess_cache
          // then get patient data from database using fee_no
          this.$wf.note.sess({ no: this.fee_no }).then($raw => {
            if ($raw.data.fee_no) {
              this.sess = $raw.data
              // call load function to load retrieved patient data into component's data object
              this.load()
            }
          })
        } else {
          // use load function to load patient data retrieved from sess_cache into component's data object
          this.load()
        }
      }
    },
    load() {
      let $id
      if (($id = this.sess.admission.id)) {
        // true if this.session.admission.id exists / else false
        this.$wf.note.get({ id: $id }).then($raw => {
          this.prepare_data(this.currentSchema, $raw.data)
          this.data = $raw.data.content
          this.meta = $raw.data
          this.isLoaded = true
        })
      } else {
        // set $ipd to retrieved patient ipd (inpatient data)
        let $ipd = this.sess.ipd
        this.meta = {
          type: 'admission',
          sch_ver: this.currentSchema.ver ? this.currentSchema.ver : null,
          rev: 0
        }
        // init $data as object containing empty profile object
        let $data = { profile: {} }
        // populate profile field
        for (let $col of ['chr_no', 'name', 'fee_no', 'birthdate', 'sex']) {
          $data.profile[$col] = $ipd[$col]
        }
        $data.admit_dept = $ipd.dept_id
        $data.admit_time = $ipd.start

        this.prepare_data(this.currentSchema.properties.content, $data)

        this.data = $data
        // Form will not load unless isLoaded is true
        this.isLoaded = true
      }
    } /*,
    prepare_schema($sch){
      
    }*/,
    closeAlert() {
      this.showAlert = false
    }
  },
  created: function() {
    this.status = 'Loading...'
    this.$wf.ready().then($api => {
      return $api.note.schema({ type: 'admission' }).then($raw => {
        this.noteSchema = require('../../../static/fake_data/sch.note.adm2.json')
        // this.$set(
        //   this.$data,
        //   'noteSchema',
        //   // require('../../../static/fake_data/sch.note.adm2.json')
        //   require('../../../static/fake_data/simple_base.json')
        // )

        // multiple async requests at once: https://stackoverflow.com/questions/50540079/axios-make-multiple-request-at-once-vue-js
        // make api requests to get all available schemas
        // determine available schemas using department of logged in user

        // FIXME: use admit_dept of patient to determine which schemas should added to available schemas list

        // this.availableSchemas.push(
        //   require('../../../static/fake_data/sch.note.adm2.json')
        // )
        // this.availableSchemas.push(
        //   require('../../../static/fake_data/cardio_schema.json')
        // )
        // this.availableSchemas.push(
        //   require('../../../static/fake_data/er_schema.json')
        // )

        // // TODO
        // // apply name of base schema to appliedSchemas
        // // add base schema to availableSchemas
        // this.appliedSchemas.push(this.noteSchema.tag)

        this.$set(this.$data, 'currentSchema', cloneDeep(this.noteSchema))
        console.log(this)
        this.init()
        this.status = ''
      })
    })
    
  },
  watch: {
    fee_no() {
      this.init()
    },
    currentSchema: {
      handler: function() {
        console.log("CHANGE IN IN")

        console.log(this.currentSchema)
        console.log(this)
        // this.init()
        // this.$nextTick(this.$forceUpdate())
      },
      deep: true
    }    
    // appliedSchemas: {
    //   handler: function() {
    //     function customizer(objValue, srcValue) {
    //       if (isArray(objValue)) {
    //         // use Set to ensure uniqueness            
    //         return [...new Set(objValue.concat(srcValue))]
    //       }
    //     }

          

          
    //     this.$set(
    //       this.$data,
    //       'currentSchema',
    //       mergeWith(
    //         {},
    //         ...this.availableSchemas.filter(sch =>
    //           this.appliedSchemas.includes(sch.tag)
    //         ),
    //         customizer
    //       )
    //     )        
    //   },
    //   deep: true
    // }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/main.scss';
.editor-toolbar {
  margin-top: -8px;
  // margin-top: 0px;

  // background-color: $color-grey-light;
  background-color: red;
  
  max-width: 78%;
  
  
  z-index: 99;
  @media screen and (max-width: $break-medium) {
        margin-top: 30px;        
        max-width: 74%;
      }
  
   @media screen and (max-width: $break-small) {
        margin-top: 28px;
      }
}

.editor-main {
  padding-top: 2rem;
  @media screen and (max-width: $break-medium) {
        padding-top: 3rem;
      }

  @media screen and (max-width: $break-small) {
        
      }
}

.reset-btn {
  margin-right: 5px;
  padding: 0 3px;
  background-color: #cccccc !important;
  color: teal !important;
}

.alert-container {
  width: 100%;
  margin-right: 0.95rem !important;
  padding-right: 5px;
}

.alert {
  font-size: $default-font-size;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 8px 15px;
  margin: 0 auto 0.5rem;
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
  &-danger {
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: $break-small) {
      align-items: flex-start;
      flex-direction: column;
    }
    button {
      @media screen and (max-width: $break-small) {
        margin-top: 0.5rem;
      }
    }
  }
}
</style>