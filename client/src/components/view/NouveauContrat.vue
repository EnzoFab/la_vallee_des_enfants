<template>
  <v-flex md10 offset-md1>
    <v-card>
      <v-alert v-model="erreur" type="error" dismissible>
        {{erreurMessage}}
      </v-alert>
      <v-stepper v-model="etape" class="my-2" light non-linear>
        <v-stepper-header>
          <v-stepper-step class="red--text" step="1" :complete="estValideEtape1" >Assistante</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step class="red--text" step="2" :complete="estValideEtape2" >Enfant</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="3" :complete="estValideEtape3" editable>Tuteur légaux</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="4" :complete="estValideEtape4">Employeur</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="5" :complete="estValideEtape5" editable>Informations générales</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="6" :complete="estValideEtape6" editable >Carnet de présences</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="7" :complete="estValideEtape7" editable>Tarifs</v-stepper-step>
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
            <InformationGenerale nom="" @back="back" @submit="submitInfoG"></InformationGenerale>
          </v-stepper-content>
          <v-stepper-content step="6">
            <PresenceTheorique @back="back" @submit="submitPresences"></PresenceTheorique>
          </v-stepper-content>
          <v-stepper-content step="7">
            <Tarifs @back="back" @submit="submitTarifs"></Tarifs>
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
import DateContrat from '../part/contratPart/DateDebutContrat'
import InformationGenerale from '../part/contratPart/InformationGenerale'
import EmployeurOptionnel from '../part/contratPart/EmployeurOptionnel'
import Tarifs from '../part/contratPart/Tarifs'
import TuteursLegaux from '../part/contratPart/TuteursLegaux'
import PresenceTheorique from '../part/contratPart/PresenceTheorique'
import EnfantService from '../../services/EnfantService'
import ContratService from '../../services/ContratService'
import TuteurService from '../../services/TuteurService'
import EmployeurService from '../../services/EmployeurService'
import MailHelper from '../../helper/sendMail'
import PresenceTheoriqueService from '../../services/PresenceTheoriqueService'
const generator = require('generate-password') // module pour generer un mot de passe aleatoire

