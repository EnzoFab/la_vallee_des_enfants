<template>
  <v-flex xs12 class="ma-4">
    <h3 >
      Planning des présences de <u>{{nomCompletEnfant}}</u><br>
      <p style="padding-top: 2%">Affichage: <b>{{typeAffichageFr.toUpperCase()}}</b></p>
    </h3>
    <v-flex xs12 style="padding-left: 41%; padding-right: 41%">
      <v-select
        flat
        hide-selected
        v-model="typeAffichage"
        auto
        :items="[{label: 'semaine', value: 'week'}, {label: 'mois', value:'month'}]"
        item-text="label"
        item-value="value"
      ></v-select>
    </v-flex>
    <v-card height="35vw">
      <calendar-view
        :events="events"
        :show-date="date"
        @show-date-change="setShowDate"
        class="theme-default holiday-us-traditional holiday-us-official"
        :displayPeriodUom="typeAffichage"
        @click-event="eventClick"
        weekdayNameFormat="long"
        ref="calendar"
      >
      </calendar-view>
    </v-card>
    <v-dialog v-model="dialog" max-width="800" width="750" v-if="eventInDialog != null">
      <v-card :class="eventInDialog.classes">
        <v-card-title class="headline" >
          {{nomCompletEnfant}}
          <img src="/static/babyFace.png" style="padding-left: 3%" height="70px"/>
        </v-card-title>
        <v-card-text>
          <v-layout v-if="eventInDialog.absence_justifiee == null || !eventInDialog.absence_justifiee"
                     row wrap align-center >
            <v-flex xs7>
              <v-subheader>Prévu</v-subheader>
              <v-list :class="eventInDialog.classes">
                <v-list-tile>
                  <v-list-tile-avatar>
                    <img src="/static/horloge.png" />
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    Heure d'arrivée prévue: {{eventInDialog.heureArriveePrevue}}
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-avatar>
                    <img src="/static/horloge.png" />
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    Heure de départ prévue: {{eventInDialog.heureDepartPrevue}}
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-avatar>
                    <img src="/static/petitDej.png" />
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    Gouter <v-checkbox disabled v-model="eventInDialog.prendsGouterPrevue"/>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
              <v-divider></v-divider>
              <v-subheader>Réel</v-subheader>
              <v-list :class="eventInDialog.classes">
                <v-list-tile>
                  <v-list-tile-avatar>
                    <img src="/static/horloge.png" />
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    Heure d'arrivée réelle: {{eventInDialog.heureArriveeReelle}}
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-avatar>
                    <img src="/static/horloge.png" />
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    Heure de départ réelle: {{eventInDialog.heureDepartReelle}}
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-avatar>
                    <img src="/static/petitDej.png" />
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    Gouter <v-checkbox disabled v-model="eventInDialog.prendsGouterReelle"/>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-flex>
            <v-flex xs5>
              <v-subheader>Observations</v-subheader>
              <v-list :class="eventInDialog.classes">
                <v-list-tile>
                  <v-list-tile-avatar>
                    <img src="/static/retard.png"/>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <span v-if="eventInDialog.arriveeRetard" class="text--red">Retard: Oui</span>
                    <span v-else>Retard: Non</span>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-avatar>
                    <img src="/static/chocolat.png"/>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <span v-if="eventInDialog.prendsGouterReelle && !eventInDialog.prendsGouterPrevue">
                      Gouter supplémentaire
                    </span>
                    <span v-if="!eventInDialog.prendsGouterReelle && eventInDialog.prendsGouterPrevue">
                      N'a pas pris son gouter
                    </span>
                    <span v-else>Regulier</span>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>

            </v-flex>
          </v-layout>
          <v-layout v-else>
            <v-flex xs12>

            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-flex>
</template>

<script>
import CalendarView from 'vue-simple-calendar'
import PresenceService from '../../services/PresenceService'
import DateHelper from '../../helper/DateHelper'
import moment from 'moment'
moment.locale('fr')
require('vue-simple-calendar/dist/static/css/default.css')
require('vue-simple-calendar/dist/static/css/holidays-us.css')

