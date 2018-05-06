<template>
  <v-flex xs12 class="my-1">
    <v-toolbar class="light-blue lighten-4">
      <v-spacer></v-spacer>
      <v-toolbar-title>Tuteurs légaux</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <div v-if="btnVisible">
      <v-btn icon large dark color="indigo"
             @click="addTuteur">
        <v-icon dark>add</v-icon>
      </v-btn>
      <span>Ajouter un tuteur</span>
    </div>

    <v-form v-model="estValide" ref="form" class="pa-3">
      <v-container grid-list-xl>
        <v-layout row wrap align-center>
          <v-flex md6 lg6 xl6 sm12 xs12 v-for="(tuteur,i) in tuteurs" :key="i">
            <v-card class="elevation-1">
              <v-toolbar dark color="blue lighten-3">
                <v-spacer></v-spacer>
                <h2>{{tuteur.typeDeTuteur}}</h2>
                <v-spacer></v-spacer>

                <v-btn icon dark large color="transparent"
                       @click="remove(tuteur)"
                       v-if="!btnVisible">
                  <v-icon dark>remove</v-icon>
                </v-btn>

              </v-toolbar>
              <v-container fluid class="px-3">
                <v-layout row wrap>
                  <v-flex md12 xs12>
                    <v-select
                      :items="typeTuteurs"
                      v-model="tuteur.typeDeTuteur"
                      label="Type de tuteur"
                      single-line
                      item-text="libelle"
                      item-value="libelle"
                      auto
                      :rules="regleTypeTuteur"
                      required
                    ></v-select>
                  </v-flex>

                  <v-flex md6 xs6 sm12 xs12>
                    <v-text-field
                      label="Nom"
                      :rules="regleNom"
                      :counter="50"
                      v-model="tuteur.nom"
                    ></v-text-field>
                  </v-flex>

                  <v-flex md6 lg6 xl6 sm12 xs12>
                    <v-text-field
                      label="Prénom"
                      :rules="reglePrenom"
                      :counter="50"
                      v-model="tuteur.prenom"
                    ></v-text-field>
                  </v-flex>

                  <v-flex xs12>
                    <v-text-field
                      label="Profession"
                      :counter="50"
                      :rules="regleProfession"
                      required
                      v-model="tuteur.profession"
                    ></v-text-field>
                  </v-flex>

                  <v-flex md6 lg6 xl6 sm12 xs12>
                    <v-text-field
                      label="Téléphone"
                      v-model="tuteur.telephone"
                      :rules="regleTel"
                      required
                      prepend-icon="phone"
                    ></v-text-field>
                  </v-flex>
                  <v-flex md6 lg6 xl6 sm12 xs12>
                    <v-text-field
                      label="Téléphone Professionnel"
                      prepend-icon="phone"
                      v-model="tuteur.telephonePro"
                      :rules="regleTel"
                    ></v-text-field>
                  </v-flex>
                  <v-flex md12 lg12 x112 sm12 xs12>
                    <v-checkbox v-if="!existeAutredemandeur(tuteur)"
                      label="demandeur"
                      v-model="tuteur.estDemandeur"
                    ></v-checkbox>
                  </v-flex>
                  <v-subheader v-if="tuteur.estDemandeur">Adresse</v-subheader>
                  <v-flex md6 lg6 xl6 sm12 xs12 v-if="tuteur.estDemandeur">
                    <v-text-field label="Ville"></v-text-field>
                  </v-flex>
                  <v-flex md6 lg6 xl6 sm12 xs12>
                    <v-text-field v-if="tuteur.estDemandeur"
                      label="Code Postal"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
          <v-flex md12 lg12 xl12 sm12 xs12>
            <v-btn
              color="green lighten-1"
              depressed large round
              dark
              @click="back"
            >
              Précédent
            </v-btn>
            <v-btn
              color="green lighten-1"
              depressed large round
              :dark="estValide"
              @click="submit"
              :disabled="!estValide"
            >
              Suivant
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>

    </v-form>
  </v-flex>
</template>

<script>
import TypeService from '../../../services/TypeService'

export default {
  name: 'TuteursLegaux',
  data () {
    return {
      tuteurs: [],
      typeTuteurs: [],
      estValide: false,
      regleTypeTuteur: [
        v => !!v || 'Veuillez renseigner le type de tuteur'
      ],
      regleNom: [
        v => !!v || 'Veuillez renseigner le nom du tuteur',
        v => v.length <= 15 || 'Max 15 lettres'
      ],
      reglePrenom: [
        v => !!v || 'Veuillez renseigner le prenom de tuteur',
        v => v.length <= 15 || 'Max 15 lettres'
      ],
      regleProfession: [
        v => !!v || 'Veuillez renseigner la profession du tuteur',
        v => v.length <= 20 || 'Max 20 lettres'
      ],
      regleTel: [
        v => !!v || 'Veuillez renseigner le numéro de telephone du tuteur',
        v => /^(0|\+33)[1-9]([-. ]?[0-9]{2}){4}$/.test(v) || 'le numero de téléphone n\'est pas valide'
      ]
    }
  },
  methods: {
    async initTypeTuteur () {
      try {
        const response = await TypeService.typeTuteur()
        this.typeTuteurs = response.data.typesTuteur
      } catch (e) {
        console.log('Erreur')
      }
    },
    addTuteur () {
      if (this.tuteurs.length < 2) { // ajoute un tuteur à la listes
        this.tuteurs.push({
          typeDeTuteur: null,
          nom: '',
          prenom: '',
          profession: '',
          telephone: '',
          telephonePro: '',
          estDemandeur: false
        })
      }
    },
    remove (tuteur) {
      // supprime un element de la liste
      console.log(tuteur)
      this.tuteurs.splice(this.tuteurs.indexOf(tuteur), 1)
    },
    existeAutredemandeur (tuteur) {
      // idée: Si jamais il y a un demandeur autre que moi alors on cache le checkbox
      var existe = false
      for (var i = 0; i < this.tuteurs.length; i++) {
        if (this.tuteurs[i] !== tuteur && !existe) {
          existe = this.tuteurs[i].estDemandeur
        }
      }
      return existe
    },
    submit () {
      // envoyer
    },
    back () {
      console.log('back')
      this.$emit('back')
    }
  },
  computed: {
    btnVisible () {
      return this.tuteurs.length < 2
    }
  },
  mounted () {
    this.addTuteur() // ajoute un premier tuteurs
    this.initTypeTuteur() // init le type de tuteur
  }
}
</script>

<style scoped>

</style>
