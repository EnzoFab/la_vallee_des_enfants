import axios from 'axios'
import store from '../store/store'

// Créer un objet axios qui pointe vers mon url
export default () => {
  return axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
      Authorization: `Bearer ${store.state.token}`
    }
  })
}
