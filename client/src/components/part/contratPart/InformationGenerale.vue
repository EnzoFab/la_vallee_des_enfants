<template>
  <v-flex xs12 class="my-1">
    <v-toolbar class="green lighten-1" dark>
      <v-spacer></v-spacer>
      <v-toolbar-title>Informations générales</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-form v-model="estValide" ref="form" class="pa-3">
      <v-flex xs12 class="ma-3">
        <h3>Type de contrat</h3>
        <v-select
          :items="typesContrats"
          v-model="typeDuContrat"
          label="Type de contrat"
          single-line
          item-text="libelle"
          item-value="id"
          auto
          required
          prepend-icon="event_note"
          :rules="regleTypeContrat"
        ></v-select>
      </v-flex>
      <v-flex xs12 class="ma-3">
        <h3>Date de début du contrat</h3>
        <v-menu
          ref="menu"
          lazy
          :close-on-content-click="false"
          v-model="menu"
          transition="scale-transition"
          offset-y
          full-width
          :nudge-right="40"
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            color="blue"
            label="Date debut du contrat"
            v-model="dateFr"
            prepend-icon="event"
            required
            :rules="regleDateDebut"
            readonly
          ></v-text-field>
          <v-date-picker
            locale="fr_FR"
            v-model="date"
            no-title
            scrollable
          >
            <v-spacer></v-spacer>
          </v-date-picker>
        </v-menu>
      </v-flex>
      <v-flex xs12 class="ma-3">
        <h3>Mode de paiement</h3>
        <v-select
          :items="modesPaiements"
          v-model="modeDePaiementContrat"
          label="Mode de paiement"
          single-line
          item-text="libelle"
          item-value="id"
          auto
          prepend-icon="attach_money"
          required
          :rules="regleModePaiement"
         ></v-select>
      </v-flex>
      <v-flex xs12 class="ma-3">
        <h3>Jour de prélèvement</h3>
        <span v-if="jourPrelevement != 0">le {{jourPrelevement}} de chaque mois</span>
        <v-select
          :items="jours"
          v-model="jourPrelevement"
          label="Jour de prélèvement"
          single-line
          auto
          :rules="regleJourPrelevement"
          required
          prepend-icon="attach_money"
          ></v-select>
      </v-flex>
      <v-btn
        color="green lighten-1"
        depressed large round
        :dark="estValide"
        @click="envoyer"
        :disabled="!estValide"
      >
        Envoyer
      </v-btn>
    </v-form>
  </v-flex>
</template>

<script>
import TypeService from '../../../services/TypeService'
let mois = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre']
export default {
  name: 'InformationGenerale',
  data () {
    return {
      menu: false,
      date: null,
      estValide: false,
      typesContrats: [],
      typeDuContrat: null,
      modesPaiements: [],
      modeDePaiementContrat: null,
      jours: [],
      jourPrelevement: 0,
      regleDateDebut: [
        v => !!v || 'Veuillez remplir la date'
      ],
      regleTypeContrat: [
        v => !!v || 'Veuillez renseigner le type de contrat'
      ],
      regleModePaiement: [
        v => !!v || 'Veuillez renseigner le mode de paiement'
      ],
      regleJourPrelevement: [
        v => !!v || 'Veuillez renseigner le jour de prélèvement'
      ]
    }
  },
  computed: {
    dateFr () { // transforme la date qui est en format anglaise en format francaise
      var dateString = null
      if (this.date != null) {
        var d = new Date(this.date)
        let day = d.getDate()
        let month = mois[d.getMonth()]
        let year = d.getFullYear()
        dateString = day + ' ' + month + ' ' + year
      }
      return dateString
    }
  },
  mounted () {
    /* TypeService.modeDepaiements().then(function (response) {
      console.log(response.data.modepaiements)
      // this.modesPaiements = response.data.modepaiements
      this.modesPaiements = ['1', '2']
    }).catch(function (er) {
      console.log(er)
    }) */
    this.initModePaiement()
    this.initTypeContrat()
    this.initNombreJour()
  },
  methods: {
    async initModePaiement () {
      try {
        const response = await TypeService.modeDepaiements() // appel au serveur
        console.log(response.data)
        this.modesPaiements = response.data.modepaiements
      } catch (e) {
        console.log(e)
      }
    },
    async initTypeContrat () {
      try {
        const response = await TypeService.typeContrat()
        this.typesContrats = response.data.typescontrat
        console.log(response.data.typescontrat)
      } catch (e) {
        console.log(e)
      }
    },
    initNombreJour () { // remplies avec 28 jours
      for (var i = 1; i < 29; i++) {
        this.jours.push(i)
      }
    },
    envoyer () {
      let data = {
        date: this.date,
        modePaiement: this.modeDePaiementContrat,
        typeContrat: this.typeContrat,
        jourPrelevement: this.jourPrelevement
      }
      console.log('submit', data)
    }
  }
}
</script>

<style scoped>

</style>
