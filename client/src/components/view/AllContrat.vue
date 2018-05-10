<template>
  <v-flex md10 offset-md1>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex d-flex md12 lg12 xl12 sm12 xs12 >
          <v-card>
            Tous les contrats
            <div v-if="contrats.length > 0">
              <v-flex d-flex
                      md6 lg4 xl4 sm12 xs12
                      v-for="(contrat,i) in contrats" :key="i">
                <v-card>{{contrat}}</v-card>
              </v-flex>
            </div>
            <v-flex d-flex
                    md12 lg12 xl12 sm12 xs12 v-else>
              <v-card class="elevation-0 transparent">
                <i>Aucun contrat</i>
              </v-card >
            </v-flex>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-btn @click="nouveauContrat">
      Nouveau contrat
    </v-btn>
  </v-flex>
</template>

<script>
import ContratService from '../../services/ContratService'

var randomstring = require('randomstring')
export default {
  name: 'AllContrat',
  data () {
    return {
      contrats: []
    }
  },
  methods: {
    nouveauContrat () {
      this.storeRandomString() // crée une chaine de charactere aleatoire et la stocke dans le store
      this.$router.push({
        name: 'NouveauContrat'
      })
    },
    storeRandomString () {
      let random = randomstring.generate(35) // chaine de charactere aleatoire de taille 15
      this.$store.dispatch('setNumContrat', random)
    },
    async loadContrat () {
      try {
        let response = await ContratService.getAll()
        this.contrats = response.data.contrats
      } catch (e) {

      }
    }
  }
}
</script>

<style scoped>

</style>
