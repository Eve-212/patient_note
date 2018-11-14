import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    MainPushed: false
  },
  getters: {},
  mutations: {
    Toogle_Main_Sec(state) {
      this.state.MainPushed = !this.state.MainPushed
    }
  },
  actions: {
    Toogle_Main_Sec({ commit }) {
      commit('Toogle_Main_Sec')
    }
  }
})
