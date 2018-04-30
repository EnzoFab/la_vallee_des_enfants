<template>
  <v-container fluid>
    <Calendar :customEvents="event"></Calendar>
  </v-container>
</template>

<script>
import Calendar from '../part/Calendar'
export default {
  name: 'Evenements',
  components: {Calendar},
  data () {
    return {
      event: []
    }
  },
  mounted () {
    console.log('Mounted')
    // faire une requete ajax pour charger tous les evenements
  }
}
</script>

<style scoped>

</style>
