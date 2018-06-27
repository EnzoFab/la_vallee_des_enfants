<template>
  <v-flex md10 offset-md1>
    <v-card>
      <v-snackbar
        v-model="snackbar"
        absolute
        top
        right
        :color="snackBarColor"
      >
        <span>{{snackbarMessage}}</span>
      </v-snackbar>
      <v-alert v-model="erreur" type="error" dismissible>
      {{erreurMessage}}
      </v-alert>
      <v-stepper v-model="etape" class="my-2" light>
        <v-stepper-header>
          <v-stepper-step class="red--text" step="1" :complete="estValideEtape1" >Assistante</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step class="red--text" step="2" :complete="estValideEtape2" >Enfant</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="3" :complete="estValideEtape3" >Tuteur légaux</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="4" :complete="estValideEtape4" >Employeur</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="5" :complete="estValideEtape5" >Informations générales</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="6" :complete="estValideEtape6" >Carnet de présences</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="7" :complete="estValideEtape7">Tarifs</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="8" :complete="estValideEtape7">Fin</v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <ChoisirAssMat @submit="submitAssMat" @cancel="annuler" @erreur="triggerErreur"></ChoisirAssMat>
          </v-stepper-content>
          <v-stepper-content step="2">
            <InfosEnfant @submit="submitEnfant" @back="back"></InfosEnfant>
          </v-stepper-content>
          <v-stepper-content step="3">
            <TuteursLegaux @back="back" @submit="submitTuteurs"></TuteursLegaux>
          </v-stepper-content>
          <v-stepper-content step="4">
            <EmployeurOptionnel @back="back" @submit="submitEmp"></EmployeurOptionnel>
          </v-stepper-content>
          <v-stepper-content step="5">
            <InformationGenerale nom="" @back="backInfoG" @submit="submitInfoG"></InformationGenerale>
          </v-stepper-content>
          <v-stepper-content step="6">
            <PresenceTheorique @back="back" @submit="submitPresences"></PresenceTheorique>
          </v-stepper-content>
          <v-stepper-content step="7">
          <Tarifs @back="back" @submit="submitTarifs"
                  :heure-semaine="heureSemaine" :conge-assmat="congeAssmat" :conge-employeur="congeEmployeur"></Tarifs>
        </v-stepper-content>
          <v-stepper-content step="8">
            <FinContrat @back="back" @envoyer="sauvegarderContrat" :progress="showProgress"></FinContrat>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card>
  </v-flex>
</template>

<script>
import ChoisirAssMat from '../part/contratPart/ChoisirAssMat'
import InfosEnfant from '../part/contratPart/InfosEnfant'
import PlaningPresenceContrat from '../part/contratPart/PlaningPresenceContrat'
import InformationGenerale from '../part/contratPart/InformationGenerale'
import EmployeurOptionnel from '../part/contratPart/EmployeurOptionnel'
import Tarifs from '../part/contratPart/Tarifs'
import TuteursLegaux from '../part/contratPart/TuteursLegaux'
import PresenceTheorique from '../part/contratPart/PresenceTheorique'
import FinContrat from '../part/contratPart/FinContrat'
import EnfantService from '../../services/EnfantService'
import ContratService from '../../services/ContratService'
import TuteurService from '../../services/TuteurService'
import EmployeurService from '../../services/EmployeurService'
import MailHelper from '../../helper/SendMail'
import PresenceTheoriqueService from '../../services/PresenceTheoriqueService'
import FactureService from "../../services/FactureService";

