<template>
  <v-layout row wrap>
    <v-flex  xs12 md6 offset-md3 class="my-5">
      <v-card>
        <v-toolbar color="pink lighten-1" dark>
          <v-spacer></v-spacer>
          <v-toolbar-title>Inscription assistante maternelle</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form v-model="estValide" ref="form">
            <v-text-field
              label="Nom de naissance"
              color="light-blue darken-4"
              v-model.trim="nomNaissance"
              :rules="nomNaissanceRules"
              required
              prepend-icon="assignment_ind"
            ></v-text-field>
            <v-text-field
              label="Nom d'usage"
              color="light-blue darken-4"
              v-model.trim="nomUsage"
              :rules="nomUsageRules"
              required
              prepend-icon="assignment_ind"
            ></v-text-field>
            <v-text-field
              label="Prénom"
              color="light-blue darken-4"
              v-model.trim="prenom"
              :rules="prenomRules"
              required
              prepend-icon="assignment_ind"
            ></v-text-field>
            <v-text-field
              label="Téléphone"
              color="light-blue darken-4"
              v-model.trim="tel"
              :rules="telRules"
              required
              prepend-icon="assignment_ind"
            ></v-text-field>
            <v-text-field
              label="Nombre de semaines de congés"
              color="light-blue darken-4"
              v-model.trim="nbConges"
              :rules="nbCongesRules"
              required
              prepend-icon="assignment_ind"
            ></v-text-field>
            <v-menu
              ref="dateNaissMenu"
              lazy
              :close-on-content-click="false"
              v-model="dateNaissMenu"
              transition="scale-transition"
              offset-y
              full-width
              :nudge-right="40"
              min-width="290px"
            >
              <v-text-field
                slot="activator"
                color="blue"
                label="Date de naissance"
                v-model="dateNaissFr"
                prepend-icon="event"
                required
                :rules="dateNaissRules"
                readonly
              ></v-text-field>
              <v-date-picker
                locale="fr_FR"
                v-model="dateNaiss"
                no-title
                scrollable
              >
                <v-spacer></v-spacer>
              </v-date-picker>
            </v-menu>
            <v-text-field
              label="Ville de naissance"
              color="light-blue darken-4"
              v-model.trim="villeNaiss"
              :rules="villeNaissRules"
              required
              prepend-icon="assignment_ind"
            ></v-text-field>
            <v-text-field
              label="Numéro de sécurité sociale"
              color="light-blue darken-4"
              v-model.trim="numSS"
              :rules="numSSRules"
              required
              prepend-icon="assignment_ind"
            ></v-text-field>
            <v-menu
              ref="dateAgrMenu"
              lazy
              :close-on-content-click="false"
              v-model="dateAgrMenu"
              transition="scale-transition"
              offset-y
              full-width
              :nudge-right="40"
              min-width="290px"
            >
              <v-text-field
                slot="activator"
                color="blue"
                label="Date d'agrément"
                v-model="dateAgrFr"
                prepend-icon="event"
                required
                :rules="dateAgrRules"
                readonly
              ></v-text-field>
              <v-date-picker
                locale="fr_FR"
                v-model="dateAgr"
                no-title
                scrollable
              >
                <v-spacer></v-spacer>
              </v-date-picker>
            </v-menu>
            <v-text-field
              label="Référence d'agrément"
              color="light-blue darken-4"
              v-model.trim="refAgr"
              :rules="refAgrRules"
              required
              prepend-icon="assignment_ind"
            ></v-text-field>
            <v-text-field
              label="Assurance responsabilité civile"
              color="light-blue darken-4"
              v-model.trim="assResp"
              :rules="assRespRules"
              required
              prepend-icon="assignment_ind"
            ></v-text-field>
            <v-text-field
              label="Numéro de police"
              color="light-blue darken-4"
              v-model.trim="numPolice"
              :rules="numPoliceRules"
              required
              prepend-icon="assignment_ind"
            ></v-text-field>
            <v-text-field
              label="Login"
              color="light-blue darken-4"
              v-model.trim="login"
              :rules="loginRules"
              required
              prepend-icon="assignment_ind"
            ></v-text-field>
            <v-text-field
              name="input-10-2"
              label="Mot de passe"
              :append-icon="visible ? 'visibility_off' : 'visibility'"
              :append-icon-cb="() => (visible = !visible)"
              v-model="mdp"
              :type="visible ? 'text' : 'password'"
              :rules="pwdRules"
              required
              prepend-icon="vpn_key"
            ></v-text-field>
          </v-form>
            <br>
          <div class="danger-alert" v-html="error" />
            <br>
            <v-btn
              color="pink lighten-2"
              depressed large round
              :dark="estValide"
              @click="inscription"
              :disabled="!estValide"
            >
              Inscription
            </v-btn>

        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import AuthentificationService from '../../services/AuthentificationService'
