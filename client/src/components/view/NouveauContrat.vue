<template>
  <v-flex md10 offset-md1>
    <v-card>
      <v-alert v-model="erreur" type="error" dismissible>
        {{erreurMessage}}
      </v-alert>
      <v-stepper v-model="etape" class="my-2" light non-linear>
        <v-stepper-header>
          <v-stepper-step class="red--text" step="1" :complete="estValideEtape1" >Assistante</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step class="red--text" step="2" :complete="estValideEtape1" >Enfant</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="3" :complete="estValideEtape2" >Tuteur légaux</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="4" :complete="estValideEtape3">Employeur</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="5" :complete="estValideEtape4" >Informations générales</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="6" :complete="estValideEtape5" editable >Carnet de présences</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="7" :complete="estValideEtape6" >Tarifs</v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <ChoisirAssMat @submit="submitAssMat" @cancel="annuler" @erreur="triggerErreur"></ChoisirAssMat>
          </v-stepper-content>
          <v-stepper-content step="2">
            <InfosEnfant @submit="submitEnfant" @back="back"></InfosEnfant>
          </v-stepper-content>
          <v-stepper-content step="3">
            <TuteursLegaux @back="back" @submit="submitTuteurs"></TuteursLegaux>
          </v-stepper-content>
          <v-stepper-content step="4">
            <EmployeurOptionnel @back="back" @submit="submitEmp"></EmployeurOptionnel>
          </v-stepper-content>
          <v-stepper-content step="5">
            <InformationGenerale nom="" @back="back" @submit="submitInfoG"></InformationGenerale>
          </v-stepper-content>
          <v-stepper-content step="6">
            <PresenceTheorique @back="back" @submit="submitPresences"></PresenceTheorique>
          </v-stepper-content>
          <v-stepper-content step="7">
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
import TuteurService from "../../services/TuteurService";
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
      Fin: false,
      erreur: false,
      erreurMessage: null,
      idAssmat: null
    }
  },
  methods: {
    async submitEnfant (data) {
      // console.log(this.$store.state.assMat.id_assmat)
      try {
        let response = await EnfantService.findOneByContratID(this.$store.state.numContrat)// on regarde si l'enfant existe deja
        if (response.data.statut === 200) { // il existe un enfants
          // update l'enfant
        } else if (response.data.statut === 404) { // l'enfant n'existe pas
          let enfantR = await EnfantService.createContratEnfant(data) // creation d'un nouvel enfant
          let r = await ContratService.create({
            numContrat: this.$store.state.numContrat,
            numAssMat: this.idAssmat || this.$store.state.assMat.id_assmat
          }) // creation du contrat

          if (r.data.erreur == null) {
            let updateContrat = await ContratService.updateEnfant(
              this.$store.state.numContrat, {id_enfant: enfantR.data.id_enfant}
            ) // liaison entre le contrat et l'enfant
            console.log(updateContrat.data)
            if (updateContrat.data.erreur == null) {
              this.estValideEtape1 = true
              this.etape++
            } else {
              this.erreurMessage = 'Une erreur est survenue'
              this.erreur = true
            }
          } else {
            this.triggerErreur('Une erreur est survenue')
          }
        } else {
          this.triggerErreur('Une erreur est survenue')
        }
      } catch (e) {
        this.triggerErreur(e.toString())
      }
    },
    async submitTuteurs (data) {
      console.log(data)
      try {
        let responseTuteur = await TuteurService.getTuteurByContrat(this.$store.state.numContrat)
        if (responseTuteur.statut === 200) { // le tuteur existe
          // update le tuteur
        } else {
          let responseCreation = await TuteurService.createContratTuteur(data)
          if (responseCreation.erreur == null) { // insertion avec succes

          } else {
            this.triggerErreur('Une erreur est survenue')
          }
        }
      } catch (e) {
        this.triggerErreur(e.toString())
      }
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
    submitAssMat (data) {
      this.idAssmat = data
      console.log(this.idAssmat)
      this.etape++
    },
    back () {
      this.etape--
    },
    triggerErreur (data) {
      this.erreurMessage = data
      this.erreur = true
    },
    annuler () {
      // redirection
    }
  },
  mounted () {
    console.log(this.$store.state.numContrat)
  }
}
</script>

<style scoped>

</style>
