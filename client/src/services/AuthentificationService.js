import Api from '../services/Api'

export default {
  login (credentials) {
    return Api().post('/employeurs/login', credentials)
  },
  loginAssMat (credentials) {
    return Api().post('/assmats/login', credentials)
  },
  registerAssMat (credentials) {
    return Api().post('/assmats/register', credentials)
  },
  createContratEnfant (credentials) {
    return Api().post('/enfants/create', credentials)
  }
}
