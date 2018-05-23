import axios from 'axios'
import store from '../store/store'

// Créer un objet axios qui pointe vers mon url
export default () => {
  return axios.create({
    baseURL: process.env.BASE_URL + '/api' || 'http://localhost:3000/api', //
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${store.state.token}`
    }
  })
}
