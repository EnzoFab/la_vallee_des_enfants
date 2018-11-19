<template>
  <v-card flat :color="color">
    <v-layout row wrap>
      <v-flex xs11 offset-xs1 py-5>
        <table>
          <tr>
            <td :colspan="jours.length + 1" class="orange--text">
              <h1>Planning de {{nomCompletEnfant}}</h1> </td>
          </tr>
          <tr>
            <td :colspan="jours.length + 1" class="title">
              <v-flex xs2 offset-xs5 pt-2>
                <v-select v-model="precision"
                          :items="precisions"
                          item-text="label"
                          hint="precision"
                          color="orange"
                          label="Précision"
                          flat solo autofocus></v-select>
              </v-flex>
            </td>
          </tr>
          <tr>
            <th>&nbsp;</th>
            <th v-for="j in jours" :key="j" class="jour blue--text" :id="j"><h3>{{j}}</h3></th>
          </tr>
          <tr v-for="(h, k) in plage_horaire" :key="h">
            <td class="hoverable heures"><h3>{{format(h)}}</h3></td>
            <td v-for=" presence in filtredPresence(k)" :key="presence.id"
                :rowspan="rowSpan(h, presence)"
                :class="cellsclass(h, presence)"
                @click="showDialog(h, presence)"
            >
            <v-card color="transparent" v-if="rowSpan(h, presence) > 1" flat>
              <v-card-title>
                <span v-if="presence.prend_gouter">Prend gouter</span>
                <span v-else>Ne prend pas le gouter</span>
              </v-card-title>
            </v-card>
            </td>
          </tr>

        </table>
      </v-flex>
    </v-layout>
    <v-dialog v-model="dialog" v-if="presenceDialog != null"  width="500">
      <v-card pa-5 color="blue lighten-5">
        <v-card-title>
          <span class="title orange--text">{{presenceDialog.jour.toUpperCase()}}</span>
        </v-card-title>
        <v-card-text>
          <v-layout row wrap pa-2>
            <v-flex xs12>
              <span class="title">Heure d'arrivee: {{formatTimeFr(presenceDialog.heure_arrivee)}}</span>
            </v-flex>
            <v-flex xs12>
              <span class="title"> Heure de départ: {{formatTimeFr(presenceDialog.heure_depart)}}</span>
            </v-flex>
            <v-flex xs12>
              <span v-if="presenceDialog.prend_gouter" class="green--text">
                <img src="/static/petitDej.png" style="height: 40px;"/>
                <span class="title">Prend le gouter</span>
              </span>
              <span v-else class="title red--text">Ne prend pas le gouter</span>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import DateHelper from '../../helper/DateHelper'
import PresenceTheoriqueService from '../../services/PresenceTheoriqueService'
import FonctionMath from '../../helper/FonctionMath'