let mois = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre']

export default {
  mixins: [validationMixin],
  validations: {
    nomNaissance: { required },
    nomUsage: { required },
    prenom: { required },
    tel: { required },
    nbConges: { required },
    dateNaiss: { required },
    villeNaiss: { required },
    numSS: { required },
    dateAgr: { required },
    refAgr: { required },
    assResp: { required },
    numPolice: { required },
    login: { required },
    mdp: { required }

  },
  data: () => ({
    dateNaissMenu: false,
    dateAgrMenu: false,
    nomNaissance: '',
    nomUsage: '',
    prenom: '',
    tel: '',
    nbConges: '',
    dateNaiss: null,
    villeNaiss: '',
    numSS: '',
    dateAgr: null,
    refAgr: '',
    assResp: '',
    numPolice: '',
    login: '',
    mdp: '',
    error: '',
    visible: false,
    nomNaissanceRules: [
      v => !!v || 'Veuillez remplir le nom de naissance'
    ],
    nomUsageRules: [
      v => !!v || "Veuillez remplir le nom d'usage"
    ],
    prenomRules: [
      v => !!v || 'Veuillez remplir le prénom'
    ],
    telRules: [
      v => !!v || 'Veuillez remplir le numéro de téléphone'
    ],
    nbCongesRules: [
      v => !!v || 'Veuillez remplir les nombres de semaines de congés'
    ],
    dateNaissRules: [
      v => !!v || 'Veuillez choisir une date de naissance'
    ],
    villeNaissRules: [
      v => !!v || 'Veuillez remplir une ville de naissance'
    ],
    numSSRules: [
      v => !!v || 'Veuillez remplir le numéro de sécurité sociale'
    ],
    dateAgrRules: [
      v => !!v || "Veuillez choisir une date d'agrément"
    ],
    refAgrRules: [
      v => !!v || "Veuillez remplir la référence d'agrément"
    ],
    assRespRules: [
      v => !!v || "Veuillez remplir l'assurance responsabilité civile"
    ],
    numPoliceRules: [
      v => !!v || 'Veuillez remplir le numéro de police'
    ],
    loginRules: [
      v => !!v || 'Veuillez remplir le login'
    ],
    pwdRules: [
      v => !!v || 'Veuillez remplir le mot de passe'
    ],

    estValide: false
  }),
  computed: {
    dateNaissFr () { // transforme la date qui est en format anglaise en format francaise
      var dateString = null
      if (this.dateNaiss != null) {
        var d = new Date(this.dateNaiss)
        let day = d.getDate()
        let month = mois[d.getMonth()]
        let year = d.getFullYear()
        dateString = day + ' ' + month + ' ' + year
      }
      return dateString
    },
    dateAgrFr () { // transforme la date qui est en format anglaise en format francaise
      var dateString = null
      if (this.dateAgr != null) {
        var d = new Date(this.dateAgr)
        let day = d.getDate()
        let month = mois[d.getMonth()]
        let year = d.getFullYear()
        dateString = day + ' ' + month + ' ' + year
      }
      return dateString
    }
  },
  methods: {
    async inscription () {
      const data = {assMat: {nomNaissance: this.nomNaissance, nomUsage: this.nomUsage, prenom: this.prenom, tel: this.tel, nbConges: this.nbConges, dateNaiss: this.dateNaiss, villeNaiss: this.villeNaiss, numSS: this.numSS, dateAgr: this.dateAgr, refAgr: this.refAgr, assResp: this.assResp, numPolice: this.numPolice, login: this.login, mdp: this.mdp}}
      try {
        await AuthentificationService.registerAssMat(data)
        this.$router.push({
          name: 'Accueil'
        })
      } catch (error) {
        console.log(error)
        this.error = error.response.data.error
      }
    },
    clearForm () {
      this.$refs.form.reset()
    }
  }
}
</script>
<style scoped>
</style>
