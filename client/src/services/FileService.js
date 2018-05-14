import Api from '../services/Api'

export default {
  postImg (formData, actions) {
    return Api().post('files/image', formData, actions)
  }
}
