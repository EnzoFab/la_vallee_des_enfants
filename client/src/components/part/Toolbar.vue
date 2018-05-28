<template>
  <v-toolbar app fixed tabs clipped-left light dense color="blue-grey lighten-5">
    <v-spacer></v-spacer>
    <v-toolbar-title><h3 class="teal--text">La vallée des enfants</h3></v-toolbar-title>
    <v-spacer></v-spacer>

    <v-tabs icons-and-text fixed-tabs slot="extension" light color="blue-grey lighten-5" >
      <v-tabs-slider color="blue"></v-tabs-slider>
      <v-tab to="/" class="d-inline-block" ripple>
        <h4 class="pink--text"> Accueil </h4>
        <v-icon x-large color="pink">fa-home</v-icon>
      </v-tab>
      <v-tab to="/actualites" class="d-inline-block" ripple>
        <h4 class="light-green--text"> Fil d'actualité </h4>
        <v-icon x-large color="light-green">event</v-icon>
      </v-tab>
      <!-- <v-tab to="/assistante/inscription"  ripple class="d-inline-block">
        <h4 class="blue--text"> Inscription </h4>
        <v-icon x-large color="blue">assignment</v-icon>
      </v-tab> -->
      <v-tab to="/contact"  ripple class="d-inline-block">
        <h4 class="light-blue--text"> Contact </h4>
        <v-icon x-large color="light-blue">contact_mail</v-icon>
      </v-tab>
      <v-menu offset-y open-on-hover transition="scale-transition"  class="tabs__div">
        <a class="tabs__item" slot="activator" >
          <h4 class="indigo--text"> Connexion </h4>
          <v-icon x-large color="indigo">account_box</v-icon>
        </a>
        <v-list class="grey lighten-3" >
          <v-list-tile avatar v-for="menu in menus" :key="menu.id" :to="menu.route">
            <v-list-tile-avatar>
              <v-icon medium :class="[menu.iconClass]">{{ menu.icon }}</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ menu.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>

    </v-tabs>
  </v-toolbar>
</template>

<script>
export default {
  name: 'Toolbar',
  data () {
    return {
      menus: [
        {id: 1, icon: 'face', iconClass: 'transparent grey--text', title: 'Assistante maternelle', route: '/assistante/connexion'},
        {id: 2, icon: 'wc', iconClass: 'transparent lighten-1 grey--text', title: 'Parents', route: '/employeur/connexion'}
      ]
    }
  },
  methods: {
    emitEvent () {
      this.$emit('toogleDrawer')
    }
  }
}
</script>

<style scoped>
  h1, h2, h3, span {
    font-size: 25px;
    font-family: 'Handlee', cursive;;

  }

</style>
