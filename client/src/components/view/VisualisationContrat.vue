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
      Fiche
    </v-tab>
    <v-tab
      :href="'#tab2'"
    >
      Planning des présences
    </v-tab>
    <v-tab
      :href="'#tab3'"
    >
      Facture
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
        <v-card flat>
         <Planning :nomCompletEnfant="nomCompletEnfant" :numContrat="$route.params.numC"></Planning>
        </v-card>
      </v-tab-item>
      <v-tab-item
        :id="'tab3'"
      >
        <v-card flat>
          <AllFacture ref="allfacture"></AllFacture>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-tabs>
  </v-flex>
</template>

<script>
import Fiche from '../part/VisualisationContratPart/Fiche'
import Calendar from '../part/Calendar'
import Planning from '../part/Planning'
import ContratService from '../../services/ContratService'
import AllFacture from '../part/VisualisationContratPart/AllFacture'
export default {
  name: 'VisualisationContrat',
  components: {Planning, Fiche, Calendar, AllFacture},
  data () {
    return {
      model: 'tab-2',
      snackbarMessage: '',
      snackBarColor: '',
      snackbar: false,
      nomCompletEnfant: ''
    }
  },
  methods: {
    triggerSnackBar (message, color) {
      this.snackbarMessage = message
      this.snackBarColor = color
      this.snackbar = true
    }
  },
  mounted () {
    let vm = this
    this.$refs.fiche.initDonnees().then(function () {
      vm.nomCompletEnfant = vm.$refs.fiche.prenomEnfant + ' ' + vm.$refs.fiche.nomEnfant
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
