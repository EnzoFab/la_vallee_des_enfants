<template>
  <div>
    <v-flex>
      <v-flex mt-4>
        <h1 class="text-md-center">Présences du jour</h1>
      </v-flex>
      <v-flex v-for="(enfant, i) in enfantsDuJour" :key="i">
        <v-flex mt-5 offset-md1 md3>
          <v-card>
            <v-layout>
                <v-flex mt-2>
                  <h2 class = "orange--text text--darken-1">{{ enfant.prenom_enfant }} {{ enfant.nom_enfant }}</h2>
                </v-flex>
            </v-layout>
            <v-layout>
                <v-flex mt-2 class="text-md-left">
                  <v-flex offset-md1 mb-1>
                    <v-layout>
                    <span>{{ enfant.heureArrivee }}h{{ enfant.minuteArrivee }} - {{ enfant.heureDepart}}h{{enfant.minuteDepart}}</span>
                    </v-layout>
                  </v-flex>
                  <v-flex offset-md1 v-if="enfant.prend_gouter == true">
                    <v-layout>
                    <span> Prend le goûter</span>
                    </v-layout>
                  </v-flex>
                  <v-flex offset-md1 v-else>
                    <v-layout>
                    <span> Ne prend pas le goûter</span>
                    </v-layout>
                  </v-flex>
                </v-flex>
            </v-layout>
                <v-layout>
                  <v-flex>
                <v-card-actions>
                  <v-flex>
                    <v-btn class="red--text text--darken-4" flat @click.stop="dialogBoxAbsence = true">Absence</v-btn>
                  </v-flex>
                </v-card-actions>
                  </v-flex>
                  <v-flex>
                <v-card-actions>
                  <v-flex>
                    <v-btn class="light-green--text text--darken-4" flat @click.stop="dialogBox = true">Présence</v-btn>
                  </v-flex>
                </v-card-actions>
                  </v-flex>
            </v-layout>
          </v-card>
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

                <v-form ref="formArrivee">
                  <v-layout>
                    <v-flex mt-4 mr-2>
                      <span>Arrivée :</span>
                    </v-flex>
                    <v-flex md2>
                      <v-select
                        :items="heures"
                        v-model="enfant.heureArrivee"
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
                        v-model="enfant.minuteArrivee"
                        single-line
                        autocomplete
                      ></v-select>
                    </v-flex>
                    <v-flex md-1 mt-3 ml-1>
                      <v-btn
                        small
                        round
                        color="orange lighten-3"
                        @click="submitArrivee(enfant)"
                      >ok</v-btn>
                    </v-flex>
                  </v-layout>
                </v-form>

                <v-form ref="formDepart">
                  <v-layout>
                    <v-flex mt-4 mr-2>
                      <span>Départ :</span>
                    </v-flex>
                    <v-flex md2>
                      <v-select
                        :items="heures"
                        v-model="enfant.heureDepart"
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
                        v-model="enfant.minuteDepart"
                        single-line
                        autocomplete
                      ></v-select>
                    </v-flex>
                    <v-flex md-1 mt-3 ml-1>
                      <v-btn
                        small
                        round
                        :disabled="!(enfant.enregistre)"
                        color="orange lighten-3"
                        @click="submitDepart(enfant)">ok</v-btn>
                    </v-flex>
                  </v-layout>
                </v-form>

                <v-form ref="formGouter">
                  <v-layout>
                    <v-flex mt-4>
                      <span>Goûter :</span>
                    </v-flex>
                    <v-flex mt-4 offset-md1>
                      <v-switch
                        :label="SwitchGouter"
                        v-model="enfant.a_pris_gouter"
                        color="indigo"
                      ></v-switch>
                    </v-flex>
                    <v-flex md-1 mt-3 ml-1>
                      <v-btn
                        small
                        round
                        :disabled="!(enfant.enregistre)"
                        color="orange lighten-3"
                        @click="submitGouter(enfant)">ok</v-btn>
                    </v-flex>
                  </v-layout>
                </v-form>

              </v-flex>
              <v-flex>
              <v-card-actions>
                <v-flex>
                  <v-btn color="primary" flat @click.stop="dialogBox=false">Fermer</v-btn>
                </v-flex>
              </v-card-actions>
              </v-flex>
            </v-card-text>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogBoxAbsence" max-width="500px">
          <v-card>
            <v-flex pt-3 class="indigo--text text-md-center">
              <h2>
                L'absence est-elle justifiée?
              </h2>
            </v-flex>
            <v-flex pl-2 offset-md1>
            <v-layout>
                <v-card-actions>
                  <v-flex offset-md1>
                    <v-btn  color="primary"  flat @click.stop="submitAbsenceJu(enfant)">Oui</v-btn>
                  </v-flex>
                </v-card-actions>
            <v-card-actions>
              <v-flex>
                <v-btn  color="primary" flat @click.stop="submitAbsenceNonJu(enfant)">Non</v-btn>
              </v-flex>
            </v-card-actions>
            <v-card-actions>
              <v-flex>
                <v-btn  color="primary" flat @click.stop="dialogBoxAbsence=false">Annuler</v-btn>
              </v-flex>
            </v-card-actions>
            </v-layout>
            </v-flex>
          </v-card>
        </v-dialog>

      </v-flex>
    </v-flex>
  </div>
