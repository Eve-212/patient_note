<template>
  <div>
    <div v-if="status" class="loading">
      <p>{{status}}</p>
    </div>
    <div class="row" :class="{isExpanded: $store.state.sideExpanded}" v-if="isLoaded">
      <div class="col-12">
        <Toolbar v-model="currentSchema" :base="noteSchema" @saveData="updateData"></Toolbar>
      </div>

      <div class="col-lg-10 col-md-9 mt-5">
        <div v-if="showAlert" class="alert alert-danger">
          <strong>是否加入您的病人清單?</strong>
          <div>
            <button
              @click="closeAlert"
              class="btn btn-sm btn-danger"
              type="button"
              value="yes"
            >Yes</button>
            <button @click="closeAlert" class="btn btn-sm btn-danger" type="button" value="no">No</button>
            <button
              @click="closeAlert"
              class="btn btn-sm btn-danger"
              type="button"
              value="showLater"
            >Ask me later</button>
          </div>
        </div>
        <JSchemaObject
          v-model="data"
          :schema="currentSchema.properties.content"
          :sectionKeys="sectionKeys"
        ></JSchemaObject>
      </div>

      <SectionNav class="col-md-3 col-lg-2 d-none d-md-block mb-5" :sectionKeys="sectionKeys" :schema="currentSchema"></SectionNav>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

import SectionNav from '@/components/ui/SectionNav.vue'
import JSchemaObject from '@/components/form/JSchemaObject'
import cloneDeep from 'lodash/cloneDeep'
import Toolbar from './Toolbar.vue'

export default {
  name: 'EditNote',
  props: ['id', 'fee_no', 'note', 'type', 'sess'],
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
      // sess: null,
      isLoaded: false,
      currentSchema: null,
      showSchemaSelect: false,
      status: null,
      sectionKeys: null
    }
  },
  methods: {
    updateData() {
      this.$wf.ready().then($api => {
        
        $api.note
          .update({
            id: this.id,
            content: this.data
          })
          .then($api => {
            this.$awn.success('Data saved successfully')
          })
          .catch(err => {
            this.$awn.alert('Failed to save data.')
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
      let note
      let $rd
      if (this.id) {
        if (!this.note || this.note.id !== this.id) {
          //if note is passed by prop, load note with id
          $rd = await this.$wf.note.get({ id: this.id })
          if ($rd.data) {
            note = $rd.data
          }
        } else {
          //note is passed by prop
          note = this.note
        }
      } else {
        // must has type & fee_no
        // $rd=await this.$wf.note.get({fee_no:this.fee_no,type:this.type});

        // if ($rd.data){
        //   note=$rd.data;
        // }

        if (this.note) {
          // note is received as prop from header
          note = this.note
        }
      }

      this.prepare_data(this.currentSchema.properties.content, note.content)

      //this.data =note.content;

      if (note.status == 'init') {
        await this.preFill(note, note.content).catch($e => console.log($e))
      }
      //console.log(note);
      this.meta = note
      this.$set(this.$data, 'data', note.content)
      //console.log(this,note);

      this.isLoaded = true
    },
    async preFill(meta = this.meta, data = this.data) {
      //prefill basic data
      let $fee_no = meta.fee_no
      let $ipd
      if (this.sess) {
        $ipd = this.sess.ipd
      } else {
        // TODO: need to verify that ipd retrieved using below request is equal to ipd
        // retrieved in header via note.sess
        let $ipd_raw = await this.$wf.ipd.get({ no: $fee_no })
        $ipd = $ipd_raw.data
      }
      
      for (let $col of ['chr_no', 'name', 'fee_no', 'birthdate', 'sex']) {
        data.profile[$col] = $ipd[$col]
      }
      data.profile.admit_dept = $ipd.dept_id
      data.profile.admit_time = $ipd.start

      //prefill vitals
      let { data: $vitals } = await this.$wf.vitals.last({ no: meta.chr_no })
      if ($vitals) {
        data.nutrition.weight = $vitals.w
        data.nutrition.height = $vitals.h
        // TODO: BMI

        data.pe.vitals.bt = $vitals.bt
        data.pe.vitals.sbp = $vitals.sbp
        data.pe.vitals.dbp = $vitals.dbp
        data.pe.vitals.pr = $vitals.pr
        console.log($vitals)
      }
    },
    closeAlert() {
      this.showAlert = false
    }
  },
  async created() {
    this.status = 'loading'
    let api = await this.$wf.ready()
    let { data: $schema } = await api.note.schema()
    $schema = require('../../../static/fake_data/sch.note.adm2.json')
    this.noteSchema = $schema
    this.$set(this.$data, 'currentSchema', cloneDeep(this.noteSchema))
    
    
    // this.$set(this.$data, 'sectionKeys', Object.keys(this.currentSchema.properties.content.properties))
    
    
    this.load()
    this.status = ''
  },
  watch: {
    id() {
      this.load()
    },
    currentSchema: {
      handler: function() {
        // save all first level keys so that we can determine 
        // which input instances are the outermost input of a section
        this.$set(this.$data, 'sectionKeys', Object.keys(this.currentSchema.properties.content.properties))
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/main.scss';

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