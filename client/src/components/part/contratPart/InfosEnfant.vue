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
            required
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
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
            @click="cancel"
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

  <!--<v-card>
    <v-layout row wrap>
      <v-flex  xs12 md6 offset-md3 class="my-5">
        <v-toolbar color="light-green lighten-4">
          <v-spacer></v-spacer>
          <v-toolbar-title>Informations de l'enfant</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-form>
          <v-text-field
            label="Nom de l'enfant"
            color="light-blue darken-4"
            required
          ></v-text-field>
          <v-text-field
            label="Prénom de l'enfant"
            color="light-blue darken-4"
            required
          ></v-text-field>
          <h3>Sexe</h3>
          <v-radio-group v-model="row" mandatory="true" row>
            <v-spacer></v-spacer>
            <v-radio label="Une fille" value="F" ></v-radio>
            <v-radio label="Un garçon" value="G"></v-radio>
            <v-spacer></v-spacer>
          </v-radio-group>
          <v-spacer></v-spacer>
          <h3>Date de naissance :</h3>
          <v-flex xs12 sm6 md4>
            <v-dialog
              ref="dialog"
              persistent
              v-model="modal"
              lazy
              full-width
              width="290px"
              :return-value.sync="date"
            >
              <v-text-field
                slot="activator"
                label="Date de naissance"
                v-model="date"
                prepend-icon="event"
                readonly
                required
              ></v-text-field>
              <v-date-picker v-model="date" scrollable day-format="fr" locale="fr">
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-flex>
        </v-form>
      </v-flex>
    </v-layout>
  </v-card> -->
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
    submit () {
      let data = {
        prenom: this.prenom,
        nom: this.nom,
        sexe: this.sexe,
        date_naissance: new Date(this.date)
      }
      console.log(data.date_naissance)
      this.$emit('submit', data)
    },
    cancel () {
      // TODO choisir la route de redirection
      this.$route.redirect('/')
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
