<template>
  <div>
    <div v-if="status" class="loading">
      <p>{{status}}</p>
    </div>
    <div
      class="row my-md-4 mt-5 mb-3"
      :class="{isExpanded: $store.state.sideExpanded}"
      v-if="isLoaded"
    >
      <div class="editor-toolbar col-md-9 col-lg-10 position-fixed">
        <div class="row">
          <div class="col-md-12">
            <Toolbar v-model="currentSchema" :base="noteSchema" @saveData="updateData"></Toolbar>
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
        </div>-->
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
            </div>-->
            <div v-if="showAlert" class="alert alert-danger">
              <strong>是否加入您的病人清單?</strong>
              <div>
                <button
                  @click="closeAlert"
                  class="btn btn-sm btn-danger"
                  type="button"
                  value="yes"
                >Yes</button>
                <button
                  @click="closeAlert"
                  class="btn btn-sm btn-danger"
                  type="button"
                  value="no"
                >No</button>
                <button
                  @click="closeAlert"
                  class="btn btn-sm btn-danger"
                  type="button"
                  value="showLater"
                >Ask me later</button>
              </div>
            </div>
          </div>

          <JSchemaObject
            class="col-md-12"
            v-model="data"
            :schema="currentSchema.properties.content"
          ></JSchemaObject>
        </div>
      </div>

      <SectionNav class="col-md-3 col-lg-2 d-none d-md-block mb-5" :schema="currentSchema"></SectionNav>
    </div>
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
  props: ['id', 'fee_no','note','type'],
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
      showSchemaSelect: false,
      status: null
    }
  },
  methods: {
    updateData() {
      console.log(this.$wf)
      this.$wf.ready().then($api => {
        console.log(this.data)
        $api.note
          .update({
            id: this.id,
            content: this.data
          })
          .then($api => {
            console.log($api)
          })
          .catch(err => {
            console.log(err)
          })
      })
    },
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
    
    async load() {
      
      let note;
      let $rd;
      if(this.id){
        
        if (!this.note || this.note.id!==this.id){
          //if note is passed by prop, load note with id
          $rd=await this.$wf.note.get({id:this.id});
          if ($rd.data){
            note=$rd.data;
          }
        }else{
          //note is passed by prop
          note=this.note;
        }
      }else{
        //must has type & fee_no
        $rd=await this.$wf.note.get({fee_no:this.fee_no,type:this.type});
        
        if ($rd.data){
          note=$rd.data;
        }
      }
      

      this.prepare_data(this.currentSchema.properties.content, note.content);

      //this.data =note.content;
     
      if (note.status=='init'){
        await this.preFill(note,note.content).catch( $e => console.log($e) );
      }
      //console.log(note);
      this.meta = note;
      this.$set(this.$data, 'data', note.content)
      //console.log(this,note);
      
      this.isLoaded = true;
    },
    async preFill(meta=this.meta,data=this.data){
      //prefill basic data
      let $fee_no=meta.fee_no;
      let $ipd;
      if(this.sess){
        $ipd=this.sess.ipd;
      }else{
        let $ipd_raw = await this.$wf.ipd.get({no:$fee_no});
        $ipd=$ipd_raw.data;
      }
      console.log('ipd',$ipd);
      for (let $col of ['chr_no', 'name', 'fee_no', 'birthdate', 'sex']) {
        data.profile[$col] = $ipd[$col];
      }
      data.profile.admit_dept = $ipd.dept_id;
      data.profile.admit_time = $ipd.start;

      //prefill vitals
      let {data:$vitals}=await this.$wf.vitals.last({no:meta.chr_no});
      if ($vitals){      
        data.nutrition.weight=$vitals.w;
        data.nutrition.height=$vitals.h;
        //TODO: BMI

        data.pe.vitals.bt=$vitals.bt;
        data.pe.vitals.sbp=$vitals.sbp;
        data.pe.vitals.dbp=$vitals.dbp;
        data.pe.vitals.pr=$vitals.pr;
        console.log($vitals);
      }
    },
    closeAlert() {
      this.showAlert = false
    }
  },
  async created() {
    this.status = 'loading'
    let api=await this.$wf.ready()
    let {data:$schema}=await api.note.schema()
    $schema=require('../../../static/fake_data/sch.note.adm2.json')
    this.noteSchema=$schema
    this.$set(this.$data, 'currentSchema', cloneDeep(this.noteSchema))
    this.load()
    this.status = ''
    
  },
  watch: {
    id() {
      this.load()
    },
    currentSchema: {
      handler: function() {},
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
  // background-color: red;

  // max-width: 78%;

  z-index: 99;
  @media screen and (max-width: $break-medium) {
    margin-top: 30px;
    // max-width: 74%;
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