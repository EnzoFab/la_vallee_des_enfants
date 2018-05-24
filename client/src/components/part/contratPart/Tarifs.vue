<template>
  <v-flex  xs12 class="my-1">

    <v-toolbar color="yellow lighten-2">
      <v-spacer></v-spacer>
      <v-toolbar-title>Indémnités et salaire</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex mt-3>
          <v-form v-model="estValide">
            <v-layout>
              <v-flex offset-md1 md10>
                <h3>Nombre de semaines d'accueil</h3>
                <v-text-field
                  v-model="nbSemAccueil"
                  prepend-icon="date_range"
                  disabled
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex md6>
                <v-flex>
                  <h3>Salaire</h3>
                  <v-flex md11>
                    <v-text-field
                      label="Salaire Brut"
                      v-model= "calculerSalBrut"
                      :rules="regleSalaire"
                      prepend-icon="monetization_on"
                      disabled
                    ></v-text-field>
                  </v-flex>
                  <v-flex md11>
                    <v-text-field
                      label="Salaire Net"
                      v-model="salaireNet"
                      :rules="regleSalaire"
                      prepend-icon="attach_money"
                      color="yellow darken-2"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex md11>
                    <v-layout>
                      <v-text-field
                        label="Majoration"
                        v-model="majoration"
                        :rules="regleMajo"
                        prepend-icon="add_circle_outline"
                        color="yellow darken-2"
                        required
                      ></v-text-field>
                      <v-flex mt-4 md1>%</v-flex>
                    </v-layout>
                  </v-flex>
                </v-flex>
              </v-flex>
              <v-flex mt-5 md6>
                <v-card height="150">
                  <h2 align="center">Salaire mensuel : </h2>
                  <span class="display-3"> {{ salaireMensuel }} € </span>
                </v-card>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex md6>
                <v-flex md11>
                  <h3>Indémnités journalières</h3>
                  <v-text-field
                    v-model="indemniteJour"
                    :rules="regleTarif"
                    prepend-icon="bubble_chart"
                    disabled
                  ></v-text-field>
                </v-flex>
              </v-flex>
              <v-flex md6>
                <v-flex md11>
                  <h3>Goûter</h3>
                  <v-text-field
                    v-model="gouter"
                    :rules="regleTarif"
                    prepend-icon="restaurant"
                    disabled
                  ></v-text-field>
                </v-flex>
              </v-flex>
            </v-layout>
          </v-form>
        </v-flex>
        <v-flex md12 lg12 xl12 sm12 xs12>
          <v-btn
            depressed large round
            class="yellow lighten-2"
            @click="$emit('back')"
          >Précédent</v-btn>
          <v-btn
            depressed large round
            class="yellow lighten-2"
            @click="envoyer"
            :disabled="!estValide"
          >Suivant</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-flex>
</template>

<script>
import TypeService from '../../../services/TypeService'
import ContratService from '../../../services/ContratService'
import FonctionMath from '../../../helper/FonctionMath'
export default {
  name: 'Tarifs',
  props: {
    heureSemaine: {required: true},
    congeEmployeur: {required: true},
    congeAssmat: {required: true}
  },
  data () {
    return {
      salaireNet: 3.25,
      indemniteJour: null,
      gouter: null,
      majoration: 25,
      estValide: false,
      regleSalaire: [
        v => !!v || 'Veuillez remplir le mot de passe',
        v => /^[0-9]+(([.][0-9]+)?)$/.test(v) || 'Le format de salaire n\'est pas valide'
      ],
      regleMajo: [
        v => !!v || 'Veuillez renseigner le taux de majoration',
        v => /^[0-9]+(([.][0-9]+)?)$/.test(v) || 'Le format de majoration n\'est pas valide'
      ],
      regleTarif: [
        v => !!v || 'Veuillez renseigner le tarif correspondant',
        v => /^[0-9]+(([.][0-9]+)?) €$/.test(v) || 'Le format du tarif donné n\'est pas valide'
      ]
    }
  },
  computed: {
    calculerSalBrut () {
      return FonctionMath.arrondi(this.salaireNet / 0.77, 2)
    },
    salaireMensuel () {
      return FonctionMath.arrondi(this.heureSemaine * this.salaireNet * this.nbSemAccueil / 12, 2)
    },
    nbSemAccueil () {
      return 52 - this.congeAssmat - this.congeEmployeur
    }
  },
  mounted () {
    this.initIndemnites()
    this.initGouter()
  },
  methods: {
    async initIndemnites () {
      try {
        const response = await TypeService.indemnitesJour()
        this.indemniteJour = response.data.entretien + ' €'
      } catch (e) {
        console.log(e)
      }
    },
    async initGouter () {
      try {
        const response = await TypeService.gouter()
        if (response.data.erreur == null) {
          this.gouter = response.data.gouter + ' €'
        }
      } catch (e) {
        console.log(e)
      }
    },
    async initDataFromContrat () {
      try {
        let reponse = await ContratService.findOne(this.$store.state.numContrat)
        if (reponse.data.erreur == null) {
          this.heureSemaine = reponse.data.nb_heures_semaine || 0
          this.congeParent = reponse.data.nb_semaines_conges_parents || 0
          this.congeAssmat = reponse.data.nb_semaines_conges || 0
          this.heureSemaine = reponse.data.nb_heures_semaine || 1
        } else {
          console.log(reponse.data.erreur)
        }
      } catch (e) {
        console.log(e.toString())
      }
    },
    envoyer () {
      let data = {
        salaireNet: this.salaireNet,
        majoration: this.majoration
      }
      this.$emit('submit', data)
    },
    back () {
      this.$emit('back')
    }
  }
}
</script>

<style scoped>

</style>
