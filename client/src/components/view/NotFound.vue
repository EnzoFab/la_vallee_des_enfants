<template>
  <section>
    <v-container grid-list-xl>
      <v-card class="elevation-0 transparent">
        <v-card-title primary-title class="layout justify-center">
          <div class="headline text-xs-center">
            <h1 class="red--text darken-2">Ouinnnn !</h1>
          </div>
        </v-card-title>
      </v-card>
      <v-layout row wrap align-center class="my-5">
        <v-flex xs6>
          <v-card flat>
            <v-card-title primary-title class="layout justify-center">
              <div class="headline text-xs-center">
                <h3>Il semble que la page que vous demandez n'existe pas</h3>
              </div>
            </v-card-title>
            <v-card-text>
              <h3>Erreur code : 404 </h3>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs6 sm4>
          <v-card flat>
            <v-card-media src="static/crying_baby.png" height="400px">
            </v-card-media>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped>
</style>
