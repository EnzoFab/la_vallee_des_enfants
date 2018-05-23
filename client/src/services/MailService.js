import Api from '../services/Api'

export default {

  /* ------------------------------------------ POST ------------------------------------------------------ */

  sendMail (credential) {
    return Api().post('/mail/send', credential)
  }
}
