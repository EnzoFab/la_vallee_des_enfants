<template>
  <v-flex  xs12 class="my-1">

    <v-toolbar color="yellow lighten-2">
      <v-spacer></v-spacer>
      <v-toolbar-title>Indémnités et salaire</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-flex mt-3>
      <v-form>
        <v-layout>
          <v-flex offset-md1 md10>
            <h3>Nombre de semaines d'accueil</h3>
            <v-text-field
              v-model="nbSemAccueil"
              :rules="regleSemaine"
              prepend-icon="date_range"
              disabled="true"
              required
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex md6>
            <v-flex>
              <h3>Salaire</h3>
              <v-flex md11>
                <v-text-field
                  label="Salaire Brut"
                  v-model= "calculerSalBrut"
                  :rules="regleSalaire"
                  prepend-icon="monetization_on"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex md11>
                <v-text-field
                  label="Salaire Net"
                  v-model="salaireNet"
                  :rules="regleSalaire"
                  prepend-icon="attach_money"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex md11>
                <v-layout>
                  <v-text-field
                    label="Majoration"
                    value="25"
                    :rules="regleMajo"
                    prepend-icon="add_circle_outline"
                    required
                  ></v-text-field>
                  <v-flex mt-4 md1>%</v-flex>
                </v-layout>
              </v-flex>
            </v-flex>
          </v-flex>
          <v-flex mt-5 md6>
            <v-card height="150">
              <h2 align="center">Salaire mensuel : </h2>
              <span class="display-3"> {{ salaireMensuel }}€ </span>
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex md6>
            <v-flex md11>
              <h3>Indémnités journalières</h3>
              <v-text-field
                :items="indemniteJour"
                :rules="regleIndem"
                prepend-icon="bubble_chart"
                disabled="true"
                required
              ></v-text-field>
            </v-flex>
          </v-flex>
          <v-flex md6>
            <v-flex md11>
              <h3>Goûter</h3>
              <v-text-field
                label="prix du goûter"
                v-model="gouter"
                :rules="regleGouter"
                prepend-icon="restaurant"
                disabled="true"
                required
              ></v-text-field>
            </v-flex>
          </v-flex>
        </v-layout>
      </v-form>
    </v-flex>
    <v-flex mt-3 xs12>
      <v-btn
        class="yellow lighten-2"
        depressed large round
        @click="cancel"
      >Annuler</v-btn>
      <v-btn
        depressed large round
        class="yellow lighten-2"
        @click="submit"
        :disabled="!estValide"
      >Suivant</v-btn>
    </v-flex>
  </v-flex>

</template>

<script>
import TypeService from '../../../services/TypeService'
export default {
  name: 'Tarifs',
  data () {
    return {
      salaireNet: 3.25,
      indemniteJour: null
    }
  },
  computed: {
    calculerSalBrut () {
      return this.salaireNet * 2.0
    },
    mounted () {
      this.initIndemnites()
      return 1
    }
  },
  methods: {
    async initIndemnites () {
      try {
        const response = await TypeService.indemnitesJour()
        this.indemniteJour = response.data.indemniteJour
        console.log(response.data.indemniteJour)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>

</style>
