<template>
  <v-flex xs12 class="my-1">
    <v-toolbar class="light-blue lighten-4">
      <v-spacer></v-spacer>
      <v-toolbar-title>Tuteurs légaux</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <span small  class="red--text">
      <v-icon>warning</v-icon>
      <i >Attention remplissez bien cette section il ne sera pas possible de revenir en arrière</i>
    </span>
    <div v-if="btnVisible">
      <v-btn icon large dark color="indigo"
             @click="addTuteur">
        <v-icon dark>add</v-icon>
      </v-btn>
      <span>Ajouter un tuteur</span>
    </div>
    <v-form v-model="estValide" ref="form" class="pa-3">
      <v-container grid-list-xl>
        <v-layout row wrap>
          <v-flex md6 lg6 xl6 sm12 xs12 v-for="(tuteur,i) in tuteurs" :key="i">
            <v-card class="elevation-1">
              <v-toolbar dark color="blue lighten-3">
                <v-spacer></v-spacer>
                <h2 v-if="tuteur.typeDeTuteur != null">{{tuteur.typeDeTuteur.libelle}}</h2>
                <v-spacer></v-spacer>

                <v-btn icon dark large color="transparent"
                       @click="remove(tuteur)"
                       v-if="!btnVisible">
                  <v-icon dark>remove</v-icon>
                </v-btn>
              </v-toolbar>

              <v-container fluid class="px-3" >
                <v-checkbox
                  label="Choisir un tuteur existant"
                  v-model="tuteur.tuteurExistant">
                </v-checkbox>
                <v-slide-y-transition>
                  <v-layout row wrap v-if="!tuteur.tuteurExistant">
                    <v-flex md12 xs12>
                      <v-select
                        :items="typeTuteurs"
                        v-model="tuteur.typeDeTuteur"
                        label="Type de tuteur"
                        single-line
                        item-text="libelle"
                        auto
                        :rules="regleTypeTuteur"
                        required
                      ></v-select>
                    </v-flex>

                    <v-flex md6 xs6 sm12 xs12>
                      <v-text-field
                        label="Nom"
                        :rules="regleNom"
                        :counter="15"
                        v-model="tuteur.nomUsage"
                      ></v-text-field>
                    </v-flex>

                    <v-flex md6 lg6 xl6 sm12 xs12>
                      <v-text-field
                        label="Prénom"
                        :rules="reglePrenom"
                        :counter="15"
                        v-model="tuteur.prenom"
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs12>
                      <v-text-field
                        label="Profession"
                        :counter="20"
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
                      ></v-text-field>
                    </v-flex>
                    <v-flex md12 lg12 x112 sm12 xs12>
                      <v-checkbox v-if="!existeAutredemandeur(tuteur)"
                                  label="Ce tuteur est aussi le demandeur"
                                  v-model="tuteur.estDemandeur"
                      ></v-checkbox>
                    </v-flex>
                    <v-flex md6 lg6 xl6 sm12 xs12 v-if="tuteur.estDemandeur">
                      <v-text-field
                        label="Rue"
                        :rules="regleRue"
                        v-model="rue"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6 lg6 xl6 sm12 xs12 v-if="tuteur.estDemandeur">
                      <v-text-field
                        label="Ville"
                        :rules="regleVille"
                        v-model="ville"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6 lg6 xl6 sm12 xs12 v-if="tuteur.estDemandeur">
                      <v-text-field
                        required
                        :rules="regleCodePostal"
                        v-model="codePostal"
                        label="Code postal"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6 lg6 xl6 sm12 xs12 v-if="tuteur.estDemandeur">
                      <v-text-field
                        required
                        :rules="regleEmail"
                        v-model="email"
                        label="Mail"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6 lg6 xl6 sm12 xs12 v-if="tuteur.estDemandeur">
                      <v-text-field
                        required
                        :counter="15"
                        :rules="regleNom"
                        v-model="nomDeNaissance"
                        label="Nom de naissance"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 v-if="tuteur.estDemandeur">
                      <h3>Nombre de semaine(s) de congé supplémentaire(s): {{nombreSemaine}}</h3>
                      <v-slider v-model="nombreSemaine"
                                min="0" max="10"
                                thumb-label step="1" ticks
                                required
                                v-if="inputSemaineDisable"></v-slider>
                    </v-flex>
                    <v-flex xs12 v-if="tuteur.estDemandeur">
                      <a @click="toogleChange">
                        {{toogleText}}
                        <v-icon>arrow_drop_down</v-icon>
                      </a>
                      <v-text-field
                        label="Nombre de semaines supplementaire de congé"
                        color="blue"
                        type="number"
                        required
                        v-model="nombreSemaine"
                        :rules="regleSemaine"
                        v-if="!inputSemaineDisable"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-slide-y-transition>
                <v-slide-y-transition>
                  <v-layout v-if="tuteur.tuteurExistant">
                    <v-select
                      :items="allExistingTuteurs"
                      label="Choisissez un tuteur dans la liste"
                      :rules="regleListeTuteurs"
                      v-model="tuteur.informationTuteurExistant"
                      item-text="nom_complet"
                      append-icon="search"
                      autocomplete
                      required
                    >
                      <template slot="item" slot-scope="data">
                        <template v-if="typeof data.item !== 'object'">
                          <v-list-tile-content v-text="data.item"></v-list-tile-content>
                        </template>
                        <template v-else>
                          <v-list-tile-avatar color="blue">
                            <span class="white--text headline">{{getInitiale(data.item)}}</span>
                          </v-list-tile-avatar>
                          <v-list-tile-content>
                            <v-list-tile-title v-html="data.item.prenom_tuteur + ' ' + data.item.nom_tuteur"></v-list-tile-title>
                            <v-list-tile-sub-title v-html="data.item.prenom_enfant + ' ' + data.item.nom_enfant"></v-list-tile-sub-title>
                          </v-list-tile-content>
                        </template>
                      </template>
                    </v-select>
                  </v-layout>
                </v-slide-y-transition>

              </v-container>
            </v-card>
          </v-flex>
          <v-flex md12 lg12 xl12 sm12 xs12>
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
import TuteurService from '../../../services/TuteurService'
export default {
  name: 'TuteursLegaux',
  data () {
    return {
      tuteurs: [],
      typeTuteurs: [],
      allExistingTuteurs: [],
      estValide: false,
      inputSemaineDisable: true,
      rue: '',
      codePostal: '',
      ville: '',
      nomDeNaissance: '',
      email: '',
      nombreSemaine: 0,
      toogleText: 'Plus de semaines', // texte affiché sur le lien
      regleTypeTuteur: [
        v => !!v || 'Veuillez renseigner le type de tuteur'
      ],
      regleListeTuteurs: [
        v => !!v || 'Veuillez choisir un tuteurs dans la liste'
      ],
      regleNom: [
        v => !!v || 'Veuillez renseigner le nom du tuteur',
        v => v.length <= 15 || 'Max 15 lettres'
      ],
      reglePrenom: [
        v => !!v || 'Veuillez renseigner le prenom de tuteur',
        v => v.length <= 15 || 'Max 15 lettres'
      ],
      regleEmail: [
        v => !!v || 'Veuillez saisir l\'email',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'L\'email n\'est pas valide '
      ],
      regleProfession: [
        v => !!v || 'Veuillez renseigner la profession du tuteur',
        v => v.length <= 20 || 'Max 20 lettres'
      ],
      regleTel: [
        v => !!v || 'Veuillez renseigner le numéro de telephone du tuteur',
        v => /^(0|\+33)[1-9]([-. ]?[0-9]{2}){4}$/.test(v) || 'le numero de téléphone n\'est pas valide'
      ],
      regleRue: [
        v => !!v || 'Veuillez préciser la rue'
      ],
      regleCodePostal: [
        v => !!v || 'Veuillez renseigner le code postal',
        v => /^(([0-8][0-9])|(9[0-5]))[0-9]{3}$/.test(v) || 'code postal non valide'
      ],
      regleVille: [
        v => !!v || 'Veuillez préciser la ville'
      ],
      regleSemaine: [
        v => /^\d+(\d+)?([Ee][+]?\d+)?$/.test(v) || 'Entrez un nombre entier'
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
    async initTuteurExistant () {
      try {
        let response = await TuteurService.getListTuteurEnfant()
        this.allExistingTuteurs = response.data.resultats
        console.log(this.allExistingTuteurs)
      } catch (e) {
        console.log(e.toString())
      }
    },
    addTuteur () {
      if (this.tuteurs.length < 2) { // ajoute un tuteur à la listes
        this.tuteurs.push({
          typeDeTuteur: null,
          nomUsage: '',
          prenom: '',
          profession: '',
          telephone: '',
          telephonePro: '',
          estDemandeur: false,
          tuteurExistant: false,
          informationTuteurExistant: null,
          infoDemandeur: null
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
    async submit () {
      // envoyer
      var vm = this
      let data = {tuteurs: [], asEmployeur: false}
      this.tuteurs.forEach(function (tuteur) {
        if (!tuteur.tuteurExistant) {
          if (tuteur.estDemandeur) {
            data.asEmployeur = true
            console.log('Has employeur', data.asEmployeur)
            tuteur.infoDemandeur = {
              rue: vm.rue,
              codePostal: vm.codePostal,
              email: vm.email,
              ville: vm.ville,
              nombreSemainesSupplementaires: vm.nombreSemaine,
              nomNaissance: vm.nomDeNaissance
            }

            console.log(tuteur)
          }
          tuteur.typeDeTuteur = tuteur.typeDeTuteur.id // on recupere l'id du type tuteur pour la base de données
        }
        data.tuteurs.push(tuteur)
      })
      /* for (var tuteur in this.tuteurs) {
        console.log(tuteur)
        if (tuteur.estDemandeur) {
          console.log(tuteur)
          data.asEmployeur = true
          tuteur.infoDemandeur = {
            rue: this.rue,
            codePostal: this.codePostal,
            email: this.email,
            ville: this.ville,
            nombreSemainesSupplementaires: this.nombreSemainesSupplementaires,
            nomNaissance: this.nomNaissance
          }
        }
        data.tuteurs.push(tuteur)
      } */
      this.$emit('submit', data)
    },
    back () {
      this.$emit('back')
    },
    toogleChange () { // rend disponible soit l'input soit le slider
      this.inputSemaineDisable = !this.inputSemaineDisable
      this.nombreSemaine = 0
      if (this.inputSemaineDisable) {
        this.toogleText = 'Plus de semaines'
        // this.toogleIcone = 'arrow_drop_down'
      } else {
        // this.toogleIcone = 'arrow_drop_up'
        this.toogleText = 'Repasser à la barre de selections'
        console.log('tougle')
      }
    },
    computedNbSemaine (val) {
      this.nombreSemaine = val
      console.log(this.nombreSemaine)
      if (this.nombreSemaine == null) {
        return 0
      } else {
        return this.nombreSemaine
      }
    },
    getInitiale (item) {
      var initiale = ''
      initiale += item.prenom_tuteur.charAt(0)
      initiale += item.nom_tuteur.charAt(0)
      return initiale.toUpperCase()
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
    this.initTuteurExistant() // charge tous les tuteurs dans le select
  }
}
</script>

<style scoped>

</style>
