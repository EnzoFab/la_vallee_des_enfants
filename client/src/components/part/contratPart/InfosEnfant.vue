<template>
  <v-card>
    <v-layout row wrap>
      <v-flex  xs12 md6 offset-md3 class="my-5">
        <v-toolbar :color="toolbarColor" class="light-green lighten-4">
          <v-spacer></v-spacer>
          <v-toolbar-title>Informations de l'enfant</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-form>
          <v-text-field label="Nom de l'enfant" color="light-blue darken-4"></v-text-field>
          <v-text-field label="Prénom de l'enfant" color="light-blue darken-4"></v-text-field>
          <h3>L'enfant est :</h3>
          <v-radio-group v-model="row" mandatory="true" row>
            <v-spacer></v-spacer>
            <v-radio label="Une fille" value="F" ></v-radio>
            <v-radio label="Un garçon" value="G"></v-radio>
            <v-spacer></v-spacer>
          </v-radio-group>
          <v-spacer></v-spacer>
          <h3>Date de naissance :</h3>
          <v-flex xs12 sm6 offset-md3>
            <v-date-picker
              locale="fr"
              show-current="false"
              background-color="green"
              no-title="true"
              v-model="picker"
              color="light-green lighten-4"
              :reactive="reactive"></v-date-picker>
          </v-flex>
        </v-form>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  name: 'InfosEnfant'
}
</script>

<style scoped>

</style>
