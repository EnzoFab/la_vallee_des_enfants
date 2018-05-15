<template>
  <v-layout mt-5>
    <v-flex md6 offset-md1>
      <v-flex md10 offset-md1>
        <v-flex class="text-md-left">
          <h1 class="blue--text">Enfant</h1>
        </v-flex>
        <v-card>
          <v-flex pt-2 offset-md1 class="text-sm-left">
            <h2> {{ prenomEnfant + ' ' + nomEnfant }} </h2>
          </v-flex>
          <v-flex pl-5 class="text-sm-left">
            <v-layout mt-1>
              <h4 class="orange--text text--darken-1 mr-1"><v-icon class="orange--text text--darken-1">cake</v-icon> Anniversaire : </h4><span>{{ dateNaissanceEnfant }}</span>
            </v-layout>
            <v-layout pb-2 mt-1>
              <h4 class="orange--text text--darken-1 mr-1"><v-icon class="orange--text text--darken-1">face</v-icon> Sexe : </h4><span>{{ sexeEnfant }}</span>
            </v-layout>
          </v-flex>
        </v-card>
      </v-flex>
      <v-flex md10 offset-md1 mt-3>
        <v-flex class="text-md-left">
          <h1 class="blue--text">Contrat</h1>
        </v-flex>
        <v-card>
          <v-flex pt-2 offset-md1 class="text-sm-left">
            <h2>Contrat n° {{ numeroContrat }} </h2>
          </v-flex>
          <v-flex pl-5 class="text-sm-left">
            <v-layout mt-1>
              <h4 class="orange--text text--darken-1 mr-1"><v-icon class="orange--text text--darken-1">description</v-icon> Type de contrat : </h4><span> {{ typeContrat }} </span>
            </v-layout>
            <v-layout mt-1>
              <h4 class="orange--text text--darken-1 mr-1"><v-icon class="orange--text text--darken-1">payment</v-icon> Mode de paiement : </h4><span>{{ modeDePaiementContrat }} </span>
            </v-layout>
            <v-layout mt-1>
              <h4 class="orange--text text--darken-1 mr-1"><v-icon class="orange--text text--darken-1">date_range</v-icon> Période d'adaptation : </h4><span> du {{ dateDebAdapt }} au {{ dateFinAdapt }}</span>
            </v-layout>
            <v-layout mt-1>
              <h4 class="orange--text text--darken-1 mr-1"><v-icon class="orange--text text--darken-1">event</v-icon> Date de début du contrat :</h4><span> {{ dateDebutContrat }} </span>
            </v-layout>
            <v-layout pb-2 mt-1>
              <h4 class="orange--text text--darken-1 mr-1"><v-icon class="orange--text text--darken-1">event</v-icon> Date de fin du contrat : </h4><span> {{ dateFinContrat }} </span>
            </v-layout>
            <v-layout pb-2 mt-1>
              <v-flex offset-md2>
                <v-btn color="blue--text">Clôturer le contrat</v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-card>
      </v-flex>
      <v-flex pt-2 mb-5 md10 offset-md1>
      <v-flex class="text-md-left">
        <h1 class="blue--text">Employé(e)</h1>
      </v-flex>
      <v-card>
        <v-flex pt-2 offset-md1 class="text-sm-left">
          <h2>{{ prenomAssMat + ' ' + nomUsageAssMat }}</h2>
        </v-flex>
        <v-flex pl-5 class="text-sm-left">
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
      </v-card>
    </v-flex>
    </v-flex>
    <v-flex md6 offset-md1>
      <v-flex md10>
        <v-flex class="text-sm-left">
          <h1 class="blue--text">Employeur</h1>
        </v-flex>
        <v-card>
          <v-flex pt-2 offset-md1 class="text-sm-left">
            <h2>{{ prenomEmp + ' ' + nomUsageEmp }}</h2>
          </v-flex>
          <v-flex pl-5 class="text-md-left">
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
                <v-btn @click.stop="dialogBox = true">
                  Modifier
                </v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-card>
      </v-flex>

      <v-dialog v-model="dialogBox" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Modification des informations</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field label="Rue" v-model="rue" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Code Postal" v-model="codePostal" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Ville" v-model="ville" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Téléphone" v-model="tel" required></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
            <small>*indiquer les champs requis</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="dialogBox = false">Fermer</v-btn>
            <v-btn color="blue darken-1" flat @click="enregistrer" @click.native="dialogBox = false">Enregistrer</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-flex>
        <v-flex :key="parent" v-for="parent in parents" pt-2 md10>
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
            </v-flex>
            <v-divider></v-divider>
          </v-card>
        </v-flex>
    </v-flex>
    </v-flex>
  </v-layout>

</template>

<script>
import ContratService from '../../../services/ContratService'
import EmployeurService from '../../../services/EmployeurService'
import moment from 'moment'
import 'moment/locale/fr'
moment.locale('fr')
export default {
  name: 'Fiche',
  data () {
    return {
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
      dateFinContrat: 'Aucune, contrat en cours',
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
      rue: null,
      ville: null,
      codePostal: null,
      tel: null,
      parents: []
    }
  },
  mounted () {
    this.initDonnees(this.numeroContrat)
    this.initParents(this.numeroContrat)
  },
  methods: {
    async initDonnees () {
      try {
        const response = await ContratService.donneesContrat(this.numeroContrat)
        this.numeroContrat = this.numeroContrat
        this.modeDePaiementContrat = response.data.modepaiements
        this.nomEnfant = response.data.nom_enfant
        this.prenomEnfant = response.data.prenom_enfant
        this.dateNaissanceEnfant = moment(response.data.date_naissance_enfant).format('LL')
        if (response.data.sexe === 'F') {
          this.sexeEnfant = 'Fille'
        } else {
          this.sexeEnfant = 'Garçon'
        }
        this.typeContrat = response.data.type_contrat
        this.dateDebAdapt = moment(response.data.date_deb_periode_adaptation).format('L')
        this.dateFinAdapt = moment(response.data.date_fin_periode_adaptation).format('L')
        this.dateDebutContrat = moment(response.data.date_debut).format('LL')
        /* if(response.data.date_fin != null){
          this.dateFinContrat = response.data.date_fin
        } */
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
      } catch (e) {
        console.log('erreur')
        console.log(e)
      }
    },
    async initParents () {
      try {
        const response = await ContratService.donneesParents(this.numeroContrat)
        console.log(response.data)
        this.parents = response.data.tuteurs
      } catch (e) {
        console.log(e)
      }
    },
    async enregistrer () {
      try {
        let data = {employeur: { rue: this.rue, codePostal: this.codePostal, ville: this.ville, tel: this.tel, id_employeur: this.id_employeur }}
        console.log('ICIIIIIIIII' + data.employeur.id_employeur)
        let response = await EmployeurService.updateEmp(data)
        this.rueEmp = this.rue
        this.codePEmp = this.codePostal
        this.villeEmp = this.ville
        this.telephoneEmp = this.tel
        console.log('ICIIIIIIIII 2222', response.data)
      } catch (e) {
        console.log('ERREUR' + e)
      }
    }
  }
}
</script>

<style scoped>

</style>
