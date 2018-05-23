<template>
  <v-flex>
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
            <h2>Informations de facture</h2>
          </v-flex>
        </v-layout>
        <v-layout md4 mt-2>
          <v-flex class="text-md-left">
            <h3>Nombre d'heures normales : </h3>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex class="text-md-left">
            <v-layout>
              <v-flex md4>
                <h3>Nombre d'heures supplémentaires : </h3>
              </v-flex>
              <v-flex md3 mt-1>
                <span>36 h dont 5 h au taux majoré</span>
              </v-flex>
              <v-flex md2>
                <v-btn class="indigo--text" @click.stop="dialogHeureMajo=true">Modifier</v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout>
          <v-flex md4 mt-3 class="text-md-left">
          <h3>Total des heures : </h3>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex lg8>
        <v-layout>
      <v-flex mt-5>
        <v-btn color="orange darken-1" dark>Générer la facture au format PDF</v-btn>
      </v-flex>
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
            <!-- v-model="" !-->
            <v-text-field
              name="heuresAMaj"
              align="center"
            ></v-text-field>
          </v-flex>
        <v-layout>
          <v-card-actions>
            <v-flex offset-md1>
              <v-btn  color="primary"  flat @click.stop="submitHeuresMajo">Valider</v-btn>
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
  </v-flex>

</template>

<script>
import genererFacture from '../../../helper/genererFacture'
export default {
  name: 'OneFacture',
  props: {
    facture: {Object, required: true}
  },
  data () {
    return {
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
      dialogHeureMajo: false
      /* facture: {
        // -- Infos à afficher sur la facture --
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
        nbGoutersSupp: 0, // nombre de gouters
        nbGoutersADeduire: 0, // en attente repons leo**
        indemnitesMensuelles: 0, // cout des indemnites
        coutTotalGouterSupp: 0, // en attente reponse leo**
        coutTotalIndemnitesAbs: 0, // cout total des indemnites a deduire pour absence
        coutTotalIndemnitesJoursFeries: 0, // cout total des indemnites a deduire pour feries
        coutTotalJoursExceptionnels: 0, // cout total des frais d'entretien a ajouter pour presences suplementaires
        salaireNet: 0,
        coutcongesPayes: 0, // 10% du salaire net
        totalDesIndemnites: 0,
        montantNetAPayer: 0,
        // -- Infos permettant de faire les calculs pour infos à afficher --
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
        mois: 4,
        annee: 2018,
        idContrat: 'xMxBBUStkKOajkgDdjWFqbnaHCg3EfC5x1N'
      } */
    }
  },
  methods: {
    async initInfosBasiquesDeLaFacture () {
      console.log('initiale  :    ' + Object.values(this.facture))
      let r = await genererFacture.generationFacture(this.facture)
      this.facture = r
      console.log('youpi')
      console.log(Object.values(this.facture))
      console.log('heyyyy ' + this.facture.nbSemainesCongesEmployeur)
    },
    retour () {
      this.$emit('retour')
    }
  },
  mounted () {
    this.initInfosBasiquesDeLaFacture()
  }
}
</script>

<style scoped>

</style>
