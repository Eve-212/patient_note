import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    sideExpanded: false
  },
  getters: {},
  mutations: {
    Toogle_Main_Sec(state) {
      state.sideExpanded = !state.sideExpanded
    }
  },
  actions: {
    Toogle_Main_Sec({ commit }) {
      commit('Toogle_Main_Sec')
    }
  }
})
