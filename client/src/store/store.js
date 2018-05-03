import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    token: null,
    employeur: null,
    assMat: null
  },
  mutations: {
    setToken (state, token) {
      state.token = token
    },
    setEmployeur (state, employeur) {
      state.employeur = employeur
    },
    setAssMat (state, assMat) {
      state.assMat = assMat
    }
  },
  actions: {
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    setEmployeur ({commit}, employeur) {
      commit('setEmployeur', employeur)
    },
    setAssMat ({commit}, assMat) {
      commit('setAssMat', assMat)
    }
  }

})