</template>

<script>
import PresenceService from "../../services/PresenceService";
import moment from 'moment'
moment.locale('fr')
export default {
  name: 'SaisirPresences',
  data () {
    return {
      heures: ['07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
      minutes: ['00', '30'],
      dialogBox: false,
      dialogBoxAbsence: false,
      switchGouter: true,
      minuteArrivee: null,
      heureArrivee: null,
      minuteDepart: null,
      heureDepart: null,
      enfantsDuJour: []
    }
  },
  mounted () {
    this.getAllChildrenOfTheDay()
    this.dateDuJour()
  },
  methods: {
    async getAllChildrenOfTheDay () {
      try {
        const response = await PresenceService.getAllChildrenOfTheDay()
        this.enfantsDuJour = response.data.presencestheoriques
        for(var i = 0; i < this.enfantsDuJour.length; i++) {
          var heureDecoupeeArr = (this.enfantsDuJour[i].heure_arrivee).split(":", 2)
          this.enfantsDuJour[i].heureArrivee = heureDecoupeeArr[0]
          this.enfantsDuJour[i].minuteArrivee = heureDecoupeeArr[1]
          var heureDecoupeeDep = (this.enfantsDuJour[i].heure_depart).split(":", 2)
          this.enfantsDuJour[i].heureDepart = heureDecoupeeDep[0]
          this.enfantsDuJour[i].minuteDepart = heureDecoupeeDep[1]
          const response2 = await PresenceService.estEnregistreAujourdhui(this.enfantsDuJour[i].id_enfant)
          this.enfantsDuJour[i].enregistre = response2.data.existe
          this.enfantsDuJour[i].id_presence_reelle = response2.data.id_presence
          console.log('azertyuiopazertyuiop      ', response2.data.id_presence)
        }
      } catch (e) {
      console.log(e)
      }
    },
    async submitArrivee(enfant) {
      try {
        if (enfant.enregistre == false) {
          var date = new Date()
          let data = {
            presence:
              {
                datepresencereelle: date,
                id_presence_theo: enfant.id_presence_theo,
                heure_arrivee: this.heureRassemblee(enfant.heureArrivee, enfant.minuteArrivee)
              }
          }
          let v = await PresenceService.enregistrerPresence(data)
          console.log(v.data)
        } else {
          console.log(enfant.id_presence_reelle)
          let data = {
            presence: {
              id_presence_reelle: enfant.id_presence_reelle,
              heure_arrivee: this.heureRassemblee(enfant.heureArrivee, enfant.minuteArrivee)
            }
          }
          let v2 = await PresenceService.majHeureArrivee(data)
          console.log(v2.data)
        }
      }catch (e) {
        console.log(e)
      }
    },
    async submitDepart(enfant) {
      try {
        let data = {
          presence:
            {
              id_presence_reelle: enfant.id_presence_reelle,
              heure_depart: this.heureRassemblee(enfant.heureDepart, enfant.minuteDepart)
            }
        }
            const v = await PresenceService.majHeureDepart(data)
          console.log(v)

      } catch(e) {
        console.log(e)
      }
    },
    async submitGouter(enfant) {
      try {
        let data = {
          presence:
            {
              id_presence_reelle: enfant.id_presence_reelle,
              prend_gouter: enfant.a_pris_gouter
            }
        }
        const v = await PresenceService.majGouter(data)
        console.log(v)

      } catch(e) {
        console.log(e)
      }
    },
    async submitAbsenceJu(enfant) {
      try {
        if (enfant.enregistre == false) {
          var date = new Date()
          let data = {
            absence:
              {
                datepresencereelle: date,
                id_presence_theo: enfant.id_presence_theo,
                absence_justifiee: true
              }
          }
          let v = await PresenceService.enregistrerAbsence(data)
          console.log(v.data)
        } else {
          console.log(enfant.id_presence_reelle)
          let data = {
            presence: {
              id_presence_reelle: enfant.id_presence_reelle,
              absence_justifiee: true
            }
          }
          let v2 = await PresenceService.majAbsence(data)
          console.log(v2.data)
        }
      }catch (e) {
        console.log(e)
      }
    },
    heureRassemblee: function (heure, minute) {
      return (heure + ':' + minute)
    }
  }

}
</script>

<style scoped>

</style>
