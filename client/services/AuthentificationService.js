import Api from '@/services/Api'

export default {
  register (credentials) {
    return Api().post('register', credentials)
   }
}

/*AuthentificationService.register({
  mail: 'marion.mary@hotmail.fr',
  pwd: '123456'
})*/
