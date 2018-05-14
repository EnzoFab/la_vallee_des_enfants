<template>
  <v-flex  class="my-1">
    <v-toolbar color="light-green lighten-4">
      <v-spacer></v-spacer>
      <v-toolbar-title>Choix de l'assistante maternelle</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-form v-model="estValide" ref="form" class="pa-3">
      <v-layout row wrap >
        <v-flex xs12 sm6>
          <v-select
            :items="assmats"
            v-model="assmats.id_am"
            label="Assistante"
            single-line
            item-text="nom_complet"
            item-value="id_am"
            auto
            required>
          </v-select>
        </v-flex>
      </v-layout>
    </v-form>
    <v-flex mt-3 xs12>
      <v-btn
        class="yellow lighten-2"
        depressed large round
        @click="back"
      >Précédent</v-btn>
      <v-btn
        depressed large round
        class="yellow lighten-2"
        @click="envoyer"
        :disabled="!estValide"
      >Suivant</v-btn>
    </v-flex>
  </v-flex>
</template>

<script>
import AssistanteService from '../../../services/AssistanteService'
export default {
  name: 'ChoisirAssMat',
  data () {
    return {
      assmats: [],
      id_am: null
    }
  },
  mounted () {
    this.initAssMat()
  },
  methods: {
    async initAssMat () {
      try {
        const response = await AssistanteService.getAll()
        this.assmats = response.data.assmat
        console.log('assssssssssssmat : ' + this.assmats)
      } catch (e) {
        console.log('Erreur')
      }
    }
  }
}
</script>

<style scoped>

</style>
