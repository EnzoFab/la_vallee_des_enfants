<template>
  <v-layout row wrap>
    <v-alert v-model="erreur" type="error" dismissible>
      {{erreurMessage}}
    </v-alert> <v-snackbar
    v-model="snackbar"
    absolute
    top
    right
    :color="snackBarColor"
  >
    <span>{{snackbarMessage}}</span>
    <v-icon dark>check_circle</v-icon>
    <v-btn dark flat fab @click.native="snackbar = false">
      <v-icon small dark>fa-times</v-icon>
    </v-btn>
  </v-snackbar>

  <v-flex xs12 md6 offset-md3 class="my-5">
    <v-card>
      <v-flex>
        <v-toolbar color="teal" dark>
          <v-spacer></v-spacer>
          <v-toolbar-title>Réinitialiser le mot de passe</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </v-flex>
      <v-flex>
        <v-form v-model="estValide" ref="form">
      <v-flex md10 offset-md1>
        <v-text-field
          v-model="ancienpwd"
          :append-icon="e1 ? 'visibility' : 'visibility_off'"
          :append-icon-cb="() => (e1 = !e1)"
          :type="e1 ? 'password' : 'text'"
          :rules="pwdRules"
          label="Ancien mot de passe"
          hint="Au moins 8 caractères"
          min="8"
          counter>
        </v-text-field>
      </v-flex>
      <v-flex md10 offset-md1>
        <v-text-field
          v-model="nouveaupwd"
          :append-icon="e2 ? 'visibility' : 'visibility_off'"
          :append-icon-cb="() => (e2 = !e2)"
          :type="e2 ? 'password' : 'text'"
          :rules="pwdRules"
          label="Nouveau mot de passe"
          hint="Au moins 8 caractères"
          min="8"
          counter>
        </v-text-field>
      </v-flex>
      <v-flex md10 offset-md1>
        <v-text-field
          v-model="reecrirepwd"
          :append-icon="e3 ? 'visibility' : 'visibility_off'"
          :append-icon-cb="() => (e3 = !e3)"
          :type="e3 ? 'password' : 'text'"
          :rules="pwdRules"
          label="Entrer de nouveau le mot de passe"
          hint="Au moins 8 caractères"
          min="8"
          counter>
        </v-text-field>
      </v-flex>
      </v-form>
      </v-flex>
        <v-btn
          color="teal"
          depressed large round
          :dark="estValide"
          @click="envoyer"
          :disabled="!estValide"
          :loading="loadingButton"
          ripple
        >
          Réinitialiser
          <span slot="loader" class="custom-loader"><v-icon light>cached</v-icon></span>
        </v-btn>
    </v-card>
  </v-flex>
  </v-layout>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import ModificationMdpService from '../../services/ModificationMdpService'
export default {
  name: 'ParametresCompte',
  mixins: [validationMixin],
  validations: {
    ancienpwd: { required },
    nouveaupwd: { required },
    reecrirepwd: { required }
  },
  data: () => ({
    ancienpwd: '',
    nouveaupwd: '',
    reecrirepwd: '',
    estValide: false,
    e1: true,
    e2: true,
    e3: true,
    pwdRules: [
      v => !!v || 'Veuillez remplir le mot de passe'
    ],
    erreur: false,
    erreurMessage: '',
    snackbar: false,
    snackbarMessage: '',
    snackBarColor: '',
    loadingButton: false
  }),
  methods: {
    async envoyer () {
      this.loadingButton = true
      const data = {id_am: this.$store.state.assMat.id_assmat, ancienpwd: this.ancienpwd, nouveaupwd: this.nouveaupwd, reecrirepwd: this.reecrirepwd}
      try {
        if (this.nouveaupwd === this.reecrirepwd) {
          let r = await ModificationMdpService.modifMdp(data)
          if (r.data.erreur == null) {
            this.triggerSnackBar('mot de passe mis à jour', 'success')
          } else {
            this.triggerErreur(r.data.erreur.texte)
          }
        } else {
          this.triggerErreur('Les mots de passes sont différents')
        }
      } catch (error) {
        this.triggerErreur('Une erreur est survenue')
        console.log(error)
      }
      this.loadingButton = false
      this.$refs.form.reset()
    },
    triggerErreur (erreur) {
      this.erreurMessage = erreur
      this.erreur = true
    },
    triggerSnackBar (message, color) {
      this.snackbar = true
      this.snackbarMessage = message
      this.snackBarColor = color
    }
  }
}
</script>

<style scoped>

</style>
