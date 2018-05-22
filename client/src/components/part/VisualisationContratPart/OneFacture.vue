<template>
  <v-flex>
    <v-layout>
      <v-flex mt-4 class="text-md-center blue--text">
        <h1>Établissement de la facture</h1>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex mt-3 md8 offset-md1>
        <v-flex offset-md1 class="text-md-left light-green--text text--darken-3">
          <h2>Absences du mois</h2>
        </v-flex>
        <v-flex mt-2 md10>
          <v-data-table
            :headers="headers"
            :items="absences"
            hide-actions
            class="elevation-1"
            no-data-text="Aucune absence ce mois-ci"
          >
            <template slot="items" slot-scope="props">
              <td>{{ props.item.datepresencereelle }}</td>
              <td v-if=" props.item.absence_justifiee==true" class="text-xs-center">oui</td>
              <td v-else class="text-xs-center">non</td>
              <td class="text-xs-center"><v-btn>modifier</v-btn></td>
            </template>
          </v-data-table>
        </v-flex>
      </v-flex>
    </v-layout>

    <v-layout>
      <v-flex md8 offset-md1 mt-4>
        <v-layout>
          <v-flex light-green--text text--darken-3 offset-md1 class="text-md-left">
            <h2>Informations de facture</h2>
          </v-flex>
        </v-layout>
        <v-layout md4 mt-2>
          <v-flex class="text-md-left">
            <h3>Nombre d'heures normales : </h3>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex class="text-md-left">
            <v-layout>
              <v-flex md4>
                <h3>Nombre d'heures supplémentaires : </h3>
              </v-flex>
              <v-flex md3 mt-1>
                <span>36 h dont 5 h au taux majoré</span>
              </v-flex>
              <v-flex md2>
                <v-btn class="indigo--text" @click.stop="dialogHeureMajo=true">Modifier</v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout>
          <v-flex md4 mt-3 class="text-md-left">
          <h3>Total des heures : </h3>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex mt-5>
        <v-btn color="orange darken-1" dark>Générer la facture au format PDF</v-btn>
      </v-flex>
    </v-layout>

  <v-dialog v-model="dialogHeureMajo" max-width="500px">
    <v-card>
      <v-flex pt-3 class="indigo--text text-md-center">
        <h2>
          Majoration des heures supplémentaires
        </h2>
      </v-flex>
      <v-flex offset-md1>
        <v-flex mt-4 md10 class="text-md-left">
          <p>Veuillez indiquer le nombre d'heures à majorer :</p>
        </v-flex>
          <v-flex offset-md4 md2 xs8>
            <!-- v-model="" !-->
            <v-text-field
              name="heuresAMaj"
              align="center"
            ></v-text-field>
          </v-flex>
        <v-layout>
          <v-card-actions>
            <v-flex offset-md1>
              <v-btn  color="primary"  flat @click.stop="submitHeuresMajo">Valider</v-btn>
            </v-flex>
          </v-card-actions>
          <v-card-actions>
            <v-flex offset-md7>
              <v-btn  color="primary" flat @click.stop="dialogHeureMajo=false">Annuler</v-btn>
            </v-flex>
          </v-card-actions>
        </v-layout>
      </v-flex>
    </v-card>
  </v-dialog>
  </v-flex>

</template>

<script>
export default {
  name: 'OneFacture',
  props: {
    facture: {Object, required: true}
  },
  data () {
    return {
      headers: [
        {
          text: 'Date',
          align: 'center',
          sortable: false,
          value: 'name'
        },
        {text: 'Absence Justifiée', value: 'absence_justifiée'},
        {text: 'Modification', value: 'modifier'}
      ],
      absences: [],
      dialogHeureMajo: false
    }
  }
}
</script>

<style scoped>

</style>
