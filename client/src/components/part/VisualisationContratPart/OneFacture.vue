<template>
  <v-flex>
    <v-layout>
      <v-flex md1 mt-3>
        <v-btn class="amber darken-2 white--text">< RETOUR</v-btn>
      </v-flex>
      <v-flex mt-3 class="text-md-center blue--text">
        <h1>Détail de la facture</h1>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-expansion-panel>
        <v-expansion-panel-content class="elevation-3">
          <h2 slot="header" class="text-md-left offset-md1">Informations générales</h2>
          <v-card>
            <v-layout>
              <v-flex class="grey--text text--darken-3 text-md-center" mt-2>
                    <h3>Période du {{this.factureAAfficher.debutPeriode}} au {{this.factureAAfficher.finPeriode}}</h3>
                  </v-flex>
            </v-layout>
            <v-layout>
              <v-flex mt-2 class="grey--text text--darken-3 text-md-center">
                    <h3>Enfant : {{this.factureAAfficher.nomEnfant}} {{this.factureAAfficher.prenomEnfant}}</h3>
                  </v-flex>
            </v-layout>
            <v-layout>
              <v-flex class="elevation-2" mb-3 offset-md2 mt-2 md4>
                <v-card>
                  <v-layout>
                    <v-flex class="indigo--text text-md-center">
                      <h2>Employeur</h2>
                    </v-flex>
                  </v-layout>
                  <v-divider></v-divider>
                  <v-layout>
                    <v-flex offset-md1>
                      <p>{{this.factureAAfficher.nomEmployeur}} {{this.factureAAfficher.prenomEmployeur}}</p>
                      <p>{{this.factureAAfficher.rueEmployeur}}</p>
                      <p>{{this.factureAAfficher.cpEmployeur}} {{this.factureAAfficher.villeEmployeur}}</p>
                    </v-flex>
                  </v-layout>
                </v-card>
              </v-flex>
              <v-flex offset-md1 md4 mt-2 mb-3 class="elevation-2">
                <v-card>
                  <v-layout>
                    <v-flex offset-md1 class="indigo--text text-md-center">
                      <h2>Assistante maternelle</h2>
                    </v-flex>
                  </v-layout>
                  <v-divider></v-divider>
                  <v-layout>
                    <v-flex offset-md1>
                      <p>{{this.factureAAfficher.nomAssMat}} {{this.factureAAfficher.prenomAssMat}}</p>
                      <p>{{this.factureAAfficher.rueAssMat}}</p>
                      <p>{{this.factureAAfficher.cpAssMat}} {{this.factureAAfficher.villeAssMat}}</p>
                    </v-flex>
                  </v-layout>
                </v-card>
              </v-flex>
            </v-layout>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-layout>

    <v-layout>
      <v-flex md6 mt-3>
        <v-card>
          <v-layout>
            <v-flex offset-md1 class="orange--text text--darken-1">
              <h2>ÉLÉMENTS PRIS EN COMPTE</h2>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
          <v-layout>
            <v-flex class="grey--text text--darken-3" offset-md1>
              <v-layout>
                <v-flex md9 class="text-md-left">
                  <h3>Nombre de jours d'activité :</h3>
                </v-flex>
                <v-flex class="text-md-right" mt-1 md2>
                  <h4>{{this.factureAAfficher.nombreJoursActivite}}</h4>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
          <v-layout>
            <v-flex class="grey--text text--darken-3" offset-md1>
              <v-layout>
                <v-flex md9 class="text-md-left">
                  <h3>Nombre d'heures normales :</h3>
                </v-flex>
                <v-flex mt-1 md2 class="text-md-right">
                  <h4>{{this.factureAAfficher.nombreHeuresNormales}}</h4>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
          <v-layout>
            <v-flex class="grey--text text--darken-3" offset-md1>
              <v-layout>
                <v-flex md9 class="text-md-left">
                  <h3>Nombre d'heures supplémentaires ou majorées :</h3>
                </v-flex>
                <v-flex mt-1 md2 class="text-md-right">
                  <h4>{{this.factureAAfficher.nombreHeuresMajorees}}</h4>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
      <v-flex md6 mt-3>
        <v-card>
          <v-layout>
            <v-flex class="orange--text text--darken-1">
              <h2>VOLET SOCIAL</h2>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
          <v-layout>
            <v-flex class="grey--text text--darken-3" offset-md1>
              <v-layout>
                <v-flex md9 class="text-md-left">
                  <h3>Nombre de jours de congés payés :</h3>
                </v-flex>
                <v-flex mt-1 md2 class="text-md-right">
                  <h4>{{this.factureAAfficher.nombreJoursCongesPayes}}</h4>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
          <v-layout>
            <v-flex class="grey--text text--darken-3" offset-md1>
              <v-layout>
                <v-flex md9 class="text-md-left">
                  <h3>Salaire horaire normal :</h3>
                </v-flex>
                <v-flex mt-1 md2 class="text-md-right">
                  <h4>{{this.factureAAfficher.salaireHoraireNormal}}</h4>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
          <v-layout>
            <v-flex class="grey--text text--darken-3" offset-md1>
              <v-layout>
                <v-flex md9 class="text-md-left">
                  <h3>Date limite de paiement :</h3>
                </v-flex>
                <v-flex md2 mt-1 class="text-md-right">
                  <h4>{{this.factureAAfficher.dateLimitePaiement}}</h4>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout>
      <v-flex mt-3 class="orange--text text--darken-1 text-md-center">
        <h2>CALCUL DES INDEMNITÉS</h2>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex mt-2>
        <v-card>
          <v-layout class="white">
            <v-flex md4 class="indigo--text text-md-left">
              <h2>Élément</h2>
            </v-flex>
            <v-flex md1 class="indigo--text text-md-left">
              <h2>quantité</h2>
            </v-flex>
            <v-flex md1 class="indigo--text text-md-left">
              <h2></h2>
            </v-flex>
            <v-flex md2 class="indigo--text text-md-left">
              <h2>coût unitaire</h2>
            </v-flex>
            <v-flex md1 class="indigo--text text-md-left">
              <h2>unité</h2>
            </v-flex>
            <v-flex md2 class="indigo--text text-md-left">
              <h2>totaux</h2>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
          <v-layout class="indigo lighten-5">
            <v-flex md4 class="grey--text text--darken-3 text-md-left">
              <h3>Indemnites mensuelles</h3>
            </v-flex>
            <v-flex md1 class="text-md-left grey--text text--darken-3">
              <h4>1</h4>
            </v-flex>
            <v-flex md1 class="text-md-left grey--text text--darken-3">
              <h4>x</h4>
            </v-flex>
            <v-flex md2 class="text-md-left grey--text text--darken-3">
              <h4>{{this.factureAAfficher.indemnitesMensuelles}}</h4>
            </v-flex>
            <v-flex md1 class="text-md-left grey--text text--darken-3">
              <h4>mois</h4>
            </v-flex>
            <v-flex md2 class="text-md-left grey--text text--darken-3">
              <h4>{{this.factureAAfficher.indemnitesMensuelles}}</h4>
            </v-flex>
          </v-layout>
          <v-layout class="white">
            <v-flex md4 class="grey--text text--darken-3 text-md-left">
              <h3>Goûters</h3>
            </v-flex>
            <v-flex md1 class="text-md-left grey--text text--darken-3">
              <h4>{{this.factureAAfficher.nbGouters}}</h4>
            </v-flex>
            <v-flex md1 class="text-md-left">
              <h4>x</h4>
            </v-flex>
            <v-flex md2 class="text-md-left grey--text text--darken-3">
              <h4>{{this.prixGouter}}</h4>
            </v-flex>
            <v-flex md1 class="text-md-left grey--text text--darken-3">
              <h4>jour</h4>
            </v-flex>
            <v-flex md2 class="text-md-left grey--text text--darken-3">
              <h4>{{this.factureAAfficher.coutGouter}}</h4>
            </v-flex>
          </v-layout>
          <v-layout class="indigo lighten-5">
            <v-flex md4 class="grey--text text--darken-3 text-md-left">
              <h3>Indemnité à déduire pour absence(s)</h3>
            </v-flex>
            <v-flex md1 class="text-md-left grey--text text--darken-3">
              <h4>{{this.factureAAfficher.nbJoursAbsence}}</h4>
            </v-flex>
            <v-flex md1 class="text-md-left">
              <h4>x</h4>
            </v-flex>
            <v-flex md2 class="text-md-left grey--text text--darken-3">
              <h4>{{this.prixEntretien}}</h4>
            </v-flex>
            <v-flex md1 class="text-md-left grey--text text--darken-3">
              <h4>jour</h4>
            </v-flex>
            <v-flex md2 class="text-md-left grey--text text--darken-3">
              <h4>{{this.factureAAfficher.coutTotalIndemnitesAbs}}</h4>
            </v-flex>
          </v-layout>
          <v-layout class="white">
            <v-flex md4 class="grey--text text--darken-3 text-md-left">
              <h3>Indemnité à déduire pour férié(s)</h3>
            </v-flex>
            <v-flex md1 class="text-md-left grey--text text--darken-3">
              <h4>{{this.factureAAfficher.nbJoursFériés}}</h4>
            </v-flex>
            <v-flex md1 class="text-md-left">
              <h4>x</h4>
            </v-flex>
            <v-flex md2 class="text-md-left grey--text text--darken-3">
              <h4>{{this.prixEntretien}}</h4>
            </v-flex>
            <v-flex md1 class="text-md-left grey--text text--darken-3">
              <h4>jour</h4>
            </v-flex>
            <v-flex md2 class="text-md-left grey--text text--darken-3">
              <h4>{{this.factureAAfficher.coutTotalIndemnitesJoursFeries}}</h4>
            </v-flex>
          </v-layout>
          <v-layout class="indigo lighten-5">
            <v-flex md4 class="grey--text text--darken-3 text-md-left">
              <h3>Ajout pour jours supplémentaires</h3>
            </v-flex>
            <v-flex md1 class="text-md-left grey--text text--darken-3">
              <h4>{{this.factureAAfficher.nbJoursPresenceExcept}}</h4>
            </v-flex>
            <v-flex md1 class="text-md-left grey--text text--darken-3">
              <h4>x</h4>
            </v-flex>
            <v-flex md2 class="text-md-left grey--text text--darken-3">
              <h4>{{this.prixEntretien}}</h4>
            </v-flex>
            <v-flex md1 class="text-md-left grey--text text--darken-3">
              <h4>jour</h4>
            </v-flex>
            <v-flex md2 class="text-md-left grey--text text--darken-3">
              <h4>{{this.factureAAfficher.coutTotalJoursExceptionnels}}</h4>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
          <v-layout class="white">
            <v-flex md4 class="deep-orange--text text--accent-3 text-md-left">
              <h3>Total des indemnités</h3>
            </v-flex>
            <v-flex md1 class="text-md-left">
            </v-flex>
            <v-flex md1 class="text-md-left">
            </v-flex>
            <v-flex md2 class="text-md-left">
            </v-flex>
            <v-flex md1 class="text-md-left">
            </v-flex>
            <v-flex md2 class="deep-orange--text text--accent-3 text-md-left">
              <h4>{{this.factureAAfficher.totalDesIndemnites}}</h4>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex mt-3 class="orange--text text--darken-1 text-md-center">
        <h2>CALCUL DU MONTANT NET A PAYER</h2>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex mt-2>
        <v-card>
          <v-layout>
            <v-flex md4 class="text-md-left" offset-md1>
              <h3>SALAIRE NET</h3>
            </v-flex>
            <v-flex md1 class="text-md-right" offset-md3>
              <h4>{{this.factureAAfficher.salaireNet}}</h4>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
          <v-layout>
            <v-flex md4 class="text-md-left grey--text text--darken-3" offset-md1>
              <h3>Congés payés (10%)</h3>
            </v-flex>
            <v-flex md1 class="text-md-right grey--text text--darken-3" offset-md3>
              <h4>{{this.factureAAfficher.coutcongesPayes}}</h4>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
          <v-layout>
            <v-flex md4 class="text-md-left grey--text text--darken-3" offset-md1>
              <h3>Indemnités</h3>
            </v-flex>
            <v-flex md1 class="text-md-right grey--text text--darken-3" offset-md3>
              <h4>{{this.factureAAfficher.totalDesIndemnites}}</h4>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
          <v-layout>
            <v-flex md4 class="deep-orange--text text--accent-3 text-md-left" offset-md1>
              <h3>MONTANT NET A PAYER</h3>
            </v-flex>
            <v-flex md1 class="deep-orange--text text--accent-3 text-md-right" offset-md3>
              <h4>{{this.factureAAfficher.montantNetAPayer}}</h4>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-flex>
  <!--  <v-flex>
     <v-layout>
       <v-flex mt-4 class="text-md-center blue--text">
         <h1>Établissement de la facture</h1>
       </v-flex>
     </v-layout>
     <v-layout>
       <v-flex mt-3 md8 offset-md1>
         <v-flex offset-md1 class="text-md-left light-green--text text--darken-3">
           <h2>Absences du mois</h2>
         </v-flex>
         <v-flex mt-2 md10>
           <v-data-table
             :headers="headers"
             :items="absences"
             hide-actions
             class="elevation-1"
             no-data-text="Aucune absence ce mois-ci"
           >
             <template slot="items" slot-scope="props">
               <td>{{ props.item.datepresencereelle }}</td>
               <td v-if=" props.item.absence_justifiee==true" class="text-xs-center">oui</td>
               <td v-else class="text-xs-center">non</td>
               <td class="text-xs-center"><v-btn>modifier</v-btn></td>
             </template>
           </v-data-table>
         </v-flex>
       </v-flex>
     </v-layout>

     <v-layout>
       <v-flex md8 offset-md1 mt-4>
         <v-layout>
           <v-flex light-green--text text--darken-3 offset-md1 class="text-md-left">
             <h2>Informations sur les heures</h2>
           </v-flex>
         </v-layout>
         <v-layout md4 mt-2>
           <v-flex class="text-md-left">
             <h3>Nombre d'heures normales : {{(this.factureAAfficher.nombreHeuresNormales).toFixed(2)}}</h3>
           </v-flex>
         </v-layout>
         <v-layout>
           <v-flex class="text-md-left">
             <v-layout>
               <v-flex>
                 <h3>Nombre d'heures supplémentaires : {{this.factureAAfficher.nombreHeuresSupp}} h dont {{this.factureAAfficher.nombreHeuresMajorees}} h au taux majoré</h3>
               </v-flex>
               <v-flex md2>
                 <v-btn class="indigo--text" @click.stop="dialogHeureMajo=true">Modifier</v-btn>
               </v-flex>
             </v-layout>
           </v-flex>
         </v-layout>
         <v-divider></v-divider>
         <v-layout>
           <v-flex mt-3 class="text-md-left">
           <h3>Total des heures : {{(this.factureAAfficher.nombreHeuresNormales + this.factureAAfficher.nombreHeuresSupp).toFixed(2)}}</h3>
           </v-flex>
         </v-layout>
       </v-flex>
     </v-layout>
     <v-layout>
       <v-flex lg8>
         <v-layout>
       <v-flex mt-5>
        <!-- <v-btn color="orange darken-1" @click="exportPDF" dark>Générer la facture au format PDF</v-btn> !-->
  <!-- </v-flex>
  <v-flex mt-5>
    <v-btn @click="retour" color="orange darken-1" dark>Retour</v-btn>
  </v-flex>
    </v-layout>
  </v-flex>
