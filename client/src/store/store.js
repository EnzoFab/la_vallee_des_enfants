import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    token: null,
    employeur: null,
    assMat: null,
    numContrat: null // pour conserver le numero du contrat en cours de création
  },
  getters: {
    /**
     * Renvoie l'utilisateur actuellement connecté
     * @param state
     */
    connectedUser (state) {
      if (state.token != null) {
        if (state.employeur != null && state.assMat == null) {
          return {
            range: 'Employeur',
            connectedUser: state.employeur
          }
        } else if (state.employeur == null && state.assMat != null) {
          return {
            range: 'Assmat',
            connectedUser: state.assMat
          }
        } else {
          return null
        }
      } else {
        return null // aucun utilisateur connecté s'il n'y a pas de token
      }
    }
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
    },
    setNumContrat (state, numContrat) {
      state.numContrat = numContrat
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
    },
    setNumContrat ({commit}, numContrat) {
      commit('setNumContrat', numContrat)
    }
  }

})