const ERRORCLASS = 'red lighten-3'
const DEFAULTCLASS = 'light-green lighten-4'
const statePresence = {
  normale: {
    class: 'green accent-1', type: 'PRESENCE'
  },
  anormale: // concerne un retard ou un gouter pris alors qu'on ne devait pas le prendre ou inversement
    {
      class: 'yellow lighten-4',
      type: 'PRESENCE',
      label: 'Presence anormale',
      label_class: 'amber--text text--darken-4'
    },
  absence_justifee: {class: 'pink darken-1', type: 'ABSENCE',
    label: 'Absence justififée', label_class: 'red--text text--darken-4'},
  absence_non_justifiee: {class: 'deep-orange lighten-1', type: 'ABSENCE'},
  exceptionnelle:
    {
      class: 'deep-purple lighten-4',
      type: 'PRESENCE_EX',
      label: 'Present exceptionnellement',
      label_class: 'deep-purple--text text--lighten-1'
    }
}
const NOTE = {
  presenceExceptionnelle: 'Exceptionnellement présent aujourd\'hui ',
  arriveeRetard: 'Arrivé(e) en retard, ',
  arriveeEnAvance: 'Arrivé(e) en avance, ',
  departEnAvance: 'Parti(e) avant, ',
  departEnRetard: 'Depart en retard, ',
  gouterPris: 'Gouter supplementaire, ',
  gouterNonPris: 'Gouter non pris, ',
  absenceJustifee: 'Absence justifiee',
  absenceNonJustifee: 'Absence Non justifiee'
}


