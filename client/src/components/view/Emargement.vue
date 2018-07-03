<template>
  <v-container fluid grid-list-md pa-4>
    <v-layout row wrap>
      <v-flex xs12>
        <h1 class="headline text-xs-center orange--text text--darken-1 mr-1"><b>{{dateFr}}</b></h1>
      </v-flex>
      <v-flex md6 lg6 xl6 sm12 xs12 pa-1>
        <Searcher :item-attribute="['nomComplet', 'nom_enfant', 'prenom_enfant']" :items="enfants_presents" label="Prenom ou nom" box>
          <!--  liste des enfants censés être présents -->
          <v-card slot-scope="elements" class="transparent elevation-0 scroll-y" style="max-height: 15vw">
            <v-card-title>
              <h3 class="orange--text text--darken-1 mr-1">
                Enfants prevus aujourd'hui
              </h3>
            </v-card-title>
            <v-card-text>
              <v-list  v-if="elements.items.length > 0" three-line><!-- TODO transformer liste en card-->
                <v-list-tile  v-for="(el, i) in elements.items" :key="i" @click="emargement(el)" avatar>
                  <v-list-tile-avatar>
                    <img src="/static/boy.png" v-if="el.sexe === 'G'"/>
                    <img src="/static/fille.png" v-else/>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title ><h3>{{el.nomComplet}}</h3></v-list-tile-title>
                    <v-list-tile-sub-title>
                      <v-layout row align-center>
                        <v-flex xs6><h4><u>Heure d'arrivée</u></h4></v-flex>
                        <v-flex xs6>{{formatDate(el.heure_arrivee)}}</v-flex>
                        <v-flex xs6><h4><u>Heure de départ </u></h4></v-flex>
                        <v-flex xs6>{{formatDate(el.heure_depart)}}</v-flex>
                        <v-flex xs6><h4><u>Prend le goûter  </u></h4></v-flex>
                        <v-flex xs6>
                          <span v-if="el.prend_gouter">Oui</span>
                          <span v-else>Non</span>
                        </v-flex>
                      </v-layout>
                    </v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
              <span v-else>
                Aucun résultats
              </span>
            </v-card-text>
          </v-card>
        </Searcher>
      </v-flex>
      <v-flex md6 lg6 xl6 sm12 xs12 pa-1>
        <Searcher :item-attribute="['nomComplet', 'nom_enfant', 'prenom_enfant']" :items="enfants_non_presents" label="Prénom ou nom" box>
          <v-card slot-scope="elements" class="transparent elevation-0 scroll-y" style="max-height: 15vw">
            <v-card-title>
              <h3 class="orange--text text--darken-1 mr-1">
                Enfants ne venant pas aujourd'hui
              </h3>
            </v-card-title>
            <v-card-text>
              <v-list  v-if="elements.items.length > 0" two-line>
                <v-list-tile  v-for="(el, i) in elements.items" :key="i" @click="emargement(el)" avatar>
                  <v-list-tile-avatar>
                    <img src="/static/boy.png" v-if="el.sexe === 'G'"/>
                    <img src="/static/fille.png" v-else/>
                  </v-list-tile-avatar>
                  <v-list-tile-title ><h3>{{el.nomComplet}}</h3></v-list-tile-title>
                </v-list-tile>
              </v-list>
              <span v-else>
                Aucun résultats
              </span>
            </v-card-text>
          </v-card>
        </Searcher>
        <!-- Liste des enfants qui ne sont pas censés être présents-->
      </v-flex>
      <v-flex sm12 xs12 pa-1>
        <v-card class="scroll-y" style="max-height: 15vw">
          <v-card-title>
            <h3 class="orange--text text--darken-1 mr-1">
              List des enfants emargés
            </h3>
          </v-card-title>
          <v-card-text>
            <v-list>
              <!-- liste des enfants qui ont été pointés-->
              <v-list-tile v-for="(e,i) in enfants_emarges" :key="i" @click="" :color="e.state.class">
                <v-list-tile-content>
                  {{e.nomComplet}}
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn icon @click="removeEnfantEmargeFromList(e)">
                    <v-icon medium>delete</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-dialog
      v-model="dialogEnfantPresent"
      hide-overlay
      scrollable
      transition="dialog-bottom-transition"
      v-if="enfantPresentChoisi != null"
      max-width="1000"
    >
      <v-card height="600" class="scroll-y">
        <v-toolbar card dark color="orange darken-1">
          <v-spacer></v-spacer>
          <v-toolbar-title>Emarger {{enfantPresentChoisi.nomComplet}}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-container justify-center>
            <v-layout row wrap justify-center>
              <v-flex xs12>
                <!-- <v-text-field :value="enfantPresentChoisi.heure_arrivee">
                 </v-text-field> -->
                <TimePicker required
                            :heureDebut="8"
                            :heureFin="19"  label="Heure d'arrivee"
                            v-model="enfantPresentChoisi.heure_arrivee"/>
              </v-flex>
              <v-flex xs12>
                <TimePicker required
                            :heureDebut="8" :heureFin="19"  label="Heure de départ"
                            v-model="enfantPresentChoisi.heure_depart"/>
              </v-flex>
              <v-flex xs6 d-inline-flex offset-xs3>
                <img src="/static/petitDej.png" style="height: 40px;" v-if="enfantPresentChoisi.prend_gouter"/>
                <v-checkbox v-model="enfantPresentChoisi.prend_gouter" color="green">
                  <h4 slot="label" v-if="enfantPresentChoisi.prend_gouter" class="green--text">Prend le gouter</h4>
                  <h4 slot="label" v-else class="red--text">Ne prend pas le gouter</h4>
                </v-checkbox>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn outline large round color="teal lighten-2" class="mx-auto" >Emarger cet enfant</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import Searcher from '../part/Searcher'
