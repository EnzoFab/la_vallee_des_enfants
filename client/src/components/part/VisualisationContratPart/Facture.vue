<template>
  <v-flex v-if="load" xs12>
    <v-flex xs12>
      <h1 class="orange--text text--darken-1 mr-1">{{facture.mois_fr.toUpperCase()}} {{facture.annee}}</h1>
      <v-btn color="blue darken-2" flat large dark @click.native="$emit('retour')">
        <v-icon dark left large>arrow_back</v-icon>Retour
      </v-btn>
      <v-btn large depressed color="blue" dark @click="facturePDF">Télécharger facture</v-btn>
    </v-flex>
    <v-container fluid grid-list-md >
      <v-layout row wrap >
        <v-flex xs12>
          <v-expansion-panel popout>
            <v-expansion-panel-content class="blue lighten-5" v-if="infoContrat != null">
              <h2 slot="header">Informations générales</h2>
              <v-card class="grey lighten-5">
                <v-card-text>
                  <v-layout row wrap>
                    <v-flex xs12 md6>
                      <v-subheader>Enfant</v-subheader>
                      <v-list>
                        <v-list-tile>
                          <v-list-tile-avatar>
                            <img src="/static/babyFace.png"/>
                          </v-list-tile-avatar>
                          <v-list-tile-content>
                            <h3>{{infoContrat.prenom_enfant}} {{infoContrat.nom_enfant}}</h3>
                          </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                          <v-list-tile-avatar>
                            <img src="/static/anniversaire.png"/>
                          </v-list-tile-avatar>
                          <v-list-tile-content>
                            <h3>{{dateAnniversaireFr}}</h3>
                          </v-list-tile-content>
                        </v-list-tile>
                      </v-list>
                    </v-flex>
                    <v-flex xs12 md6>
                      <v-subheader>Employeur</v-subheader>
                      <v-list>
                        <v-list-tile>
                          <v-list-tile-avatar>
                            <img src="/static/employeur.png"/>
                          </v-list-tile-avatar>
                          <v-list-tile-content>
                            <h3>{{infoContrat.prenom_employeur}} {{infoContrat.nom_usage_employeur}}</h3>
                          </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                          <v-list-tile-avatar>
                            <img src="/static/telephone.png"/>
                          </v-list-tile-avatar>
                          <v-list-tile-content>
                            <h3>{{infoContrat.telephone_employeur}}</h3>
                          </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                          <v-list-tile-avatar>
                            <img src="/static/mail.png"/>
                          </v-list-tile-avatar>
                          <v-list-tile-content>
                            <h3>{{infoContrat.mail_employeur}}</h3>
                          </v-list-tile-content>
                        </v-list-tile>
                      </v-list>
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
            <v-expansion-panel-content  class="blue lighten-5" v-if="presenceDumois != null">
              <h2 slot="header">Récapitulatif des présences</h2>
              <v-card>
                <v-card-text>
                  <v-data-table
                    :headers="headers"
                    :items="presenceDumois"
                    class="elevation-3"
                  >
                    <template slot="items" slot-scope="props">
                      <td><b>{{ formatDate(props.item.datepresencereelle) }}</b></td>
                      <td >{{ props.item.heure_arrivee_r }}</td>
                      <td >{{ props.item.heure_depart_r }}</td>
                      <td ><i>{{ formatGouter(props.item.prends_gouter_r) }}</i></td>
                      <td ><i>{{ formatAbsence(props.item.absence_justifiee) }}</i></td>
                    </template>
                  </v-data-table>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-flex>
        <v-flex xs12 id="facture">
          <v-list>
            <v-list-tile v-for="(fact,i) in champsFacture" :key="i">
              <v-list-tile-content :class="fact.color">
                <v-container fluid grid-list-md>
                  <v-layout row wrap>
                    <v-flex xs6><b>{{fact.label}}</b></v-flex>
                    <v-flex xs6>{{fact.valeur}} {{fact.devise}}</v-flex>
                  </v-layout>
                </v-container>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-flex>
      </v-layout>
    </v-container>
    <!-- {{nbJourActivite}}<br>
    {{nbHeureNormale}}<br>
    {{indemniteAuForfait}}
    {{indemniteAbsence}}
    {{prixTotalGouter}}
    {{salaireNet}} -->
  </v-flex>
