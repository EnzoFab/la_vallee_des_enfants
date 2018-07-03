<template>
  <v-toolbar app fixed tabs clipped-left light dense color="blue-grey lighten-5">
    <v-tabs icons-and-text fixed-tabs slot="extension" light color="blue-grey lighten-5" >
      <v-tabs-slider color="blue"></v-tabs-slider>
      <v-tab to="/" >
        <h4 class="purple--text">Accueil</h4>
        <v-icon x-large color="purple">home</v-icon>
      </v-tab>
      <v-tab to="/presence/saisir"  ripple class="d-inline-block">
        <h4 class="pink--text"> Présences </h4>
        <v-icon x-large color="pink">access_time</v-icon>
      </v-tab>
      <v-tab to="/contrat"  ripple class="d-inline-block">
        <h4 class="orange--text"> Contrats </h4>
        <v-icon x-large color="orange">description</v-icon>
      </v-tab>
      <v-tab to="/actualites" class="d-inline-block" ripple>
        <h4 class="blue--text"> Fil d'actualité </h4>
        <v-icon x-large color="blue">event</v-icon>
      </v-tab>
      <v-menu offset-y open-on-hover transition="scale-transition"  class="tabs__div">
        <a class="tabs__item" slot="activator" >
          <h4 class="teal--text">Compte</h4>
          <v-icon x-large color="teal">account_circle</v-icon>
        </a>
        <v-list class="grey lighten-3" >
          <v-list-tile to="/assistante/inscription">
            <v-list-tile-avatar >
              <v-icon medium>person_add</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>Inscrire une assistante</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile avatar to="/assistante/parametres" >
            <v-list-tile-avatar>
              <v-icon medium class="transparent grey--text">settings</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>Paramètres</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile avatar to="/">
            <v-list-tile-avatar>
              <v-icon medium>exit_to_app</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content @click="logout">
              <v-list-tile-title>Deconnexion</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-tabs>
  </v-toolbar>
</template>

<script>
var randomstring = require('randomstring')
export default {
  name: 'ToolbarAssMat',
  data () {
    return {
      menusPresence: [
        {
          id: 'p1',
          icon: 'event_note',
          iconClass: 'transparent grey--text',
          title: 'Consulter le planning',
          route: '/presence/consulter'
        },
        {
          id: 'p2',
          icon: 'alarm_on',
          iconClass: 'transparent lighten-1 grey--text',
          title: 'Pointer',
          route: '/presence/saisir'
        }
      ]
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('removeAssMat')
      this.$router.push({
        name: 'Accueil'
      })
    },
    nouveauContrat () {
      this.storeRandomString() // crée une chaine de charactere aleatoire et la stocke dans le store
      this.$router.push({
        name: 'NouveauContrat'
      })
    },
    storeRandomString () {
      let random = randomstring.generate(35) // chaine de charactere aleatoire de taille 15
      this.$store.dispatch('setNumContrat', random)
    }
  }
}
</script>

<style scoped>

</style>
