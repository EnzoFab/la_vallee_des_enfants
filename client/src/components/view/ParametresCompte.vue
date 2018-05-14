<template>
  <v-layout row wrap>
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
        >
          Réinitialiser
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
    ]
  }),
  methods: {
    async envoyer () {
      const data = {id_am: this.$store.state.assMat.id_assmat, ancienpwd: this.ancienpwd, nouveaupwd: this.nouveaupwd, reecrirepwd: this.reecrirepwd}
      try {
        if (this.nouveaupwd === this.reecrirepwd) {
          await ModificationMdpService.modifMdp(data)
          this.$router.push({
            name: 'Accueil'
          })
        }
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
