<template>
  <v-flex md10 offset-md1>
    <v-card>
      <v-stepper v-model="etape" class="my-2" light non-linear>
        <v-stepper-header>
          <v-stepper-step class="red--text" step="1" :complete="estValideEtape1" >Assistante</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step class="red--text" step="7" :complete="estValideEtape1" >Enfant</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="2" :complete="estValideEtape2" >Tuteur légaux</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="3" :complete="estValideEtape3">Employeur</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="4" :complete="estValideEtape4" >Informations générales</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="5" :complete="estValideEtape5" editable >Carnet de présences</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="6" :complete="estValideEtape6" >Tarifs</v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <ChoisirAssMat @submit="submitAssMat"></ChoisirAssMat>
          </v-stepper-content>
          <v-stepper-content step="7">
            <InfosEnfant @submit="submitEnfant"></InfosEnfant>
          </v-stepper-content>
          <v-stepper-content step="2">
            <TuteursLegaux @back="back" @submit="submitTuteurs"></TuteursLegaux>
          </v-stepper-content>
          <v-stepper-content step="3">
            <EmployeurOptionnel @back="back" @submit="submitEmp"></EmployeurOptionnel>
          </v-stepper-content>
          <v-stepper-content step="4">
            <InformationGenerale nom="" @back="back" @submit="submitInfoG"></InformationGenerale>
          </v-stepper-content>
          <v-stepper-content step="5">
            <PresenceTheorique @back="back" @submit="submitPresences"></PresenceTheorique>
          </v-stepper-content>
          <v-stepper-content step="6">
            <Tarifs @back="back" @submit="submitTarifs"></Tarifs>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card>
  </v-flex>
</template>

<script>
import ChoisirAssMat from '../part/contratPart/ChoisirAssMat'
import InfosEnfant from '../part/contratPart/InfosEnfant'
import PlaningPresenceContrat from '../part/contratPart/PlaningPresenceContrat'
import DateContrat from '../part/contratPart/DateDebutContrat'
import InformationGenerale from '../part/contratPart/InformationGenerale'
import EmployeurOptionnel from '../part/contratPart/EmployeurOptionnel'
import Tarifs from '../part/contratPart/Tarifs'
import TuteursLegaux from '../part/contratPart/TuteursLegaux'
import PresenceTheorique from '../part/contratPart/PresenceTheorique'
import EnfantService from '../../services/EnfantService'
import ContratService from '../../services/ContratService'
export default {
  name: 'NouveauContrat',
  components: {
    ChoisirAssMat,
    PresenceTheorique,
    TuteursLegaux,
    InformationGenerale,
    DateContrat,
    PlaningPresenceContrat,
    InfosEnfant,
    EmployeurOptionnel,
    Tarifs
  },
  data () {
    return {
      etape: 1,
      estValideEtape1: false,
      estValideEtape2: false,
      estValideEtape3: false,
      estValideEtape4: false,
      estValideEtape5: false,
      estValideEtape6: false,
      estValideEtape7: false,
      Fin: false
    }
  },
  methods: {
    async submitEnfant (data) {
      console.log(this.$store.state.assMat.id_assmat)
      try {
        let response = await EnfantService.findOneByContratID(this.$store.state.numContrat)// on regarde si l'enfant existe deja
        if (response.data.statut === 200) { // il existe un enfants
          // update l'enfant
        } else if (response.data.statut === 404) { // l'enfant n'existe pas
          let enfantR = await EnfantService.createContratEnfant(data) // creation d'un nouvel enfant
          let r = await ContratService.create({
            numContrat: this.$store.state.numContrat,
            numAssMat: this.$store.state.assMat.id_assmat
          }) // creer le contrat
          console.log('contrat ', enfantR.data.id_enfant)
          if (r.data.erreur == null) {
            let updateContrat = await ContratService.updateEnfant(
              this.$store.state.numContrat, {id_enfant: enfantR.data.id_enfant}
            )
            console.log(updateContrat.data)
            if (updateContrat.data.erreur == null) {
              this.estValideEtape1 = true
              this.etape++
            }
          }
        }
      } catch (e) {
        console.log(e.toString())
      }
    },
    submitTuteurs (data) {
      console.log(data)
      this.estValideEtape2 = true
      if (data.asEmployeur) {
        this.etape = 4
      } else {
        this.etape = 3
      }
    },
    submitEmp (data) {
      console.log(data)
      // store data in DB
      this.estValideEtape3 = true
      this.etape++
    },
    submitInfoG (data) {
      console.log(this.etape)
      console.log(data)
      this.etape++
      this.estValideEtape4 = true
    },
    submitPresences (data) {
      console.log(this.etape)
      console.log(data)
      this.etape++
      this.estValideEtape5 = true
    },
    submitTarifs (data) {
      console.log(this.etape)
      console.log(data)
      this.etape++
      this.fin = true
      this.estValideEtape6 = true
    },
    back () {
      this.etape--
    }
  },
  mounted () {
    console.log(this.$store.state.numContrat)
  }
}
</script>

<style scoped>

</style>
