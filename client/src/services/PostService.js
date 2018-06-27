import Api from '../services/Api'

export default {

  /* ------------------------------------------ GET ------------------------------------------------------ */

  getAll () {
    return Api().get('/posts/all')
  },

  getAllLimit (limit, offset) {
    return Api().get('/posts/?limit=' + limit + '&offset=' + offset)
  },

  /* ------------------------------------------ POST ------------------------------------------------------ */

  create (data) {
    return Api().post('/posts/create', data)
  },

  /* ------------------------------------------ DELETE ------------------------------------------------------ */

  delete (numPost) {
    return Api().delete('/posts/delete/' + numPost)
  }
}
