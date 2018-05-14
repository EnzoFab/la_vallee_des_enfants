<template>
  <div>
    <v-container align-start fluid>
      <v-alert type="error" dismissible v-model="alert">
        {{error}}
      </v-alert>
      <login id="amlogin"
             type="assMat"
             @formSubmitted="connexion"
             titre="Connexion assistante maternelle"
             toolbar-color="pink lighten-1"
             btnColor="pink lighten-2"
      ></login>
    </v-container>
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
    error: '',
    alert: false
  }),
  components: {
    Login
  },
  methods: {
    async connexion (data) {
      try {
        const response = await AuthentificationService.loginAssMat(data)
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setAssMat', response.data.assmat)
        console.log(this.$store.state.assMat)
        this.$router.push({
          name: 'Accueil'
        })
      } catch (error) {
        console.log(error)
        this.error = error.response.data.error
      }
    },
    showError (erreur) { // affiche l'erreur
      this.error = erreur
      this.alert = true
    }
  }
}
</script>

<style scoped>

</style>
