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
      Présence
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
          <Planning></Planning>
          <!-- <Calendar ref="calendar"></Calendar> -->
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
export default {
  name: 'VisualisationContrat',
  components: {Planning, Fiche, Calendar},
  data () {
    return {
      model: 'tab-2',
      snackbarMessage: '',
      snackBarColor: '',
      snackbar: false
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
    this.$refs.fiche.initDonnees()
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
