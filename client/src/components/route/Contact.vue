<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 md6 offset-md3 class="my-5">
        <v-card>
          <v-toolbar color="blue-grey lighten-3" dark>
            <v-spacer></v-spacer>
            <v-toolbar-title>Nous contacter</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form v-model="estValide">
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
              <v-btn
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
export default {
  name: 'Contact',
  data () {
    return {
      estValide: false, // permet de savoir si le formulaire est valide
      name: '',
      nameLenght: 20, // au maximum 20 characters pour le nom
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= this.nameLenght || 'Il ne peut pas y avoir plus de 20 characteres'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be estValide'
      ]
    }
  },
  methods: {
    envoyer () {

    }
  }
}
</script>

<style scoped>

</style>
