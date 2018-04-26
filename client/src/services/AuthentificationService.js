import Api from '../services/Api'

export default {
  login (credentials) {
    return Api().post('/parents/login', credentials)
  }
}
