import Api from '../services/Api'

export default {
  create (credential) {
    return Api().post('/presencetheo/create', credential)
  }
}
