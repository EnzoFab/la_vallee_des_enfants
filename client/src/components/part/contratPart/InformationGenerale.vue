<template>
  <v-flex xs12 class="my-1">
    <v-toolbar class="green lighten-1" dark>
      <v-spacer></v-spacer>
      <v-toolbar-title>Informations générales</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-form v-model="estValide" ref="form" class="pa-3">
      <v-flex md12 lg12 xl12 sm12 xs12  class="ma-3">
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
      <v-flex md12 lg12 xl12 sm12 xs12  class="ma-3">
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
            full-width
            class="mt-3"
            reactive
            locale="fr_FR"
            v-model="date"
            no-title
            scrollable
          >
            <v-spacer></v-spacer>
          </v-date-picker>
        </v-menu>
      </v-flex>
      <v-flex md12 lg12 xl12 sm12 xs12  class="ma-3">
        <h3>Date début période adaptation</h3>
        <v-menu
          ref="menu2"
          lazy
          :close-on-content-click="false"
          v-model="menu2"
          transition="slide-y-transition"
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
            :error="erreurDateDebutAdapt"
            :hint="hintDateDebutAdapt"
            :persistent-hint="erreurDateDebutAdapt"
            :rules="regleDateDebutAdapt"
            readonly
          ></v-text-field>
          <v-date-picker
            locale="fr_FR"
            full-width
            class="mt-3"
            reactive
            v-model="dateDebutPeriodeAdapt"
            no-title
            scrollable
          >
            <v-spacer></v-spacer>
          </v-date-picker>
        </v-menu>
      </v-flex>
      <v-flex md12 lg12 xl12 sm12 xs12   class="ma-3">
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
            :error="erreurDateFinAdapt"
            :persistent-hint="erreurDateFinAdapt"
            :hint="hintDateFinAdapt"
            required
            :rules="regleDateFinAdapt"
            readonly
          ></v-text-field>
          <v-date-picker
            full-width
            class="mt-3"
            reactive
            locale="fr_FR"
            v-model="dateFinPeriodeAdapt"
            no-title
            scrollable
          >
            <v-spacer></v-spacer>
          </v-date-picker>
        </v-menu>
      </v-flex>
      <v-flex md12 lg12 xl12 sm12 xs12  class="ma-3">
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
      <v-flex md12 lg12 xl12 sm12 xs12 >
        <v-btn
          class="green lighten-1"
          depressed large round
          @click="back"
        >Précédent</v-btn>
        <v-btn
          color="green lighten-1"
          depressed large round
          :dark="!isDisabled"
          @click="envoyer"
          :disabled="isDisabled"
        >
          Suivant
        </v-btn>
      </v-flex>
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
        v => !!v || 'Veuillez remplir la date'
      ],
      regleDateFinAdapt: [
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
      ],
      erreurDateDebutAdapt: false,
      erreurDateFinAdapt: false,
      hintDateDebutAdapt: '',
      hintDateFinAdapt: ''
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
    },
    isDisabled () {
      return this.erreurDateDebutAdapt || this.erreurDateFinAdapt || !this.estValide
    }
  },
  mounted () {
    this.initModePaiement()
    this.initTypeContrat()
    this.initNombreJour()

    /* let vm = this
    this.regleDateDebutAdapt.push(function (val) {
        return vm.date != null || new Date(val) < new Date(vm.date) || 'la date début de la période ne peut pas être avant le début du contrat '
    })

    this.regleDateFinAdapt.push(function (val) {
      if (vm.dateDebutPeriodeAdapt == null || new Date(val) < new Date(vm.dateDebutPeriodeAdapt)) {
        return 'la date fin de la période ne peut pas être avant le début de la période'
      } else {
        return true
      }
    }) */
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
  },
  watch: {
    date (val) {
      let date = new Date(val)
      if (this.dateFinPeriodeAdapt == null || date > new Date(this.dateFinPeriodeAdapt)) {
        this.erreurDateDebutAdapt = true
        this.hintDateDebutAdapt = 'La date de début ne peut pas être avant la date de début du contrat'
      } else {
        this.erreurDateDebutAdapt = false
        this.hintDateDebutAdapt = ''
      }
    },
    dateDebutPeriodeAdapt (val) {
      let date = new Date(val)
      if (this.date == null || date < new Date(this.date)) {
        this.erreurDateDebutAdapt = true
        this.hintDateDebutAdapt = 'La date de début ne peut pas être avant la date de début du contrat'
        // this.dateDebutPeriodeAdapt = null
      } else {
        this.erreurDateDebutAdapt = false
        this.hintDateDebutAdapt = ''
      }

      if (this.dateFinPeriodeAdapt == null || date > new Date(this.dateFinPeriodeAdapt)) {
        this.erreurDateFinAdapt = true
        this.hintDateFinAdapt = 'La date de fin de la période d\'adaptation ne peut pas être avant la date de début de la période'
      } else {
        this.erreurDateFinAdapt = false
        this.hintDateFinAdapt = ''
      }
    },
    dateFinPeriodeAdapt (val) { // permet de bloquer l'envoie du formulaire si jamais la date de fin est avant la date debut
      let date = new Date(val)
      if (this.dateDebutPeriodeAdapt == null || date < new Date(this.dateDebutPeriodeAdapt)) {
        this.erreurDateFinAdapt = true
        this.hintDateFinAdapt = 'La date de fin de la période d\'adaptation ne peut pas être avant la date de début de la période'
      } else {
        this.erreurDateFinAdapt = false
        this.hintDateFinAdapt = ''
      }
    }
  }
}
</script>

<style scoped>

</style>
