<template>
  <v-flex  xs12 class="my-1">
    <v-toolbar color="red lighten-2" light>
      <v-spacer></v-spacer>
      <v-toolbar-title>Information Employeur</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <!-- <span small  class="red--text">
      <v-icon>warning</v-icon>
      <i >Attention remplissez bien cette section il ne sera pas possible de revenir en arrière</i>
    </span> -->

    <v-form v-model="estValide" ref="form" class="pa-3">
      <v-checkbox
        label="Choisir un employeur existant"
        v-model="employeurExiste">
      </v-checkbox>
      <v-slide-y-transition>
        <v-container v-if="employeurExiste">
          <v-layout>
            <v-select
              :items="allExistingEmployeur"
              label="Choisissez un employeur dans la liste "
              :rules="regleListeEmployeur"
              v-model="employeurExistant"
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
                <v-list-tile-avatar color="red">
                  <span class="white--text headline">{{getInitiale(data.item)}}</span>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title
                    v-html="data.item.prenom_employeur + ' ' + data.item.nom_usage_employeur + ' ' + data.item.nom_naissance_employeur">
                  </v-list-tile-title>
                  <v-list-tile-sub-title v-html="data.item.prenom_enfant + ' ' + data.item.nom_enfant">
                  </v-list-tile-sub-title>
                </v-list-tile-content>
              </template>
            </template>
            </v-select>
          </v-layout>
        </v-container>
      </v-slide-y-transition>

      <v-slide-y-transition>
        <v-container v-if="!employeurExiste" fluid grid-list-md>
          <v-layout row wrap>
            <v-flex md4 d-flex l4 xl4 sm12 xs12>
              <v-card>
                <v-flex offset-md1 md10>
                  <v-text-field
                    label="Nom de naissance"
                    v-model="nomNaissance"
                    :rules="regleNom"
                    prepend-icon="account_box"
                    color="red lighten-3"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex offset-md1 md10>
                  <v-text-field
                    label="Nom d'usage"
                    v-model="nomUsage"
                    :rules="regleNom"
                    prepend-icon="account_circle"
                    color="red lighten-3"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex offset-md1 md10>
                  <v-text-field
                    label="Prénom"
                    v-model="prenom"
                    :rules="reglePrenom"
                    prepend-icon="person_outline"
                    color="red lighten-3"
                    required
                  ></v-text-field>
                </v-flex>
              </v-card>
            </v-flex>
            <v-flex md4 d-flex l4 xl4 sm12 xs12>
              <v-card>
                <v-flex offset-md1 md10>
                  <v-text-field
                    label="Rue"
                    v-model="rue"
                    :rules="regleRue"
                    prepend-icon="home"
                    color="red lighten-3"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex offset-md1 md10>
                  <v-text-field
                    label="Code postal"
                    v-model="codePostal"
                    :rules="regleCodeP"
                    prepend-icon="mail_outline"
                    color="red lighten-3"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex offset-md1 md10>
                  <v-text-field
                    label="Ville"
                    v-model="ville"
                    :rules="regleVille"
                    prepend-icon="location_city"
                    color="red lighten-3"
                    required
                  ></v-text-field>
                </v-flex>
              </v-card>
            </v-flex>
            <v-flex md4 d-flex l4 xl4 sm12 xs12>
              <v-card>
                <v-flex offset-md1 md10>
                  <v-text-field
                    label="E-mail"
                    v-model="email"
                    :rules="regleMail"
                    prepend-icon="mail"
                    color="red lighten-3"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex offset-md1 md10>
                  <v-text-field
                    label="Téléphone Professionnel"
                    v-model="telephonePro"
                    :rules="regleTelOpt"
                    prepend-icon="contact_phone"
                    color="red lighten-3"
                  ></v-text-field>
                </v-flex>
                <v-flex offset-md1 md10>
                  <v-text-field
                    label="semaines de congés supplémentaires"
                    v-model="congesSupp"
                    :rules="regleConges"
                    prepend-icon="date_range"
                    color="red lighten-3"
                  ></v-text-field>
                </v-flex>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-slide-y-transition>

    </v-form>
    <v-flex mt-3 xs12>
      <v-btn
        class="red lighten-2"
        depressed large round
        @click="back"
      >Précédent</v-btn>
      <v-btn
        depressed large round
        class="red lighten-2"
        :dark="estValide"
        @click="envoyer"
        :disabled="!estValide"
      >Suivant</v-btn>
    </v-flex>
  </v-flex>
