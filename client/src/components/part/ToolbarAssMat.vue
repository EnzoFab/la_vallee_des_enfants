<template>
  <v-toolbar app fixed tabs clipped-left light dense color="blue-grey lighten-5">
    <v-tabs icons-and-text fixed-tabs slot="extension" light color="blue-grey lighten-5" >
      <v-tabs-slider color="blue"></v-tabs-slider>
      <v-tab>
        <router-link to="/assistante/accueil" tag="v-tab">
          <h4 class="purple--text">Accueil</h4>
          <v-icon x-large color="purple">home</v-icon>
        </router-link>
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
      <v-tab>
        <v-menu offset-y open-on-hover transition="scale-transition"  class="tabs__div">
          <a class="tabs__item" slot="activator" >
            <h4 class="blue--text">Contrats</h4>
            <v-icon x-large color="blue">attach_file</v-icon>
          </a>
          <v-list class="grey lighten-3" >
            <router-link avatar v-for="menu in menusContrat" :key="menu.id" :to="menu.route" tag="v-list-tile">
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
      <v-tab>
        <router-link to="/assistante/facture" tag="v-tab">
          <h4 class="green--text">Fiches de paie</h4>
          <v-icon x-large color="green">library_books</v-icon>
        </router-link>
      </v-tab>
      <v-tab>
        <v-menu offset-y open-on-hover transition="scale-transition"  class="tabs__div">
          <a class="tabs__item" slot="activator" >
          <h4 class="indigo--text">Posts</h4>
          <v-icon x-large color="indigo">edit</v-icon>
          </a>
          <v-list class="grey lighten-3" >
            <router-link avatar v-for="menu in menusPost" :key="menu.id" :to="menu.route" tag="v-list-tile">
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
      <v-tab>
        <v-menu offset-y open-on-hover transition="scale-transition"  class="tabs__div">
          <a class="tabs__item" slot="activator" >
            <h4 class="teal--text">Compte</h4>
            <v-icon x-large color="teal">edit</v-icon>
          </a>
          <v-list class="grey lighten-3" >
            <v-list-tile avatar key="paramcompte" to="/assistante/parametres">
              <v-list-tile-avatar>
                <v-icon medium class="transparent grey--text">event</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>Parametres</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile avatar key="deco" tag="v-list-tile" @click="logout">
              <v-list-tile-avatar>
                <v-icon medium>exit_to_app</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content >
                <v-list-tile-title>Deconnexion</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-tab>
      </v-tabs>
  </v-toolbar>
</template>

<script>
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
          route: '/assistante/presence/consulter'
        },
        {
          id: 'p2',
          icon: 'alarm_on',
          iconClass: 'transparent lighten-1 grey--text',
          title: 'Pointer',
          route: '/assistante/presence/pointer'
        }
      ],
      menusContrat: [
        {
          id: 'c1',
          icon: 'edit',
          iconClass: 'transparent grey--text',
          title: 'Créer un contrat',
          route: '/assistante/contrat/creer'
        },
        {
          id: 'c2',
          icon: 'visibility',
          iconClass: 'transparent lighten-1 grey--text',
          title: 'Consulter mes contrats',
          route: '/assistante/contrat/consulter'
        },
        {
          id: 'c3',
          icon: 'border_color',
          iconClass: 'transparent lighten-1 grey--text',
          title: 'Modifier un contrat',
          route: '/assistante/contrat/modifier'
        }
      ],
      menusPost: [
        {
          id: 'po1',
          icon: 'edit',
          iconClass: 'transparent grey--text',
          title: 'Éditer un post',
          route: '/assistante/post/creer'
        },
        {
          id: 'po2',
          icon: 'event',
          iconClass: 'transparent lighten-1 grey--text',
          title: 'Mes posts',
          route: '/assistante/post/consulter'
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
    }
  }
}
</script>

<style scoped>

</style>
