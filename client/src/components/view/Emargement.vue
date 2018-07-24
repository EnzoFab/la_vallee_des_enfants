<template>
  <v-container fluid grid-list-md pa-4>
    <v-layout row wrap>
      <v-flex xs12>
        <h1 class="headline text-xs-center orange--text text--darken-1 mr-1"><b>{{dateFr}}</b></h1>
      </v-flex>
      <v-flex xs6 offset-xs3 v-if="!contentLoaded">
        <Spinner :loading="!contentLoaded" color="#4DB6AC"></Spinner>
      </v-flex>
      <v-flex xs3 offset-xs8>
        <v-tooltip v-model="showTooltip" top color="blue darken-1">
          <v-btn  slot="activator"
                  @mouseover="showTooltip = true"
                  @mouseout.stop="showTooltip = false"
                  @click="showText = !showText"
                  icon large color="blue lighten-5">
            <v-icon x-large color="blue darken-1">help</v-icon>
          </v-btn>
          <span>Aide</span>
        </v-tooltip>
      </v-flex>
      <v-flex xs6 offset-xs3>
        <v-slide-y-reverse-transition>
          <span v-if="showText">
            Pour réaliser l'émargement d'un enfant veuillez rentrer l'heure d'arrivée et l'heure de départ.<br>
            Il sera ensuite possible de la modifier.
          </span>
        </v-slide-y-reverse-transition>
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
                <v-list-tile  v-for="(el, i) in elements.items" :key="i" @click="showMenu(el)" avatar>
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
                <v-list-tile  v-for="(el, i) in elements.items" :key="i" @click="showMenu(el)" avatar>
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
        <Searcher :item-attribute="['nomComplet', 'nom_enfant', 'prenom_enfant']" :items="enfants_emarges" label="Prenom ou nom" box>
          <v-card slot-scope="elements" class="transparent elevation-0 scroll-y" style="max-height: 15vw">
            <v-card-title>
              <h3 class="orange--text text--darken-1 mr-1">
                Enfants emargés
              </h3>
            </v-card-title>
            <v-card-text>
              <!-- liste des enfants qui ont été pointés-->
              <v-list  v-if="elements.items.length > 0" three-line><!-- TODO transformer liste en card-->
                <v-list-tile  v-for="(el, i) in elements.items" :key="i"
                              @click.stop="showMenu(el)" avatar
                              :id="'presence' + el.id_presence_theo"
                              :class="el.state.class">
                  <v-list-tile-avatar>
                    <img src="/static/boy.png" v-if="el.sexe === 'G'"/>
                    <img src="/static/fille.png" v-else/>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title >
                      <h3 style="font-size: 0.9em;">{{el.nomComplet}}
                        <span v-if="el.state.label !== undefined" :class="el.state.label_class"
                              style="float: right; font-size: 0.8em;">
                          {{el.state.label}}
                        </span>
                      </h3>
                    </v-list-tile-title>
                    <v-list-tile-sub-title  v-if="el.state === undefined || el.state.type !== 'ABSENCE' ">
                      <v-layout row align-center>
                        <v-flex xs6><h4><u>Heure d'arrivée</u></h4></v-flex>
                        <v-flex xs6>{{formatDate(el.heure_arrivee_r)}}</v-flex>
                        <v-flex xs6><h4><u>Heure de départ </u></h4></v-flex>
                        <v-flex xs6>{{formatDate(el.heure_depart_r)}}</v-flex>
                        <v-flex xs6><h4><u>Prend le goûter  </u></h4></v-flex>
                        <v-flex xs6>
                          <span v-if="el.prend_gouter_r">Oui</span>
                          <span v-else>Non</span>
                        </v-flex>
                        <v-flex xs6 v-if="el.state.note !== undefined && el.state.note != null">
                          Note: <i style="font-size: smaller;">{{el.state.note}}</i>
                        </v-flex>
                      </v-layout>
                    </v-list-tile-sub-title>
                    <v-list-tile-sub-title  v-if="el.state.type === 'ABSENCE'">
                      <h2 style="text-align: center">ABSENT</h2>
                    </v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-btn icon @click.stop="supprimerPresence(el)" dark>
                      <v-icon medium>delete</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list>
              <span v-else>
                Aucun résultats
              </span>
            </v-card-text>
          </v-card>
        </Searcher>
        <!-- <v-card class="scroll-y" style="max-height: 15vw">
          <v-card-title>
            <h3 class="orange--text text--darken-1 mr-1">
              List des enfants emargés
            </h3>
          </v-card-title>
          <v-card-text>
            <v-list>

              <v-list-tile v-for="(e,i) in enfants_emarges" :key="i" @click="showMenu(e)" :color="e.state.class">
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
        </v-card> -->

      </v-flex>
    </v-layout>
    <v-dialog
      v-model="dialogEnfantPresent"
      scrollable
      transition="dialog-bottom-transition"
      v-if="enfantChoisiAEmarger != null"
      max-width="1000"
    >
      <v-card height="450" class="scroll-y grey lighten-4">
        <v-toolbar card dark color="orange darken-1">
          <v-spacer></v-spacer>
          <v-toolbar-title>Emarger {{enfantChoisiAEmarger.nomComplet}}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text style="height: 100vh;" class="scroll-y" >
          <v-container justify-center>
            <v-layout row wrap justify-center>
              <v-flex xs12>
                <!-- <v-text-field :value="enfantChoisiAEmarger.heure_arrivee">
                 </v-text-field> -->
                <TimePicker required
                            :heureDebut="heure_debut"
                            :heureFin="heure_fin"  label="Heure d'arrivee"
                            v-model="enfantChoisiAEmarger.heure_arrivee_r" :minuteEcart="ecart"/>
              </v-flex>
              <v-flex xs12>
                <TimePicker required
                            :heureDebut="heure_debut" :heureFin="heure_fin"  label="Heure de départ"
                            v-model="enfantChoisiAEmarger.heure_depart_r" :minuteEcart="ecart"/>
              </v-flex>
              <v-flex xs6 d-inline-flex offset-xs3>
                <img src="/static/petitDej.png" style="height: 40px;" v-if="enfantChoisiAEmarger.prend_gouter_r"/>
                <v-checkbox v-model="enfantChoisiAEmarger.prend_gouter_r" color="green">
                  <h4 slot="label" v-if="enfantChoisiAEmarger.prend_gouter_r" class="green--text">Prend le gouter</h4>
                  <h4 slot="label" v-else class="red--text">Ne prend pas le gouter</h4>
                </v-checkbox>
              </v-flex>
              <v-flex xs6 offset-xs5>
                <v-select :items="[1,5,10,30]" color="blue" hide-selected
                          v-model="ecart" overflow allow-overflow label="Choisir le délai">
                </v-select>
                <v-btn flat color="primary"></v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-layout row wrap class="mb-3" v-if="!loading">
            <v-flex offset-md1  offset-lg1  offset-xl1  offset-sm1
                    md4 lg4 xl4 sm4 xs12
                    v-if="enfantChoisiAEmarger.heure_arrivee != null">
              <v-btn outline block round
                     color="red lighten-2" @click.stop="emargement(enfantChoisiAEmarger, true)">
                Absence
              </v-btn>
            </v-flex>
            <v-flex offset-md1  offset-lg1  offset-xl1  offset-sm1
                    md4 lg4 xl4 sm4 xs12
                    v-if="enfantChoisiAEmarger.heure_arrivee != null">
              <v-btn :outline="!button_disabled" block round color="teal lighten-2" :disabled="button_disabled"
                     @click.stop="emargement(enfantChoisiAEmarger)"
              >
                Emarger cet enfant
              </v-btn>
            </v-flex>
            <v-flex v-else xs6 offset-xs3>
              <v-btn :outline="!button_disabled" block round color="teal lighten-2" :disabled="button_disabled"
                     @click.stop="emargement(enfantChoisiAEmarger)">Emarger cet enfant</v-btn>
            </v-flex>
          </v-layout>
          <v-layout row wrap class="mb-3" v-else>
            <v-flex xs6 offset-xs3>
              <Spinner :loading="loading" color="#FFB74D"></Spinner>
            </v-flex>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import Spinner from 'vue-spinner/src/RiseLoader'
