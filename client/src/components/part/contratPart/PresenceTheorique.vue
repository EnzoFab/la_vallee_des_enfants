<template>
  <v-flex  xs12 class="my-1">
    <v-toolbar class="pink lighten-4" dark>
      <v-spacer></v-spacer>
      <v-toolbar-title>Planning des présences</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-container fluid grid-list-md>
      <v-alert v-model="erreur" type="error" dismissible>
        {{msgErreur}}
      </v-alert>
      <v-layout row wrap>
        <v-flex d-flex md6 lg6 xl6 sm12 xs12 >
          <v-card v-if="presences.length > 0">
            <h2>Présences</h2>
            <v-flex md12 lg12 xl12 sm12 xs12>
              <v-expansion-panel popout dark>
                <v-expansion-panel-content v-for="(presence,i) in presences" :key="i" ripple class="pink lighten-4">
                  <div slot="header" class="text-xs-center">
                    {{presence.jourChoisi.libelle}}
                    <v-btn icon dark @click="deletePresence(presence)">
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </div>
                  <v-card class="elevation-0 white" light>
                    <v-card-text>
                      <v-flex md12 lg6 xl6 sm12 xs12>
                        <v-menu
                          ref="presence.menu"
                          lazy
                          full-width
                          :close-on-content-click="false"
                          v-model="presence.menu"
                          transition="slide-y-transition"
                          :nudge-right="40"
                          top
                          min-width="10%"
                        >
                          <v-text-field
                            slot="activator"
                            label="Heure d'arrivee"
                            v-model="presence.heureArrivee"
                            prepend-icon="schedule"
                            readonly
                            color="light-green darken-2"
                            required
                            light
                            :rules="regleHeure"
                          ></v-text-field>
                          <v-time-picker v-model="presence.heureArrivee"
                                         @change="$refs.presence.menu.save(presence.heureArrivee)">
                          </v-time-picker>
                        </v-menu>
                      </v-flex>
                      <v-flex md12 lg6 xl6 sm12 xs12>
                        <v-menu
                          ref="presence.menuDepart"
                          lazy
                          full-width
                          :close-on-content-click="false"
                          v-model="presence.menuDepart"
                          transition="slide-y-transition"
                          :nudge-right="40"
                          top
                          min-width="10%"
                        >
                          <v-text-field
                            slot="activator"
                            label="Heure de départ"
                            v-model="presence.heureDepart"
                            prepend-icon="schedule"
                            readonly
                            color="light-green darken-2"
                            required
                            light
                            :rules="regleHeure"
                          ></v-text-field>
                          <v-time-picker v-model="presence.heureDepart"
                                         @change="$refs.presence.menuDepart.save(presence.heureDepart)">
                          </v-time-picker>
                        </v-menu>
                      </v-flex>
                      <v-flex light>
                        <v-switch light label="Gouter" v-model="presence.prendGouter"></v-switch>
                      </v-flex>
                    </v-card-text>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-flex>
          </v-card>
        </v-flex>
        <v-flex d-flex md6 lg6 xl6 sm12 xs12>
          <v-card>
            <h2>Jours</h2>
            <v-form v-model="estValide" ref="form" class="pa-3">
              <v-flex md12 lg12 xl12 sm12 xs12>
                <v-select
                  :items="jours"
                  v-model="jourChoisi"
                  label="Jours"
                  single-line
                  item-text="libelle"
                  auto
                  :rules="[v => !!v || 'Veuillez renseigner le jour']"
                  required
                >
                </v-select>
              </v-flex>
              <v-flex>
                <v-switch label="Gouter" v-model="gouter"></v-switch>
              </v-flex>
              <v-divider ></v-divider>
              <v-flex>
                <v-menu
                  ref="menuArrivee"
                  lazy
                  full-width
                  :close-on-content-click="false"
                  v-model="menuArrivee"
                  transition="slide-y-transition"
                  :nudge-right="40"
                  top
                  min-width="10%"
                >
                  <v-text-field
                    slot="activator"
                    label="Heure d'arrivee"
                    v-model="heureArrivee"
                    prepend-icon="schedule"
                    readonly
                    color="light-green darken-2"
                    required
                    :rules="regleHeure"
                  ></v-text-field>
                  <v-time-picker v-model="heureArrivee" @change="$refs.menuArrivee.save(heureArrivee)"></v-time-picker>
                </v-menu>
              </v-flex>
              <v-flex>
                <v-menu
                  ref="menuDepart"
                  lazy
                  full-width
                  :close-on-content-click="false"
                  v-model="menuDepart"
                  transition="slide-y-transition"
                  :nudge-right="40"
                  top
                  min-width="10%"
                >
                  <v-text-field
                    slot="activator"
                    label="Heure de départ"
                    v-model="heureDepart"
                    prepend-icon="schedule"
                    readonly
                    color="light-green darken-2"
                    required
                    :rules="regleHeure"
                  ></v-text-field>
                  <v-time-picker v-model="heureDepart" @change="$refs.menuDepart.save(heureDepart)"></v-time-picker>
                </v-menu>
              </v-flex>
              <v-flex md12 lg12 xl12 sm12 xs12>
                <v-btn icon color="pink" dark  @click="addJour"
                       :disabled="!estValide">
                  <v-icon large>add</v-icon>
                </v-btn>
              </v-flex>
            </v-form>
          </v-card>
        </v-flex>
        <v-flex md12 lg12 xl12 sm12 xs12>
          <v-btn>Retour</v-btn>
          <v-btn
            depressed large round
            :disabled="presences.length <= 0"
          >
            Suivant</v-btn>
        </v-flex>
      </v-layout>
    </v-container>

  </v-flex>