</template>

<script>
import FonctionMath from '../../../helper/FonctionMath'
import ContratService from '../../../services/ContratService'
import moment from 'moment'
import 'moment/locale/fr'
import PresenceService from '../../../services/PresenceService'
// import jsPDF from 'jspdf'
import * as jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import * as rasterizeHTML from 'rasterizehtml';
const $ = window.jQuery = require('jquery')
moment.locale('fr')
window.html2canvas = html2canvas
window.rasterizeHTML = rasterizeHTML

function startPrintProcess(canvasObj, fileName, callback) {
  let pdf = new jsPDF('l', 'pt', 'a4'),
    pdfConf = {
      pagesplit: false,
      background: '#fff'
    };
  document.body.appendChild(canvasObj); //appendChild is required for html to add page in pdf
  pdf.addHTML(canvasObj.text(), 0, 0, pdfConf).then(function() {
    document.body.removeChild(canvasObj);
    pdf.addPage();
    setTimeout(function(){
      pdf.save(fileName + '.pdf');
    },2000)
    callback();
  });
}

export default {
  name: 'Facture',
  props: {
    facture: {Object, required: true}
  },
  data () {
    return {
      factureAfficher: null,
      load: false,
      numeroContrat: this.$route.params.numC,
      infoContrat: null, // information sur l'enfant et l'employeur
      presenceDumois: [],
      headers: [
        {
          text: 'Date presence',
          align: 'left',
          sortable: true,
          value: 'datepresencereelle'
        },
        { text: 'heure d\'arrivee', value: 'heure_arrivee_r', sortable: true},
        { text: 'heure de depart', value: 'heure_depart_r' },
        { text: 'gouter pris', value: 'prends_gouter_r' },
        { text: 'absence', value: 'absence_justifiee' }
      ]
    }
  },
  methods: {
    loadPresenceDuMois () {
      let vm = this
      PresenceService.getAllPresencesReellesMoisByContrat(this.numeroContrat, this.facture.mois, this.facture.annee)
        .then(function (r) {
          if (r.data.erreur == null) {
            vm.presenceDumois = r.data.presencesreelles
          }
        })
        .catch(function (e) {
          console.log(e)
        })
    },
    loadInformationBasique () {
      let vm = this
      ContratService.getInformationFacture(this.numeroContrat)
        .then(function (r) {
          if (r.data.erreur == null) {
            vm.factureAAfficher = r.data.resultat
            vm.load = true
          }
        })
        .catch(function (e) {
          console.log(e)
        })
    },
    loadInformationContrat () {
      let vm = this
      ContratService.getInformationContrat(this.numeroContrat)
        .then(function (r) {
          if (r.data.erreur == null) {
            vm.infoContrat = r.data.resultat
          }
        })
        .catch(function (e) {
          console.log(e)
        })
    },
    formatDate (date) {
      return moment(date).format('LL') // dateFr
    },
    formatGouter (gouter) {
      if (gouter != null && gouter) {
        return 'Pris'
      } else {
        return 'Non pris'
      }
    },
    formatAbsence (absence) {
      if (absence !== undefined && absence != null) {
        if (absence) {
          return 'Absence justifiée'
        } else {
          return 'Absence non justifiée'
        }
      } else {
        return 'Présent'
      }
    },
    facturePDF () {
      console.log($('#facture').get(0))
      html2canvas($('#facture').get(0).hmtl).then(function (canvas) {
        let pdf = new jsPDF('p', 'pt', 'a4');
        pdf.addHTML(canvas, function () {
          pdf.save('facture.pdf')
        });
      })
      /*html2canvas(document.getElementById('facture'), {
      }).then(function(canvasObj) {
        startPrintProcess(canvasObj, 'printedPDF',function (){
          alert('PDF saved');
        });
        //save this object to the pdf
      }); */


    }
  },
  mounted () {
    this.loadInformationBasique()
    this.loadInformationContrat()
    this.loadPresenceDuMois()
  },
  computed: {
    dateAnniversaireFr () {
      let date = this.infoContrat.date_naissance_enfant
      return moment(date).format('LL') // dateFr
    },
    nbJourActivite () {
      if (this.factureAAfficher != null) {
        return FonctionMath.arrondi(this.factureAAfficher.jour_semaine * (52 - this.factureAAfficher.nb_semaines_conges -
          this.factureAAfficher.nb_semaines_conges) / 12, 0)
      } else {
        return 0
      }
    },
    nbHeureNormale () {
      if (this.factureAAfficher != null) {
        return FonctionMath.arrondi(this.heureSemaine * (52 - this.factureAAfficher.nb_semaines_conges -
          this.factureAAfficher.nb_semaines_conges) / 12, 0)
      } else {
        return 0
      }
    },
    heureSemaine () {
      let h = this.factureAAfficher.heure_semaine
      let nbHeure = h.hours* 60 + h.minutes
      return FonctionMath.arrondi(nbHeure / 60, 0)
    },
    indemniteAuForfait () {
      if (this.factureAAfficher != null) {
        return FonctionMath.arrondi(this.factureAAfficher.jour_semaine * parseInt(this.factureAAfficher.tarif_entretien)
          * (52 - this.factureAAfficher.nb_semaines_conges - this.factureAAfficher.nb_semaines_conges) / 12, 0)
      } else {
        return 0
      }
    },
    nombreGouterPris () {
      let nbGouter = 0
      for (let i = 0; i < this.presenceDumois.length; i++) {
        if (this.presenceDumois[i].prends_gouter_r !== undefined
          && this.presenceDumois[i].prends_gouter_r != null
          && this.presenceDumois[i].prends_gouter_r) {
          nbGouter += 1
        }
      }
      return nbGouter
    },
    prixTotalGouter () {
      if (this.factureAAfficher != null && this.presenceDumois != null) {
        return this.nombreGouterPris * parseInt(this.factureAAfficher.tarif_gouter)
      } else {
        return 0
      }
    },
    nombreAbsence () {
      let nbAbsence = 0
      for (let i = 0; i < this.presenceDumois.length; i++) {
        if (this.presenceDumois[i].absence_justifiee !== undefined &&
          this.presenceDumois[i].absence_justifiee != null) {
          nbAbsence += 1
        }
      }
      return nbAbsence
    },
    indemniteAbsence () {
      console.log(this.nombreAbsence)
      if (this.factureAAfficher != null && this.presenceDumois != null) {
        return this.nombreAbsence * parseInt(this.factureAAfficher.tarif_entretien)
      } else {
        return 0
      }
    },
    salaireNet () {
      if (this.factureAAfficher != null) {
        return FonctionMath.arrondi(parseInt(this.factureAAfficher.tarif) * this.heureSemaine *
          (52 - this.factureAAfficher.nb_semaines_conges - this.factureAAfficher.nb_semaines_conges) / 12, 2)
      }
    },
    total () {
      return this.salaireNet + this.prixTotalGouter - this.indemniteAbsence
    },
    champsFacture () {
      return [
        {
          label: 'Nombre de jour d\'activite',
          valeur: this.nbJourActivite,
          devise: 'jours',
          color: 'blue-grey lighten-4'
        },
        {
          label: 'Nombre d\'heures par semaine',
          valeur: this.heureSemaine,
          devise: 'heure(s)',
          color: 'white'
        },
        {
          label: 'Nombre d\'heure normales',
          valeur: this.nbHeureNormale,
          devise: 'heure(s)',
          color: 'blue-grey lighten-4'
        },
        {
          label: 'Indemnité au forfait',
          valeur: this.indemniteAuForfait,
          devise: 'Euros',
          color: 'white'
        },
        {
          label: 'Nombre de gouter pris',
          valeur: this.nombreAbsence,
          devise: 'Qté',
          color: 'blue-grey lighten-4'
        },
        {
          label: 'Prix des gouters',
          valeur: this.prixTotalGouter,
          devise: 'Euros',
          color: 'white'
        },
        {
          label: 'Nombre d\'absences',
          valeur: this.nombreAbsence,
          devise: 'Qté',
          color: 'blue-grey lighten-4'
        },
        {
          label: 'Indemnité absence',
          valeur: this.indemniteAbsence,
          devise: 'Euros',
          color: 'white'
        },
        {
          label: 'Salaire net',
          valeur: this.salaireNet,
          devise: 'Euros',
          color: 'blue-grey lighten-4'
        },
        {
          label: 'Total',
          valeur: this.total,
          devise: 'Euros',
          color: 'blue-grey lighten-3'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