import Searcher from '../part/Searcher'
import PresenceTheoriqueService from '../../services/PresenceTheoriqueService'
import PresenceReelleService from '../../services/PresenceService'
import DateHelper from '../../helper/DateHelper'
import TimePicker from '../part/timepicker/TimePicker'

const statePresence = {
  normale: {
    class: 'green accent-1', type: 'PRESENCE'
  },
  anormale: // concerne un retard ou un gouter pris alors qu'on ne devait pas le prendre ou inversement
    {
      class: 'yellow lighten-4',
      type: 'PRESENCE',
      label: 'Presence anormale',
      label_class: 'amber--text text--darken-4'
    },
  absence_justifee: {class: 'pink darken-1', type: 'ABSENCE',
    label: 'Absence justifiée', label_class: 'red--text text--darken-4'},
  absence_non_justifiee: {class: 'deep-orange lighten-1', type: 'ABSENCE'},
  exceptionnelle:
    {
      class: 'deep-purple lighten-4',
      type: 'PRESENCE_EX',
      label: 'Present exceptionnellement',
      label_class: 'deep-purple--text text--lighten-1'
    }
}
const NOTE = {
  presenceExceptionnelle: 'Exceptionnellement présent aujourd\'hui ',
  arriveeRetard: 'Arrivé(e) en retard, ',
  arriveeEnAvance: 'Arrivé(e) en avance, ',
  departEnAvance: 'Parti(e) avant, ',
  departEnRetard: 'Depart en retard, ',
  gouterPris: 'Gouter supplementaire, ',
  gouterNonPris: 'Gouter non pris, ',
  absenceJustifee: 'Absence justifiee',
  absenceNonJustifee: 'Absence Non justifiee'
}
export default {
  name: 'Emargement',
  components: {TimePicker, Searcher, Spinner},
  data () {
    return {
      enfants_presents: [],
      enfants_non_presents: [],
      enfants_emarges: [],
      dialogEnfantPresent: false,
      enfantChoisiAEmarger: {}, // pour le dialog enfant present
      ecart: null,
      heure_debut: 8,
      heure_fin: 19,
      loading: false,
      showTooltip: false,
      showText: false,
      contentLoaded: false
    }
  },
  methods: {
    showMenu (enfant) {
      this.enfantChoisiAEmarger = JSON.parse(JSON.stringify(enfant))
      // creation d'une copie de l'objet pour ne pas modifier e quand on mddifie enfantChoisiAEmarger
      this.dialogEnfantPresent = true
    },
   emargement (enfant, absence) {
      this.loading = true
      let e = enfant
      let vm = this
      let presence = {
        datepresencereelle: new Date(),
        heure_arrivee: e.heure_arrivee_r,
        heure_depart: e.heure_depart_r,
        prend_gouter: e.prend_gouter_r,
        id_presence_theo: e.id_presence_theo
      }
      console.log(presence)

      if (absence !== undefined) {
        presence = {
          datepresencereelle: new Date(),
          heure_arrivee: null,
          heure_depart: null,
          prend_gouter: null,
          id_presence_theo: e.id_presence_theo,
          absence_justifiee: absence
        }

        e.heure_depart_r = null
        e.heure_arrivee_r = null
        e.prend_gouter_r = null
      }
      if (e.id_presence_reelle === undefined) {
        presence.absence_justifiee = null
        presence.id_facture = null
        this.save(presence).then(function (id_presence) {
          vm.removeAbsentsFromList(enfant)
          vm.removeEnfantPresentsFromList(enfant)
          e.state = vm.getState(enfant)
          console.log(e)
          e.id_presence_reelle = id_presence
          vm.enfants_emarges.push(e)
          vm.sortArray(vm.enfants_emarges)
          vm.loading = false
          vm.dialogEnfantPresent = false
          let message = 'Emargement réussi !, <u>' + e.nomComplet + '</u><br>Arrivé(e) à ' +
            e.heure_arrivee_r + '<br>Parti(e) à ' + e.heure_depart_r +
            '.<br> Vous pouvez toujours modifier cette présence ou la supprimer'
          vm.triggerNotification(message, 'success')
          return e
        }).then(function (e) {
          vm.$vuetify.goTo(`#presence${e.id_presence_theo}`, vm.options)
        }).catch(function (e) {
          vm.loading = false
          vm.dialogEnfantPresent = false
          let message = 'Une erreur est survenue, impossible d\' émarger cet enfant' + e
          vm.triggerNotification(message, 'error')
          console.log(e)
        })
      } else {
        if (absence === undefined) {
          presence.absence_justifiee = e.absence_justifee
        }

        presence.id_facture = e.id_facture
        presence.id_presence_reelle = e.id_presence_reelle

        this.update(presence).then(function (id_presence) {
          let find = false
          e.state = vm.getState(e)
          for (let i = 0; i < vm.enfants_emarges.length && !find; i++) {
            if (vm.enfants_emarges[i].id_presence_reelle === id_presence) {
              vm.enfants_emarges.splice(i, 1)
              vm.enfants_emarges.push(e)
              find = true
            }
          }
          vm.sortArray(vm.enfants_emarges)
          vm.loading = false
          vm.dialogEnfantPresent = false
          let message = 'Modification réussie !, <u>' + e.nomComplet + '</u><br>Arrivé(e) à ' +
            e.heure_arrivee_r + '<br>Parti(e) à ' + e.heure_depart_r +
            '.<br> Vous pouvez toujours modifier cette présence ou la supprimer'
          vm.triggerNotification(message, 'success')
        }).catch(function (e) {
          vm.loading = false
          vm.dialogEnfantPresent = false
          console.log(e)
          let message = 'Une erreur est survenue, impossible de modifier cette présence'
          vm.triggerNotification(message, 'error')
        })
      }

    },

    supprimerPresence (enfant) {
      let vm = this
      this.delete(enfant.id_presence_reelle)
        .then(function (id_presence) {
          let found = false
          vm.loadEnfantsPresents()
          vm.loadEnfantsNonPresent()
          for (let i = 0; i < vm.enfants_emarges.length && !found; i++) {
            if (vm.enfants_emarges[i].id_presence_reelle === id_presence) {
              vm.enfants_emarges.splice(i,1)
              found = true
            }
          }
          let message = 'La présence de ' + enfant.nomComplet + ' a été supprimée avec succès'
          vm.triggerNotification(message, 'success')
        }).catch(function (e) {
        let message = 'Une erreur est survenue, impossible de supprimer cette présence'
        vm.triggerNotification(message, 'error')
      })
    },

    removeEnfantPresentsFromList (enfant) {
      let itemIsRemoved = false
      for (let i = 0; i <  this.enfants_presents.length; i++) {
        if (this.enfants_presents[i].id_enfant === enfant.id_enfant) {
          console.log('Present', this.enfants_presents[i])
          this.enfants_presents.splice(i, 1)
          console.log(this.enfants_presents)
          itemIsRemoved = true
        }
      }
      return itemIsRemoved
    },

    removeAbsentsFromList (enfant) {
      let itemIsRemoved = false
      for (let i = 0; i < this.enfants_non_presents.length; i++) {
        if (this.enfants_non_presents[i].id_enfant === enfant.id_enfant) {
          console.log(this.enfants_non_presents[i])
          this.enfants_non_presents.splice(i, 1)
          itemIsRemoved = true
        }
      }
      return itemIsRemoved
    },

    loadEnfantsPresents () { // charge tous les enfants supposés présents aujourd'hui
      let vm = this
      this.enfants_presents = []
      return PresenceTheoriqueService.getEnfantsDuJour() // recupere tous les enfants présent aujourd'hui
        .then(function (rst) {
          if (rst.data.erreur == null) {
            let data = rst.data.resultats
            for (let i = 0; i < data.length; i++) {
              data[i].heure_depart_r = data[i].heure_depart
              data[i].heure_arrivee_r = data[i].heure_arrivee
              data[i].prend_gouter_r = data[i].prend_gouter
              vm.enfants_presents.push(data[i])
            }
            vm.sortArray(vm.enfants_presents)
          }
        })
        .catch(function (err) {
          console.log('Erreur', err)
        })
    },

    loadEnfantsNonPresent () { // charge tous les enfants supposés absent aujourd'hui
      let vm = this
      this.enfants_non_presents = []
      return PresenceTheoriqueService.getEnfantsNonPresentsDujour() // recupere tous les enfants présent aujourd'hui
        .then(function (rst) {
          if (rst.data.erreur == null) {
            let data = rst.data.resultats
            for (let i = 0; i < data.length; i++) {
              data[i].heure_depart_r = data[i].heure_depart
              data[i].heure_arrivee_r = data[i].heure_arrivee
              data[i].prend_gouter_r = data[i].prend_gouter
              vm.enfants_non_presents.push(data[i])
            }
            vm.sortArray(vm.enfants_non_presents)
          }
        })
        .catch(function (err) {
          console.log('Erreur', err)
        })
    },

    loadEnfantsEmarges () { // tous les enfants ayant été pointé
      let vm = this
      this.enfants_emarges = []
      return PresenceTheoriqueService.getEnfantsEmargesDuJour()
        .then(function (rst) {
          if (rst.data.erreur != null) {
            throw rst.data.erreur
          } else {
            let data = rst.data.resultats
            for (let i = 0; i < data.length; i++) {
              data[i].state = vm.getState(data[i])
              if (data[i].heure_depart_r == null) {
                if (DateHelper.getCurrentTime() >= vm.heure_debut && DateHelper.getCurrentTime() <= vm.heure_fin) {
                  data[i].heure_depart_r = DateHelper.getCurrentTime()
                  data[i].heure_arrivee_r = DateHelper.getCurrentTime()
                } else {
                  data[i].heure_depart_r = DateHelper.toTime(vm.heure_fin, 0)
                  data[i].heure_arrivee_r = DateHelper.toTime(vm.heure_debut, 0)
                }
              }
              vm.enfants_emarges.push(data[i])
            }
            vm.sortArray(vm.enfants_emarges)
          }
        }) .catch(function (err) {
        console.log('Erreur', err)
      })
    },

    save (presenceReelle) {
      return PresenceReelleService.enregistrerPresence({presence: presenceReelle})
        .then(function (r) {
          if (r.data.erreur != null) {
            throw r.data.erreur
          } else {
            return r.data.resultat.id_presence_reelle
          }
        }).catch(function (er) {
          throw er
        })
    },

    update (presenceReelle) {
      return PresenceReelleService.updatePresence({presence: presenceReelle})
        .then(function (r) {
          if (r.data.erreur != null) {
            throw r.data.erreur
          } else {
            return r.data.resultat.id_presence_reelle
          }
        })
    },

    delete (id_presence_reelle) {
      return PresenceReelleService.supprimerPresent(id_presence_reelle)
        .then(function (r) {
          if(r.data.erreur == null) {
            return r.data.resultat.id_presence_reelle
          } else {
            throw r.data.erreur
          }
        }).catch(function (e) {
          throw e
        })
    },

    triggerNotification (text, type) {
        this.$notify({
          group: 'assistante',
          title: 'Connexion',
          text: text,
          duration: 4000,
          speed: 500,
          type: type
        })
    },

    sortArray (array) { // trie en fonction du nom de l'enfant
      array.sort(function (a, b) {
        if (a.nomComplet < b.nomComplet) {
          return -1
        }
        if (a.nomComplet > b.nomComplet) {
          return 1
        }
        return 0
      })
    },

    formatDate (date) {
      if (date !== undefined && date != null) {
        return DateHelper.formatTimeFr(date)
      } else {
        return 'Absence'
      }
    },

    getState (enfant) {
      let s = JSON.parse(JSON.stringify(statePresence.normale))
      let note = ''

      if (enfant.heure_arrivee_r != null && enfant.heure_arrivee == null) {
        s = statePresence.exceptionnelle
        note = NOTE.presenceExceptionnelle
      } else {
        if (enfant.heure_arrivee_r == null && enfant.absence_justifiee === true) {
          s = statePresence.absence_justifee
          note = NOTE.absenceJustifee
        } else if (enfant.heure_arrivee_r == null) {
          s = statePresence.absence_non_justifiee
          note = NOTE.absenceNonJustifee
        } else {
          if (DateHelper.formatTime(enfant.heure_arrivee_r) > DateHelper.formatTime(enfant.heure_arrivee)) { //arrivée en retard
            s = statePresence.anormale
            note = NOTE.arriveeRetard
          } else if (DateHelper.formatTime(enfant.heure_arrivee_r) < DateHelper.formatTime(enfant.heure_arrivee)) {
            s = statePresence.anormale
            note = NOTE.arriveeEnAvance
          }

          if (DateHelper.formatTime(enfant.heure_depart_r) < DateHelper.formatTime(enfant.heure_depart)) { // partie avant
            s = statePresence.anormale
            note += NOTE.departEnAvance
          } else if (DateHelper.formatTime(enfant.heure_depart_r) < DateHelper.formatTime(enfant.heure_depart)) {
            s = statePresence.anormale
            note += NOTE.departEnRetard
          }

          if (enfant.prend_gouter_r && !enfant.prend_gouter) { // a pris le gouter alors qu'il devait pas le prendre
            s = statePresence.anormale
            note += NOTE.gouterPris
          } else if (!enfant.prend_gouter_r && enfant.prend_gouter) {
            s = statePresence.anormale
            note += NOTE.gouterNonPris
          }
        }
      }

      if (note.length > 0) {
        s.note = note
      }
      return s
    }
  },
  computed: {
    dateFr () {
      return DateHelper.getDateFrExplicit(new Date()) + ', ' + DateHelper.formatTimeFr(DateHelper.getCurrentTime())
    },
    button_disabled () {
      return this.enfantChoisiAEmarger.heure_arrivee_r == null ||this.enfantChoisiAEmarger.heure_depart_r == null
    },
    options () {
      return {
        duration: 100,
        offset: 350,
        easing: 'easeInOutCubic'
      }
    }
  },
  mounted () {
    let vm = this
    Promise.all([
      this.loadEnfantsPresents(), // charge les enfants présent de la BD
      this.loadEnfantsNonPresent(), // chage les enfants non présent
      this.loadEnfantsEmarges()
    ]).then(function () {
      vm.contentLoaded = true
    })
    /* this.sortArray(this.enfants_presents)
    this.sortArray(this.enfants_non_presents)
    this.sortArray(this.enfants_emarges) */
  }
}
</script>

<style scoped>

</style>