</template>

<script>
import EmployeurService from '../../../services/EmployeurService'

export default {
  name: 'EmployeurOptionnel',
  data () {
    return {
      allExistingEmployeur: [],
      employeurExistant: null,
      nomNaissance: null,
      nomUsage: null,
      prenom: null,
      rue: null,
      codePostal: null,
      ville: null,
      email: null,
      telephonePro: null,
      employeurExiste: false,
      congesSupp: 0,
      estValide: false,
      reglePrenom: [
        v => !!v || 'Veuillez saisir le prénom'
      ],
      regleNom: [
        v => !!v || 'Veuillez saisir le nom'
      ],
      regleRue: [
        v => !!v || 'Veuillez saisir l\'adresse'
      ],
      regleCodeP: [
        v => !!v || 'Veuillez saisir le code postal',
        v => /^[1-9]([0-9]{4})$/.test(v) || 'Le code postal n\'est pas valide'
      ],
      regleVille: [
        v => !!v || 'Veuillez saisir la ville'
      ],
      regleMail: [
        v => !!v || 'Veuillez saisir l\'email',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'L\'email n\'est pas valide '
      ],
      regleTel: [
        v => !!v || 'Veuillez saisir un téléphone',
        v => /^0[1-9]([0-9]{8})$/.test(v) || 'Le numéro n\'est pas valide'
      ],
      regleTelOpt: [
        v => /^0[1-9]([0-9]{8})$/.test(v) || 'Le numéro n\'est pas valide'
      ],
      regleConges: [
        v => !!v || 'Veuillez saisir le nombre de semaines',
        v => /^[0-9]([0-9]?)$/.test(v) || 'Le nombre de semaines n\'est pas valide'
      ],
      regleListeEmployeur: [
        v => !!v || 'Veuillez choisir un tuteurs dans la liste'
      ]
    }
  },
  methods: {
    envoyer () {
      let data = {
        employeur: {
          nomNaissance: this.nomNaissance,
          nomUsage: this.nomUsage,
          prenom: this.prenom,
          rue: this.rue,
          codePostal: this.codePostal,
          ville: this.ville,
          email: this.email,
          telephone1: this.telephonePro,
          employeurExistant: this.employeurExistant
        },
        congesSupp: this.congesSupp
      }
      console.log('Employeur', this.employeurExistant)
      console.log('DATA', data)
      this.$emit('submit', data)
    },
    back () {
      this.$emit('back')
    },
    async loadEmployeurEnfant () {
      try {
        let reponse = await EmployeurService.getListTuteurEnfant()
        if (reponse.data.erreur == null) {
          this.allExistingEmployeur = reponse.data.resultats
        } else {
          console.log(reponse.data.erreur)
        }
      } catch (e) {
        console.log(e.toString())
      }
    },
    getInitiale (item) {
      var initiale = ''
      initiale += item.prenom_employeur.charAt(0)
      initiale += item.nom_usage_employeur.charAt(0)
      return initiale.toUpperCase() // console
    }
  },
  watch: {
    employeurExiste (val) {
      if (!this.employeurExiste) {
        this.employeurExistant = null
        // si jamais l'employeur n'existe pas on met à null l'employeur
      }
    }
  },
  mounted () {
    this.loadEmployeurEnfant()
  }
}
</script>

<style scoped>

</style>
