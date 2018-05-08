<template>
  <v-card>
    <v-layout row wrap>
      <v-flex  xs12 md6 offset-md3 class="my-5">
        <v-toolbar class="pink lighten-4">
          <v-spacer></v-spacer>
          <v-toolbar-title>Planning d'accueil</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <v-container>
          <v-layout>

            <v-flex md12 mt-3>
              <v-card>
                <v-list>
                  <v-list-tile avatar v-for="item in items" :key="item.title" @click="afficheLundi">
                    <v-list-tile-avatar>
                      <v-icon color="pink lighten-4" :class="[item.iconClass]">{{ item.icon }}</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                      <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-flex>

            <v-flex xs6 md12 mt-3>
              <v-layout row>
                <v-flex d-flex>

                  <v-card>
                    <h2 class="pink--text">Horaires</h2>

                    <v-container fluid>
                      <v-layout row wrap>
                        <v-flex xs12 md5 sm6>
                          <v-subheader class="black--text" v-text="'Heure d\'arrivée'"></v-subheader>
                        </v-flex>
                        <v-flex xs12 md3 sm6>
                          <v-select
                            :items="heures"
                            :filter="customFilter"
                            v-model="a1"
                            item-text="heure"
                            label="hh"
                            single-line
                            autocomplete
                          ></v-select>
                        </v-flex>
                        <v-flex xs12 md3 offset-md1 sm6>
                          <v-select
                            :items="minutes"
                            :filter="customFilter"
                            v-model="a2"
                            item-text="minute"
                            label="mm"
                            single-line
                            autocomplete
                          ></v-select>
                        </v-flex>
                      </v-layout>
                    </v-container>

                    <v-container fluid>
                      <v-layout row wrap>
                        <v-flex xs12 md5 sm6>
                          <v-subheader class="black--text" v-text="'Heure de départ'"></v-subheader>
                        </v-flex>
                        <v-flex xs12 md3 sm6>
                          <v-select
                            :items="heures"
                            :filter="customFilter"
                            v-model="a1"
                            item-text="heure"
                            label="hh"
                            single-line
                            autocomplete
                          ></v-select>
                        </v-flex>
                        <v-flex xs12 md3 offset-md1 sm6>
                          <v-select
                            :items="minutes"
                            :filter="customFilter"
                            v-model="a2"
                            item-text="minute"
                            label="mm"
                            single-line
                            autocomplete
                          ></v-select>
                        </v-flex>
                      </v-layout>
                    </v-container>

                    <v-container fluid>
                      <v-flex offset-md3>
                        <v-checkbox
                          label="Prend le goûter"
                          v-model="ex4"
                          color="pink"
                          value="true"
                          hide-details
                        ></v-checkbox>
                      </v-flex>
                    </v-container>

                    <v-btn align="center" class="pink--text text--lighten-4" color="pink">Ok</v-btn>

                  </v-card>

                </v-flex>
              </v-layout>
            </v-flex>

          </v-layout>
        </v-container>
        <v-flex xs12>
          <v-btn
            class="pink lighten-4"
            depressed large round
            @click="back"
          >Précédent</v-btn>
          <v-btn
            depressed large round
            class="pink lighten-4"
            @click="submit"
            :disabled="!estValide"
          >Suivant</v-btn>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  name: 'PlaningPresenceContrat',
  data () {
    return {
      ex4: ['Prend_goûter'],
      items: [
        { icon: 'schedule', iconClass: 'pink', title: 'Lundi' },
        { icon: 'schedule', iconClass: 'pink', title: 'Mardi' },
        { icon: 'schedule', iconClass: 'pink', title: 'Mercredi' },
        { icon: 'schedule', iconClass: 'pink', title: 'Jeudi' },
        { icon: 'schedule', iconClass: 'pink', title: 'Vendredi' }
      ],
      heures: [
        { heure: '06' },
        { heure: '07' },
        { heure: '08' },
        { heure: '09' },
        { heure: '10' },
        { heure: '11' },
        { heure: '12' },
        { heure: '13' },
        { heure: '14' },
        { heure: '15' },
        { heure: '16' },
        { heure: '17' },
        { heure: '18' },
        { heure: '19' },
        { heure: '20' }
      ],
      minutes: [
        { minute: '00' },
        { minute: '30' }
      ]
    }
  },
  methods: {
    afficheLundi () {
      console.log('ee')
    },
    back () {
      this.$emit('back')
    },
    async submit () {

    }
  }
}
</script>

<style scoped>

</style>
