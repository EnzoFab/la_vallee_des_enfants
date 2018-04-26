<template>
  <v-container align-start fluid>
    <v-layout row wrap>
      <v-flex xs12 md8 offset-md2 class="my-5">
        <v-card>
          <v-toolbar color="pink darken-1" dark>
            <v-spacer></v-spacer>
            <v-toolbar-title>Se connecter</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <div v-if="estAssMat">
            <v-card-text>
              <v-form>
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
                <div class="error" v-html="error" />
                <v-btn round @click="loginAssMat" color="pink darken-1" class="white--text">Se connecter</v-btn>
                <v-btn round @click="clearAssMat" color="pink darken-1" class="white--text">Retour</v-btn>
              </v-form>
            </v-card-text>
          </div>
          <div v-else>
            <v-card-text>
              <v-form>
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
                  v-model="mdp"
                  :error-messages="mdpErrors"
                  @blur="$v.mdp.$touch()"
                  required
                ></v-text-field>
                <div class="error" v-html="error" />
                <v-btn round @click="loginParent" color="pink darken-1" class="white--text">Se connecter</v-btn>
                <v-btn round @click="clearParent" color="pink darken-1" class="white--text">Retour</v-btn>
              </v-form>
            </v-card-text>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AuthentificationService from '../../services/AuthentificationService'
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
    email: '',
    mdp: '',
    error: null
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
    clearParent () {
      this.$v.$reset()
      this.email = ''
      this.mdp = ''
    },
    async loginParent () {
      try {
        const response = await AuthentificationService.login({
          email: this.email,
          mdp: this.mdp
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setParent', response.data.parent)
      } catch (error) {
        console.log(error)
        this.error = error.response.data.error
      }
    },
    clearAssMat () {
      this.$v.$reset()
      this.email = ''
      this.mdp = ''
    },
    async loginAssMat () {
      try {
        await AuthentificationService.login({
          logAssMat: this.email,
          mdp: this.mdp
        })
      } catch (error) {
        this.error = error.response.data.error
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
