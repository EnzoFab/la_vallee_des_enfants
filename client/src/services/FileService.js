import axios from 'axios'
import store from '../store/store'
import Api from './Api'

export default {

  /* ------------------------------------------ POST ------------------------------------------------------ */

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
        'Content-Type': 'multipart/form-data'
      }
    })
    // return Api().post('files/image', formData)
  },

  /* ------------------------------------------ DELETE ------------------------------------------------------ */

  deleteImg (imageUrl) {
    return Api().delete('/files/image/' + imageUrl)
  },

  createPDF (data) {
    return axios({
      method: 'post',
      url: process.env.BASE_URL + '/pdf/create', // process.env.BASE_URL +'/files/image',
      data: data,
      responseType: 'blob',
      headers: {
        'Authorization': `Bearer ${store.state.token}`
      }
    })
    // return Api().post('/pdf_generator/create', data)
  }
}
