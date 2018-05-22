import Api from '../services/Api'

export default {

  getAll () {
    return Api().get('posts/all')
  },

  getAllLimit (limit, offset) {
    return Api().get('posts/?limit=' + limit + '&offset=' + offset)
  },
  create (data) {
    return Api().post('posts/create', data)
  },

  delete (numPost) {
    return Api().delete('posts/delete/' + numPost)
  }
}
