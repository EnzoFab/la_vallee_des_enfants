<template>
  <v-flex mt-3>
    <v-snackbar
      v-model="snackbar"
      absolute
      top
      right
      :color="snackBarColor"
    >
      <span>{{snackbarMessage}}</span>
    </v-snackbar>
    <v-tabs
      dark
      color="blue"
      show-arrows
    >
      <v-tabs-slider color="yellow"></v-tabs-slider>
      <v-tab
        :href="'#tab1'"
      >
        Informations essentielles
      </v-tab>
      <v-tab
        :href="'#tab2'"
      >
        Présences
      </v-tab>
      <v-tab
        :href="'#tab3'"
      >
        Factures
      </v-tab>
      <v-tabs-items>
        <v-tab-item
          :id="'tab1'"
        >
          <v-card flat>
            <Fiche ref="fiche"></Fiche>
          </v-card>
        </v-tab-item>
        <v-tab-item
          :id="'tab2'"
        >
          <v-card flat color="indigo lighten-5">
            <v-bottom-nav
              :active.sync="bottomNav"
              color="red lighten-5"
              :value="true"
              shift
              mandatory
              style="margin-top: 0.1%; opacity: 0.7"
              height="65"
            >
              <v-btn :color="color" flat>
                <span>Récapitulatif des présences</span>
                <v-icon>history</v-icon>
              </v-btn>

              <v-btn flat :color="color">
                <span>Planning</span>
                <v-icon>schedule</v-icon>
              </v-btn>

              <v-btn flat :color="color">
                <span>Télécharger</span>
                <v-icon>get_app</v-icon>
              </v-btn>
            </v-bottom-nav>
            <v-card>
              <v-scale-transition>
                <Recap :nomCompletEnfant="nomCompletEnfant"
                       v-if="bottomNav === 0"
                       :numContrat="$route.params.numC"
                       color="cyan lighten-5"
                />
              </v-scale-transition>
              <DateRangePresence
                :nomCompletEnfant="nomCompletEnfant"
                v-if="bottomNav === 2"
                :numContrat="$route.params.numC"
                color="brown lighten-4"
                :debut="dateDebutContrat"
              />
              <v-scale-transition>

              </v-scale-transition>
            </v-card>
          </v-card>
        </v-tab-item>
        <v-tab-item
          :id="'tab3'"
        >
          <v-card flat>
            <AllFacture ref="allfacture" :debut_contrat="dateDebutContrat"></AllFacture>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </v-flex>
</template>

<script>
import Fiche from '../part/VisualisationContratPart/Fiche'
import Calendar from '../part/Calendar'
import Recap from '../part/RecapitulatifPresence'
import ContratService from '../../services/ContratService'
import AllFacture from '../part/VisualisationContratPart/AllFacture'
import DateRangePresence from "../part/DateRangePresence";
export default {
  name: 'VisualisationContrat',
  components: {DateRangePresence, Recap, Fiche, Calendar, AllFacture},
  data () {
    return {
      model: 'tab-2',
      snackbarMessage: '',
      snackBarColor: '',
      snackbar: false,
      nomCompletEnfant: '',
      dateDebutContrat: null,
      bottomNav: 0
    }
  },
  methods: {
    triggerSnackBar (message, color) {
      this.snackbarMessage = message
      this.snackBarColor = color
      this.snackbar = true
    }
  },
  computed: {
    color () {
      switch (this.bottomNav) {
        case 0: return 'cyan darken-2'
        case 1: return 'light-green darken-2'
        case 2: return 'brown'
      }
    }
  },
  mounted () {
    let vm = this
    this.$refs.fiche.initDonnees().then(function () {
      vm.nomCompletEnfant = vm.$refs.fiche.prenomEnfant + ' ' + vm.$refs.fiche.nomEnfant
      vm.$refs.allfacture.dateDebutContrat = vm.$refs.fiche.dateDebutContrat
     vm.dateDebutContrat = vm.$refs.fiche.dateDebutContrat
    })
  },
  beforeRouteEnter (to, from, next) {
    // verifier que le contrat existe
    ContratService.donneesContrat(to.params.numC)
      .then(function (result) {
        if (result.data.erreur == null) {
          next()
        } else {
          next('/404') // si le contrat n'existe pas redirection vers la page 404
        }
      })
      .catch(function () {
        next('/404')
      })
  }
}
</script>

<style scoped>

</style>
