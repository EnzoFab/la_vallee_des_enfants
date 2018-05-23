<template>
  <v-container grid-list-xl>
    <v-alert v-model="erreur" type="error" dismissible>
      {{erreurMessage}}
    </v-alert>
    <v-snackbar
      v-model="snackbar"
      absolute
      top
      right
      :color="snackBarColor"
    >
      <span>{{snackbarMessage}}</span>
      <v-icon dark>check_circle</v-icon>
      <v-btn dark flat fab @click.native="snackbar = false">
        <v-icon small dark>fa-times</v-icon>
      </v-btn>
    </v-snackbar>
    <v-flex>
      <h1 class="blue--text">Assistante maternelle</h1>
    </v-flex>
    <v-layout row wrap align-center>
      <v-flex md6 lg6 xl6 sm12 xs12>
        <v-flex md12 lg12 xl12 sm12 xs12>
          <v-card>
            <v-card-title pt-2 offset-md1 class="text-sm-left">
              <h2>{{ prenomAssMat + ' ' + nomUsageAssMat }}</h2>
            </v-card-title>
            <v-card-text>
              <v-flex >
                <v-layout mt-1>
                  <h4 class="orange--text text--darken-1 mr-1"><v-icon class="orange--text text--darken-1">account_circle</v-icon> Nom de naissance : </h4><span>{{ nomNaissanceAssMat }}</span>
                </v-layout>
                <v-layout pb-2 mt-1>
                  <h4 class="orange--text text--darken-1 mr-1"><v-icon class="orange--text text--darken-1">cake</v-icon> Date de naissance :</h4><span>{{ dateNaissanceAssMat }}</span>
                </v-layout>
                <v-layout pb-2 mt-1>
                  <h4 class="orange--text text--darken-1 mr-1"><v-icon class="orange--text text--darken-1">domain</v-icon> Ville de naissance :</h4><span>{{ villeNaissanceAssMat }}</span>
                </v-layout>
                <v-layout pb-2 mt-1>
                  <h4 class="orange--text text--darken-1 mr-1"><v-icon class="orange--text text--darken-1">phone</v-icon> Téléphone :</h4><span>{{ telephoneAssMat }}</span>
                </v-layout>
                <v-layout pb-2 mt-1>
                  <h4 class="orange--text text--darken-1 mr-1"><v-icon class="orange--text text--darken-1">perm_identity</v-icon> Numéro SS :</h4><span>{{ numeroSS }}</span>
                </v-layout>
                <v-layout pb-2 mt-1>
                  <h4 class="orange--text text--darken-1 mr-1"><v-icon class="orange--text text--darken-1">event</v-icon> Date agrément :</h4><span>{{ dateAgrement }}</span>
                </v-layout>
                <v-layout pb-2 mt-1>
                  <h4 class="orange--text text--darken-1 mr-1"><v-icon class="orange--text text--darken-1">receipt</v-icon> Référence agrément :</h4><span>{{ referenceAgrement }}</span>
                </v-layout>
                <v-layout pb-2 mt-1>
                  <h4 class="orange--text text--darken-1 mr-1"><v-icon class="orange--text text--darken-1">assessment</v-icon> Assurance responsabilité civile :</h4><span>{{ assurance }}</span>
                </v-layout>
                <v-layout pb-2 mt-1>
                  <h4 class="orange--text text--darken-1 mr-1"><v-icon class="orange--text text--darken-1">label_outline</v-icon> Numéro de police :</h4><span>{{ numeroPolice }}</span>
                </v-layout>
                <v-layout pb-2 mt-1>
                  <h4 class="orange--text text--darken-1 mr-1"><v-icon class="orange--text text--darken-1">date_range</v-icon> Nombre de semaines de congés :</h4><span>{{ nombreSemaineConges }}</span>
                </v-layout>
              </v-flex>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-flex>
      <v-flex xs12 md6 v-if="modifierMotDePasse">
          <v-card>
            <v-flex>
              <v-toolbar color="teal" dark>
                <v-spacer></v-spacer>
                <v-toolbar-title>Réinitialiser le mot de passe</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
            </v-flex>
            <v-flex>
              <v-form v-model="estValide" ref="form">
                <v-flex md10 offset-md1>
                  <v-text-field
                    v-model="ancienpwd"
                    :append-icon="e1 ? 'visibility' : 'visibility_off'"
                    :append-icon-cb="() => (e1 = !e1)"
                    :type="e1 ? 'password' : 'text'"
                    :rules="pwdRules"
                    label="Ancien mot de passe"
                    hint="Au moins 8 caractères"
                    min="8"
                    counter>
                  </v-text-field>
                </v-flex>
                <v-flex md10 offset-md1>
                  <v-text-field
                    v-model="nouveaupwd"
                    :append-icon="e2 ? 'visibility' : 'visibility_off'"
                    :append-icon-cb="() => (e2 = !e2)"
                    :type="e2 ? 'password' : 'text'"
                    :rules="pwdRules"
                    label="Nouveau mot de passe"
                    hint="Au moins 8 caractères"
                    min="8"
                    counter>
                  </v-text-field>
                </v-flex>
                <v-flex md10 offset-md1>
                  <v-text-field
                    v-model="reecrirepwd"
                    :append-icon="e3 ? 'visibility' : 'visibility_off'"
                    :append-icon-cb="() => (e3 = !e3)"
                    :type="e3 ? 'password' : 'text'"
                    :rules="pwdRules"
                    label="Entrer de nouveau le mot de passe"
                    hint="Au moins 8 caractères"
                    min="8"
                    counter>
                  </v-text-field>
                </v-flex>
              </v-form>
            </v-flex>
            <v-btn
              color="teal"
              depressed large round
              :dark="estValide"
              @click="envoyer"
              :disabled="!estValide"
              :loading="loadingButton"
              ripple
            >
              Réinitialiser
              <span slot="loader" class="custom-loader"><v-icon light>cached</v-icon></span>
            </v-btn>
          </v-card>
        </v-flex>
      <v-flex md12 lg12 x112 sm12 xs12>
        <v-btn
          color="teal" dark
          @click.native="modifierMotDePasse = !modifierMotDePasse"
        >Modifier le mot de passe</v-btn>
      </v-flex>
      </v-layout>
  </v-container>

