import Api from '../services/Api'

export default {
  createContratTuteur (credentials) {
    return Api().post('/tuteurs/create', credentials)
  }
}
