<template>
  <v-layout row wrap>
  <v-flex  xs12 md6 offset-md3 class="my-5">
    <v-fade-transition>
      <v-card v-if="!progress">
        <v-toolbar :color="toolbarColor" dark>
          <v-spacer></v-spacer>
          <v-toolbar-title>{{titre}}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form v-model="estValide" ref="form">
            <v-text-field
              label="Login"
              color="light-blue darken-4"
              v-model.trim="login"
              :rules="loginRules"
              required
              prepend-icon="assignment_ind"
            ></v-text-field>
            <!--<v-text-field
              label="E-mail" v-else
              v-model="email"
              :rules="emailRules"
              required
            ></v-text-field> -->
            <v-text-field
              name="input-10-2"
              label="Mot de passe"
              :append-icon="visible ? 'visibility_off' : 'visibility'"
              :append-icon-cb="() => (visible = !visible)"
              v-model="mdp"
              :type="visible ? 'text' : 'password'"
              :rules="pwdRules"
              required
              prepend-icon="vpn_key"
            ></v-text-field>
            <br>
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
    </v-fade-transition>

    <v-fade-transition>
      <v-progress-circular :size="100" :width="7" indeterminate color="purple" v-if="progress"></v-progress-circular>
    </v-fade-transition>
  </v-flex>
</v-layout>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'Login',
  mixins: [validationMixin],
  validations: {
    login: { required },
    mdp: { required },
    connexion: { required }

  },
  props: {
    type: {String, required},
    toolbarColor: String,
    btnColor: String,
    titre: {String, required},
    progress: {Boolean, required:true}
  },
  data: () => ({
    mdp: '',
    connexion: '',
    login: '',
    visible: false,
    pwdRules: [
      v => !!v || 'Veuillez remplir le mot de passe'
    ],
    loginRules: [
      v => !!v || 'Veuillez remplir le login'
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
      const data = {login: this.login, mdp: this.mdp}
      this.$emit('formSubmitted', data)
      this.clearForm()
    },
    clearForm () {
      this.$refs.form.reset()
    }
  }
}
</script>

<style scoped>
</style>
