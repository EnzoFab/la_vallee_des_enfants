<template>
  <div
    id="e3"
    style="max-width: 600px; margin: auto;"
  >
    <v-app>
      <v-card>
        <v-container grid-list-md text-xs-center>
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
              v-model="mdp"
              :error-messages="mdpErrors"
              @blur="$v.mdp.$touch()"
              required
            ></v-text-field>
            <v-btn round @click="submit" color="pink darken-1">Se connecter</v-btn>
            <v-btn round @click="clear" color="pink darken-1">Retour</v-btn>
          </form>
        </v-container>
      </v-card>
    </v-app>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required } from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],
    validations: {
      email: { required },
      mdp: { required }
    },

    data: () => ({
      email: '',
      mdp: '',
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4'
      ]
    }),

    computed: {
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
      }
    },

    methods: {
      submit () {
        this.$v.$touch()
      },
      clear () {
        this.$v.$reset()
        this.email = ''
        this.mdp = ''
      }
    }
  }
</script>

<style scoped>

</style>
