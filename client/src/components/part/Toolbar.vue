<template>
  <v-toolbar app fixed tabs clipped-left light dense color="blue-grey lighten-5">
    <v-toolbar-side-icon  @click.stop="emitEvent()"></v-toolbar-side-icon>
    <v-spacer></v-spacer>
    <v-toolbar-title><h3 class="teal--text">La vallée des enfants</h3></v-toolbar-title>
    <v-spacer></v-spacer>

    <v-tabs icons-and-text fixed-tabs slot="extension" light color="blue-grey lighten-5" >
      <v-tabs-slider color="blue"></v-tabs-slider>
      <router-link to="/" tag="v-tab">
        <h4 class="pink--text"> Accueil </h4>
        <v-icon x-large color="pink">fa-home</v-icon>
      </router-link>
      <router-link to="/evenement" tag="v-tab">
        <h4 class="light-green--text"> Événements </h4>
        <v-icon x-large color="light-green">event</v-icon>
      </router-link>
      <router-link to="/contact" tag="v-tab">
        <h4 class="light-blue--text"> Contact </h4>
        <v-icon x-large color="light-blue">contact_mail</v-icon>
      </router-link>

      <v-menu offset-y open-on-hover transition="scale-transition"  class="tabs__div">
        <a class="tabs__item" slot="activator" >
          <h4 class="indigo--text"> Connexion </h4>
          <v-icon x-large color="indigo">account_box</v-icon>
        </a>
        <v-list class="grey lighten-3" >
          <router-link avatar v-for="menu in menus" :key="menu.id" :to="menu.route" tag="v-list-tile">
            <v-list-tile-avatar>
              <v-icon medium :class="[menu.iconClass]">{{ menu.icon }}</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ menu.title }}</v-list-tile-title>
            </v-list-tile-content>
          </router-link>
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
        {id: 2, icon: 'wc', iconClass: 'transparent lighten-1 grey--text', title: 'Parents', route: 'parent/connexion'}
      ]
    }
  },
  methods: {
    emitEvent () {
      this.$emit('toogleDrawer')
      // emet l'enenement qui sera recu par le composant parents
    }
  }
}
</script>

<style scoped>

</style>