const generator = require('generate-password') // module pour generer un mot de passe aleatoire
const randomstring = require('randomstring')
export default {
  name: 'NouveauContrat',
  components: {
    FinContrat,
    ChoisirAssMat,
    PresenceTheorique,
    TuteursLegaux,
    InformationGenerale,
    PlaningPresenceContrat,
    InfosEnfant,
    EmployeurOptionnel,
    Tarifs
  },
  data () {
    return {
      heureSemaine: 0,
      congeAssmat: this.$store.state.assMat.nbConges,
      congeEmployeur: 0,
      enfant: null,
      presenceTheorique: null,
      tuteurs: null,
      asEmployeur: false,
      informationGenerale: null,
      tarif: null,
      employeur: null,
      etape: 1,
      estValideEtape1: false,
      estValideEtape2: false,
      estValideEtape3: false,
      estValideEtape4: false,
      estValideEtape5: false,
      estValideEtape6: false,
      estValideEtape7: false,
      Fin: false,
      erreur: false,
      erreurMessage: null,
      idAssmat: null,
      idEnfant: null,
      showProgress: false,
      snackbar: false,
      snackBarColor: '',
      snackbarMessage: '',
      numContrat: randomstring.generate(35)
    }
  },
  methods: {
    submitEnfant (data) {
      this.enfant = data
      this.estValideEtape2 = true
      this.etape++
    },
    submitTuteurs (data) {
      this.tuteurs = data
      this.estValideEtape3 = true
      if (data.asEmployeur) {
        this.asEmployeur = true
        let vm = this
        data.tuteurs.forEach(function (tuteur) {
          if (tuteur.infoDemandeur) {
            vm.congeEmployeur = tuteur.infoDemandeur.nombreSemainesSupplementaires
          }
        })

        this.etape = 5
      } else {
        this.asEmployeur = false
        this.etape = 4
      }
    },
    backInfoG () {
      if (this.asEmployeur) {
        this.etape -= 2 // permet d'éviter de tomber sur la page employeur si un tuteur est employeur
      } else {
        this.etape--
      }
    },
    submitEmp (data) {
      this.employeur = data
      this.congeEmployeur = data.congesSupp
      this.estValideEtape4 = true
      this.etape++
    },
    submitInfoG (data) {
      this.informationGenerale = data
      this.etape++
      this.estValideEtape5 = true
    },
    submitPresences (data) {
      this.presenceTheorique = data
      this.heureSemaine = data.nbHeureSemaine
      this.etape++
      this.estValideEtape6 = true
    },
    submitTarifs (data) {
      this.tarif = data
      this.etape++
      this.fin = true
      this.estValideEtape7 = true
    },
    async sauvegarderContrat () {
      this.showProgress = true
      if (this.employeur != null) {
        if (await this.saveEnfant(this.enfant) && await this.saveTuteurs(this.tuteurs) && this.saveEmployeur(this.employeur) &&
          await this.saveInformationGenerale(this.informationGenerale) && this.savePresence(this.presenceTheorique) &&
          this.saveTarif(this.tarif)) {
          this.triggerSnackBar('Contrat créé avec succès', 'success')
          this.showProgress = false
          FactureService.initFacture({numContrat: this.numContrat})
            .then(function () {})
            .catch(function (e) {
              console.log(e)
            })
          this.$router.push({
            path: '/contrat/' + this.numContrat}
          )
        } else {
          this.showProgress = false
        }
      } else {
        if (await this.saveEnfant(this.enfant) && await this.saveTuteurs(this.tuteurs) &&
          await this.saveInformationGenerale(this.informationGenerale) && this.savePresence(this.presenceTheorique) &&
          this.saveTarif(this.tarif)) {
          this.triggerSnackBar('Contrat créé avec succès', 'success')
          this.showProgress = false
          FactureService.initFacture({numContrat: this.numContrat})
            .then(function () {})
            .catch(function (e) {
              console.log(e)
            })
          this.$router.push({
            path: '/contrat/' + this.numContrat}
          )
        } else {
          this.showProgress = false
        }
      }
    },
    async saveEnfant (data) {
      // console.log(this.$store.state.assMat.id_assmat)
      try {
        let response = await EnfantService.findOneByContratID(this.numContrat)// on regarde si l'enfant existe deja
        if (response.data.statut === 200) { // il existe un enfant on le mets à jour
          let result = await EnfantService.updateEnfant(
            response.data.enfant.id,
            data)
          if (result.data.erreur == null) {
            this.idEnfant = response.data.enfant.id
            return true
          } else {
            this.triggerErreur(result.data.erreur)
            return false
          }
        } else if (response.data.statut === 404) { // l'enfant n'existe pas
          let enfantR = await EnfantService.createContratEnfant(data) // creation d'un nouvel enfant
          let r = await ContratService.create({
            numContrat: this.numContrat,
            numAssMat: this.idAssmat || this.$store.state.assMat.id_assmat
          }) // creation du contrat

          if (r.data.erreur == null) {
            let updateContrat = await ContratService.updateEnfant(
              this.numContrat, {id_enfant: enfantR.data.id_enfant}
            ) // liaison entre le contrat et l'enfant

            if (updateContrat.data.erreur == null) {
              this.idEnfant = enfantR.data.id_enfant
              return true
            } else {
              this.triggerErreur('Une erreur est survenue')
              return false
            }
          } else {
            this.triggerErreur('Une erreur est survenue')
            return false
          }
        } else {
          this.triggerErreur('Une erreur est survenue')
          return false
        }
      } catch (e) {
        this.triggerErreur(e.toString())
      }
    },
    async saveTuteurs (data) {
      var estValide = true
      let tuteurs = data.tuteurs
      for (var i = 0; i < tuteurs.length; i++) {
        try {
          if (tuteurs[i].tuteurExistant) {
            let res = await TuteurService.lierTuteurEnfant({
              id_tuteur: tuteurs[i].informationTuteurExistant.id_tuteur,
              id_enfant: this.idEnfant
            })
            if (res.data.erreur != null) {
              this.triggerErreur(res.data.erreur)
              estValide = false
            }
          } else {
            let response = await TuteurService.createTuteur({tuteur: tuteurs[i]}) // creation du tuteur
            if (response.data.erreur == null) {
              let id = response.data.id_tuteur
              let res = await TuteurService.lierTuteurEnfant({
                id_tuteur: id,
                id_enfant: this.idEnfant
              }) // lie le tuteurs et l'enfant
              if (res.data.erreur != null) {
                this.triggerErreur(res.data.erreur)
                estValide = false
              } else {
                if (tuteurs[i].infoDemandeur != null) { // le tuteurs est demandeur
                  var login = tuteurs[i].prenom + '_' + tuteurs[i].nomUsage + generator.generate({length: 3, numbers: true})
                  // prenom_nom + 3 charactere random
                  let donneeEmployeur = {
                    nom_naissance_employeur: tuteurs[i].infoDemandeur.nomNaissance,
                    nom_usage_employeur: tuteurs[i].nomUsage,
                    prenom_employeur: tuteurs[i].prenom,
                    cp_employeur: tuteurs[i].infoDemandeur.codePostal,
                    telephone_employeur: tuteurs[i].telephone,
                    ville_employeur: tuteurs[i].infoDemandeur.ville,
                    mail_employeur: tuteurs[i].infoDemandeur.email,
                    rue: tuteurs[i].infoDemandeur.rue,
                    nb_semaines_conges: tuteurs[i].infoDemandeur.nombreSemainesSupplementaires,
                    identifiant_connexion: login.replace(/\s/g, '').toLowerCase(), // login sans espaces et en minuscule
                    mot_de_passe: generator.generate({length: 10, numbers: true}) // mot de passe de taille 10
                  }
                  if (!this.saveEmployeurIntermediare(donneeEmployeur)) {
                    estValide = false
                  }
                }
              }
            } else {
              this.triggerErreur(response.data.erreur)
              estValide = false
            }
          }
        } catch (e) {
          this.triggerErreur(e.toString())
          estValide = false
        }
      }
      /* tuteurs.forEach(function (tuteur) {
        console.log(tuteur)
        TuteurService.createTuteur({tuteur: tuteur}).then(function (res) {
          console.log(res.data)
        }).catch(function (er) {
          this.triggerErreur(er)
        })
      }) */
      return estValide
    },
    async saveEmployeur (data) {
      let donneeEmployeur = {}
      if (data.employeur.employeurExistant == null) {
        var login = data.employeur.prenom + '_' + data.employeur.nomUsage + generator.generate({length: 3, numbers: true})
        donneeEmployeur = { // a modifier
          nom_naissance_employeur: data.employeur.nomNaissance,
          nom_usage_employeur: data.employeur.nomUsage,
          prenom_employeur: data.employeur.prenom,
          cp_employeur: data.employeur.codePostal,
          telephone_employeur: data.employeur.telephone1,
          ville_employeur: data.employeur.ville,
          mail_employeur: data.employeur.email,
          rue: data.employeur.rue,
          nb_semaines_conges: data.congesSupp,
          identifiant_connexion: login.replace(/\s/g, '').toLowerCase(), // login sans espaces et en minuscule
          mot_de_passe: generator.generate({length: 10, numbers: true})// mot de passe de taille 10
        }
      } else {
        donneeEmployeur = {
          employeurExistant: data.employeur.employeurExistant,
          nb_semaines_conges: data.congesSupp
        }
      }
      return this.saveEmployeurIntermediare(donneeEmployeur)
    },
    async saveInformationGenerale (data) {
      let donnees = {
        id_type_contrat: data.typeContrat,
        id_mode_de_paiement: data.modePaiement,
        date_debut: data.date,
        date_deb_periode_adaptation: data.debutAdapt,
        date_fin_periode_adaptation: data.finAdapt,
        jour_paiement: data.jourPrelevement
      }
      try {
        let response = await ContratService.updateInfoG(this.numContrat, donnees)
        if (response.data.erreur == null) {
          return true
        } else {
          console.log(response.data.erreur)
          this.triggerErreur('Une erreur est survenue')
          return false
        }
      } catch (e) {
        this.triggerErreur(e.toString())
        return false
      }
    },
    async savePresence (data) {
      let erreur = false
      for (var i = 0; i < data.presences.length; i++) {
        let presence = data.presences[i]
        presence.id_contrat = this.numContrat
        try {
          let reponse = await PresenceTheoriqueService.create({presenceTheorique: presence})
          if (reponse.data.erreur != null) {
            console.log(reponse.data.erreur)
            this.triggerErreur('Une erreur est survenue')
            erreur = true
          }
        } catch (e) {
          this.triggerErreur(e.toString())
          erreur = true
        }
      }
      if (!erreur) { // s'il n'y a pas eu d'erreur
        try {
          let reponse = await ContratService.updateHeureHebdo(this.numContrat,
            {nb_heures_semaine: data.nbHeureSemaine})
          if (reponse.data.erreur == null) {
            return true
          } else {
            this.triggerErreur('Une erreur est survenue')
            console.log(reponse.data.erreur)
            return false
          }
        } catch (e) {
          console.log(e.toString())
          this.triggerErreur('Une erreur est survenue')
          return false
        }
      }
    },
    async saveTarif (data) {
      try {
        let reponse = await ContratService.updateTarif(this.numContrat,
          {
            tarif: data.salaireNet,
            taux_majore: data.majoration
          })
        if (reponse.data.erreur == null) {
          return true
        } else {
          this.triggerErreur('Une erreur est survenue')
          console.log(reponse.data.erreur)
          return false
        }
      } catch (e) {
        this.triggerErreur('Une erreur est survenue')
        console.log(e.toString())
        return false
      }
    },
    submitAssMat (data) {
      this.idAssmat = data
      this.estValideEtape1 = true
      this.etape++
    },

    back () {
      this.etape--
    },
    triggerErreur (data) {
      this.erreurMessage = data
      this.erreur = true
    },
    triggerSnackBar (message, color) {
      this.snackbarMessage = message
      this.snackBarColor = color
      this.snackbar = true
    },
    annuler () {
      // redirection
    },
    async saveEmployeurIntermediare (employeur) { // essaie de creer un employeur, retourne vrai si c'est reussi faux sinon
      if (!employeur.employeurExistant || employeur.employeurExistant == null) {
        try {
          let response = await EmployeurService.createEmployeur({employeur: employeur})
          if (response.data.erreur == null) {
            let idEmployeur = response.data.id
            let r = await ContratService.updateInfosEmp(this.numContrat, {
              id_employeur: idEmployeur,
              congeSupplementaireEmployeur: employeur.nb_semaines_conges
            })
            if (r.data.erreur == null) {
              return MailHelper.mailConnexionEmployeur(
                employeur.identifiant_connexion,
                employeur.mot_de_passe,
                employeur.mail_employeur)
            } else {
              return false
            }
          } else {
            this.triggerErreur(response.data.erreur)
            return false
          }
        } catch (e) {
          this.triggerErreur(e.toString())
          return false
        }
      } else {
        try {
          await ContratService.updateInfosEmp(this.numContrat,
            {id_employeur: employeur.employeurExistant.id_employeur,
              congeSupplementaireEmployeur: employeur.nb_semaines_conges})
        } catch (e) {

        }
      }
    }
  },
  mounted () {}
}
</script>

<style scoped>

</style>