</template>

<script>
import AssistanteService from '../../services/AssistanteService'
import moment from 'moment'
import 'moment/locale/fr'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import ModificationMdpService from '../../services/ModificationMdpService'
moment.locale('fr')

export default {
  name: 'InfosAssMat',
  mixins: [validationMixin],
  validations: {
    ancienpwd: { required },
    nouveaupwd: { required },
    reecrirepwd: { required }
  },
  data () {
    return {
      numAssMat: this.$store.state.assMat.id_assmat,
      prenomAssMat: '',
      nomUsageAssMat: '',
      nomNaissanceAssMat: '',
      dateNaissanceAssMat: '',
      villeNaissanceAssMat: '',
      telephoneAssMat: '',
      numeroSS: '',
      dateAgrement: '',
      referenceAgrement: '',
      assurance: '',
      numeroPolice: '',
      nombreSemaineConges: '',
      ancienpwd: '',
      nouveaupwd: '',
      reecrirepwd: '',
      estValide: false,
      e1: true,
      e2: true,
      e3: true,
      pwdRules: [
        v => !!v || 'Veuillez remplir le mot de passe'
      ],
      erreur: false,
      erreurMessage: '',
      snackbar: false,
      snackbarMessage: '',
      snackBarColor: '',
      loadingButton: false,
      modifierMotDePasse: false
    }
  },
  mounted () {
    this.initDonnees()
  },
  methods: {
    async initDonnees () {
      try {
        const response = await AssistanteService.findOne(this.numAssMat)
        this.prenomAssMat = response.data.assmat.prenom_am
        this.nomUsageAssMat = response.data.assmat.nom_usage_am
        this.nomNaissanceAssMat = response.data.assmat.nom_naissance_am
        this.dateNaissanceAssMat = moment(response.data.assmat.date_naissance_am).format('LL')
        this.villeNaissanceAssMat = response.data.assmat.ville_naissance_am
        this.telephoneAssMat = response.data.assmat.tel_am
        this.numeroSS = response.data.assmat.numero_ss
        this.dateAgrement = moment(response.data.assmat.date_agrement).format('LL')
        this.referenceAgrement = response.data.assmat.reference_agrement
        this.assurance = response.data.assmat.assurance_resp_civile
        this.numeroPolice = response.data.assmat.num_police
        this.nombreSemaineConges = response.data.assmat.nb_semaines_conges
      } catch (e) {
        console.log('erreur')
        console.log(e)
        this.triggerErreur('Une erreur est survenue')
      }
    },
    async envoyer () {
      this.loadingButton = true
      const data = {id_am: this.$store.state.assMat.id_assmat, ancienpwd: this.ancienpwd, nouveaupwd: this.nouveaupwd, reecrirepwd: this.reecrirepwd}
      try {
        if (this.nouveaupwd === this.reecrirepwd) {
          let r = await ModificationMdpService.modifMdp(data)
          if (r.data.erreur == null) {
            this.triggerSnackBar('mot de passe mis à jour', 'success')
          } else {
            this.triggerErreur(r.data.erreur.texte)
          }
        } else {
          this.triggerErreur('Les mots de passes sont différents')
        }
      } catch (error) {
        this.triggerErreur('Une erreur est survenue')
        console.log(error)
      }
      this.loadingButton = false
      this.$refs.form.reset()
    },
    triggerErreur (erreur) {
      this.erreurMessage = erreur
      this.erreur = true
    },
    triggerSnackBar (message, color) {
      this.snackbar = true
      this.snackbarMessage = message
      this.snackBarColor = color
    }
  }
}
</script>

<style scoped>

</style>
