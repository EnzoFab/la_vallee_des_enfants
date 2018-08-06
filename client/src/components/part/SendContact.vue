<template>
  <v-layout row wrap>
    <v-flex xs12 md6 offset-md3 class="my-5">
      <v-card class="transparent elevation-0">
        <v-toolbar color="blue-grey lighten-3" class="elevation-0" style="opacity: 0.8" dark>
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
              :readonly="isEmployeurConnected"
              required
            ></v-text-field>
            <v-text-field
              label="E-mail"
              v-model.trim="email"
              :rules="emailRules"
              :readonly="isEmployeurConnected"
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
</template>

<script>
  const nameLength = 20
  export default {
    name: 'SendContact',
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
        this.$notify({
          group: 'assistante',
          title: 'Message envoyé',
          text: 'Votre message a bien été envoyé',
          duration: 4000,
          speed: 500,
          type: 'success'
        })
      },
      clearFields () {
        this.form = Object.assign({}, this.defaultForm)
        this.$refs.form.reset()
      }
    },
    computed: {
      isEmployeurConnected () {
        return this.$store.getters.isEmployeurConnected
      }
    },
    mounted () {
      if (this.isEmployeurConnected) {
        this.email = this.$store.state.employeur.mail
        this.name = this.$store.state.employeur.prenom + ' ' + this.$store.state.employeur.nom_usage
      }
    }
  }
</script>

<style scoped>

</style>
