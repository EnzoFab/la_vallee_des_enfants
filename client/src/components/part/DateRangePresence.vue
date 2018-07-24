<template>
    <v-card>
      <v-layout row wrap class="ma-1 pa-3" aling-center>
        <v-flex xs12>
          <ul>
            <li v-for="(b,i) in buttons" :key="i" style="list-style: none; display: inline">
              <v-tooltip v-model="b.tooltipDisplayshowTooltip" top :color="b.color">
                <v-btn  slot="activator"
                        @mouseover.self.once="b.tooltipDisplayshowTooltip = true"
                        @mouseout.self.once="b.tooltipDisplay = false"
                        flat large @click="b.action" :color="b.color">{{b.label}}
                </v-btn>
                <span>{{b.tooltipMessage}}</span>
              </v-tooltip>
            </li>
          </ul>
        </v-flex>
        <v-layout row wrap style="border: solid 3px black">
          <v-flex xs6 pa-1>
            <v-date-picker v-model="rangeDebut" full-width  no-title scrollable
                           color="green"  locale="fr-FR" reactive >
            </v-date-picker>
          </v-flex>
          <v-flex xs6 pa-1>
            <v-date-picker :value="rangeFin" v-model="rangeFin" :min="rangeDebut"  scrollable color="red"
                           full-width :readonly="rangeDebut == null" no-title reactive locale="fr-FR" dark>
            </v-date-picker>
          </v-flex>
        </v-layout>
        <v-flex xs12>
          <v-fade-transition>
            <v-btn @click="telecharger"
              v-if="rangeFin != null && rangeDebut != null" large color="blue" outline ripple :loading="isLoading">
              Télécharger
              <span slot="loader" class="custom-loader"><v-icon light>cached</v-icon></span>
              </v-btn>
          </v-fade-transition>
        </v-flex>
        <v-flex xs12>
          <v-fade-transition>
            <span v-if="isLoading">Veuillez patienter nous préparons votre téléchargement</span>
          </v-fade-transition>
        </v-flex>
      </v-layout>
    </v-card>
</template>

<script>
import VueRangedatePicker from 'vue-rangedate-picker'
import HotelDatePicker from 'vue-hotel-datepicker'
import DateHelper from '../../helper/DateHelper'
import DateRange from 'vuetify-daterange-picker/src/DateRange'
import 'vuetify-daterange-picker/dist/vuetify-daterange-picker.css'
import { format, subDays } from 'date-fns'
import PresenceService from "../../services/PresenceService";
import PDF_creator from "../../helper/PDF_creator";

export default {
  name: 'DateRangePresence',
  components: {VueRangedatePicker, HotelDatePicker, DateRange},
  props: {
    nomCompletEnfant: {String, required: true},
    numContrat: {String, required: true},
    color: {type: String, default: 'transparent'},
    debut: {type: String}
  },
  data () {
    return {
      rangeDebut: null,
      rangeFin: null,
      buttons : [
        {
          label: 'Aujourd\'hui',
          action: this.today,
          color: 'light-green darken-4',
          tooltipMessage: 'La présence d\'aujourd\'hui',
          tooltipDisplay: false
        },
        {
          label: 'Hier',
          action: this.yesterday,
          color: 'lime darken-1',
          tooltipMessage: 'La présence d\'hier',
          tooltipDisplay: false
        },
        {
          label: 'Mois dernier',
          action: this.lastMonth,
          color: 'deep-purple lighten-1',
          tooltipMessage: 'Toutes les présences du mois dernier',
          tooltipDisplay: false
        },
        {
          label: '30 derniers jours',
          action: this.last30Days,
          color: 'orange darken-1',
          tooltipMessage: 'Toutes les présences des 30 derniers jours',
          tooltipDisplay: false
        }
      ],
      isLoading: false
    }
  },
  watch: {
    rangeDebut (val) {
      if (this.rangeFin == null ||new Date(val) > new Date(this.rangeFin)) {
        this.rangeFin = val
      }
    },
  },
  computed: {
    dateDebutFr () {
      return DateHelper.getDateFr(new Date(this.rangeDebut))
    },
    dateFinFr () {
      return DateHelper.getDateFr(new Date(this.rangeFin))
    }
  },
  methods: {
    today (e) {
      let dFormat = DateHelper.formatMomentDate(new Date())
      this.rangeDebut = dFormat
      this.rangeFin = dFormat
    },

    yesterday (e) {
      let d = new Date ()
      this.rangeFin = DateHelper.formatMomentDate(d)
      d.setDate(d.getDate() - 1)
      this.rangeDebut = DateHelper.formatMomentDate(d)
    },

    lastMonth (e) {
      let d = new Date()
      d.setMonth(d.getMonth() - 1)
      d.setDate(1)
      this.rangeDebut = DateHelper.formatMomentDate(d)
      d.setMonth( (new Date()).getMonth())
      d.setDate(0)
      this.rangeFin = DateHelper.formatMomentDate(d)
    },

    last30Days (e) {
      let d = new Date()
      this.rangeFin = DateHelper.formatMomentDate(d)
      d.setDate(d.getDate() - 30)
      this.rangeDebut = DateHelper.formatMomentDate(d)
    },

    loadPresence () {
      return PresenceService.getAllPresenceContratBetween(this.rangeDebut, this.rangeFin, this.numContrat)
        .then(function (r) {
          if (r.data.erreur == null) {
            return r.data.presences
          } else {
            throw r.data.erreur
          }
        }).catch(function (e) {
          console.error(e)
          return []
        })
    },

    telecharger () {
      this.isLoading = true
      let vm = this
      this.loadPresence().then(function (presences) {
        if (presences.length === 0) {
          vm.triggerNotification(`${vm.nomCompletEnfant} n'a pas été présent sur la periode
          du ${vm.dateDebutFr} au ${vm.dateFinFr}`, 'error')
        }
        else {
          PDF_creator.presencePdf(presences, vm.nomCompletEnfant, vm.dateDebutFr, vm.dateFinFr)
        }
      }).finally(function () {
        vm.isLoading = false
      })
    },
    triggerNotification (text, type) {
      this.$notify({
        group: 'assistante',
        title: 'Présence',
        text: text,
        duration: 4000,
        speed: 500,
        type: type
      })
    }

  }
}
</script>

<style scoped>
</style>
