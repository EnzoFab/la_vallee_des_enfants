import axios from 'axios'

// Créer un objet axios qui pointe vers mon url
export default () => {
  return axios.create({
    baseURL: 'http://localhost:8081/'
  })
}