export default {
  name: 'Planning',
  props: {
    color: {type: String, default: 'transparent'},
    nomCompletEnfant: {type: String, required: true},
    numContrat: {type: String, required: true}
  },
  data () {
    return {
      jours: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
      presences: [],
      precision:  {duree: 30, label: 'toutes les 30 minutes'},
      precisions: [
        {duree: 10, label: 'toutes les 10 minutes'},
        {duree: 10, label: 'toutes les 15 minutes'},
        {duree: 20, label: 'toutes les 20 minutes'},
        {duree: 30, label: 'toutes les 30 minutes'},
        {duree: 60, label: 'toutes les 1 heure'}],
      dialog: false,
      presenceDialog: null
    }
  },
  methods: {
    loadPresence () {
      let vm = this
      vm.presences = []
      PresenceTheoriqueService.getPlanningEnfant(this.numContrat).then(function (r) {
        if (r.data.erreur == null) {
          for (let i = 0; i < r.data.presencestheoriques.length; i++) {
            r.data.presencestheoriques[i].jour = vm.jours[i]
          }
          vm.presences = r.data.presencestheoriques
        } else {
          throw r.data.erreur
        }
      }).catch(function (e) {
        console.error(e)
      })
    },
    format (h) {
      let heure = Math.trunc(h / 60)
      let minute = h - heure * 60

      heure += ''
      minute += ''
      if (heure.length === 1) {
        heure = '0' + heure
      }
      if (minute.length === 1) {
        minute = '0' + minute
      }
      return `${heure}h${minute}`
    },
    formatTimeFr (h) {
      return DateHelper.formatTimeFr(h)
    },
    showDialog (horaire, presence) {
      if (this.rowSpan(horaire, presence) > 1) {
        this.presenceDialog = presence
        this.dialog = true
      }
    },
    rowSpan (horaire, presence) {
      let rows = 1
      if (presence.heure_arrivee == null) {
        rows = 1
      } else {
        let splits = (presence.heure_arrivee + '').split(':')
        let heureArrivee =  parseInt(splits[0])
        let minuteArrivee =  parseInt(splits[1])
        let horaireArriveeMinute = heureArrivee * 60 + minuteArrivee // en minutes
        if (horaire <= horaireArriveeMinute && horaire + this.precision.duree > horaireArriveeMinute) {
          let splits2 = (presence.heure_depart + '').split(':')
          let horaireDepartMinute = parseInt(splits2[0]) * 60 + parseInt(splits2[1])
          rows = FonctionMath.arrondi( (horaireDepartMinute - horaireArriveeMinute) / this.precision.duree, 0) + 1
        } else {
          rows = 1
        }
      }
      return rows
    },
    cellsclass (h, p) {
      if (this.rowSpan(h, p) > 1) {
        return 'light'
      } else {
        return 'simpleTD'
      }
    },
    /* previousRowsSpan (horaire, indice) {
      if (indice === 0) {
        return 1
      } else {
        let r = this.rowSpan(horaire, this.presences[indice -1])
        return r
      }
    },
    customStyle (horaire, presence, indicehoraire, indicepresence) {
      if (this.previousRowsSpan(horaire, i) !== 1
        && this.rowSpan(horaire, presence) < 1
        && this.previousDiagonalRowsPan(indicehoraire, indicepresence) !== 1) {
        return 'display: none'
      }
    },

    previousDiagonalRowsPan (indiceHoraire, indicePresence) {
      if (indiceHoraire === 0 || indicePresence === 0) {
        return 1 //
      } else {
        let r = this.rowSpan(this.plage_horaire[indiceHoraire -1], this.presences[indicePresence -1])
        console.log('previous', r)
        return r
      }
    }, */

    filtredPresence (indiceHoraire) { // regarder les diagonale
      if (indiceHoraire === 0) {
        return this.presences //
      } else {
        let table = []
        let splits1 = []
        let splits2 = []
        let horaireArriveeMinute = 0
        let horaireDepartMinute = 0
        let horaire = this.plage_horaire[indiceHoraire]
        for (let i = 0; i < this.presences.length; i++) {
          splits1 = (this.presences[i].heure_arrivee + '').split(':')
          horaireArriveeMinute = parseInt(splits1[0]) * 60 + parseInt(splits1[1])

          splits2 = (this.presences[i].heure_depart + '').split(':')
          horaireDepartMinute = parseInt(splits2[0]) * 60 + parseInt(splits2[1])

          if (horaireArriveeMinute - this.precision.duree > horaire || horaireDepartMinute + this.precision.duree < horaire
            || this.presences[i].heure_arrivee == null) {
            table.push(this.presences[i])
          }

        }
        return table
      }
      /*let table = []
      let horaire = this.plage_horaire[indiceHoraire]
      let previousRowSpan = 0
      for (let i = 0; i < this.presences.length; i++) {
        if (indiceHoraire === 0 || i === 0) {
          table.push(this.presences[i])
        } else {
          previousRowSpan = this.rowSpan(this.plage_horaire[indiceHoraire - 1], this.presences[i -1])
          console.log('previous', previousRowSpan)
          if (previousRowSpan  === 1) {
            table.push(this.presences[i])
          }
        }
      }
      return table */
    }
  },
  computed: {
    plage_horaire () {
      // ex 8h00, 8h15 etc.
      let horaires = []
      let debut = 8 * 60 // 8h00
      let fin = 20 * 60 // 20h00
      while (debut < fin) {
        horaires.push(debut)
        debut += this.precision.duree
      }
      return horaires
    }
  },
  mounted () {
    this.loadPresence()

  }
}
</script>

<style scoped>
  table {
    text-align: center;
    width: 95%;
    table-layout: fixed;
    border-collapse: collapse;
    border-radius: 4px;
    margin-bottom: 1%;
    border: outset 5px transparent;
    box-shadow: 2px 6px 6px 12px #555;
    -moz-box-shadow: 2px 6px 6px 12px #aaa;
    -webkit-box-shadow: 2px 6px 6px 12px #aaa;
  }
  th {
    padding: 2%;
    text-align: center;
    vertical-align: middle;
    border-bottom: dashed 8px white;
    box-shadow: 0px 2px 0px #555;
    -moz-box-shadow: 0px 2px 0px #aaa;
    -webkit-box-shadow: 0px 2px 0px #aaa;

  }

  .simpleTD {
    border-bottom: dashed 4px whitesmoke;
    border-right: dashed 3px whitesmoke;
    border-radius: 6px;
    text-align: center;
    padding: 1%;
  }
  td.hoverable:hover{
    background-color: whiteSmoke;
    border-radius: 4px;
  }

  .light {
    opacity: 0.7;
    border: outset 5px transparent;
    padding: 2%;
    background-color: #90CAF9;
    box-shadow: 4px 4px 4px 4px #555;
    -moz-box-shadow: 4px 4px 4px 4px #aaa;
    -webkit-box-shadow: 4px 4px 4px 4px #aaa;
  }

  .light:hover{
    background-color: #E3F2FD;
    font-size: 1.1em;
    opacity: 1;
    cursor: pointer;
  }

  .heures {
    border-right: solid 5px whitesmoke;
    border-left: solid 5px whitesmoke;
  }

</style>
