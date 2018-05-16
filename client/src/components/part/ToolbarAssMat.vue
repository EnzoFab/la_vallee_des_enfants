<template>
  <v-toolbar app fixed tabs clipped-left light dense color="blue-grey lighten-5">
    <v-tabs icons-and-text fixed-tabs slot="extension" light color="blue-grey lighten-5" >
      <v-tabs-slider color="blue"></v-tabs-slider>
      <v-tab to="/" >
        <h4 class="purple--text">Accueil</h4>
        <v-icon x-large color="purple">home</v-icon>
      </v-tab>
      <v-tab>
        <v-menu offset-y open-on-hover transition="scale-transition"  class="tabs__div">
          <a class="tabs__item" slot="activator" >
            <h4 class="pink--text">Présences</h4>
          <v-icon x-large color="pink">access_time</v-icon>
          </a>
          <v-list class="grey lighten-3" >
            <router-link avatar v-for="menu in menusPresence" :key="menu.id" :to="menu.route" tag="v-list-tile">
              <v-list-tile-avatar>
                <v-icon medium :class="[menu.iconClass]">{{ menu.icon }}</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{ menu.title }}</v-list-tile-title>
              </v-list-tile-content>
            </router-link>
          </v-list>
        </v-menu>
      </v-tab>
      <v-tab to="/assistante/inscription"  ripple class="d-inline-block">
        <h4 class="blue--text"> Inscription </h4>
        <v-icon x-large color="blue">assignment</v-icon>
      </v-tab>
      <v-tab>
        <v-menu offset-y open-on-hover transition="scale-transition"  class="tabs__div">
          <a class="tabs__item" slot="activator" >
            <h4 class="blue--text">Contrats</h4>
            <v-icon x-large color="blue">attach_file</v-icon>
          </a>
          <v-list class="grey lighten-3" >
            <v-list-tile avatar @click="nouveauContrat" >
              <v-list-tile-avatar>
                <v-icon medium class="transparent grey--text">edit</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>Créer un contrat</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile avatar to="/contrat" >
              <v-list-tile-avatar>
                <v-icon medium class="transparent lighten-1 grey--text">visibility</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>Consulter mes contrats</v-list-tile-title>
              </v-list-tile-content>

            </v-list-tile>
          </v-list>
        </v-menu>
      </v-tab>
      <v-tab to="/actualites" class="d-inline-block" ripple>
        <h4 class="indigo--text"> Fil d'actualité </h4>
        <v-icon x-large color="indigo">event</v-icon>
      </v-tab>
      <v-menu offset-y open-on-hover transition="scale-transition"  class="tabs__div">
        <a class="tabs__item" slot="activator" >
          <h4 class="teal--text">Compte</h4>
          <v-icon x-large color="teal">edit</v-icon>
        </a>
        <v-list class="grey lighten-3" >
          <router-link avatar key="paramcompte" to="/parametres" tag="v-list-tile">
            <v-list-tile-avatar>
              <v-icon medium class="transparent grey--text">event</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>Paramètres</v-list-tile-title>
            </v-list-tile-content>
          </router-link>
          <router-link avatar key="deco" to="/" tag="v-list-tile">
            <v-list-tile-avatar>
              <v-icon medium>exit_to_app</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content @click="logout">
              <v-list-tile-title>Deconnexion</v-list-tile-title>
            </v-list-tile-content>
          </router-link>
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
      ],
      menusContrat: [
        {
          id: 'c1',
          icon: 'edit',
          iconClass: 'transparent grey--text',
          title: 'Créer un contrat',
          route: '/contrat'
        },
        {
          id: 'c2',
          icon: 'visibility',
          iconClass: 'transparent lighten-1 grey--text',
          title: 'Consulter mes contrats',
          route: '/contrat'
        }
      ],
      menusPost: [
        {
          id: 'po1',
          icon: 'edit',
          iconClass: 'transparent grey--text',
          title: 'Éditer un post',
          route: '/post/creer'
        },
        {
          id: 'po2',
          icon: 'event',
          iconClass: 'transparent lighten-1 grey--text',
          title: 'Mes posts',
          route: '/post/consulter'
        }
      ]
    }
  },
  methods: {
    logout () {
      console.log('logout')
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
