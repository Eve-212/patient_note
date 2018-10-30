<template>
  <div v-scroll-spy="{ offset: 100 }" :class="{isExpanded: isExpanded}">
    <div class="row">    
      <!-- <h1 class="note-title">{{ noteSchema.title }}</h1>  		   
      <div v-for="(schema, key) in noteSchema.properties" :key="key">      
        <Section :schema="schema" :currentKey="key"></Section>
        <ObjectComponent :schema="schema" :currentKey="key"></ObjectComponent>
      </div> -->
      <SectionNav class="col-xl-2 d-none d-xl-block" :schema="noteSchema"></SectionNav>
    </div>
    <Note class="col-xl-9" :schema="noteSchema" :schemaData="data"></Note>
  </div>
</template>

<script>
import Note from '../Note'
import SectionNav from '../SectionNav'
import ObjectComponent from '../utility_components/ObjectComponent'
import axios from 'axios'

export default {
  name: 'EditNote',
  props: ['isExpanded', 'fee_no'],
  components: {
    Note,
    ObjectComponent,
    SectionNav
  },
  data() {
    return {
      noteSchema: null,
      data: {},
      meta: {},
      sess: null,
      fee_no: null
    }
  },
  methods: {
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
            if ($d[$child_name].properties) {
              $queue.push({
                sch: $sch.properties[$child_name],
                d: $d[$child_name]
              })
            }
          }
        }
      }
    },
    init() {
      if (this.fee_no) {
        this.sess = this.$wf.note.sess_cache[this.fee_no]
        if (!this.sess) {
          this.$wf.note.sess({ no: this.fee_no }).then($raw => {
            if ($raw.data.fee_no) {
              this.sess = $raw.data
              this.load()
            }
          })
        } else {
          this.load()
        }
      }
    },
    load() {
      let $id
      if (($id = this.sess.admission.id)) {
        this.$wf.note.get({ id: $id }).then($raw => {
          this.prepare_data(this.noteSchema, $raw.data)
          this.data = $raw.data.content
          this.meta = $raw.data
        })
      } else {
        let $ipd = this.sess.ipd
        this.meta = {
          type: 'admission',
          sch_ver: this.noteSchema.ver,
          rev: 0
        }
        let $data = { profile: {} }
        for (let $col of ['name', 'fee_no', 'birthdate', 'sex']) {
          $data.profile[$col] = $ipd[$col]
        }
        $data.admit_dept = $ipd.dept_id
        $data.admit_time = $ipd.start
        this.prepare_data(this.noteSchema.properties.content, $data)
        this.data = $data
      }
    } /*,
    prepare_schema($sch){
      
    }*/
  },
  created: function() {
    // axios.get('fake_data/schemas.json')
    // .then((res) => {
    //   console.log(res.body)
    //   console.log("yay")
    // })
    //const json = require("../../../static/fake_data/schemas2.json")

    //this.noteSchema = json
    this.noteSchema = {}
    this.$wf.note.schema({ type: 'admission' }).then($raw => {
      //
      //this.noteSchema=$raw.data
      this.noteSchema = require('../../../static/fake_data/sch.note.adm.json')
      this.init()
    })

    /*
    let $adm=this.sess.admission
    if(!$adm.id){
      //admission not exist
    }
    */
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/global.scss';

// .note-title {
//   font-size: 2.0rem;
// }
</style>
