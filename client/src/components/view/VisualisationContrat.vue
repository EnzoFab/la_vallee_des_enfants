<template>
  <v-flex mt-3>
  <v-tabs
    dark
    color="blue"
    show-arrows
  >
    <v-tabs-slider color="yellow"></v-tabs-slider>
    <v-tab
      :href="'#tab1'"
    >
      Fiche
    </v-tab>
    <v-tab
      :href="'#tab2'"
    >
      Présence
    </v-tab>
    <v-tab
      :href="'#tab3'"
    >
      Facture
    </v-tab>
    <v-tabs-items>
      <v-tab-item
        :id="'tab1'"
      >
        <v-card flat>
          <Fiche ref="fiche"></Fiche>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-tabs>
  </v-flex>
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
  mounted () {
    this.$refs.fiche.initDonnees()
  }
}
</script>

<style scoped>

</style>
