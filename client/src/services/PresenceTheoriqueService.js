import Api from '../services/Api'

export default {

  /* --------------------------------------- POST ----------------------------------------------------------- */

  create (credential) {
    return Api().post('/presencetheo/create', credential)
  }
}
