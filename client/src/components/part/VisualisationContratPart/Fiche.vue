<template>
  <v-container grid-list-xl>
    <v-alert v-model="erreur" type="error" dismissible>
      {{erreurMessage}}
    </v-alert>
    <v-layout row wrap>
      <v-flex md6 lg6 xl6 sm12 xs12>
        <v-flex md12 lg12 xl12 sm12 xs12> <!-- Enfant -->
          <v-flex md12 lg12 xl12 sm12 xs12 >
            <h1 class="blue--text">Enfant</h1>
          </v-flex>
          <v-card class="text-md-left">
            <v-card-title>
              <h2> {{ prenomEnfant + ' ' + nomEnfant }} </h2>
            </v-card-title>
            <v-card-text pt-1>
              <v-flex pl-3 class="text-sm-left">
                <v-layout>
                  <h4 class="orange--text text--darken-1 mr-1">
                    <v-icon class="orange--text text--darken-1">cake</v-icon> Anniversaire :
                  </h4>
                  <span>{{ dateNaissanceEnfant }}</span>
                </v-layout>
                <v-layout>
                  <h4 class="orange--text text--darken-1 mr-1">
                    <v-icon class="orange--text text--darken-1">face</v-icon> Sexe :
                  </h4>
                  <span>{{ sexeEnfant }}</span>
                </v-layout>
              </v-flex>

            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex md12 lg12 xl12 sm12 xs12> <!-- Contrat -->
          <v-flex>
            <h1 class="blue--text">Contrat</h1>
          </v-flex>
          <v-card>
            <v-card-title pt-2 offset-md1 class="text-sm-left">
              <h2>Contrat n° {{ numeroContrat }} </h2>
            </v-card-title>
            <v-card-text >
              <v-flex pl-2 class="text-sm-left">
                <v-layout pb-2 mt-1>
                  <h4 class="orange--text text--darken-1 mr-1">
                    <v-icon class="orange--text text--darken-1">description</v-icon>
                    Type de contrat :
                  </h4>
                  <span> {{ typeContrat }} </span>
                </v-layout>
                <v-layout pb-2 mt-1>
                  <h4 class="orange--text text--darken-1 mr-1">
                    <v-icon class="orange--text text--darken-1">payment</v-icon>
                    Mode de paiement :
                  </h4>
                  <span>{{ modeDePaiementContrat }} </span>
                </v-layout>
                <v-layout pb-2 mt-1>
                  <h4 class="orange--text text--darken-1 mr-1">
                    <v-icon class="orange--text text--darken-1">date_range</v-icon>
                    Période d'adaptation :
                  </h4>
                  <span> du {{ dateDebAdapt }} au {{ dateFinAdapt }}</span>
                </v-layout>
                <v-layout pb-2 mt-1>
                  <h4 class="orange--text text--darken-1 mr-1">
                    <v-icon class="orange--text text--darken-1">event</v-icon>
                    Date de début du contrat :
                  </h4>
                  <span> {{ dateDebutContrat }} </span>
                </v-layout>

                <v-layout pb-2 mt-1>
                  <h4 class="orange--text text--darken-1 mr-1">
                    <v-icon class="orange--text text--darken-1">event</v-icon>
                    Date de fin du contrat :
                  </h4>
                  <span> {{ dateFinContrat }} </span>
                </v-layout>
                <v-flex offset-md2>
                  <v-btn color="blue--text" :disabled="dateFinExists" @click.stop="dialogBoxCloturer = true" v-if="isAssMatConnected">Clôturer le contrat</v-btn>
                </v-flex>
              </v-flex>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-dialog v-model="dialogBoxCloturer" max-width="500px">
          <v-card>
            <v-flex pt-3 class="indigo--text text-md-center">
              <h2>
                Êtes-vous sûr de vouloir clôturer le contrat ?
              </h2>
            </v-flex>
            <v-flex pl-2>
              <v-layout>
                <v-card-actions>
                  <v-flex offset-md8>
                    <v-btn  color="primary" flat @click="cloturer" @click.stop="dialogBoxCloturer = false">OK</v-btn>
                  </v-flex>
                </v-card-actions>
                <v-card-actions>
                  <v-flex offset-md1>
                    <v-btn  color="primary" flat @click.stop="dialogBoxCloturer=false">Annuler</v-btn>
                  </v-flex>
                </v-card-actions>
              </v-layout>
            </v-flex>
          </v-card>
        </v-dialog>

        <v-flex md12 lg12 xl12 sm12 xs12>
          <v-flex>
            <h1 class="blue--text">Assistante maternelle</h1>
          </v-flex>
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
                  <h4 class="orange--text text--darken-1 mr-1"><v-icon class="orange--text text--darken-1">cake</v-icon> date de naissance :</h4><span>{{ dateNaissanceAssMat }}</span>
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
      <v-flex md6 lg6 xl6 sm12 xs12>
        <v-flex  md12 lg12 xl12 sm12 xs12>
          <v-flex>
            <h1 class="blue--text">Employeur</h1>
          </v-flex>
          <v-card>
            <v-card-title>
              <h2>{{ prenomEmp + ' ' + nomUsageEmp }}</h2>
            </v-card-title>
            <v-card-text>
              <v-flex >
                <v-layout mt-1>
                  <h4 class="orange--text text--darken-1 mr-1"><v-icon class="orange--text text--darken-1">account_circle</v-icon> Nom de naissance : </h4><span>{{ nomNaissanceEmp }}</span>
                </v-layout>
                <v-layout mt-1>
                  <h4 class="orange--text text--darken-1 mr-1"><v-icon class="orange--text text--darken-1">home</v-icon> Adresse : </h4><span>{{ rueEmp + ' ' + codePEmp + ' ' + villeEmp }}</span>
                </v-layout>
                <v-layout mt-1>
                  <h4 class="orange--text text--darken-1 mr-1"><v-icon class="orange--text text--darken-1">phone</v-icon> Téléphone : </h4><span>{{ telephoneEmp }}</span>
                </v-layout>
                <v-layout mt-1>
                  <h4 class="orange--text text--darken-1 mr-1"><v-icon class="orange--text text--darken-1">local_post_office</v-icon> Email : </h4><span>{{ emailEmp }}</span>
                </v-layout>
                <v-layout mt-1>
                  <h4 class="orange--text text--darken-1 mr-1"><v-icon class="orange--text text--darken-1">contacts</v-icon> Identifiant : </h4><span>{{ identifiantEmp }}</span>
                </v-layout>
                <v-layout pb-3 mt-1>
                  <h4 class="orange--text text--darken-1 mr-1"><v-icon class="orange--text text--darken-1">date_range</v-icon> Nombre de semaines de congés supplémentaires :</h4><span>{{ nombreSemSupp }}</span>
                </v-layout>
                <v-layout pb-2 mt-1>
                  <v-flex offset-md3>
                    <v-btn color="blue--text" @click.stop="dialogBox = true" v-if="isAssMatConnected">
                      Modifier
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-dialog v-model="dialogBox" max-width="500px">
          <v-form v-model="estValide" ref="form">
            <v-card>
              <v-card-title>
                <span class="headline">Modification des informations</span>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12>
                      <v-text-field label="Rue" :rules="regleRue" v-model="rueEmp" required></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field label="Code Postal" :rules="regleCodeP" v-model="codePEmp" required></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field label="Ville" :rules="regleVille" v-model="villeEmp" required></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field label="Téléphone" :rules="regleTel" v-model="telephoneEmp" required></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
                <small>*indiquer les champs requis</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="dialogBox = false">Fermer</v-btn>
                <v-btn
                  color="blue darken-1"
                  flat @click="enregistrer"
                  :disabled="!estValide"
                  @click.native="dialogBox = false"
                  :dark="estValide"
                >Enregistrer</v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-dialog>

        <v-flex>
          <v-dialog v-model="dialogBox2" max-width="500px" v-if="parentForDialog != null">
            <v-form v-model="estValide" ref="form1">
              <v-card>
                <v-card-title>
                  <span class="headline">Modification des informations</span>
                </v-card-title>
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12>
                        <v-text-field label="Téléphone" :rules="regleTel" v-model="parentForDialog.telephone" required></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field label="Profession" :rules="regleProfession" v-model="parentForDialog.profession" required></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field label="Téléphone professionnel" :rules="regleTel" v-model="parentForDialog.telephone_pro" required></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                  <small>*indiquer les champs requis</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click.native="dialogBox2 = false">Fermer</v-btn>
                  <v-btn
                    color="blue darken-1"
                    flat @click.prevent="enregistrerParent(parentForDialog)"
                    :disabled="!estValide"
                    @click.native="dialogBox2 = false"
                    :dark="estValide"
                  >Enregistrer</v-btn>
                </v-card-actions>
              </v-card>
            </v-form>
          </v-dialog>
          <v-flex v-for="(parent,i) in parents" pt-2 md10 :key="i">
            <v-flex class="text-md-left">
              <h1 class="blue--text">Parents</h1>
            </v-flex>
            <v-card>
              <v-flex pt-2 offset-md1 class="text-sm-left">
                <h2>{{ parent.prenom_tuteur + ' ' + parent.nom_tuteur }}</h2>
              </v-flex>
              <v-flex pl-5 class="text-md-left">
                <v-layout mt-1>
                  <h4 class="orange--text text--darken-1 mr-1"><v-icon class="orange--text text--darken-1">phone</v-icon> Téléphone : </h4><span>{{ parent.telephone}}</span>
                </v-layout>
                <v-layout mt-1>
                  <h4 class="orange--text text--darken-1 mr-1"><v-icon class="orange--text text--darken-1">work</v-icon> Profession : </h4><span> {{ parent.profession}}</span>
                </v-layout>
                <v-layout pb-3 mt-1>
                  <h4 class="orange--text text--darken-1 mr-1"><v-icon class="orange--text text--darken-1">contact_phone</v-icon> Téléphone professionnel : </h4><span>{{ parent.telephone_pro}}</span>
                </v-layout>
                <v-layout pb-2 mt-1>
                  <v-flex offset-md3>
                    <v-btn color="blue--text" @click.stop="showDialog(parent)" v-if="isAssMatConnected">
                      Modifier
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-divider></v-divider>
            </v-card>
          </v-flex>
          <v-btn
            color="blue--text"
            @click="exportPDF"
            :loading="loadingPdf"
            ripple>
            Exporter le contrat au format PDF
            <span slot="loader" class="custom-loader"><v-icon light>cached</v-icon></span>
          </v-btn>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>

