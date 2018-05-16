import Api from '../services/Api'

export default {
  sendMai (credential) {
    return Api().post('/mail/send', credential)
  }
}
