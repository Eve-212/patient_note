import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    schema: null,
    patientData: null
  },
  mutations: {
    loadSchema(state, schema) {
      state.schema = schema
    },
    loadPatientData(state, patientData) {
      state.patientData = patientData
    }
  },
  getters: {
    getSchema: state => state.schema,
    getPatientData: state => state.patientData
  }
})