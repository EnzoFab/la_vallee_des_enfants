
<template>
  <v-flex md10 offset-md1>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-container grid-list-md text-xs-center v-if="factureSelectionne == null">
          <v-flex d-flex md12 lg12 xl12 sm12 xs12 mt-3>
            <v-card>
              <h1 class="text-md-center blue--text">Toutes les factures</h1>
            </v-card>
          </v-flex>
        </v-container>
      </v-layout>
      <v-layout>
        <v-container grid-list-md text-xs-center>
          <v-layout row wrap>
            <v-flex d-flex
                    md3 lg3 xl4 sm12 xs12
                    v-for="(facture,i) in factures" :key="i"
                    v-if="factures.length > 0 && factureSelectionne == null">
              <v-card @click.native="changeFactureSelectionne(facture)">
                <v-flex>
                  <img height="200px" src="/static/invoice.png" />
                </v-flex>
                <v-flex>
                  <v-divider></v-divider>
                  <v-flex mt-2>
                    <h4>{{ facture.mois }} {{ facture.annee }}</h4>
                  </v-flex>
                </v-flex>
              </v-card>
             <!-- </v-card> !-->
            </v-flex>
            <OneFacture :facture="factureSelectionne" v-if="factureSelectionne != null" @retour="fonctionRetour"></OneFacture>
          </v-layout>
        </v-container>
      </v-layout>
    </v-container>
    <v-btn class="light-blue white--text" @click="nouvelleFacture" v-if="isAssMatConnected && factureSelectionne == null">
      Nouvelle facture
    </v-btn>
  </v-flex>
</template>

<script>
import FactureService from '../../../services/FactureService'
import OneFacture from '../VisualisationContratPart/OneFacture'
var randomstring = require('randomstring')
export default {
  name: 'AllContrat',
  components: {OneFacture},
  data () {
    return {
      factures: [],
      factureSelectionne: null
    }
  },
  mounted () {
    this.loadFacture()
  },
  methods: {
    nouvelleFacture () {
      this.storeRandomString() // crée une chaine de charactere aleatoire et la stocke dans le store
      this.$router.push({
        name: 'NouvelleFacture'
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
    async loadFacture () {
      let vm = this
      FactureService.getAllByIdContrat(this.$route.params.numC).then(function (rslt) {
        if(rslt.data.erreur == null){
          vm.factures = response.data.factures
        }
      }).catch(function (err) {
        console.log(err)
      })
      /*
      try {
        let response = await FactureService.getAllByIdContrat(this.$route.params.numC)
        if (response.data.erreur == null) {
          this.factures = response.data.factures
        }
      } catch (e) {
        console.log(e)
      }
      */
    },
    changeFactureSelectionne (facture) {
      this.factureSelectionne = facture
    },

    fonctionRetour () {
      this.factureSelectionne = null
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