import PresenceService from '../../services/PresenceService'
import DateHelper from '../../helper/DateHelper'
import TimePicker from '../part/timepicker/TimePicker'

const statePresence = {
  normale: {class:'green', type: 'PRESENCE'},
  anormale: {class: 'orange', type: 'PRESENCE'}, // concerne un retard ou un gouter pris alors qu'on ne devait pas le prendre ou inversement
  absence_justifee: {class: 'purple', type: 'ABSENCE'},
  absence_non_justifiee: {class: 'red', type: 'ABSENCE'},
  exceptionnelle: {class: 'yellow lighten-3', type: 'PRESENCE_EX'}
}
export default {
  name: 'Emargement',
  components: {TimePicker, Searcher},
  data () {
    return {
      enfants_presents: [],
      enfants_non_presents: [],
      enfants_emarges: [],
      dialogEnfantPresent: false,
      enfantPresentChoisi: {}, // pour le dialog enfant present
      enfantAbsentChoisi: null, // pour le dialog enfant absent
      enfantEmargeChoisi: null // pour le dialog enfants emargé
    }
  },
  methods: {
    emargement (enfant) {
      let e = enfant
      this.enfantPresentChoisi = JSON.parse(JSON.stringify(e))
      // attribut par default qui ne vont pas changer
      // ils permettront de comparer les heures d'arrivée réelle et théoriques par ex
      this.enfantPresentChoisi.heure_arrivee_theorique = this.enfantPresentChoisi.heure_arrivee
      this.enfantPresentChoisi.heure_depart_theorique= this.enfantPresentChoisi.heure_depart
      this.enfantPresentChoisi.prend_gouter_r_theorique = this.enfantPresentChoisi.prend_gouter

      // creation d'une copie de l'objet pour ne pas modifier e quand on mddifie enfantPresentChoisi
      this.dialogEnfantPresent = true
      // TODO appel au serveur pour sauvegarder la donnée pour chaque cas
      if (this.removeAbsentsFromList(enfant)) {
        e.state = statePresence.exceptionnelle // la présence est exceptionnelle
      } else if (this.removeEnfantPresentsFromList(enfant)) {
        e.state = statePresence.anormale // a changer en fonction de l'état
      }
      this.enfants_emarges.push(e)
      this.sortArray(this.enfants_emarges)
    },

    removeEnfantPresentsFromList (enfant) {
      let itemIsRemoved = false
      for (let i = 0; i <  this.enfants_presents.length; i++) {
        if (this.enfants_presents[i].id_enfant === enfant.id_enfant) {
          this.enfants_presents.splice(this.enfants_presents.indexOf(enfant), 1)
          itemIsRemoved = true
        }
      }
      return itemIsRemoved
    },

    removeAbsentsFromList (enfant) {
      let itemIsRemoved = false
      for (let i = 0; i <  this.enfants_non_presents.length; i++) {
        if (this.enfants_non_presents[i].id_enfant === enfant.id_enfant) {
          this.enfants_non_presents.splice(this.enfants_non_presents.indexOf(enfant), 1)
          itemIsRemoved = true
        }
      }
      return itemIsRemoved
    },

    removeEnfantEmargeFromList (enfant) {
      this.enfants_emarges.splice(this.enfants_emarges.indexOf(enfant), 1)
      let e = enfant
      if (enfant.state.type === 'PRESENCE_EX') {
        e.state = undefined
        this.enfants_non_presents.push(e)
        this.sortArray(this.enfants_non_presents)
        this.sortArray(this.enfants_emarges)
      } else {
        e.state = undefined
        this.enfants_presents.push(e)
        this.sortArray(this.enfants_presents)
        this.sortArray(this.enfants_emarges)
      }
    },

    loadEnfantsPresents () { // charge tous les enfants supposés présents aujourd'hui
      let vm = this
      PresenceService.getEnfantsDuJour() // recupere tous les enfants présent aujourd'hui
        .then(function (rst) {
         if (rst.data.erreur == null) {
           rst.data.resultats.forEach(function (r) {
             vm.enfants_presents.push(r)
           });
           console.log(vm.enfants_presents)
         }
      })
        .catch(function (err) {
          console.log('Erreur', err)
        })
    },

    loadEnfantsNonPresent () { // charge tous les enfants supposés absent aujourd'hui
      let vm = this
      PresenceService.getEnfantsNonPresebtDujour() // recupere tous les enfants présent aujourd'hui
        .then(function (rst) {
          if (rst.data.erreur == null) {
            vm.enfants_non_presents = rst.data.resultats
            console.log(rst.data.resultats)
          }
        })
        .catch(function (err) {
          console.log('Erreur', err)
        })
    },

    loadEnfantsEmarges () { // tous les enfants ayant été pointé

    },

    sortArray (array) { // trie en fonction du nom de l'enfant
      array.sort(function (a, b) {
        if (a.nomComplet < b.nomComplet) {
          return -1
        }
        if (a.nomComplet > b.nomComplet) {
          return 1
        }
        return 0;
      })
    },

    formatDate (date) {
      return DateHelper.formatTime(date)
    },
    prendGouter (v) {
      if (v) {
        return 'Prend le gouter'
      } else {
        return 'Ne prend pas le gouter'
      }
    }
  },
  computed: {
    jourDelaSemaine () {
     return DateHelper.getWeekDay(new Date())
    },
    dateFr () {
      return DateHelper.getDateFrExplicit(new Date())
    }
  },
  mounted () {
    this.loadEnfantsPresents() // charge les enfants présent de la BD
    this.loadEnfantsNonPresent() // chage les enfants non présent
    this.loadEnfantsEmarges()
    this.sortArray(this.enfants_presents)
    this.sortArray(this.enfants_non_presents)
    this.sortArray(this.enfants_emarges)
  }
}
</script>

<style scoped>

</style>
