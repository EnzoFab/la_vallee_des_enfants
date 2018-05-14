<template>
  <div>
    <v-flex>
      <v-flex mt-4>
        <h1 class="text-md-center">Présences du jour</h1>
      </v-flex>
      <v-flex v-for="(enfant, i) in enfantsDuJour" :key="i">
      <v-flex mt-5 offset-md1 md4>
        <v-card>
          <v-layout>
            <v-flex>
              <v-flex mt-2>
                <h2 class = "orange--text text--darken-1">{{ enfant.prenom_enfant }} {{ enfant.nom_enfant }}</h2>
              </v-flex>
              <v-flex offset-md3 class="text-md-left">
                <p>{{ enfant.heure_arrivee }} - {{ enfant.heure_depart}}</p>
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
                  :items="heures"
                  v-model="heureArrivee"
                  single-line
                  autocomplete
                ></v-select>
              </v-flex>
              <v-flex mt-4 ml-1 mr-1>
                <span>h</span>
              </v-flex>
              <v-flex md2>
                <v-select
                  :items="minutes"
                  v-model="minuteArrivee"
                  single-line
                  autocomplete
                ></v-select>
              </v-flex>
              <v-flex md-1 mt-3 ml-1>
                <v-btn small round color="orange lighten-3">ok</v-btn>
              </v-flex>
            </v-layout>

            <v-layout>
              <v-flex mt-4 mr-2>
                <span>Départ :</span>
              </v-flex>
              <v-flex md2>
                <v-select
                  :items="heures"
                  v-model="heureDepart"
                  single-line
                  autocomplete
                ></v-select>
              </v-flex>
              <v-flex mt-4 ml-1 mr-1>
                <span>h</span>
              </v-flex>
              <v-flex md2>
                <v-select
                  :items="minutes"
                  v-model="minuteDepart"
                  single-line
                  autocomplete
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
    </v-flex>
  </div>
</template>

<script>
import PresenceService from '../../services/PresenceService'
import moment from 'moment'
moment.locale('fr')
export default {
  name: 'SaisirPresences',
  data () {
    return {
      heures: ['07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
      minutes: ['00', '30'],
      dialogBox: false,
      switch1: true,
      minuteArrivee: null,
      heureArrivee: null,
      minuteDepart: null,
      heureDepart: null,
      enfantsDuJour: []
    }
  },
  mounted () {
    this.getAllChildrenOfTheDay()
  },
  methods: {
    async getAllChildrenOfTheDay () {
      try {
        const response = await PresenceService.getAllChildrenOfTheDay()
        this.enfantsDuJour = response.data.presencestheoriques
        console.log(this.enfantsDuJour[0].heure_arrivee)
        for (var i = 0; i < this.enfantsDuJour.length; i++) {
          this.enfantsDuJour[i].heure_arrivee = moment(this.enfantsDuJour[i].heure_arrivee).format('LT')
          console.log('hbg' + this.enfantsDuJour)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>

</style>