</v-layout>

<v-dialog v-model="dialogHeureMajo" max-width="500px">
<v-card>
  <v-flex pt-3 class="indigo--text text-md-center">
    <h2>
      Majoration des heures supplémentaires
    </h2>
  </v-flex>
  <v-flex offset-md1>
    <v-flex mt-4 md10 class="text-md-left">
      <p>Veuillez indiquer le nombre d'heures à majorer :</p>
    </v-flex>
      <v-flex offset-md4 md2 xs8>
        <v-text-field
          v-model="factureAAfficher.nombreHeuresMajorees"
          name="heuresAMaj"
          align="center"
        ></v-text-field>
      </v-flex>
    <v-layout>
      <v-card-actions>
        <v-flex offset-md1>
           <v-btn color="primary" flat @click="submitHeuresMajo">Valider</v-btn>
        </v-flex>
      </v-card-actions>
      <v-card-actions>
        <v-flex offset-md7>
          <v-btn  color="primary" flat @click.stop="dialogHeureMajo=false">Annuler</v-btn>
        </v-flex>
      </v-card-actions>
    </v-layout>
  </v-flex>
</v-card>
</v-dialog>
</v-flex> !-->

</template>

<script>
  import genererFacture from '../../../helper/genererFacture'
  import FactureService from '../../../services/FactureService'
  export default {
    name: 'OneFacture',
    props: {
      facture: {Object, required: true}
    },
    data () {
      return {
        prixGouter: null,
        prixEntretien: null,
        headers: [
          {
            text: 'Date',
            align: 'center',
            sortable: false,
            value: 'name'
          },
          {text: 'Absence Justifiée', value: 'absence_justifiée'},
          {text: 'Modification', value: 'modifier'}
        ],
        absences: [],
        dialogHeureMajo: false,
        factureAAfficher: {
          /* -- Infos à afficher sur la facture -- */
          debutPeriode: null,
          finPeriode: null,
          nomEnfant: null,
          prenomEnfant: null,
          nomEmployeur: null,
          prenomEmployeur: null,
          rueEmployeur: null,
          cpEmployeur: null,
          villeEmployeur: null,
          nomAssMat: null,
          prenomAssMat: null,
          rueAssMat: null,
          cpAssMat: null,
          villeAssMat: null,
          nombreJoursActivite: 0,
          nombreHeuresSupp: 0,
          nombreHeuresNormales: 0, // va etre initier à facture.nombre heure normales qui est le nb d heures supp choisies a taux normal
          nombreHeuresMajorees: 0,
          nombreJoursCongesPayes: 2.5,
          salaireHoraireNormal: null,
          taux_majore: null,
          dateLimitePaiement: null,
          nbJoursAbsJust: 0, // nb jours absences justifiée
          nbJoursAbsNonJust: 0, // nb jours absences non justifiée
          nbJoursAbsence: 0, // nb jours abs justifiées et non justifiées
          nbJoursFériés: 0,
          nbJoursPresenceExcept: 0, // nb de jours où l'enfant est venu exceptionnellement
          nbGouters: 0, // nombre de gouters pris dans le mois
          indemnitesMensuelles: 0, // cout des indemnites
          coutGouter: 0,
          coutTotalIndemnitesAbs: 0, // cout total des indemnites a deduire pour absence
          coutTotalIndemnitesJoursFeries: 0, // cout total des indemnites a deduire pour feries
          coutTotalJoursExceptionnels: 0, // cout total des frais d'entretien a ajouter pour presences suplementaires
          coutIndemniteAuReel: 0,
          salaireNet: 0,
          coutcongesPayes: 0, // 10% du salaire net
          totalDesIndemnites: 0,
          montantNetAPayer: 0,
          /* -- Infos permettant de faire les calculs pour infos à afficher -- */
          nbJoursPresenceTheo: 0,
          nbSemainesCongesAssMat: null,
          nbSemainesCongesEmployeur: null,
          nbJourFeriesNonPayes: 0, // nombre de jours feries où l assmat ne doit pas etre payee (concerne le 1 er mai)
          nbHeuresAbsencesJust: 0,
          nbHeuresRetardsJustifies: 0, // nombre d'heures de retard à decompter car consideres comme justifies par l ass mat
          nbHeuresSemaine: 0,
          datesJoursFeries: [], // sera initialisé avec les jours feries du mois (uniquement les jours - pas mois/annee)
          dateDebAdaptation: null,
          dateFinAdaptation: null,
          dateFinContrat: null,
          nombreJoursAuReel: 0,
          mois: null,
          annee: null,
          idContrat: null
        },
        nbHeuresMajo:0
      }
    },
    methods: {
      initialiserDonnees () { // inutile
        this.factureAAfficher.idContrat = this.facture.idContrat
        this.factureAAfficher.mois = this.facture.mois
        this.factureAAfficher.annee = this.facture.annee
      },

      initHeuresMaj () {
        let vm = this
        FactureService.getDonneesFactureDuMois(this.facture.idContrat, this.facture.mois,this.facture.annee)
          .then(function (rst) {
            if (rst.data.erreur == null) {
              console.log('=======================e=== ', rst.data)
              vm.nbHeuresMajo = rst.data.nb_heures_majorees // n'existe pas
              vm.facture.nombreHeuresMajorees = vm.nbHeuresMajo
              console.log('=======', vm.facture)
            }
          })
          .catch(function (err) {
            console.log(err)
          })
      },

      async initInfosBasiquesDeLaFacture () {
        try {
          console.log('initiale  :    ' + Object.values(this.factureAAfficher))
          let r = await genererFacture.generationFacture(this.factureAAfficher)
          this.factureAAfficher = r
          console.log('lalalala ', this.factureAAfficher)
        } catch (e) {
          console.log(e)
        }

      },
      retour () {
        this.$emit('retour')
      },

      coucou () {
        console.log('coucou')
      }
    },
    mounted () {
      this.initialiserDonnees()
      console.log(this.facture.mois)
      this.initHeuresMaj()
      this.initInfosBasiquesDeLaFacture()
      console.log('FACTURE', this.factureAAfficher)
    },
    /* ,
    async exportPDF () {
      let facture = { nombreJoursActivite: this.nombreJoursActivite, nombreHeuresNormales: this.nombreHeuresNormales, nombreHeuresMajorees: this.nombreHeuresMajorees, nombreJoursCongesPayes: this.nombreJoursCongesPayes, salaireHoraireNormal: this.salaireHoraireNormal, dateLimitePaiement: this.dateLimitePaiement, indemnitesMensuelles: this.indemnitesMensuelles, gouter: this.gouter, entretien: this.entretien, coutTotalIndemnitesAbs: this.coutTotalIndemnitesAbs, nbJoursFériés: this.nbJoursFériés, coutTotalIndemnitesJoursFeries: this.coutTotalIndemnitesJoursFeries, nbJoursPresenceExcept: this.nbJoursPresenceExcept, coutTotalJoursExceptionnels: this.coutTotalJoursExceptionnels, salaireNet: this.salaireNet, congePaye10: this.congePaye10, indemEntretien: this.indemEntretien, montant: this.montant }
      try {
        await facturePDF.createFacturePdf(facture)
      } catch (e) {
        console.log(e)
      }
    }*/

    submitHeuresMajo() {
      try {
        let data = {
          facture:
            {
              nombreHeuresMajorees: factureAAfficher.nombreHeuresMajorees,
              idContrat: factureAAfficher.idContrat,
              annee: factureAAfficher.annee,
              mois: factureAAfficher.mois
            }
        }
        FactureService.updateHeuresMajo(data)
        this.dialogHeureMajo = false
      } catch (e) {
        console.log(e)
      }
    }
  }
</script>

<style scoped>

</style>
