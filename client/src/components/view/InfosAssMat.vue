<template>
  <v-container grid-list-xl>

    <v-layout row wrap>
      <v-flex md6 lg6 xl6 sm12 xs12>
        <v-flex md12 lg12 xl12 sm12 xs12>
          <v-flex>
            <h1 class="blue--text">Assistante maternelle</h1>
          </v-flex>
          <v-card>
            <v-card-title pt-2 offset-md1 class="text-sm-left">
              <h2>{{ prenomAssMat + ' ' + nomUsageAssMat }}</h2>
            </v-card-title>
            <v-card-text>
              <v-flex >
                <v-layout mt-1>
                  <h4 class="orange--text text--darken-1 mr-1"><v-icon class="orange--text text--darken-1">account_circle</v-icon> Nom de naissance : </h4><span>{{ nomNaissanceAssMat }}</span>
                </v-layout>
                <v-layout pb-2 mt-1>
                  <h4 class="orange--text text--darken-1 mr-1"><v-icon class="orange--text text--darken-1">cake</v-icon> date de naissance :</h4><span>{{ dateNaissanceAssMat }}</span>
                </v-layout>
                <v-layout pb-2 mt-1>
                  <h4 class="orange--text text--darken-1 mr-1"><v-icon class="orange--text text--darken-1">domain</v-icon> Ville de naissance :</h4><span>{{ villeNaissanceAssMat }}</span>
                </v-layout>
                <v-layout pb-2 mt-1>
                  <h4 class="orange--text text--darken-1 mr-1"><v-icon class="orange--text text--darken-1">phone</v-icon> Téléphone :</h4><span>{{ telephoneAssMat }}</span>
                </v-layout>
                <v-layout pb-2 mt-1>
                  <h4 class="orange--text text--darken-1 mr-1"><v-icon class="orange--text text--darken-1">perm_identity</v-icon> Numéro SS :</h4><span>{{ numeroSS }}</span>
                </v-layout>
                <v-layout pb-2 mt-1>
                  <h4 class="orange--text text--darken-1 mr-1"><v-icon class="orange--text text--darken-1">event</v-icon> Date agrément :</h4><span>{{ dateAgrement }}</span>
                </v-layout>
                <v-layout pb-2 mt-1>
                  <h4 class="orange--text text--darken-1 mr-1"><v-icon class="orange--text text--darken-1">receipt</v-icon> Référence agrément :</h4><span>{{ referenceAgrement }}</span>
                </v-layout>
                <v-layout pb-2 mt-1>
                  <h4 class="orange--text text--darken-1 mr-1"><v-icon class="orange--text text--darken-1">assessment</v-icon> Assurance responsabilité civile :</h4><span>{{ assurance }}</span>
                </v-layout>
                <v-layout pb-2 mt-1>
                  <h4 class="orange--text text--darken-1 mr-1"><v-icon class="orange--text text--darken-1">label_outline</v-icon> Numéro de police :</h4><span>{{ numeroPolice }}</span>
                </v-layout>
                <v-layout pb-2 mt-1>
                  <h4 class="orange--text text--darken-1 mr-1"><v-icon class="orange--text text--darken-1">date_range</v-icon> Nombre de semaines de congés :</h4><span>{{ nombreSemaineConges }}</span>
                </v-layout>
              </v-flex>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
    export default {
        name: "InfosAssMat"
    }
</script>

<style scoped>

</style>
