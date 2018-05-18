<template>
  <v-flex md10 offset-md1>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-container grid-list-md text-xs-center>
          <v-flex d-flex md12 lg12 xl12 sm12 xs12 mt-3>
            <v-card>
              <h1 class="text-md-center blue--text">Tous les contrats</h1>
            </v-card>
          </v-flex>
        </v-container>
      </v-layout>
      <v-layout>
        <v-container grid-list-md text-xs-center>
          <v-flex d-flex
                  md12 lg12 xl12 sm12 xs12 v-if="contrats.length > 0">
            <v-flex d-flex
                    md3 lg3 xl4 sm12 xs12
                    v-for="(contrat,i) in contrats" :key="i">
              <router-link v-bind:to="'/contrat/' + contrat.id"><v-card>
                <v-flex v-if="contrat.sexeEnfant == 'F'">
                  <img height="200px" src="/static/fille.png" />
                </v-flex>
                <v-flex v-else>
                  <img height="200px" src="/static/boy.png" />
                </v-flex>
                <v-flex>
                  <v-divider></v-divider>
                  <v-flex mt-2>
                    <h4>{{ contrat.nomEnfant }} {{ contrat.prenomEnfant }}</h4>
                  </v-flex>
                </v-flex>
              </v-card>
              </router-link>
            </v-flex>
          </v-flex>
          <v-flex d-flex
                  md12 lg12 xl12 sm12 xs12 v-else>
            <v-card class="elevation-0 transparent">
              <i>Aucun contrat</i>
            </v-card >
          </v-flex>
        </v-container>
      </v-layout>
    </v-container>
  </v-flex>
</template>

<script>
import ContratService from '../../services/ContratService'
export default {
  name: 'AllContrat',
  data () {
    return {
      contrats: []
    }
  },
  mounted () {
    this.loadContratEmployeur()
  },
  methods: {
    ficheContrat () {
      this.$router.push({
        name: 'Accueil'
      })
    },
    async loadContratEmployeur () {
      try {
        let response = await ContratService.getAllByIdEmployeur(this.$route.params.numE)
        this.contrats = response.data.contrats
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>
</style>
