import axios from 'axios'
import store from '../store/store'

export default {
  /* postImg (formData, actions) {
    return Api().post('files/image', formData, actions)
  } */
  postImg (formData) {
    return axios({
      method: 'post',
      url: process.env.BASE_URL + '/files/image', // process.env.BASE_URL +'/files/image',
      data: formData,
      headers: {
        'Authorization': `Bearer ${store.state.token}`,
        'Content-Type': 'multipart/form-data;boundary="boundary"'
      }
    })
    // return Api().post('files/image', formData)
  }
}
