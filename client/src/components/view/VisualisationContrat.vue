<template>
  <v-tabs
    dark
    color="cyan"
    show-arrows
  >
    <v-tabs-slider color="yellow"></v-tabs-slider>
    <v-tab
      :href="'#tab-'"
    >
      Item
    </v-tab>
    <v-tabs-items>
      <v-tab-item
        :id="'tab-'"
      >
        <v-card flat>
          <Fiche ref="fiche"></Fiche>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-tabs>
</template>

<script>
import Fiche from '../part/VisualisationContratPart/Fiche'
export default {
  name: 'VisualisationContrat',
  components: {Fiche},
  data () {
    return {
      model: 'tab-2'
    }
  },
  mounted (){
    this.$refs.fiche.initDonnees()
  }
}
</script>

<style scoped>

</style>
