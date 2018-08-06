<template>
  <div class="pink lighten-5">
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
               :progress="progress"
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
    alert: false,
    progress: false
  }),
  components: {
    Login
  },
  methods: {
    async connexion (data) {
      this.progress = true
      try {
        const response = await AuthentificationService.loginAssMat(data)
        if (response.data.erreur == null) {
          this.$store.dispatch('setToken', response.data.token)
          this.$store.dispatch('setAssMat', response.data.assmat)
          console.log(this.$store.state.assMat)
          this.$router.push({
            name: 'Accueil'
          })
          this.$notify({
            group: 'assistante',
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
      } catch (error) {
        console.log(error)
        this.showError('Une erreur est survenue')
        this.progress = false

      }
    },
    showError (erreur) { // affiche l'erreur
      //this.error = erreur
      //this.alert = true
      this.$notify({
        group: 'assistante',
        title: 'Erreur',
        type: 'error',
        text: erreur,
        duration: 4000,
        speed: 500
      });
    }
  }
}
</script>

<style scoped>

</style>
