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
        :startingDayOfWeek="1"
        :show-date="date"
        @show-date-change="setShowDate"
        class="theme-default holiday-us-traditional holiday-us-official"
        :displayPeriodUom="typeAffichage"
        @click-event="eventClick"
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
import moment from 'moment'
moment.locale('fr')
require('vue-simple-calendar/dist/static/css/default.css')
require('vue-simple-calendar/dist/static/css/holidays-us.css')

const ERRORCLASS = 'red lighten-3'
const DEFAULTCLASS = 'light-green lighten-4'
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
      typeAffichageFr: 'semaine'
    }
  },
  methods: {
    setShowDate (d) {
      this.date = d
    },
    eventClick (event) {
      this.dialog = true
      this.eventInDialog = event.originalEvent
      console.log(this.eventInDialog)
    },
    loadEvent () {
      let vm = this
      PresenceService.getAllPresenceContratBefore(moment(new Date()).format('YYYY-MM-DD HH:MM'), this.numContrat)
        .then(function (rslt) {
          if (rslt.data.erreur == null) {
            rslt.data.resultats.forEach(function (event, i) {
              console.log(event)
              let data = {
                startDate: event.datepresencereelle,
                endDate: event.datepresencereelle,
                heureArriveePrevue: event.heureArriveePrevue,
                heureDepartPrevue: event.heureDepartPrevue,
                heureArriveeReelle: event.heureArriveeReelle,
                heureDepartReelle: event.heureDepartRelle,
                arriveeRetard: event.arriveeRetard,
                partieAvant: event.partieAvant,
                id: i,
                prendsGouterPrevue: event.prendsGouterPrevue,
                prendsGouterReelle: event.prendsGouterReelle,
                absence_justifiee: event.absence_justifiee
              }

              if (event.arriveeRetard /* || !event.absence_justifiee */ || event.partieAvant ||
                event.prendsGouterPrevue !== event.prendsGouterReelle) {
                // si l'enfant est en retard, partie avant n'a pas justifié sont retard
                // ou a pris un gouter alors qu'il ne devait ou l'inverse attribue la classe erreur
                data.classes = ERRORCLASS
                data.title = 'Présence anormale'
              } else {
                data.classes = DEFAULTCLASS
                data.title = 'Présence normale'
              }
              vm.events.push(data)
            })
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    }
  },
  watch: {
    typeAffichage (val) {
      if (val === 'week') {
        this.typeAffichageFr = 'semaine'
      } else {
        this.typeAffichageFr = 'mois'
      }
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
