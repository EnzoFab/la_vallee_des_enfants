import Api from '../services/Api'
import axios from 'axios'
import store from "../store/store";

export default {
  /* postImg (formData, actions) {
    return Api().post('files/image', formData, actions)
  } */
  postImg (formData ) {
    let baseUrl = process.env.BASE_URL || 'http://localhost:3000'
    axios.post({
      method: 'POST',
      url: baseUrl + '/files/image',
      data: formData,
      headers: {
        'Authorization': `Bearer ${store.state.token}`,
        'Content-Type': 'multipart/form-data;boundary="boundary"'
      }
    })
   // return Api().post('files/image', formData)
  }
}
