<template>
  <div>
    <v-flex offset-md1 mt-5 md10>
      <v-toolbar
        color="grey"
        dark
        tabs
      >
        <v-tabs right>
          <v-tab :href="`#LaFiche`">Fiche</v-tab>
          <v-tab>Planning</v-tab>
          <v-tab>Présences</v-tab>
          <v-tab>Paie</v-tab>
        </v-tabs>
      </v-toolbar>
      <v-tabs-items v-model="model">
        <v-flex>
          <v-tab-item :id="`LaFiche`" md10>
            <v-card>
              <Fiche></Fiche>
            </v-card>
          </v-tab-item>
        </v-flex>
      </v-tabs-items>
    </v-flex>
  </div>
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
  }
}
</script>

<style scoped>

</style>
