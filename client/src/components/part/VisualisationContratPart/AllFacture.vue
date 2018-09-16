<template>
  <v-flex md10 offset-md1>
    <v-snackbar
      v-model="snackbar"
      absolute
      top
      right
      color="success"
    >
      <span>{{snackbarMessage}}</span>
    </v-snackbar>
    <v-alert v-model="erreur" type="error" dismissible>
      {{erreurMessage}}
    </v-alert>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-container grid-list-md text-xs-center>
          <v-flex d-flex md12 lg12 xl12 sm12 xs12 mt-3>
            <v-card>
              <h1 class="text-md-center blue--text">Toutes les factures</h1>
            </v-card>
          </v-flex>
        </v-container>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12>
          <v-fade-transition>
            <Searcher v-if="factures.length > 0 && factureSelectionne == null"
                      :item-attribute="['mois_fr', 'annee']" :items="factures" label="Mois ou annee">
              <v-card slot-scope="elements" class="transparent elevation-0 scroll-y" style="max-height: 15vw">
                <v-container grid-list-md text-xs-center >
                  <v-layout row wrap v-if="elements.items.length > 0">
                    <v-flex d-flex
                            md3 lg3 xl4 sm12 xs12
                            v-for="(facture,i) in elements.items" :key="i"
                            v-if="elements.items.length > 0 && factureSelectionne == null">
                      <v-card @click.native="changeFactureSelectionne(facture)" class="elevation-1">
                        <v-card-title>
                          <img height="100px" src="/static/invoice.png" />
                        </v-card-title>
                        <v-card-text>
                          <v-flex mt-2>
                            <h4 class="blue--text">{{(facture.mois_fr)}} {{ facture.annee }}</h4>
                          </v-flex>
                        </v-card-text>
                      </v-card>
                      <!-- </v-card> !-->
                    </v-flex>
                  </v-layout>
                  <v-layout v-else>
                    Aucune factures
                  </v-layout>
                </v-container>
              </v-card>
            </Searcher>
          </v-fade-transition>
          <v-fade-transition>
            <v-container v-if="factures.length == 0">
              <v-flex>
                Aucune factures disponibles
              </v-flex>
            </v-container>
          </v-fade-transition>
          <v-scale-transition>
            <Facture :facture="factureSelectionne" v-if="factureSelectionne != null" @retour="fonctionRetour"></Facture>
          </v-scale-transition>
        </v-flex>
        <v-flex xs12>
          <v-card>
            <v-card-text>
              <h2>Générer une facture</h2>
              <v-bottom-sheet hide-overlay v-model="sheet">
                <v-btn slot="activator" v-if="isAssMatConnected"
                       icon color="light-blue darken-3" dark large>
                  <v-icon large dark>add</v-icon>
                </v-btn>
                <v-card>
                  <v-card-title>
                    <v-layout row wrap>
                      <v-flex xs12>
                        <v-date-picker v-model="date_facture"
                                       type="month"
                                       full-width locale="fr"
                                       color="red lighten-1"
                                       header-color="red"
                                       :min="dateDebut"
                                       :max="dateFin"
                                       :allowed-dates="allowedMonth"
                        ></v-date-picker>
                      </v-flex>
                      <v-flex xs12>
                        <v-btn v-if="date_facture != null" @click="genererFacture"
                               color="blue" dark depressed round
                               :loading="loadingButton">
                          Generer facture du {{dateFactureAGenererFr}}
                          <span slot="loader" class="custom-loader"><v-icon light>cached</v-icon></span>
                        </v-btn>
                      </v-flex>
                    </v-layout>
                  </v-card-title>
                </v-card>
              </v-bottom-sheet>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-flex>
</template>

<script>
import FactureService from '../../../services/FactureService'
import Facture from '../VisualisationContratPart/Facture'
import DateHelper from '../../../helper/DateHelper'
import Searcher from '../Searcher'
import moment from 'moment'
export default {
  name: 'AllContrat',
  components: {Searcher, Facture},
  data () {
    return {
      factures: [],
      factureSelectionne: null,
      sheet: false,
      date_facture: null,
      dateDebutContrat: null,
      erreur: false,
      erreurMessage: '',
      snackbar: false,
      snackbarMessage: '',
      loadingButton: false
    }
  },
  mounted () {
    this.loadFacture()
  },
  props: {
    debut_contrat: null
  },
  methods: {
    loadFacture () {
      let vm = this
      FactureService.getAllByIdContrat(this.$route.params.numC).then(function (rslt) {
        if(rslt.data.erreur == null){
          vm.factures = rslt.data.factures
          for (let i = 0; i < vm.factures.length; i++) {
            vm.factures[i].mois_fr = DateHelper.getMonth()[vm.factures[i].mois - 1]
            if (vm.factures[i].mois.length === 2) {
              vm.factures[i].dateComplete = vm.factures[i].annee + '-' + vm.factures[i].mois
            } else {
              vm.factures[i].dateComplete = vm.factures[i].annee + '-0' + vm.factures[i].mois
            }
          }
        }
      }).catch(function (err) {
        console.error(err)
      })
    },
    changeFactureSelectionne (facture) {
      this.factureSelectionne = facture
    },
    fonctionRetour () {
      this.factureSelectionne = null
    },
    /**
     * reduit la liste des mois disponible pour creer une facture en fonctions des factures existantes
     */
    allowedMonth (val) {
      let allowed = true
      let splittedVal = val.split('-')
      for (let i = 0; i < this.factures.length; i++) {
        if (val === this.factures[i].dateComplete) {
          allowed = false
        }
      }
      return allowed
    },
    genererFacture () {
      this.loadingButton = true
      let vm = this
      let numC = this.$route.params.numC
      let str = this.date_facture.split('-')
      let annee = str[0]
      let mois = str[1]
      FactureService.factureExistante(numC, mois, annee)
        .then(function (r) {
          if (!r.data.existe) {
            FactureService.createFacture({mois: mois, annee: annee, id_contrat: numC})
              .then(function(rstl) {
                if (rstl.data.erreur == null) {
                  vm.triggerSnackBar('Facture créée avec succès')
                  vm.loadFacture()
                  vm.loadingButton = false
                  vm.sheet = false
                }
              })
              .catch(function (er) {
                return Promise.reject(er)
              })
          } else {
            return Promise.reject(r.data.erreur)
          }
        })
        .catch(function (e) {
          vm.sheet = false
          vm.loadingButton = false
          vm.triggerErreur(e)
        })
    },
    triggerErreur (message) {
      this.erreurMessage = message
      this.erreur = true
    },
    triggerSnackBar (message) {
      this.snackbarMessage = message
      this.snackbar = true
    }

  },
  computed: {
    /**
     * verifie si une assMat est connectée
     * @returns {boolean}
     */
    isAssMatConnected () {
      return this.$store.getters.isAssMatConnected
    },
    dateDebut () {
      return DateHelper.formatDate(new Date((this.dateDebutContrat)), true)
    },
    dateFin () {
      if (this.factureSelectionne == null ||this.factureSelectionne.dateFin == null) {
        return DateHelper.formatDate(new Date(), true)
      } else {
        return DateHelper.formatDate(new Date(this.factureSelectionne.dateFin), true)
      }
    },
    dateFactureAGenererFr () {
      return DateHelper.getDateFr(new Date(this.date_facture))
    }
  },
  watch: {
    sheet (val) {
      if (!val) {
        this.date_facture = null
      }
    }
  }
}
</script>

<style>
</style>
