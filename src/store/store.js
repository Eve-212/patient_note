import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    sideExpanded: false,
    user: {}
  },
  getters: {},
  mutations: {
    Toogle_Main_Sec(state) {
      state.sideExpanded = !state.sideExpanded
    },
    Sign_In(state, user_payload) {
      state.user = user_payload
      sessionStorage.setItem('user', JSON.stringify(user_payload))
    },
    Sign_Out(state) {
      state.user = {}
      sessionStorage.setItem('user', '')
    }
  },
  actions: {
    Toogle_Main_Sec({ commit }) {
      commit('Toogle_Main_Sec')
    },
    Sign_In({ commit }, user_payload) {
      commit('Sign_In', user_payload)
    },
    Sign_Out({ commit }) {
      commit('Sign_Out')
    }
  }
})
