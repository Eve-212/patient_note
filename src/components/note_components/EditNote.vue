<template>
  <div classgit="row" :class="{isExpanded: isExpanded}" v-scroll-spy="{ sectionSelector: '.scroll-watch', offset: 100 }">    
    <Note class="col-12 col-sm-10 mt-4 px-0" :schema="noteSchema" :schemaData="data"></Note>
    <SectionNav class="col-sm-2 d-none d-xl-block mt-4" :schema="noteSchema"></SectionNav>
  </div>
</template>

<script>
import Note from '../Note'
import SectionNav from '../SectionNav'
import ObjectComponent from '../utility_components/ObjectComponent'
import axios from 'axios'
import { mapActions } from 'vuex'

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
      isLoaded: false
    }
  },
  watch: {
    fee_no: function() {
      this.init();
    }
    
  },
  methods: {
    // getSectionKeys: function() {
    //   let sectionKeys = Object.keys(this.noteSchema.properties.content.properties)
    //   console.log(sectionKeys)
    //   return sectionKeys
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
    // check if patient has a fee_no
    // use fee_no to get patient data
    // FIXME: need to handle error when no fee_no
    init() {
      if (this.fee_no) {
        // attempt to get patient data from sess_cache using fee_no
        this.sess = this.$wf.note.sess_cache[this.fee_no]
        if (!this.sess) { // if patient data does not exist in sess_cache          
          // then get patient data from database using fee_no
          this.$wf.note.sess({ no: this.fee_no }).then($raw => {
            if ($raw.data.fee_no) {
              this.sess = $raw.data
              // call load function to load retrieved patient data into component's data object
              this.load()
            }
          })
        } else { // use load function to load patient data retrieved from sess_cache into component's data object
          this.load()
        }
      }
    },
    
    load() {
      // ???      
      let $id
      console.log(this.sess.admission.id)
      if (($id = this.sess.admission.id)) {
        this.$wf.note.get({ id: $id }).then($raw => {
          this.prepare_data(this.noteSchema, $raw.data)
          this.data = $raw.data.content
          this.meta = $raw.data
          this.isLoaded=true
        })
      } else {
        // set $ipd to retrieved patient ipd (inpatient data)
        let $ipd = this.sess.ipd
        this.meta = {
          type: 'admission',
          sch_ver: this.noteSchema.ver,
          rev: 0
        }
        // init $data as object containing empty profile object
        let $data = { profile: {} }
        // populate profile field
        // for (let $col of ['name', 'fee_no', 'birthdate', 'sex']) {
        //   $data.profile[$col] = $ipd[$col]
        // }

        
        // changed for...in loop to use forEach
        // see: https://stackoverflow.com/questions/500504/why-is-using-for-in-with-array-iteration-a-bad-idea
        let profileFields = ['name', 'fee_no', 'birthdate', 'sex']
        profileFields.forEach(($col) => {   // populate profile field
          $data.profile[$col] = $ipd[$col]          
        }) 

        $data.admit_dept = $ipd.dept_id
        $data.admit_time = $ipd.start        
        
        this.prepare_data(this.noteSchema.properties.content, $data)
        this.data = $data
        // Form will not load unless isLoaded is true
        this.isLoaded=true
      }
    } /*,
    prepare_schema($sch){
      
    }*/
  },
  beforeCreate: function() {
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
      // this.$store.dispatch('loadSchema', this.noteSchema);      
      // console.log(this.$store.state.schema)      
      
      // prepare schema and data to load form
      this.init()
    })

    /*
    let $adm=this.sess.admission
    if(!$adm.id){
      //admission not exist
    }
    */
  },
  // computed: {
  //   getSectionKeys: function() {
  //     let sectionKeys = Object.keys(this.noteSchema.properties.content.properties)
  //     console.log(sectionKeys)
  //     return sectionKeys
  //   }
  // }
  watch: {
    fee_no(){
      this.init()
    }
  }
}
</script>
