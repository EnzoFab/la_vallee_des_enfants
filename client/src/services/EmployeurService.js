import Api from '../services/Api'

export default {
  createContratEmployeur (credentials) {
    return Api().post('/employeurs/create', credentials)
  }
}
