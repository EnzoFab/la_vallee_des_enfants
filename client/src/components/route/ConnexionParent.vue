<template>
  <div>
    <login id="palogin"
           type="parent"
           @formSubmitted="connexion"
           toolbarColor="teal lighten-2"
           btnColor="teal accent-2"
           titre="Connexion parent"
    ></login>
  </div>
</template>

<script>
import Login from '../part/Login'
import store from '../../store/store'
import AuthentificationService from '../../services/AuthentificationService'
export default {
  name: 'ConnexionPa',
  data: () => ({
    error: null
  }),
  components: {
    Login
  },
  methods: {
    async connexion (data) {
      // est lancée lorsque le compososant envoie l'evenement == lorsqu'on appuie sur le bouton envoyer
      console.log(data)
      try {
        const response = await AuthentificationService.login(data)
        store.dispatch('setToken', response.data.token)
        store.dispatch('setParent', response.data.parent)
        this.$router.push({
          name: 'Accueil'
        })
      } catch (error) {
        console.log(error)
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>

</style>
