<template>
  <div>
    <full-calendar :events="customEvents" :config="config"></full-calendar>
  </div>
</template>

<script>
import jquery from 'jquery'
import { FullCalendar } from 'vue-full-calendar'

window.jQuery = window.$ = jquery

export default {
  components: {FullCalendar},
  sockets: {
    connect () {
      console.log('Connect')
    }
  },
  name: 'Calendar',
  props: {
    customEvents: Array // add dynamically an event
  },
  data: function () {
    return {
      config: {
        columnFormat: 'dddd',
        navLinks: true,
        locale: 'fr',
        titleFormat: 'DD MMMM YYYY',
        buttonText: {
          today: "aujourd'hui",
          month: 'mois',
          week: 'semaines',
          day: 'jours',
          list: 'list'
        },
        monthName: ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai',
          'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre',
          'Decembre'],
        monthNamesShort: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jun',
          'Jui', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'],
        dayName: ['Dimanche', 'Lundi', 'Marid', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@import 'fullcalendar/dist/fullcalendar.css';
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