export default {
  name: 'NouveauContrat',
  components: {
    ChoisirAssMat,
    PresenceTheorique,
    TuteursLegaux,
    InformationGenerale,
    DateContrat,
    PlaningPresenceContrat,
    InfosEnfant,
    EmployeurOptionnel,
    Tarifs
  },
  data () {
    return {
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
      idEnfant: null
    }
  },
  methods: {
    async submitEnfant (data) {
      // console.log(this.$store.state.assMat.id_assmat)
      try {
        let response = await EnfantService.findOneByContratID(this.$store.state.numContrat)// on regarde si l'enfant existe deja
        if (response.data.statut === 200) { // il existe un enfant on le mets à jour
          console.log(data)
          let result = await EnfantService.updateEnfant(
            response.data.enfant.id,
            data)
          if (result.data.erreur == null) {
            this.idEnfant = response.data.enfant.id
            this.estValideEtape1 = true
            this.etape++
          } else {
            this.triggerErreur(result.data.erreur)
          }
        } else if (response.data.statut === 404) { // l'enfant n'existe pas
          let enfantR = await EnfantService.createContratEnfant(data) // creation d'un nouvel enfant
          let r = await ContratService.create({
            numContrat: this.$store.state.numContrat,
            numAssMat: this.idAssmat || this.$store.state.assMat.id_assmat
          }) // creation du contrat

          if (r.data.erreur == null) {
            let updateContrat = await ContratService.updateEnfant(
              this.$store.state.numContrat, {id_enfant: enfantR.data.id_enfant}
            ) // liaison entre le contrat et l'enfant
            console.log(updateContrat.data)
            if (updateContrat.data.erreur == null) {
              this.idEnfant = enfantR.data.id_enfant
              this.estValideEtape1 = true
              this.etape++
            } else {
              this.triggerErreur('Une erreur est survenue')
            }
          } else {
            this.triggerErreur('Une erreur est survenue')
          }
        } else {
          this.triggerErreur('Une erreur est survenue')
        }
      } catch (e) {
        this.triggerErreur(e.toString())
      }
    },
    async submitTuteurs (data) {
      console.log(data)
      let tuteurs = data.tuteurs
      for (var i = 0; i < tuteurs.length; i++) {
        console.log(tuteurs[i])
        try {
          if (tuteurs[i].tuteurExistant) {
            let res = await TuteurService.lierTuteurEnfant({
              id_tuteur: tuteurs[i].informationTuteurExistant.id_tuteur,
              id_enfant: this.idEnfant
            })
            if (res.data.erreur != null) {
              this.triggerErreur(res.data.erreur)
              return
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
                  console.log('=======', donneeEmployeur)
                  if (!this.saveEmployeur(donneeEmployeur)) {
                    return
                  }
                }
              }
            } else {
              this.triggerErreur(response.data.erreur)
              return
            }
          }
        } catch (e) {
          this.triggerErreur(e.toString())
          return
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
      this.estValideEtape3 = true
      if (data.asEmployeur) {
        this.etape = 5
      } else {
        this.etape = 4
      }
    },
    async submitEmp (data) {
      console.log(data)
      // store data in DB
      var login = data.prenom + '_' + data.nomUsage + generator.generate({length: 3, numbers: true})
      let donneeEmployeur = { // a modifier
        nom_naissance_employeur: data.employeur.nomNaissance,
        nom_usage_employeur: data.employeur.nomUsage,
        prenom_employeur: data.employeur.prenom,
        cp_employeur: data.employeur.codePostal,
        telephone_employeur: data.telephone1,
        ville_employeur: data.employeur.ville,
        mail_employeur: data.employeur.email,
        rue: data.employeur.rue,
        nb_semaines_conges: data.congesSupp,
        identifiant_connexion: login.replace(/\s/g, '').toLowerCase(), // login sans espaces et en minuscule
        mot_de_passe: generator.generate({length: 10, numbers: true}) // mot de passe de taille 10
      }

      if (this.saveEmployeur(donneeEmployeur)) {
        this.estValideEtape4 = true
        this.etape++
      }
    },
    async submitInfoG (data) {
      console.log(data)
      let donnees = {
        id_type_contrat: data.typeContrat,
        id_mode_de_paiement: data.modePaiement,
        date_debut: data.date,
        date_deb_periode_adaptation: data.debutAdapt,
        date_fin_periode_adaptation: data.finAdapt,
        jour_paiement: data.jourPrelevement
      }
      try {
        let response = await ContratService.updateInfoG(this.$store.state.numContrat, donnees)
        if (response.data.erreur == null) {
          this.etape++
          this.estValideEtape5 = true
        } else {
          console.log(response.data.erreur)
          this.triggerErreur('Une erreur est survenue')
        }
      } catch (e) {
        this.triggerErreur(e.toString())
      }
    },
    async submitPresences (data) {
      console.log(this.etape)
      console.log(data)
      let erreur = false
      for (var i = 0; i < data.presences.length; i++) {
        let presence = data.presences[i]
        presence.id_contrat = this.$store.state.numContrat
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
        this.etape++
        this.estValideEtape6 = true
      }
    },
    submitTarifs (data) {
      console.log(this.etape)
      console.log(data)
      this.etape++
      this.fin = true
      this.estValideEtape6 = true
    },
    submitAssMat (data) {
      this.idAssmat = data
      console.log(this.idAssmat)
      this.etape++
    },
    back () {
      this.etape--
    },
    triggerErreur (data) {
      this.erreurMessage = data
      this.erreur = true
    },
    annuler () {
      // redirection
    },
    async saveEmployeur (employeur) { // essaie de creer un employeur, retourne vrai si c'est reussi faux sinon
      try {
        let response = await EmployeurService.createEmployeur({employeur: employeur})
        if (response.data.erreur == null) {
          let idEmployeur = response.data.id
          let r = await ContratService.updateInfosEmp(this.$store.state.numContrat, {
            id_employeur: idEmployeur,
            nb_semaines_conges_parents: employeur.nb_semaines_conges
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
    }
  },
  mounted () {
    console.log(this.$store.state.numContrat)
  }
}
</script>

<style scoped>

</style>
