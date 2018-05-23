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
            v-model="id_assmat"
            label="Assistante maternelle"
            single-line
            item-text="nom_complet"
            item-value="id_am"
            :rules="regleChoixAssmat"
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
        to="/contrat/"
      >Annuler</v-btn>
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
const randomstring = require('randomstring')
export default {
  name: 'ChoisirAssMat',
  data () {
    return {
      assmats: [],
      id_assmat: null,
      estValide: false,
      regleChoixAssmat: [
        v => !!v || 'Veuillez choisir une assistante'
      ]
    }
  },
  mounted () {
    this.initAssMat()
    if (!this.$store.state.numContrat || this.$store.state.numContrat == null) {
      let random = randomstring.generate(35) // chaine de charactere aleatoire de taille 15
      this.$store.dispatch('setNumContrat', random)
    }
  },
  methods: {
    async initAssMat () {
      try {
        const response = await AssistanteService.getAll()
        this.assmats = response.data.assmat
      } catch (e) {
        this.$emit('erreur', e.toString())
      }
    },
    envoyer () {
      this.$emit('submit', this.id_assmat) // on envoie l'id assmat
    },
    annuler () {
      this.$emit('cancel')
    }
  }
}
</script>

<style scoped>

</style>
