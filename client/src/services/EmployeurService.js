import Api from '../services/Api'

export default {
  createContratEmployeur (credentials) {
    return Api().post('/employeurs/create', credentials)
  },

  updateEmp (data) {
    return Api().put('/employeurs/modifEmp', data)
  }
}
