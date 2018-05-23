<template>
  <div>
    <v-flex mt-4>
      <v-layout>
      <v-flex mb-1>
        <v-alert
          v-model="alert" type="success" dismissible :value="alert"
          transition="scale-transition"
        >
          Les modifications ont bien été prises en compte.
        </v-alert>
      </v-flex>
      </v-layout>
      <v-flex offset-md5>
        <v-layout>
          <h1 class="blue--text">Présences du jour</h1>
        </v-layout>
      </v-flex>
      <v-layout>
        <v-flex md4 mt-5 offset-md1>
          <v-flex mb-2 class="text-md-left" offset-md2>
            <v-btn color="pink darken-1" @click="dialogBoxPresenceExc=true" v-if="enfantsPasDuJour.length != 0" dark><v-icon>add</v-icon>Présence exceptionnelle</v-btn>
          </v-flex>
          <v-flex  v-for="(enfant, i) in enfantsDuJour" :key="i">
            <v-flex>
              <v-flex md10 mb-2>
                <v-card>
                  <v-layout>
                    <v-flex class="text-md-center" mt-2>
                      <h2 class = "orange--text text--darken-1">{{ enfant.prenom_enfant }} {{ enfant.nom_enfant }}</h2>
                    </v-flex>
                  </v-layout>
                  <v-layout>
                    <v-flex mt-2 class="text-md-left">
                      <v-flex offset-md1 mb-1>
                        <v-layout>
                          <span>{{ enfant.heureArrivee }} h{{ enfant.minuteArrivee }} - {{ enfant.heureDepart}}h{{enfant.minuteDepart}}</span>
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
                          <v-btn class="red--text text--darken-4" flat @click="updateDialogAbs(i)">Notifier absence</v-btn>
                        </v-flex>
                      </v-card-actions>
                    </v-flex>
                    <v-flex>
                      <v-card-actions>
                        <v-flex>
                          <v-btn class="light-green--text text--darken-4" flat @click.stop="updateDialog(i)">Saisir présence</v-btn>
                        </v-flex>
                      </v-card-actions>
                    </v-flex>
                  </v-layout>
                </v-card>
              </v-flex>
            </v-flex>
          </v-flex>

          <v-dialog v-model="dialogBox" activator max-width="500px">
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
                          v-model="enfantcourant.heureArrivee"
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
                          v-model="enfantcourant.minuteArrivee"
                          single-line
                          autocomplete
                        ></v-select>
                      </v-flex>
                      <v-flex md-1 mt-3 ml-1>
                        <v-btn
                          small
                          round
                          color="orange lighten-3"
                          @click="submitArrivee(enfantcourant)"
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
                          v-model="enfantcourant.heureDepart"
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
                          v-model="enfantcourant.minuteDepart"
                          single-line
                          autocomplete
                        ></v-select>
                      </v-flex>
                      <v-flex md-1 mt-3 ml-1>
                        <v-btn
                          small
                          round
                          :disabled="enfantcourant.heure_arrivee_r==null"
                          color="orange lighten-3"
                          @click="submitDepart(enfantcourant)">ok</v-btn>
                      </v-flex>
                    </v-layout>
                  </v-form>

                  <v-form ref="formGouter">
                    <v-layout>
                      <v-flex mt-4>
                        <span>Goûter :</span>
                      </v-flex>
                      <!-- <v-flex v-if="enfantcourant.a_pris_gouter!=null" mt-4 offset-md1>
                        <v-switch
                          v-model="enfantcourant.a_pris_gouter"
                          color="indigo"
                        ></v-switch>
                      </v-flex> !-->
                      <v-flex mt-4 offset-md1>
                        <v-switch
                          v-model="gouterPris"
                          color="indigo"
                        ></v-switch>
                      </v-flex>
                      <v-flex md-1 mt-3 ml-1>
                        <v-btn
                          small
                          round
                          :disabled="enfantcourant.heure_arrivee_r==null"
                          color="orange lighten-3"
                          @click="submitGouter(enfantcourant)">ok</v-btn>
                      </v-flex>
                    </v-layout>
                  </v-form>

                </v-flex>
                <v-flex>
                  <v-card-actions>
                    <v-flex>
                      <v-btn color="primary" flat @click="dialogBox=false">Fermer</v-btn>
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
                      <v-btn  color="primary"  flat @click.stop="submitAbsenceJu(enfantcourant)">Oui</v-btn>
                    </v-flex>
                  </v-card-actions>
                  <v-card-actions>
                    <v-flex>
                      <v-btn  color="primary" flat @click.stop="submitAbsenceNonJu(enfantcourant)">Non</v-btn>
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

        <v-dialog v-model="dialogBoxPresenceExc" max-width="500px">
          <v-card>
            <v-flex pt-3 class="indigo--text text-md-center">
              <h2>
                Création d'une présence exceptionnelle
              </h2>
            </v-flex>
            <v-flex pl-2>
              <v-layout>
                <v-form>
                  <v-flex offset-md4 v-if="enfantsPasDuJour.length != 0">
                    <v-select
                      :items="enfantsPasDuJour"
                      v-model="id_enfant"
                      label="Enfant"
                      single-line
                      item-text="nomComplet"
                      item-value="id_enfant"
                      autocomplete
                    ></v-select>
                  </v-flex>
                </v-form>
              </v-layout>
              <v-layout>
                <v-card-actions>
                  <v-flex offset-md8>
                    <v-btn  color="primary" flat @click.stop="submitPresenceExc()">OK</v-btn>
                  </v-flex>
                </v-card-actions>
                <v-card-actions>
                  <v-flex offset-md1>
                    <v-btn  color="primary" flat @click.stop="dialogBoxPresenceExc=false">Annuler</v-btn>
                  </v-flex>
                </v-card-actions>
              </v-layout>
            </v-flex>
          </v-card>
        </v-dialog>

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
      alert: false,
      heures: ['07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
      minutes: ['00', '30'],
      dialogBox: false,
      dialogBoxAbsence: false,
      dialogBoxPresenceExc: false,
      switchGouter: false,
      gouterPris: false,
      minuteArrivee: null,
      heureArrivee: null,
      minuteDepart: null,
      heureDepart: null,
      enfantsDuJour: [],
      enfantsPasDuJour: [],
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
      enfantcourant: {
        a_pris_gouter: null,
        a_pris_gouter_from_bd: null,
        absence_justifiee: false,
        enregistre: null,
        heureArrivee: null,
        heureArriveeR: null,
        heureDepart: null,
        heureDepartR: null,
        heure_arrivee: null,
        heure_arrivee_r: null,
        heure_depart: null,
        heure_depart_r: null,
        id_contrat: null,
        id_enfant: null,
        id_presence_reelle: null,
        id_presence_theo: null,
        minuteArrivee: null,
        minuteArriveeR: null,
        minuteDepart: null,
        minuteDepartR: null,
        nom_enfant: null,
        prend_gouter: null,
        prenom_enfant: null,
        sexe: null
      }
    }
  },
  mounted () {
    this.getAllChildrenOfTheDay()
    this.getAllChildrenNotOfTheDay()
  },
  methods: {
    updateDialog (i) {
      this.enfantcourant = this.enfantsDuJour[i]
      this.dialogBox = true
      if (this.enfantcourant.a_pris_gouter != null) {
        this.gouterPris = this.enfantcourant.gouterPris
      }
    },
    updateDialogAbs (i) {
      this.enfantcourant = this.enfantsDuJour[i]
      this.dialogBoxAbsence = true
    },
    async getAllChildrenOfTheDay () {
      try {
        const response = await PresenceService.getAllChildrenOfTheDay()
        this.enfantsDuJour = response.data.presencestheoriques
        for (var i = 0; i < this.enfantsDuJour.length; i++) {
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

          if (response2.data.heure_arrivee_r != null) {
            var heureDecoupeeArrR = (this.enfantsDuJour[i].heure_arrivee_r).split(':', 2)
            this.enfantsDuJour[i].heureArriveeR = heureDecoupeeArrR[0]
            this.enfantsDuJour[i].minuteArriveeR = heureDecoupeeArrR[1]
          } else {
            this.enfantsDuJour[i].heureArriveeR = null
            this.enfantsDuJour[i].minuteArriveeR = null
          }

          if (response2.data.heure_depart_r != null) {
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
    async getAllChildrenNotOfTheDay () {
      try {
        const response = await PresenceService.getAllChildrenNotOfTheDay()
        if (response.data.absencestheoriques != null) {
          this.enfantsPasDuJour = response.data.absencestheoriques
          for (var i = 0; i < this.enfantsPasDuJour.length; i++) {
            this.enfantsPasDuJour[i].nomComplet = this.enfantsPasDuJour[i].nom_enfant + ' ' + this.enfantsPasDuJour[i].prenom_enfant
          }
        }
      } catch (e) {
        console.log(e)
      }
    },
    async submitArrivee (enfantArr) {
      try {
        if (enfantArr.enregistre === false) {
          var date = new Date()
          let data = {
            presence:
              {
                datepresencereelle: date,
                id_presence_theo: enfantArr.id_presence_theo,
                heure_arrivee: this.heureRassemblee(enfantArr.heureArrivee, enfantArr.minuteArrivee)
              }
          }
          await PresenceService.enregistrerPresence(data)
          this.dialogBox = false
        } else {
          let data = {
            presence: {
              id_presence_reelle: enfantArr.id_presence_reelle,
              heure_arrivee: this.heureRassemblee(enfantArr.heureArrivee, enfantArr.minuteArrivee)
            }
          }
          enfantArr.absence_justifiee = null
          await PresenceService.majHeureArrivee(data)
          this.dialogBox = false
        }
      } catch (e) {
        console.log(e)
      }
      this.alert = true
      this.getAllChildrenOfTheDay()
    },
    async submitDepart (enfantDep) {
      try {
        let data = {
          presence:
            {
              id_presence_reelle: enfantDep.id_presence_reelle,
              heure_depart: this.heureRassemblee(enfantDep.heureDepart, enfantDep.minuteDepart)
            }
        }
        await PresenceService.majHeureDepart(data)
        this.dialogBox = false
      } catch (e) {
        console.log(e)
      }
      this.alert = true
      this.getAllChildrenOfTheDay()
    },
    async submitGouter (enfantGouter) {
      try {
        enfantGouter.a_pris_gouter = this.gouterPris
        let data = {
          presence:
            {
              id_presence_reelle: enfantGouter.id_presence_reelle,
              a_pris_gouter: enfantGouter.a_pris_gouter
            }
        }
        await PresenceService.majGouter(data)
        this.alert = true
        this.gouterPris = false
        this.dialogBox = false
        this.getAllChildrenOfTheDay()
      } catch (e) {
        console.log(e)
      }
    },
    async submitAbsenceJu (enfantAbs) {
      try {
        if (enfantAbs.enregistre === false) {
          var date = new Date()
          let data = {
            absence:
              {
                datepresencereelle: date,
                id_presence_theo: enfantAbs.id_presence_theo,
                absence_justifiee: true
              }
          }
          await PresenceService.enregistrerAbsence(data)
          this.dialogBoxAbsence = false
        } else {
          let data = {
            absence: {
              id_presence_reelle: enfantAbs.id_presence_reelle,
              absence_justifiee: true
            }
          }
          await PresenceService.majAbsence(data)
          this.dialogBoxAbsence = false
        }
      } catch (e) {
        console.log(e)
      }
      this.alert = true
      this.getAllChildrenOfTheDay()
    },
    async submitAbsenceNonJu (enfantAbsNonJ) {
      try {
        if (enfantAbsNonJ.enregistre === false) {
          var date = new Date()
          let data = {
            absence:
              {
                datepresencereelle: date,
                id_presence_theo: enfantAbsNonJ.id_presence_theo,
                absence_justifiee: false
              }
          }
          await PresenceService.enregistrerAbsence(data)
          this.dialogBoxAbsence = false
        } else {
          let data = {
            absence: {
              id_presence_reelle: enfantAbsNonJ.id_presence_reelle,
              absence_justifiee: false
            }
          }
          await PresenceService.majAbsence(data)
          this.dialogBoxAbsence = false
        }
      } catch (e) {
        console.log(e)
      }
      this.alert = true
      this.getAllChildrenOfTheDay()
    },
    async submitPresenceExc () {
      try {
        var date = new Date()
        const response = await PresenceService.recupIdPresTheoDuJour(this.id_enfant)
        var id = response.data.id
        let data = {
          presence:
            {
              datepresencereelle: date,
              id_presence_theo: id
            }
        }
        await PresenceService.enregistrerPresenceExc(data)
        this.dialogBoxPresenceExc = false
        this.id_enfant = null
        this.alert = true
        this.enfantsDuJour = await this.getAllChildrenOfTheDay()
        this.enfantsPasDuJour = await this.getAllChildrenNotOfTheDay()
      } catch (e) {
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
