<template>
  <div>
    <login id="amlogin"
           type="assMat"
           @formSubmitted="connexion"
           titre="Connexion assistante maternelle"
           toolbar-color="pink lighten-1"
           btnColor="pink lighten-2"
    ></login>
    <!-- formSubmitted est un evenement envoyé par le composant login
     on appelle une fonction  lorsque l'evenement intervient et ça
     peut être n'importe qu'elle fonction-->
  </div>
</template>

<script>
import AuthentificationService from '../../services/AuthentificationService'
import Login from '../part/Login'
export default {
  name: 'ConnexionAM',
  data: () => ({
    error: null
  }),
  components: {
    Login
  },
  methods: {
    async connexion (data) {
      console.log(AuthentificationService)
      try {
        const response = await AuthentificationService.loginAssMat(data)
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setAssMat', response.data.assMat)
        this.$router.push({
          name: 'AccueilAssMat'
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>

</style>
