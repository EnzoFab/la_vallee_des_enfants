<template>
  <div
    id="e3"
    style="max-width: 600px; margin: auto;">
    <v-app>
      <v-card>
        <v-container grid-list-md text-xs-center>
          <div v-if="estAssMat">
            <form>
              <v-text-field
                box="true"
                label="Login"
                v-model="logAssMat"
                :error-messages="loginErrors"
                @blur="$v.login.$touch()"
                required
              ></v-text-field>
              <v-text-field
                box
                label="Mot de passe"
                type="password"
                v-model="mdpAM"
                :error-messages="mdpErrors"
                @blur="$v.mdpAM.$touch()"
                required
              ></v-text-field>
              <br>
              <div class="error" v-html="error" />
              <br>
              <v-btn round @click="loginAssMat" color="pink darken-1">Se connecter</v-btn>
              <v-btn round @click="clearAssMat" color="pink darken-1">Retour</v-btn>
            </form>
          </div>
          <div v-else>
            <form>
              <v-text-field
                box="true"
                label="E-mail"
                v-model="email"
                :error-messages="emailErrors"
                @blur="$v.email.$touch()"
                required
              ></v-text-field>

              <v-text-field
                box
                label="Mot de passe"
                type="password"
                v-model="mdpPa"
                :error-messages="mdpErrors"
                @blur="$v.mdpPa.$touch()"
                required
              ></v-text-field>
              <br>
              <div class="error" v-html="error" />
              <br>
              <v-btn round @click="loginParent" color="pink darken-1">Se connecter</v-btn>
              <v-btn round @click="clearParent" color="pink darken-1">Retour</v-btn>
            </form>
          </div>
        </v-container>
      </v-card>
    </v-app>
  </div>
</template>

<script>
import AuthentificationService from '@/services/AuthentificationService'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'Login',
  mixins: [validationMixin],
  validations: {
    email: { required },
    mdp: { required },
    login: { required }
  },
  props: {
    type: String
  },
  data: () => ({
    login: '',
    mdp: '',
     items: [
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4'
    ]
  }),
  computed: {
    estAssMat () {
      return this.type === 'assMat'
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.required && errors.push('Veuillez rentrer votre email')
      return errors
    },
    mdpErrors () {
      const errors = []
      if (!this.$v.mdp.$dirty) return errors
      !this.$v.mdp.required && errors.push('Veuillez rentrer un mot de passe')
      return errors
    },
    loginErrors () {
      const errors = []
      if (!this.$v.mdp.$dirty) return errors
      !this.$v.mdp.required && errors.push('Veuillez rentrer un login')
      return errors
    }
  },
  methods: {
    submit () {
      this.$v.$touch()
    },
    clearParent () {
      this.$v.$reset()
      this.login = ''
      this.mdp = ''
    },
    async loginParent () {
      await AuthentificationService.login({
        email: this.login,
        mdpPa: this.mdp
      })
    },
    clearAssMat () {
      this.$v.$reset()
      this.login = ''
      this.mdp = ''
    },
    async loginAssMat () {
      await AuthentificationService.login({
        logAssMat: this.login,
        mdp: this.mdp
      })
    }
  }
}
</script>

<style scoped>
</style>
