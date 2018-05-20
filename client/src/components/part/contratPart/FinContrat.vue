<template>
  <v-flex  md12 lg12 xl12 sm12 xs12>
    <v-toolbar color="green lighten-2" dark>
      <v-spacer></v-spacer>
      <v-toolbar-title>Fin</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-container grid-list-xl>
      <v-layout row wrap>
        <v-flex md12 lg12 xl12 sm12 xs12>
          <v-card class="elevation-0 transparent"
          >
            <v-card-media src="/static/2bebe.png" height="35vh"></v-card-media>
          </v-card>
        </v-flex>
        <v-flex md12 lg12 xl12 sm12 xs12>
          <v-card class="elevation-0 transparent">
            <v-card-title primary-title class="layout justify-center">
              <div class="headline text-xs-center bl2"><h3>Le contrat est prêt à etre créé</h3></div>
            </v-card-title>
            <h4 class="headline">Appuyez sur "Sauvegarger le contrat" pour créer votre contrat.<br>
              Si vous n'êtes pas sur(e) vous pouvez toujours le modifier en appuyant sur "revenir au contrat"</h4>
          </v-card>
        </v-flex>
        <v-flex md6 lg6 xl6 sm6 xs6></v-flex>
        <v-fade-transition>
          <v-flex mt-3 md12 lg12 xl12 sm12 xs12 v-if="!progress">
            <v-btn
              depressed large round
              class="green lighten-2"
              dark
              @click="emitEvent('envoyer')"
            >Sauvegarder le contrat</v-btn>
          </v-flex>
        </v-fade-transition>
        <v-fade-transition>
          <v-flex md12 lg12 xl12 sm12 xs12 v-if="progress">
            <v-progress-circular :size="70" :width="7" indeterminate color="green lighten-2"></v-progress-circular>
          </v-flex>
        </v-fade-transition>
        <v-fade-transition>
          <v-flex md12 lg12 xl12 sm12 xs12 v-if="!progress">
            <v-btn
              class="green lighten-2"
              depressed outline small round
              @click="emitEvent('back')"
            >
              <span class="green--text">Revenir au contrat</span>
            </v-btn>
          </v-flex>
        </v-fade-transition>

      </v-layout>
    </v-container>

  </v-flex>
</template>

<script>
export default {
  name: 'FinContrat',
  props: {
    progress: {Boolean, required: true}
  },
  methods: {
    emitEvent (event) {
      this.$emit(event)
    }
  }
}
</script>

<style >
  .responsive {
    width: 20%;
    height: auto;
  }
</style>
