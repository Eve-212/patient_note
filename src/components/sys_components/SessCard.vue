<template>
    <div class="card sess_box " :class="[complete_status,sex]" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">
                <span  class="badge badge-primary bed_no">{{sess.ipd.bed_no}}</span>
                <b class="name" >{{sess.ipd.name}}</b>
                <small class="card-subtitle mb-2 text-muted">{{sess.ipd.chr_no}}</small>
            </h5>
            <h6 class="card-subtitle mb-2 text-muted">
                <div>{{age}} y/o, {{sex}} </div>
                <!--<div>{{sess.ipd.icd10_in}}</div>-->
                <div><icd-span :icd="sess.ipd.icd10_in[0]"></icd-span></div>
            </h6>
            <p class="card-text">
                主責醫師 : <span>{{sess.ipd.doc_id}}</span>
            </p>
            <button class="btn btn-sm" v-on:click="show_edit('admission')">住院</button>
            <button class="btn btn-sm" title="2018-10-26 未完成">
                Progress  <span class="badge badge-danger" model="tobedone">3</span>
            </button>
            <button class="btn btn-sm">出院</button>
        </div>
    </div>

</template>

<script>
//import moment from 'moment'
import ICDSpan from './ICDSpan'
export default {
  name: 'SessCard',
  components: {
    'icd-span': ICDSpan
  },
  props: ['sess'],
  computed: {
    age() {
      return parseInt(
        (Date.now() - Date.parse(this.sess.ipd.birthdate)) /
          (60 * 60 * 24 * 365 * 1000)
      )
    },
    sex() {
      return this.sess.ipd.sex ? 'male' : 'female'
    },
    complete_status() {
      return 'incompleted'
    }
  },
  methods: {
    show_edit($type) {
      this.$router.push({ name: 'edit', params: { fee_no: this.sess.fee_no } })
    }
  }
}
</script>

<style>
.sess_box {
  border-left: 4px solid #9be497;
  font-family: 微軟正黑體;
}
.sess_box.incompleted {
  border-left: 4px solid #ea8989;
}
.sess_box.female .bed_no {
  background: #eaa5b8;
}

.sess_box.male .bed_no {
  background: #8abeff;
}
</style>
