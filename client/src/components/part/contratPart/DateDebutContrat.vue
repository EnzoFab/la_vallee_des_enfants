<template>
  <v-flex xs12 class="my-1">
    <v-toolbar class="light-blue lighten-4">
      <v-spacer></v-spacer>
      <v-toolbar-title>Début du contrat</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-form v-model="estValide" ref="form" class="pa-3">
      <v-flex>
    </v-flex>
      <v-flex xs12>
        <v-menu
          ref="menu"
          lazy
          :close-on-content-click="false"
          v-model="menu"
          transition="scale-transition"
          offset-y
          full-width
          :nudge-right="40"
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            color="blue"
            label="Date debut du contrat"
            v-model="dateFr"
            prepend-icon="event"
            required
            readonly
          ></v-text-field>
          <v-date-picker
            locale="fr_FR"
            v-model="date"
            no-title
            scrollable
          >
            <v-spacer></v-spacer>
          </v-date-picker>
        </v-menu>
      </v-flex>
      <v-flex xs12>
        <h3>Nombre de semaine(s) de congé supplémentaire(s): {{nombreSemaine}}</h3>
        <v-slider v-model="nombreSemaine"
                  min="0" max="10"
                  thumb-label step="1" ticks
                  v-if="inputSemaineDisable"></v-slider>
      </v-flex>
      <v-flex xs12>
        <a @click="toogleChange">
          {{toogleText}}
          <v-icon>arrow_drop_down</v-icon>
        </a>
        <v-text-field
          label="Nombre de semaines supplementaire de congé"
          color="blue"
          type="number"
          v-model="nombreSemaine"
          :rules="regleSemaine"
          v-if="!inputSemaineDisable"
        ></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-btn
          color="teal accent-2"
          depressed large round
          dark
          @click="back"
        >Precedent</v-btn>
        <v-btn
          color="teal accent-2"
          depressed large round
          :dark="!isSubmitStateFalse"
          @click="submit"
          :disabled="isSubmitStateFalse"
        >Suivant</v-btn>
      </v-flex>
    </v-form>
  </v-flex>
</template>

<script>
let mois = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre']
export default {
  name: 'dateContrat',
  data () {
    return {
      date: null,
      menu: false,
      estValide: false,
      toogleText: 'Plus de semaines', // texte affiché sur le lien
      inputSemaineDisable: true, //
      regleSemaine: [
        v => /^\d+(\d+)?([Ee][+]?\d+)?$/.test(v) || 'Entrez un nombre entier'
      ],
      nombreSemaine: 0
    }
  },
  methods: {
    computedNbSemaine (val) {
      this.nombreSemaine = val
      console.log(this.nombreSemaine)
      if (this.nombreSemaine == null) {
        return 0
      } else {
        return this.nombreSemaine
      }
    },
    toogleChange () { // rend disponible soit l'input soit le slider
      this.inputSemaineDisable = !this.inputSemaineDisable
      this.nombreSemaine = 0
      if (this.inputSemaineDisable) {
        this.toogleText = 'Plus de semaines'
      } else {
        this.toogleText = 'Repasser à la barre de selections'
      }
    },
    submit () {
      if (!this.isSubmitStateFalse) {
        let data = {}
        if (typeof this.nombreSemaine === 'number') {
          data = {
            nombreSemaine: this.nombreSemaine,
            date: new Date(this.date)
          }
        } else {
          data = {
            nombreSemaine: 0,
            date: new Date(this.date)
          }
        }
        this.$emit('submit', data)
      }
    },
    back () {
      this.$emit('back')
    }
  },
  computed: {
    dateFr () { // transforme la date qui est en format anglaise en format francaise
      var dateString = null
      if (this.date != null) {
        var d = new Date(this.date)
        let day = d.getDate()
        let month = mois[d.getMonth()]
        let year = d.getFullYear()
        dateString = day + ' ' + month + ' ' + year
      }
      return dateString
    },
    isSubmitStateFalse () { // regarde si on peut envoyer le formulaire
      // renvoie vrai si la dates n'a pas été remplie
      return this.date == null
    }
  }
}
</script>

<style scoped>

</style>
