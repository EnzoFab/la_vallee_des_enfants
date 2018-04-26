<template>
  <v-toolbar app fixed tabs clipped-left light dense color="blue-grey lighten-5">
    <v-toolbar-side-icon  @click.stop="emitEvent()"></v-toolbar-side-icon>
    <v-spacer></v-spacer>
    <v-toolbar-title><i>La vallée des enfants</i></v-toolbar-title>
    <v-spacer></v-spacer>

    <v-tabs icons-and-text fixed-tabs slot="extension" light color="blue-grey lighten-5" >
      <v-tabs-slider color="grey darken-1"></v-tabs-slider>
      <router-link to="/" tag="v-tab">
        Accueil
        <v-icon x-large>fa-home</v-icon>
      </router-link>
      <router-link to="/evenement" tag="v-tab">
        Evénement
        <v-icon x-large>event</v-icon>
      </router-link>
      <router-link to="/contact" tag="v-tab">
        Contact
        <v-icon x-large>contact_mail</v-icon>
      </router-link>

      <v-menu offset-y open-on-hover transition="scale-transition"  class="tabs__div">
        <a class="tabs__item" slot="activator" >
          Connexion
          <v-icon x-large>account_box</v-icon>
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
