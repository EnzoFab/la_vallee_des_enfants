import Api from '../services/Api'

export default {
  sendMail (credential) {
    return Api().post('/mail/send', credential)
  }
}
