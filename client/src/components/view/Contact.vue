<template>
  <v-container fluid>
    <v-snackbar
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
    <v-layout row wrap>
      <v-flex xs12 md6 offset-md3 class="my-5">
        <v-card>
          <v-toolbar color="blue-grey lighten-3" dark>
            <v-spacer></v-spacer>
            <v-toolbar-title>Nous contacter</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form v-model="estValide" ref="form">
              <v-text-field
                label="Nom"
                color="light-blue darken-4"
                v-model.trim="name"
                :rules="nameRules"
                :counter="nameLenght"
                required
              ></v-text-field>
              <v-text-field
                label="E-mail"
                v-model="email"
                :rules="emailRules"
                required
              ></v-text-field>
              <v-text-field
                name="input-1"
                label="Message"
                v-model="message"
                multi-line
                :rules="msgRules"
                required
              ></v-text-field>
              <v-btn
                color="blue-grey lighten-3"
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
const nameLength = 20
export default {
  name: 'Contact',
  data () {
    const defaultForm = Object.freeze({
      name: '',
      email: '',
      msg: ''
    })
    return {
      form: Object.assign({}, defaultForm),
      snackbar: false, // permet l'affichage de la snackbar
      snackbarMessage: '',
      snackBarColor: '',
      estValide: false, // permet de savoir si le formulaire est valide
      name: '',
      nameLenght: 20, // au maximum 20 characters pour le nom
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= nameLength || 'Il ne peut pas y avoir plus de 20 characteres'
      ],
      email: '',
      emailRules: [
        v => !!v || 'Veuillez remplir l\'email',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'L\'email n\'est pas valide '
      ],
      message: '',
      msgRules: [
        v => !!v || 'Veuillez remplir un message'
      ],
      defaultForm
    }
  },
  methods: {
    envoyer () {
      this.snackbarMessage = 'Message envoyé'
      this.snackBarColor = 'success'
      this.snackbar = true
      this.clearFields()
    },
    clearFields () {
      this.form = Object.assign({}, this.defaultForm)
      this.$refs.form.reset()
    }
  }
}
</script>

<style scoped>

</style>
