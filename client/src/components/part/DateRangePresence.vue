<template>
    <v-card>
      <v-layout row wrap class="ma-1 pa-3" aling-center>
       <v-flex xs12>
         <ul>
           <li v-for="i in [1,2,3,4]" :key="i" style="list-style: none; display: inline">
               <v-btn flat large>{{i}}</v-btn>
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
      rangeFin: null
    }
  },
  watch: {
    rangeDebut (val) {
      if (this.rangeFin == null ||new Date(val) > new Date(this.rangeFin)) {
        this.rangeFin = val
      }
    },
  }
}
</script>

<style scoped>
</style>
