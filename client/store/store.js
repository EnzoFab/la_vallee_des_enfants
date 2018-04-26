import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    token: null,
    parent: null
  },
  mutation: {
    setToken (state, token) {
      state.token = token
    },
    setParent ({commit}, parent) {
      state.parent = parent
    }
  },
  actions: {
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    setParent ({commit}, parent) {
      commit('setParent', parent)
    }
  }

})
