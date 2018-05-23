
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
        <v-layout>
        <v-flex>
          <h2 class="text-md-center blue--text"> Contrats en cours</h2>
        </v-flex>
        </v-layout>
        <v-container grid-list-md text-xs-center>
          <v-layout row wrap>
            <v-flex d-flex
                    md3 lg3 xl4 sm12 xs12
                    v-for="(contrat,i) in contratsEnCours" :key="i"
                    v-if="contratsEnCours.length > 0">
              <v-card :to="'/contrat/' + contrat.id">
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
            </v-flex>
            <v-flex d-flex
                    md12 lg12 xl12 sm12 xs12 v-else>
              <v-card class="elevation-0 transparent">
                <i>Aucun contrat</i>
              </v-card >
            </v-flex>
          </v-layout>
        </v-container>
      </v-layout>
      <v-divider></v-divider>
      <v-layout>
        <v-layout>
        <v-flex>
          <h2 class="text-md-center blue--text"> Contrats terminés</h2>
        </v-flex>
        </v-layout>
        <v-container grid-list-md text-xs-center>
          <v-layout row wrap>
            <v-flex d-flex
                    md3 lg3 xl4 sm12 xs12
                    v-for="(contrat,i) in contratsTermines" :key="i"
                    v-if="contratsTermines.length > 0">
              <v-card :to="'/contrat/' + contrat.id">
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
            </v-flex>
            <v-flex d-flex
                    md12 lg12 xl12 sm12 xs12 v-else>
              <v-card class="elevation-0 transparent">
                <i>Aucun contrat</i>
              </v-card >
            </v-flex>
          </v-layout>
        </v-container>
      </v-layout>
    </v-container>
    <v-btn class="light-blue white--text" @click="nouveauContrat" v-if="isAssMatConnected">
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
      contratsEnCours: [],
      contratsTermines: []

    }
  },
  mounted () {
    this.loadContratEnCours()
    this.loadContratTermines()
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
    ficheContrat () {
      this.$router.push({
        name: 'Accueil'
      })
    },
    async loadContratEnCours () {
      try {
        let response = await ContratService.getAllEnCours()
        this.contratsEnCours = response.data.contrats
      } catch (e) {
        console.log(e)
      }
    },
    async loadContratTermines () {
      try {
        let response = await ContratService.getAllTermines()
        this.contratsTermines = response.data.contrats
      } catch (e) {
        console.log(e)
      }
    }
  },
  computed: {
    /**
     * verifie si une assMat est connectée
     * @returns {boolean}
     */
    isAssMatConnected () {
      return this.$store.getters.isAssMatConnected
    }
  }
}
</script>

<style scoped>
</style>
