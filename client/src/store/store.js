import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    token: (localStorage.getItem('token')) || null,
    employeur: JSON.parse(localStorage.getItem('employeur')) || null,
    assMat: JSON.parse(localStorage.getItem('assMat')) || null,
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
            rang: 'Employeur',
            connectedUser: state.employeur
          }
        } else if (state.employeur == null && state.assMat != null) {
          return {
            rang: 'Assmat',
            connectedUser: state.assMat
          }
        } else {
          return null // null
        }
      } else {
        return null // aucun utilisateur connecté s'il n'y a pas de token
      }
    },
    /**
     * regarde si le l'utilisateur connecté est un assistante maternelle
     * @param state
     * @param getters
     * @returns {boolean}
     */
    isAssMatConnected (state, getters) {
      let connectedUser = getters.connectedUser
      return connectedUser != null && connectedUser.rang === 'Assmat'
    },
    /**
     * regarde si l'utilisateur connecté est un employeur
     * @param state
     * @param getters
     * @returns {boolean}
     */
    isEmployeurConnected (state, getters) {
      let connectedUser = getters.connectedUser
      return connectedUser != null && connectedUser.rang === 'Employeur'
    }
  },
  mutations: {
    setToken (state, token) {
      localStorage.setItem('token', token)
      state.token = token
    },
    setEmployeur (state, employeur) {
      localStorage.setItem('employeur', JSON.stringify(employeur))
      state.employeur = employeur
    },
    setAssMat (state, assMat) {
      localStorage.setItem('assMat', JSON.stringify(assMat))
      state.assMat = assMat
    },
    setNumContrat (state, numContrat) {
      state.numContrat = numContrat
    },
    removeEmployeur (state) {
      localStorage.removeItem('employeur')
      state.employeur = null
    },
    removeAssMat (state) {
      localStorage.removeItem('assMat')
      state.assMat = null
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
    },
    removeAssMat ({commit}) {
      commit('removeAssMat')
    },
    removeEmployeur ({commit}) {
      commit('removeEmployeur')
    }
  }

})
