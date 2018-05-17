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
            v-model="dateDebutFr"
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
        <h3>Date début période adaptation</h3>
        <v-menu
          ref="menu2"
          lazy
          :close-on-content-click="false"
          v-model="menu2"
          transition="scale-transition"
          offset-y
          full-width
          :nudge-right="40"
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            color="blue"
            label="Date début adaptation"
            v-model="dateDebutAdaptFr"
            prepend-icon="event"
            required
            :rules="regleDateDebutAdapt"
            readonly
          ></v-text-field>
          <v-date-picker
            locale="fr_FR"
            v-model="dateDebutPeriodeAdapt"
            no-title
            scrollable
          >
            <v-spacer></v-spacer>
          </v-date-picker>
        </v-menu>
      </v-flex>
      <v-flex xs12 class="ma-3">
        <h3>Date fin période adaptation</h3>
        <v-menu
          ref="menu3"
          lazy
          :close-on-content-click="false"
          v-model="menu3"
          transition="scale-transition"
          offset-y
          full-width
          :nudge-right="40"
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            color="blue"
            label="Date fin periode adaptation"
            v-model="dateFinAdaptFr"
            prepend-icon="event"
            required
            :rules="regleDateFinAdapt"
            readonly
          ></v-text-field>
          <v-date-picker
            locale="fr_FR"
            v-model="dateFinPeriodeAdapt"
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
        class="light-green lighten-4"
        depressed large round
        @click="back"
      >Précédent</v-btn>
      <v-btn
        color="green lighten-1"
        depressed large round
        :dark="estValide"
        @click="envoyer"
        :disabled="!estValide"
      >
        Suivant
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
      menu2: false,
      menu3: false,
      date: null,
      estValide: false,
      typesContrats: [],
      typeDuContrat: null,
      modesPaiements: [],
      dateDebutPeriodeAdapt: null,
      dateFinPeriodeAdapt: null,
      modeDePaiementContrat: null,
      jours: [],
      jourPrelevement: 0,
      regleDateDebut: [
        v => !!v || 'Veuillez remplir la date'
      ],
      regleDateDebutAdapt: [
        v => !!v || 'Veuillez remplir la date',
        v => v < this.date || 'La periode d\'adaptation ne peut pas être avant à la date de début du contrat'
      ],
      regleDateFinAdapt: [
        v => !!v || 'Veuillez remplir la date',
        function (v) {
          if (this.dateDebutPeriodeAdapt && this.dateDebutPeriodeAdapt != null) {
            return new Date(v) < new Date(this.dateDebutPeriodeAdapt) || 'La fin periode d\'adaptation ne peut pas être avant le début de la période'
          } else {
            return 'La fin periode d\'adaptation ne peut pas être avant le début de la période'
          }
        }
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
    dateDebutFr () { // transforme la date qui est en format anglaise en format francaise
      var dateString = null
      if (this.date != null) {
        var d = new Date(this.date)
        let day = d.getDate()
        let month = mois[d.getMonth()]
        let year = d.getFullYear()
        dateString = day + ' ' + month + ' ' + year
      }
      return dateString
    },
    dateDebutAdaptFr () { // transforme la date qui est en format anglaise en format francaise
      var dateString = null
      if (this.dateDebutPeriodeAdapt != null) {
        var d = new Date(this.dateDebutPeriodeAdapt)
        let day = d.getDate()
        let month = mois[d.getMonth()]
        let year = d.getFullYear()
        dateString = day + ' ' + month + ' ' + year
      }
      return dateString
    },
    dateFinAdaptFr () { // transforme la date qui est en format anglaise en format francaise
      var dateString = null
      if (this.dateFinPeriodeAdapt != null) {
        var d = new Date(this.dateFinPeriodeAdapt)
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
    initNombreJour () { // remplit avec 28 jours
      for (var i = 1; i < 29; i++) {
        this.jours.push(i)
      }
    },
    envoyer () {
      console.log( typeof this.date)
      let data = {
        date: this.date,
        modePaiement: this.modeDePaiementContrat,
        typeContrat: this.typeDuContrat,
        jourPrelevement: this.jourPrelevement,
        debutAdapt: this.dateDebutPeriodeAdapt,
        finAdapt: this.dateFinPeriodeAdapt
      }
      this.$emit('submit', data)
    },
    back () {
      this.$emit('back')
    }
  }
}
</script>

<style scoped>

</style>
