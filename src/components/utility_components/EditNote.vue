<template>
  <div class="wrap" :class="{isExpanded: isExpanded}">
    <div v-scroll-spy="{ sectionSelector: '.scroll-watch' }" class="row">    
      <Form class="col-md-10 mb-5" :schema="noteSchema" :schemaData="data"></Form>
      <SectionNav class="col-md-2 d-none d-md-block mb-5" :schema="noteSchema"></SectionNav>
    </div>
  </div>
</template>

<script>
import Form from '@/components/form_components/Form.vue';
import SectionNav from '@/components/ui_components/SectionNav.vue'
import axios from 'axios'

export default {
  name: 'EditNote',
  props: ['isExpanded', 'fee_no'],
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
      isLoaded:false
    }
  },
  methods: {
    // getSectionKeys: function() {
    //   let sectionKeys = Object.keys(this.noteSchema.properties.content.properties)
    //   console.log(sectionKeys)
    //   return sectionKeys
    // },
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
          this.isLoaded=true
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
  },
  mounted() {
    console.log(field)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/global.scss';

.wrap {
  margin: 80px 50px 0 100px;
  @media screen and (max-width: 1025px) {
    margin: 80px 10px 0 90px;
  }
  @media screen and (max-width: $break-medium) {
    margin: 120px 10px 0 70px;
    boj_box {
      padding: 15px 0 !important;
    }
  }
}
</style>
