<template>
  <v-layout column align-center>
    <v-flex xs4>
      <v-text-field readonly
                    placeholder="heures, minutes"
                    @click="tooglePicker"
                    :prepend-icon="prependIcon"
                    :value="value"
                    :label="label"
                    :rules="rules"
                    :required="required"
      ></v-text-field>
    </v-flex>
    <v-flex xs12>
      <v-scale-transition>
        <v-layout v-if="pickerVisible" row wrap pb-3 v-click-outside="closeEvent">
          <v-flex xs6>
            <custom_liste_deroulante
              :items="heures" v-if="heures.length > 0"
              title="Heures"
              title_color="deep-purple darken-1"
              v-model="time_heure"
              :selectedColor="colorHour"
            />
          </v-flex>
          <v-flex xs6>
            <custom_liste_deroulante
              :items="minutes" v-if="minutes.length > 0"
              title="Minutes" title_color="deep-purple darken-1"
              :selectedColor="colorMinute"
              v-model="time_minute"
            />
          </v-flex>
        </v-layout>
      </v-scale-transition>
    </v-flex>
    <!--<v-card height="200" class="scroll-y">
        <v-card-text>
          <v-list dense>
            <v-list-tile avatar v-for="(h,i) in hours"  class="mx-auto" :key="i" >
              <v-list-tile-avatar tile :size="h.size" class="mx-auto" @mouseover.stop="hover(h)" @mouseout.stop="reset(h)">
                <v-avatar :color="h.color">
                  <span :class="h.class">{{h.number}}</span>
                </v-avatar>
              </v-list-tile-avatar>
            </v-list-tile>
          </v-list>
        </v-card-text>
      </v-card>-->
  </v-layout>
</template>

<script>
import Custom_liste_deroulante from './Custom_liste_deroulante'
import ClickOutside from 'vue-click-outside'

export default {
  name: 'TimePicker',
  components: {Custom_liste_deroulante},
  directives: {
    ClickOutside
  },
  props: {
    heureDebut: {type: Number, default: 0},
    heureFin: {type: Number, default: 23},
    value: {required: true},
    minuteEcart: {type: [Number, String], default: 5},
    label: {type: String},
    colorMinute : {type: String, default: 'lime lighten-1'},
    colorHour: {type: String, default: 'teal darken-1'},
    rules: {type: Array, default: function () {
        return []
      }},
    required: {type: Boolean, default: false},
    prependIcon: {type: String, default: 'schedule'}
  },
  data() {
    return {
      menuVisible: false,
      positionX: 0,
      positionY: 0,
      heures: [],
      minutes: [],
      pickerVisible: false,
      time_heure: null,
      time_minute: null
    }
  },
  methods: {
    closeEvent: function () {
      this.pickerVisible = false
    },
    tooglePicker(e) {
      this.pickerVisible = !this.pickerVisible
    },
    initMinute () {
      this.minutes = []
      let ecart = 5
      if (this.minuteEcart != null) {
        ecart = this.minuteEcart
      }
      for (let i = 0; i * parseInt(ecart) < 60; i++) {
        this.minutes.push(i * ecart)
      }
      this.$nextTick()
    },
    initHour () {
      this.heures = []
      for (let i = this.heureDebut; i <= this.heureFin; i++) {
        this.heures.push(i)
      }
    }
   /* hover(hour) {
      hour.class = 'white--text upperSize'
      hour.color = 'grey lighten-2'
      hour.size = 70
      console.log(hour.number)
    },
    reset(hour) {
      hour.class = 'headline'
      hour.color = 'white'
      hour.size = 60
      console.log(hour.number)
    } */
  },
  watch: {
    time_heure (v) {
      let zeroHeure = ''
      if (this.time_heure.trim().length === 1) { // rajout du 0 devant
        zeroHeure = '0'
      }
      let zeroMinute = ''
      if (this.time_minute.trim().length === 1) {
        zeroMinute = '0'
      }
      if (this.time_heure != null && this.time_heure.length > 0 &&
        this.time_minute != null && this.time_minute.length > 0) {
        this.$emit('input', zeroHeure + this.time_heure + ':' + zeroMinute + this.time_minute)
        this.pickerVisible = false
      } else if (this.time_heure != null && this.time_heure.length > 0) {
        this.$emit('input', zeroHeure + this.time_heure + ':' + '00')
      }
    },
    time_minute (v) {
      let zeroHeure = ''
      if (this.time_heure.trim().length === 1) { // rajout du 0 devant
        zeroHeure = '0'
      }
      let zeroMinute = ''
      if (this.time_minute.trim().length === 1) {
        zeroMinute = '0'
      }
      if (this.time_heure != null && this.time_heure.length > 0 &&
        this.time_minute != null && this.time_minute.length > 0 ) {
        this.$emit('input', zeroHeure + this.time_heure + ':' + zeroMinute + this.time_minute)
        this.pickerVisible = false
      } else if (this.time_minute != null && this.time_minute.length > 0) {
        this.$emit('input', '00' + ':' + zeroMinute + this.time_minute)
      }
    },
    pickerVisible (v) { // reset des v-model
      this.time_heure = ''
      this.time_minute = ''
    },
    minuteEcart (v) {
      this.initMinute()
    }

  },
  events: {
  },
  mounted() {
    this.initHour()
    this.initMinute()
  }
}
</script>

<style scoped>

</style>
