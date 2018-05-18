<template>
  <div>
      <v-flex offset-md5>
        <v-layout>
          <h1 class="blue--text">Présences du jour</h1>
        </v-layout>
      </v-flex>

        <v-flex ml-5 md5 mt-5>
          <v-layout>
            <v-flex class=" light-green--text text--darken-3 text-md-center ">
              <h2>Enfants présents</h2>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex mt-3>
              <v-data-table
                :headers="headers"
                :items="enfantsDuJour"
                hide-actions
                class="elevation-1"
                no-data-text="Aucun enfant arrivé"
              >
                <template slot="items" slot-scope="props">
                  <td>{{ props.item.nom_enfant + ' ' + props.item.prenom_enfant }}</td>
                  <td v-if=" props.item.heure_arrivee_r!=null" class="text-xs-center">{{ props.item.heureArriveeR + 'h' + props.item.minuteArriveeR }}</td>
                  <td v-else class="text-xs-center"></td>
                  <td v-if="props.item.heure_depart_r" class="text-xs-center">{{ props.item.heureDepartR + 'h' + props.item.minuteDepartR }}</td>
                  <td v-else class="text-xs-center"></td>
                  <td v-if="props.item.a_pris_gouter_from_bd==true" class="text-xs-center">pris</td>
                  <td v-else-if="props.item.a_pris_gouter_from_bd==false" class="text-xs-center">non pris</td>
                  <td v-else class="text-xs-center"></td>
                  <td v-if="props.item.absence_justifiee==true" class="red--text text-xs-center">abs justifiée</td>
                  <td v-else-if="props.item.absence_justifiee==false" class="red--text text-xs-center">abs non justifiée</td>
                  <td v-else class="text-xs-center"></td>
                </template>
              </v-data-table>
            </v-flex>
          </v-layout>
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
        enfantsDuJour: [],
        id_enfant: null,
        headers: [
          {
            text: 'Enfants',
            align: 'center',
            sortable: true,
            value: 'name'
          },
          { text: 'arrivée', value: 'arrivee' },
          { text: 'départ', value: 'depart' },
          { text: 'gouter', value: 'gouter' },
          { text: 'absent', value: 'absent' }
        ],
      }
    },
    mounted () {
      this.getAllChildrenOfTheDay()
      this.getAllChildrenNotOfTheDay()
      console.log(this.enfantcourant)
      console.log('22222  ' + this.enfantcourant)
    },
    methods: {
      async getAllChildrenOfTheDay () {
        try {
          const response = await PresenceService.getAllChildrenOfTheDay()
          console.log('response.data.   ' + response.data.presencestheoriques )
          this.enfantsDuJour = response.data.presencestheoriques
          console.log('azertyuiop      ' + this.enfantsDuJour)
          for (var i = 0; i < this.enfantsDuJour.length; i++) {
            console.log('aqwzsxedcrfv leeeeeee ----- ' + i + '---- ' + this.enfantsDuJour[i])
            if (this.enfantsDuJour[i].heure_arrivee != null) {
              var heureDecoupeeArr = (this.enfantsDuJour[i].heure_arrivee).split(':', 2)
              this.enfantsDuJour[i].heureArrivee = heureDecoupeeArr[0]
              this.enfantsDuJour[i].minuteArrivee = heureDecoupeeArr[1]
            } else {
              this.enfantsDuJour[i].heureArrivee = this.heures[0]
              this.enfantsDuJour[i].minuteArrivee = this.minutes[0]
            }
            if (this.enfantsDuJour[i].heure_depart != null) {
              var heureDecoupeeDep = (this.enfantsDuJour[i].heure_depart).split(':', 2)
              this.enfantsDuJour[i].heureDepart = heureDecoupeeDep[0]
              this.enfantsDuJour[i].minuteDepart = heureDecoupeeDep[1]
            } else {
              this.enfantsDuJour[i].heureDepart = this.heures[this.heures.length - 1]
              this.enfantsDuJour[i].minuteDepart = this.minutes[this.minutes.length - 1]
            }
            if (this.enfantsDuJour[i].prend_gouter == null) {
              this.enfantsDuJour[i].prend_gouter = false
            }
            const response2 = await PresenceService.estEnregistreAujourdhui(this.enfantsDuJour[i].id_enfant)
            this.enfantsDuJour[i].enregistre = response2.data.existe
            this.enfantsDuJour[i].id_presence_reelle = response2.data.id_presence
            this.enfantsDuJour[i].heure_arrivee_r = response2.data.heure_arrivee_r
            this.enfantsDuJour[i].heure_depart_r = response2.data.heure_depart_r
            if(response2.data.heure_arrivee_r != null) {
              var heureDecoupeeArrR = (this.enfantsDuJour[i].heure_arrivee_r).split(':', 2)
              this.enfantsDuJour[i].heureArriveeR = heureDecoupeeArrR[0]
              this.enfantsDuJour[i].minuteArriveeR = heureDecoupeeArrR[1]
            } else {
              this.enfantsDuJour[i].heureArriveeR = null
              this.enfantsDuJour[i].minuteArriveeR = null
            }
            if(response2.data.heure_depart_r != null) {
              var heureDecoupeeDepR = (this.enfantsDuJour[i].heure_depart_r).split(':', 2)
              this.enfantsDuJour[i].heureDepartR = heureDecoupeeDepR[0]
              this.enfantsDuJour[i].minuteDepartR = heureDecoupeeDepR[1]
            } else {
              this.enfantsDuJour[i].heureDepartR = null
              this.enfantsDuJour[i].minuteDepartR = null
            }
            this.enfantsDuJour[i].a_pris_gouter = response2.data.a_pris_gouter
            this.enfantsDuJour[i].a_pris_gouter_from_bd = response2.data.a_pris_gouter
            this.enfantsDuJour[i].absence_justifiee = response2.data.absence_justifiee
          }
        } catch (e) {
          console.log(e)
        }
      },

      heureRassemblee: function (heure, minute) {
        return (heure + ':' + minute)
      }
    },
    watch: {
      enfantsDuJour : {
        handler (val) {
          console.log('Changement', this.enfantsDuJour)
          console.log('Valeur ', val)
        },
        deep : true
      }
    }

  }
</script>

<style scoped>

</style>