export default {
  name: 'Planning',
  components: {
    CalendarView
  },
  props: {
    nomCompletEnfant: {String, required: true},
    numContrat: {String, required: true}
  },
  data () {
    return {
      dialog: false,
      eventInDialog: null,
      events: [],
      /* {
        startDate: '2018-05-22 14:15',
          endDate: '2018-05-22 18:15',
        title: 'Presence de Patrick',
        id: 1,
        classes: 'green darken-1'
      } */
      date: new Date(),
      typeAffichage: 'week',
      typeAffichageFr: 'Semaine'
    }
  },
  methods: {
    setShowDate (d) {
      this.date = d
    },
    eventClick (event) {
      this.dialog = true
      this.eventInDialog = event.originalEvent
    },
    loadEvent () {
      let vm = this
      PresenceService.getAllPresenceContratBefore(moment(new Date()).format('YYYY-MM-DD HH:MM'), this.numContrat)
        .then(function (rslt) {
          if (rslt.data.erreur == null) {
            rslt.data.resultats.forEach(function (event, i) {
              let data = {
                startDate: event.datepresencereelle,
                endDate: event.datepresencereelle,
                heureArriveePrevue: DateHelper.formatTime(event.heureArriveePrevue),
                heureDepartPrevue: DateHelper.formatTime(event.heureDepartPrevue),
                heureArriveeReelle: DateHelper.formatTime(event.heureArriveeReelle),
                heureDepartReelle: DateHelper.formatTime(event.heureDepartReelle),
                arriveeRetard: event.arriveeRetard,
                partieAvant: event.partieAvant,
                id: i,
                prendsGouterPrevue: event.prendsGouterPrevue,
                prendsGouterReelle: event.prendsGouterReelle,
                absence_justifiee: event.absence_justifiee
              }
              let s = vm.getState(data)
              data.classes = s.class
              data.title = s.label
              vm.events.push(data)
            })
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    getState (enfant) {
      let s = JSON.parse(JSON.stringify(statePresence.normale))
      let note = ''

      if (enfant.heureArriveeReelle != null && enfant.heureArriveePrevue == null) {
        s = statePresence.exceptionnelle
        note = NOTE.presenceExceptionnelle
      } else {
        if (enfant.heureArriveeReelle == null && enfant.absence_justifiee === true) {
          s = statePresence.absence_justifee
          note = NOTE.absenceJustifee
        } else if (enfant.heureArriveeReelle == null) {
          s = statePresence.absence_non_justifiee
          note = NOTE.absenceNonJustifee
        } else {
          if (DateHelper.formatTime(enfant.heureArriveeReelle) > DateHelper.formatTime(enfant.heureArriveePrevue)) { //arrivée en retard
            s = statePresence.anormale
            note = NOTE.arriveeRetard
          } else if (DateHelper.formatTime(enfant.heureArriveeReelle) < DateHelper.formatTime(enfant.heureArriveePrevue)) {
            s = statePresence.anormale
            note = NOTE.arriveeEnAvance
          }

          if (DateHelper.formatTime(enfant.heureDepartReelle) < DateHelper.formatTime(enfant.heureDepartPrevue)) { // partie avant
            s = statePresence.anormale
            note += NOTE.departEnAvance
          } else if (DateHelper.formatTime(enfant.heureDepartReelle) < DateHelper.formatTime(enfant.heureDepartPrevue)) {
            s = statePresence.anormale
            note += NOTE.departEnRetard
          }

          if (enfant.prend_gouter_r && !enfant.prend_gouter) { // a pris le gouter alors qu'il devait pas le prendre
            s = statePresence.anormale
            note += NOTE.gouterPris
          } else if (!enfant.prend_gouter_r && enfant.prend_gouter) {
            s = statePresence.anormale
            note += NOTE.gouterNonPris
          }
        }
      }

      if (note.length > 0) {
        s.note = note
      }
      return s
    }

  },
  watch: {
    typeAffichage (val) {
      if (val === 'week') {
        this.typeAffichageFr = 'semaine'
        // console.log(this.$refs.calendar.$emit('show-date-change', new Date()))
      } else {
        this.typeAffichageFr = 'mois'
      }
      this.$nextTick()
    } // ,
    /*
    ,
    eventInDialog: {
      handler (val) {
        console.log('Changement')
        if (this.eventInDialog.heureArriveePrevue) {
          let str = this.eventInDialog.heureArriveePrevue.split(':')
          let time = ''
          for (let i = 0; i < str.length; i++) {
            time += str[i]
          }
          time = time.split('0')[1]
          if (time.length < 3) {
            time += 0
          }
          this.eventInDialog.heureArriveePrevue = moment(time, 'hhmm').format('hh:mm')
        } else {
          this.eventInDialog.heureArriveePrevue = 'Erreur'
        }

        if (this.eventInDialog.heureDepartPrevue) {
          let str = this.eventInDialog.heureDepartPrevue.split(':')
          let time = ''
          for (let i = 0; i < str.length; i++) {
            time += str[i]
          }
          // time = time.split('0')[1]
          console.log(time)
          if (time.length < 3) {
            time += 0
          }
          this.eventInDialog.heureDepartPrevue = moment(time, 'hhmm').format('hh:mm')
        } else {
          this.eventInDialog.heureDepartPrevue = 'Erreur'
        }

        if (this.eventInDialog.heureDepartRelle) {
          let str = this.eventInDialog.heureDepartRelle.split(':')
          let time = ''
          for (let i = 0; i < str.length; i++) {
            time += str[i]
          }
          this.eventInDialog.heureDepartRelle = moment(time.split('0')[1], 'hhmm').format('hh:mm')
        } else {
          this.eventInDialog.heureDepartRelle = 'Erreur'
        }

        if (this.eventInDialog.heureArriveeReelle) {
          let str = this.eventInDialog.heureArriveeReelle.split(':')
          let time = ''
          for (let i = 0; i < str.length; i++) {
            time += str[i]
          }
          this.eventInDialog.heureArriveeReelle = moment(time.split('0')[1], 'hhmm').format('hh:mm')
        } else {
          this.eventInDialog.heureArriveeReelle = 'Erreur'
        }
      },
      deep: true
    }
     */
  },
  mounted () {
    this.loadEvent()
  }
}
</script>

<style scoped>

</style>
