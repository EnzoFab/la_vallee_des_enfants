<template>
  <div>
    <v-flex>
      <v-flex mt-4>
        <h1 class="text-md-center">Présences du jour</h1>
      </v-flex>
      <v-flex mt-5 offset-md1 md4>
        <v-card>
          <v-layout>
            <v-flex>
              <v-flex mt-2>
                <h2 class = "orange--text text--darken-1">Marion Rul</h2>
              </v-flex>
              <v-flex offset-md3 class="text-md-left">
                <p>9h00 - 17h00</p>
                <p>Prend le goûter</p>
              </v-flex>
            </v-flex>
            <v-flex mt-5>
              <v-spacer></v-spacer>
              <v-btn @click.stop="dialogBox = true">
                Présence
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-flex>
    <v-dialog v-model="dialogBox" max-width="500px">
      <v-card>
        <v-flex pt-3 class="indigo--text text-md-center">
          <h2>
            Saisie de la présence
          </h2>
        </v-flex>
        <v-card-text>
          <v-flex>
            <v-layout>
              <v-flex mt-4 mr-2>
                <span>Arrivée :</span>
              </v-flex>
              <v-flex md2>
                <v-select
                  :items="items"
                  v-model="e1"
                  single-line
                ></v-select>
              </v-flex>
              <v-flex mt-4 ml-1 mr-1>
                <span>h</span>
              </v-flex>
              <v-flex md>
                <v-select
                  :items="items"
                  v-model="e1"
                  single-line
                ></v-select>
              </v-flex>
              <v-flex md1 mt-1 ml-1>
                <v-btn small round  color="orange lighten-3">ok</v-btn>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex mt-4 mr-2>
                <span>Départ :</span>
              </v-flex>
              <v-flex md2>
                <v-select
                  :items="items"
                  v-model="e1"
                  single-line
                ></v-select>
              </v-flex>
              <v-flex mt-4 ml-1 mr-1>
                <span>h</span>
              </v-flex>
              <v-flex>
                <v-select
                  :items="items"
                  v-model="e1"
                  single-line
                ></v-select>
              </v-flex>
              <v-flex md-1 mt-3 ml-1>
                <v-btn small round color="orange lighten-3">ok</v-btn>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex>
                <span>Goûter</span>
              </v-flex>
              <v-flex>
                <v-switch
                  :label="Switch1"
                  v-model="switch1"
                  color="indigo"
                ></v-switch>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-card-actions>
            <v-flex class="indigo--text">
              <v-btn color="primary" class="indigo--text" flat @click.stop="dialogBox=false">Fermer</v-btn>
            </v-flex>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'SaisirPresences',
  data () {
    return {
      dialogBox: false,
      switch1: true
    }
  }
}
</script>

<style scoped>

</style>
