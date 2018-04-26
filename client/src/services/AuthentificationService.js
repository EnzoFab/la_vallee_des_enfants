import Api from '@/services/Api'

export default {
  login (credentials) {
    return Api().post('login', credentials)
  }
}

/* AuthentificationService.register({
  mail: 'marion.mary@hotmail.fr',
  pwd: '123456'
}) */
