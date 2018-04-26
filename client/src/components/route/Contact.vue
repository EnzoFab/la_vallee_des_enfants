<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 md6 offset-md3>
        <v-card>
          <v-toolbar color="blue-grey lighten-2" dark>
            <v-spacer></v-spacer>
            <v-toolbar-title>Nous contacter</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form v-model="valid">
              <v-text-field
                label="Name"
                v-model="name"
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
      valid: false,
      name: '',
      nameLenght: 20,
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= this.nameLenght || 'Name must be less than 10 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ]
    }
  }
}
</script>

<style scoped>

</style>
