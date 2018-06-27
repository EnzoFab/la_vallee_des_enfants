<template>
  <v-container>
    <v-layout row wrap>
      <v-flex>
        <v-card>
          <v-toolbar color="deep-purple lighten-2" dark card>
            <v-spacer></v-spacer>
            <v-toolbar-title>Mot de passe oublié</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>

          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'MotDePasseOublie',
  data () {
    return {
      mail: ''
    }
  }
}
</script>

<style scoped>

</style>
