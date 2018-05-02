<template>
  <div>
    <v-container align-start fluid>
      <v-alert type="error" dismissible v-model="alert">
        {{error}}
      </v-alert>
      <login id="palogin"
             type="parent"
             @formSubmitted="connexion"
             toolbarColor="teal lighten-2"
             btnColor="teal accent-2"
             titre="Connexion parent"
      ></login>
    </v-container>
  </div>
</template>

<script>
import Login from '../part/Login'
import AuthentificationService from '../../services/AuthentificationService'
export default {
  name: 'ConnexionPa',
  data: () => ({
    error: '',
    alert: false
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
        if (response.data.erreur == null) { // connexion reussie
          this.$store.dispatch('setToken', response.data.token)
          this.$store.dispatch('setParent', response.data.parent)
          this.$router.push({
            name: 'AccueilParent'
          })
        } else {
          this.showError(response.data.erreur.texte)
        }
        /*  */
      } catch (error) {
        console.log(error)
        this.showError(error.response.data.error)
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
