<template>
  <div class="container-fluid" v-scroll-watch>
    <div class="row" :class="{isExpanded: $store.state.sideExpanded}" v-if="isLoaded">  
      <div class="col-md-10">
        <div class="row">
        <div v-if="showAlert" class="col-md-12 alert alert-danger">
          <strong>
            是否加入您的病人清單?
          </strong>
          <div>
            <button @click="closeAlert" class="btn btn-sm btn-danger" type="button" value="yes">Yes</button>
            <button @click="closeAlert" class="btn btn-sm btn-danger" type="button" value="no">No</button>
            <button @click="closeAlert" class="btn btn-sm btn-danger" type="button" value="showLater">Ask me later</button>
          </div>
        </div>
        <div class="col-md-12 alert alert-primary">
          <ul>
            <li>
              <strong>Applied form：</strong>
              <span>&#35;一般</span>
              <span>&#35;急性心肌梗塞</span>
              <span>&#35;一般</span>
              <span>&#35;急性心肌梗塞</span>
              <span>&#35;一般</span>
              <span>&#35;急性心肌梗塞</span>
              <span>&#35;一般</span>
              <span>&#35;急性心肌梗塞</span>
            </li>
            <li>
              <strong>Available form：</strong>
              <span>&#35;一般</span>
              <span>&#35;急性心肌梗塞</span>
              <span>&#35;一般</span>
              <span>&#35;急性心肌梗塞</span>
              <span>&#35;一般</span>
              <span>&#35;急性心肌梗塞</span>
              <span>&#35;一般</span>
              <span>&#35;急性心肌梗塞</span>
            </li>
          </ul>
        </div>

        <JSchemaObject 
          class="col-md-12"   
          v-model="data" 
          :schema="noteSchema.properties.content">
        </JSchemaObject>
      </div>  
      </div>
      
      <SectionNav 
        class="col-md-2 d-none d-md-block mb-5" 
        :schema="noteSchema">
      </SectionNav>
    </div>
  </div>
</template>

<script>
import SectionNav from '@/components/ui/SectionNav.vue'
import JSchemaObject from '@/components/form/JSchemaObject'

export default {
  name: 'EditNote',
  props: ['fee_no'],
  components: {
    SectionNav,
    JSchemaObject
  },
  data() {
    return {
      showAlert: true,
      noteSchema: null,
      data: {},
      meta: {},
      sess: null,
      isLoaded: false
    }
  },
  methods: {
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

        $data.admit_dept = $ipd.dept_id
        $data.admit_time = $ipd.start

        this.prepare_data(this.noteSchema.properties.content, $data)

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
    this.noteSchema = {}

    this.$wf.note.schema({ type: 'admission' }).then($raw => {
      this.$set(
        this.$data,
        'noteSchema',
        require('../../../static/fake_data/sch.note.adm2.json')
      )

      this.init()
    })
  },
  watch: {
    fee_no() {
      this.init()
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/sass/main.scss';
.alert {
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 8px 15px;
  &-primary {
    ul {
      list-style: none;
      margin: auto 0;
      li {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        padding: 3px 0;
        span {
          letter-spacing: 0.05rem;
          margin-top: 5px;
          cursor: pointer;
          padding: 0 0.3rem;
          border: 1px solid #004085;
          border-radius: 3px;
          margin-right: 0.3rem;
          font-size: 10px;
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
      font-size: 12px;
      @media screen and (max-width: $break-small) {
        margin-top: 0.5rem;
      }
    }
  }
}
</style>