import ContratService from '../../../services/ContratService'
import EmployeurService from '../../../services/EmployeurService'
import TuteurService from '../../../services/TuteurService'
import contratPDF from '../../../helper/contratPDF'
import { validationMixin } from 'vuelidate'
import moment from 'moment'
import 'moment/locale/fr'
moment.locale('fr')
export default {
  mixins: [validationMixin],
  name: 'Fiche',
  data () {
    return {
      estValide: false,
      prenomEnfant: null,
      nomEnfant: null,
      dateNaissanceEnfant: null,
      sexeEnfant: null,
      numeroContrat: this.$route.params.numC,
      typeContrat: null,
      modeDePaiementContrat: null,
      dateDebAdapt: null,
      dateFinAdapt: null,
      dateDebutContrat: null,
      dateFinContrat: null,
      nb_heures_semaine: null,
      tarif: null,
      taux_majore: null,
      jour_paiement: null,
      nomUsageAssMat: null,
      prenomAssMat: null,
      nomNaissanceAssMat: null,
      dateNaissanceAssMat: null,
      villeNaissanceAssMat: null,
      telephoneAssMat: null,
      numeroSS: null,
      dateAgrement: null,
      referenceAgrement: null,
      assurance: null,
      numeroPolice: null,
      nombreSemaineConges: null,
      id_employeur: null,
      nomUsageEmp: null,
      prenomEmp: null,
      nomNaissanceEmp: null,
      rueEmp: null,
      codePEmp: null,
      villeEmp: null,
      telephoneEmp: null,
      emailEmp: null,
      identifiantEmp: null,
      nombreSemSupp: null,
      dialogBox: false,
      dialogBox2: false,
      dialogBoxCloturer: false,
      dateFinExists: false,
      parents: [],
      parentForDialog: null, // parent modifier par le dialog
      regleRue: [
        v => !!v || 'Veuillez saisir la rue'
      ],
      regleCodeP: [
        v => !!v || 'Veuillez saisir le code postal',
        v => /^[1-9]([0-9]{4})$/.test(v) || 'Le code postal n\'est pas valide'
      ],
      regleVille: [
        v => !!v || 'Veuillez saisir la ville'
      ],
      regleTel: [
        v => !!v || 'Veuillez saisir un téléphone',
        v => /^0[1-9]([0-9]{8})$/.test(v) || 'Le numéro n\'est pas valide'
      ],
      regleProfession: [
        v => !!v || 'Veuillez saisir la profession'
      ],
      loadingPdf: false,
      erreur: false,
      erreurMessage: ''
    }
  },
  mounted () {
    this.initDonnees()
    this.initParents()
  },
  methods: {
    async initDonnees () {
      try {
        const response = await ContratService.donneesContrat(this.numeroContrat)
        // this.numeroContrat = this.numeroContrat
        if (response.data.erreur != null) {
          this.triggerErreur('Une erreur est survenue')
        } else {
          this.modeDePaiementContrat = response.data.modepaiements
          this.nomEnfant = response.data.nom_enfant
          this.prenomEnfant = response.data.prenom_enfant
          this.dateNaissanceEnfant = moment(response.data.date_naissance_enfant).format('LL')
          if (response.data.sexe === 'F') {
            this.sexeEnfant = 'Fille'
          } else {
            this.sexeEnfant = 'Garçon'
          }
          this.nb_heures_semaine = response.data.nb_heures_semaine
          this.tarif = response.data.tarif
          this.taux_majore = response.data.taux_majore
          this.jour_paiement = response.data.jour_paiement
          this.typeContrat = response.data.type_contrat
          this.dateDebAdapt = moment(response.data.date_deb_periode_adaptation).format('L')
          this.dateFinAdapt = moment(response.data.date_fin_periode_adaptation).format('L')
          this.dateDebutContrat = moment(response.data.date_debut_contrat).format('LL')
          if (response.data.date_fin_contrat != null) {
            this.dateFinContrat = moment(response.data.date_fin_contrat).format('LL')
            this.dateFinExists = true
          } else {
            this.dateFinContrat = 'Aucune, contrat en cours'
          }
          this.nomUsageAssMat = response.data.nom_usage_am
          this.prenomAssMat = response.data.prenom_am
          this.nomNaissanceAssMat = response.data.nom_naissance_am
          this.dateNaissanceAssMat = moment(response.data.date_naissance_am).format('LL')
          this.villeNaissanceAssMat = response.data.ville_naissance_am
          this.telephoneAssMat = response.data.tel_am
          this.numeroSS = response.data.numero_ss
          this.dateAgrement = moment(response.data.date_agrement).format('L')
          this.referenceAgrement = response.data.reference_agrement
          this.assurance = response.data.assurance_resp_civile
          this.numeroPolice = response.data.num_police
          this.nombreSemaineConges = response.data.nb_semaines_conges
          this.id_employeur = response.data.id_employeur
          this.nomUsageEmp = response.data.nom_usage_employeur
          this.prenomEmp = response.data.prenom_employeur
          this.nomNaissanceEmp = response.data.nom_naissance_employeur
          this.rueEmp = response.data.rue_employeur
          this.codePEmp = response.data.cp_employeur
          this.villeEmp = response.data.ville_employeur
          this.telephoneEmp = response.data.telephone_employeur
          this.emailEmp = response.data.mail_employeur
          this.identifiantEmp = response.data.identifiant_connexion
          this.nombreSemSupp = response.data.nb_semaines_conges_parents
        }
      } catch (e) {
        console.log(e)
        this.triggerErreur('Une erreur est survenue')
      }
    },
    async initParents () {
      try {
        const response = await ContratService.donneesParents(this.numeroContrat)
        if (response.data.erreur != null) {
          this.triggerErreur('Une erreur est survenue')
        } else {
          this.parents = response.data.tuteurs
        }
      } catch (e) {
        console.log(e)
        this.triggerErreur('Une erreur est survenue')
      }
    },
    async enregistrer () {
      try {
        let data = {employeur: { rue: this.rueEmp, codePostal: this.codePEmp, ville: this.villeEmp, tel: this.telephoneEmp, id_employeur: this.id_employeur }}
        let r = await EmployeurService.updateEmp(data)
        if (r.data.erreur != null) {
          this.triggerErreur('Une erreur est survenue')
        }
      } catch (e) {
        console.log('ERREUR' + e)
        this.triggerErreur('Une erreur est survenue')
      }
    },
    async enregistrerParent (parent) {
      try {
        let data = {tuteur: { telParent: parent.telephone, profession: parent.profession, telProParent: parent.telephone_pro, id_tuteur: parent.id_tuteur }}
        let r = await TuteurService.updateTuteur(data)
        if (r.data.erreur != null) {
          console.log(r.data.erreur)
          this.triggerErreur('Une erreur est survenue')
        }
      } catch (e) {
        console.log('ERREUR' + e)
        this.triggerErreur('Une erreur est survenue')
      }
    },
    async exportPDF () {
      this.loadingPdf = true
      try {
        const presences = await ContratService.getPresencesByContrat(this.numeroContrat)
        let data = {employeur: { nomNaissanceEmp: this.nomNaissanceEmp, nomUsageEmp: this.nomUsageEmp, prenomEmp: this.prenomEmp, rueEmp: this.rueEmp, codePEmp: this.codePEmp, villeEmp: this.villeEmp, telephoneEmp: this.telephoneEmp, emailEmp: this.emailEmp, nombreSemSupp: this.nombreSemSupp },
          assmat: {nomNaissanceAssMat: this.nomNaissanceAssMat, nomUsageAssMat: this.nomUsageAssMat, prenomAssMat: this.prenomAssMat, dateNaissanceAssMat: this.dateNaissanceAssMat, villeNaissanceAssMat: this.villeNaissanceAssMat, numeroSS: this.numeroSS, dateAgrement: this.dateAgrement, referenceAgrement: this.referenceAgrement, assurance: this.assurance, numeroPolice: this.numeroPolice, nombreSemaineConges: this.nombreSemaineConges},
          enfant: {nomEnfant: this.nomEnfant, prenomEnfant: this.prenomEnfant, dateNaissanceEnfant: this.dateNaissanceEnfant},
          contrat: {dateDebAdapt: this.dateDebAdapt, nb_heures_semaine: this.nb_heures_semaine, tarif: this.tarif, taux_majore: this.taux_majore, jour_paiement: this.jour_paiement, modeDePaiementContrat: this.modeDePaiementContrat}
        }
        if (presences.data.erreur == null) {
          await contratPDF.createContratPdf(data.employeur, this.parents, data.assmat, data.enfant, data.contrat, presences.data.resultats)
          this.loadingPdf = false
        } else {
          this.loadingPdf = false
          this.triggerErreur('Une erreur est survenue')
        }
      } catch (e) {
        console.log(e)
        this.triggerErreur('Une erreur est survenue')
        this.loadingPdf = false
      }
    },
    async cloturer () {
      try {
        await ContratService.updateDateFin(this.numeroContrat)
        this.dateFinContrat = moment(new Date()).format('LL')
        this.dateFinExists = true
      } catch (e) {
        console.log(e)
      }
    },
    triggerErreur (erreur) {
      this.erreurMessage = erreur
      this.erreur = true
    },
    showDialog (parent) {
      this.parentForDialog = parent
      this.dialogBox2 = true
    }
  },
  computed: {
    /**
     * verifie si une assMat est connectée
     * @returns {boolean}
     */
    isAssMatConnected () {
      return this.$store.getters.isAssMatConnected
    }
  }
}
</script>

<style scoped>
</style>
