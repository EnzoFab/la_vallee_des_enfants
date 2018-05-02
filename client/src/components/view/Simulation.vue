<template>
  <v-stepper v-model="etape" class="my-2" light>
    <v-stepper-header>
      <v-stepper-step step="1" :complete="estValideEtape1" >Information générales</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="2" :complete="estValideEtape2" >Enfants</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="3" :complete="estValideEtape2">Tuteurs légaux</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="4" >Name of step 3</v-stepper-step>
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content step="1">
       <InformationGenerale></InformationGenerale>
      </v-stepper-content>
      <v-stepper-content step="2">
        <infos-enfant @submit="submitEnfant"></infos-enfant>
      </v-stepper-content>
      <v-stepper-content step="3">
        <date-contrat @back="dateContratBack" @submit="submitDateContrat"></date-contrat>
      </v-stepper-content>
      <v-stepper-content step="5">
        <!-- <planing-presence-contrat></planing-presence-contrat> -->
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import InfosEnfant from '../part/contratPart/InfosEnfant'
import PlaningPresenceContrat from '../part/contratPart/PlaningPresenceContrat'
import DateContrat from '../part/contratPart/DateDebutContrat'
import InformationGenerale from '../part/contratPart/InformationGenerale'
export default {
  name: 'Simulation',
  components: {InformationGenerale, DateContrat, PlaningPresenceContrat, InfosEnfant},
  data () {
    return {
      etape: 1,
      estValideEtape1: false,
      estValideEtape2: false,
      estValideEtape3: false

    }
  },
  methods: {
    submitEnfant (data) {
      console.log(data)
      // store data in DB
      this.estValideEtape1 = true
      this.etape = 2
    },
    submitDateContrat (data) {
      console.log(data)
      // store data in DB
      this.estValideEtape2 = true
      this.etape = 3
    },
    dateContratBack () {
      this.etape = 1
    }
  }
}
</script>

<style scoped>

</style>
