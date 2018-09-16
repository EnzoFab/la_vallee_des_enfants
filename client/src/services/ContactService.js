import Api from '../services/Api'

export default {
  getAll () {
    return Api().get('/contact/all')
  },

  insert (data) {
    return Api().post('/contact/create', data)
  },

  update (id_contact) {
    return Api().put('/contact/update/' + id_contact)
  },

  delete (id_contact) {
    return Api().delete(`/contact/delete/${id_contact}`)
  }
}
