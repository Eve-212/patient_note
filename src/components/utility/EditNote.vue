<template>
  <div :class="{isExpanded: $store.state.MainPushed}" v-if="noteSchema">
    <div class="row">    
      <Form class="col-md-10 mb-5" :schema="noteSchema" :schemaData="data"></Form>
      <SectionNav class="col-md-2 d-none d-md-block mb-5" :schema="noteSchema"></SectionNav>
    </div>
  </div>
</template>

<script>
import Form from '@/components/form/Form.vue'
import SectionNav from '@/components/ui/SectionNav.vue'
import axios from 'axios'
import { mapActions } from 'vuex'

export default {
  name: 'EditNote',
  props: ['fee_no'],
  components: {
    Form,
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
  // watch: {
  //   fee_no: function() {
  //     // console.log("ddd")
  //     // console.log(this.data)
  //     // this.data = {}
  //     // console.log(this.data)
  //     this.init();
  //   }

  // },
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
                  console.log($child_name)
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
          this.prepare_data(this.noteSchema, $raw.data)
          this.data = $raw.data.content
          this.meta = $raw.data
          this.isLoaded = true
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
        for (let $col of ['name', 'fee_no', 'birthdate', 'sex']) {
          $data.profile[$col] = $ipd[$col]
        }

        // changed for...in loop to use forEach
        // see: https://stackoverflow.com/questions/500504/why-is-using-for-in-with-array-iteration-a-bad-idea
        // let profileFields = ['name', 'fee_no', 'birthdate', 'sex']
        // profileFields.forEach(($col) => {   // populate profile field
        //   $data.profile[$col] = $ipd[$col]
        // })

        // ['name', 'fee_no', 'birthdate', 'sex'].forEach( $col => {   // populate profile field
        //   $data.profile[$col] = $ipd[$col]
        // })

        $data.admit_dept = $ipd.dept_id
        $data.admit_time = $ipd.start

        // console.log("before")
        // console.log($data)

        this.prepare_data(this.noteSchema.properties.content, $data)

        // console.log("after")
        // console.log($data)

        this.data = $data
        // Form will not load unless isLoaded is true
        this.isLoaded = true
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
    //console.log(this.$wf.note.schema)
    this.$wf.note.schema({ type: 'admission' }).then($raw => {
      //
      //this.noteSchema=$raw.data
      this.noteSchema = require('../../../static/fake_data/sch.note.adm.json')
      // this.$store.dispatch('loadSchema', this.noteSchema);
      // console.log(this.$store.state.schema)

      // prepare schema and data to load form
      this.init()
    })

    // this.noteSchema = require('../../../static/fake_data/sch.note.adm.json')
    // this.init()
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
    fee_no() {
      // console.log("========")
      // console.log(this.data)
      // this.data = {}
      this.init()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/main.scss';

// .wrap {
//   margin: 80px 50px 0 100px;
//   @media screen and (max-width: 1025px) {
//     margin: 80px 10px 0 90px;
//   }
//   @media screen and (max-width: $break-medium) {
//     margin: 120px 10px 0 70px;
//     boj_box {
//       padding: 15px 0 !important;
//     }
//   }
// }
</style>
