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
             :progress="progress"
      ></login>
    </v-container>
  </div>
</template>

<script>
import Login from '../part/Login'
import AuthentificationService from '../../services/AuthentificationService'
export default {
  name: 'ConnexionEmp',
  data: () => ({
    error: '',
    alert: false,
    progress: false
  }),
  components: {
    Login
  },
  methods: {
    async connexion (data) {
      // est lancée lorsque le compososant envoie l'evenement == lorsqu'on appuie sur le bouton envoyer
      this.progress = true
      try {
        const response = await AuthentificationService.login(data)
        if (response.data.erreur == null) { // connexion reussie
          this.$store.dispatch('setToken', response.data.token)
          this.$store.dispatch('setEmployeur', response.data.employeur)
          this.$router.push({
            name: 'Accueil'
          })
          this.$notify({
            group: 'employeur',
            title: 'Connexion',
            text: 'Connexion avec succès',
            duration: 4000,
            speed: 500,
            type: 'success'
          })
        } else {
          this.showError(response.data.erreur.texte)
          this.progress = false
        }
        /*  */
      } catch (error) {
        console.log(error)
        this.progress = false
        this.showError('Une erreur est survenue')
      }
    },
    showError (erreur) { // affiche l'erreur
      // this.error = erreur
      // this.alert = true
      this.$notify({
        group: 'employeur',
        title: 'Erreur',
        type: 'error',
        text: erreur,
        duration: 4000,
        speed: 500
      })
    }
  }
}
</script>

<style scoped>

</style>