</template>

<script>
import TypeService from '../../../services/TypeService'
export default {
  name: 'PresenceTheorique',
  data () {
    return {
      estValide: false,
      presences: [],
      jours: [], // la liste de tous les jours
      jourChoisi: null,
      gouter: false,
      heureArrivee: null,
      heureDepart: null,
      menuArrivee: false,
      menuDepart: false,
      regleHeure: [
        v => !!v || 'Veuillez renseigner le jour'
      ],
      erreur: false,
      msgErreur: null
    }
  },
  methods: {
    addJour () {
      let data = {
        jourChoisi: this.jourChoisi,
        prendGouter: this.gouter,
        heureArrivee: this.heureArrivee,
        heureDepart: this.heureDepart,
        menu: false,
        menuDepart: false
      }
      this.presences.push(data)
      this.presences.sort(function (a, b) {
        return a.jourChoisi.id - b.jourChoisi.id // fonction de trie
      })
      this.deleteJour(this.jourChoisi) // supression du jour de la liste
      this.$refs.form.reset() // remise à 0 du formulaire
    },
    deleteJour (jour) {
      this.jours.splice(this.jours.indexOf(jour), 1)
    },
    deletePresence (presence) {
      this.presences.splice(this.presences.indexOf(presence), 1)
      this.jours.push(presence.jourChoisi)
      this.jours.sort(function (a, b) {
        return a.id - b.id // fonction de trie
      })
    },
    async loadJours () {
      try {
        let response = await TypeService.joursDeLaSemaine()
        console.log(response.data)
        this.jours = response.data.typesjour
        console.log(this.jours)
      } catch (e) {
        this.msgErreur = 'Erreur ' + e.toString()
        this.erreur = true
      }
    },
    submit () {
      if (this.presences.length > 0) {
        let data = []
        this.presences.forEach(function (element) {
          data.push({
            jourChoisi: element.jourChoisi,
            prendGouter: element.prendGouter,
            heureArrivee: element.heureArrivee,
            heureDepart: element.heureDepart
          })
        })
        this.$emit('submit', data)
      } else {
        this.msgErreur = 'Erreur aucune présence remplie'
        this.erreur = true
      }
    },
    back () {
      this.$emit('back')
    }
  },
  mounted () {
    this.loadJours()
  }
}
</script>

<style scoped>
</style>
