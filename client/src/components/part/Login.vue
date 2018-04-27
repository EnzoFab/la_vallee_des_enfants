<template>
  <v-container align-start fluid>
    <v-layout row wrap>
      <v-flex  xs12 md6 offset-md3 class="my-5">
        <v-card>
          <v-toolbar :color="toolbarColor" dark>
            <v-spacer></v-spacer>
            <v-toolbar-title>{{titre}}</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form v-model="estValide" ref="form">
              <v-text-field v-if="estAssMat"
                label="login"
                color="light-blue darken-4"
                v-model.trim="login"
                :rules="loginRules"
                required
              ></v-text-field>
              <v-text-field
                label="E-mail" v-else
                v-model="email"
                :rules="emailRules"
                required
              ></v-text-field>
              <v-text-field
                name="input-10-2"
                label="Mot de passe"
                min="8"
                :append-icon="visible ? 'visibility_off' : 'visibility'"
                :append-icon-cb="() => (visible = !visible)"
                v-model="mdp"
                class="input-group--focused"
                :type="visible ? 'text' : 'password'"
                :rules="pwdRules"
              ></v-text-field>
              <br>
              <div class="error" v-html="error" />
              <br>
              <v-btn
                :color="btnColor"
                depressed large round
                :dark="estValide"
                @click="envoyer"
                :disabled="!estValide"
              >
                Envoyer
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'Login',
  mixins: [validationMixin],
  validations: {
    email: { required },
    mdp: { required },
    connexion: { required }

  },
  props: {
    type: {String, required},
    toolbarColor: String,
    btnColor: String,
    titre: {String, required}
  },
  data: () => ({
    email: '',
    mdp: '',
    connexion: '',
    login: '',
    visible: false,
    error: null,
    pwdRules: [
      v => !!v || 'Veuillez remplir le mot de passe'
    ],
    emailRules: [
      v => !!v || 'Veuillez remplir l\'email',
      v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'L\'email n\'est pas valide '
    ],
    loginRules: [
      v => !!v || 'Veuillez remplir le connexion'
    ],
    estValide: false
  }),
  computed: {
    estAssMat () {
      return this.type === 'assMat'
    }
  },
  methods: {
    envoyer () {
      this.clearForm()
      if (this.estAssMat) { // si c'est une assmatt on passe le connexion et le mot de passe
        const data = {login: this.login, mdp: this.mdp}
        this.$emit('formSubmitted', data)
        // on envoie un evenement
      } else { // sinon on passe le mail et le mot de passe
        const data = {email: this.email, mdp: this.mdp}
        this.$emit('formSubmitted', data)
        // on envoie un evenement
      }
    },
    clearForm () {
      if (this.estAssMat) {
        this.login = ''
        this.mdp = ''
      } else {
        this.$v.$reset()
        this.email = ''
        this.mdp = ''
      }
    }
  }
}
</script>

<style scoped>
  .error {
    color: red;
  }
</style>
