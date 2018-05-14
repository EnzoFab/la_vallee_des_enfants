<template>
  <v-flex  xs12 class="my-1">
    <v-toolbar color="light-green lighten-4">
      <v-spacer></v-spacer>
      <v-toolbar-title>Informations de l'enfant</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-form v-model="estValide" ref="form" class="pa-3">
      <v-layout row wrap >
        <v-flex xs12 sm6>
          <v-text-field
            label="Prénom"
            v-model="prenom"
            :rules="reglePrenom"
            hint="Prénom de l'enfant"
            persistent-hint
            class="pr-4"
            color="light-green darken-2"
            required></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
          <v-text-field
            label="Nom"
            v-model="nom"
            :rules="regleNom"
            hint="Nom de l'enfant"
            persistent-hint
            class="pr-4"
            color="light-green darken-2"
            required
          ></v-text-field>
        </v-flex>
        <v-flex xs12 offset-md3>
          <v-radio-group
            label="Sexe"
            persistent-hint
            v-model="sexe"
            :rules="regleSexes"
            mandatory
            ripple
            row>
            <v-radio label="Fille" value="F" ripple color="pink"></v-radio>
            <v-radio label="Garçon" value="G" ripple color="blue"></v-radio>
          </v-radio-group>
        </v-flex>
        <v-flex xs12>
          <v-menu
            ref="menu"
            lazy
            full-width
            :close-on-content-click="false"
            v-model="menu"
            transition="slide-y-transition"
            :nudge-right="40"
            top
            min-width="10%"
          >
            <v-text-field
              slot="activator"
              label="Date de naissance"
              v-model="dateFr"
              prepend-icon="event"
              readonly
              color="light-green darken-2"
              required
              :rules="regleDate"
            ></v-text-field>
            <v-date-picker
              ref="picker"
              full-width
              class="mt-3"
              reactive
              year-icon="date_range"
              prev-icon="skip_previous"
              next-icon="skip_next"
              v-model="date"
              locale="fr-FR"
              @change="save"
              min="2010-01-01"
              :max="new Date().toISOString().substr(0, 10)"
            ></v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex xs12>
          <v-btn
            class="light-green lighten-4"
            depressed large round
            @click="back"
          >Annuler</v-btn>
          <v-btn
            depressed large round
            class="light-green lighten-4"
            @click="submit"
            :disabled="!estValide"
          >Suivant</v-btn>
        </v-flex>
      </v-layout>
    </v-form>
  </v-flex>
</template>

<script>
let mois = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre']
export default {
  name: 'InfosEnfant',
  data () {
    return {
      date: null,
      menu: false,
      prenom: null,
      nom: null,
      estValide: false,
      sexe: null,
      reglePrenom: [
        v => !!v || 'Veuillez remplir le prénom'
      ],
      regleNom: [
        v => !!v || 'Veuillez remplir le nom'
      ],
      regleDate: [
        v => !!v || 'Veuillez remplir la date de naissance'
      ],
      regleSexes: [
        v => !!v || 'Choisissez le sexe'
      ]
    }
  },
  watch: {
    menu (val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },
  methods: {
    save (date) {
      this.$refs.menu.save(date)
    },
    async submit () {
      let data = {enfant: {prenom: this.prenom, nom: this.nom, sexe: this.sexe, date_naissance: this.date}}
      this.$emit('submit', data)
    },
    back () {
      this.$router.push({
        name: 'Accueil'
      })
    }
  },
  computed: {
    dateFr () {
      var dateString = null
      if (this.date != null) {
        var d = new Date(this.date)
        let day = d.getDate()
        let month = mois[d.getMonth()]
        let year = d.getFullYear()
        dateString = day + ' ' + month + ' ' + year
      }
      return dateString
    }
  }
}
</script>

<style scoped>
</style>
