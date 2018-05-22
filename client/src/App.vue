<template>
  <div id="app">
    <v-app light>
      <ToolbarAssMat class="lightOpcity" v-if="assMatConnecte"></ToolbarAssMat>
      <ToolbarEmployeur class="lightOpcity" v-if="employeurConnecte"></ToolbarEmployeur>
      <Toolbar class="lightOpcity" v-if="!assMatConnecte && !employeurConnecte"></Toolbar>
      <v-content>
        <transition name="custom-classes-transition"
                    enter-active-class="animated fadeIn"
                    leave-active-class="animated bounceOutDown"
                    mode="out-in"
                    :duration="500"
        >
          <router-view />
        </transition>
        <Footer></Footer>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import Drawer from './components/part/Drawer'
import Toolbar from './components/part/Toolbar'
import Footer from './components/part/Footer'
import ToolbarAssMat from './components/part/ToolbarAssMat'
import ToolbarEmployeur from './components/part/ToolbarEmployeur'
export default {
  name: 'App',
  components: {
    Footer,
    Toolbar,
    Drawer,
    ToolbarAssMat,
    ToolbarEmployeur},
  data () {
    return {
      drawer: false
    }
  },
  methods: {
    toogleDrawer: function () {
      console.log('Toogle')
      this.drawer = !this.drawer // affiche ou masque le navigation drawer
    }
  },
  computed: {
    assMatConnecte () {
      return this.$store.getters.connectedUser !== null && this.$store.getters.connectedUser.rang === 'Assmat'
    },
    employeurConnecte () {
      return this.$store.getters.connectedUser !== null && this.$store.getters.connectedUser.rang === 'Employeur'
    }
  },
  mounted () {
    console.log(this.$store.state)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.lightOpcity{
  opacity: 0.9;
}
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@import '~vuetify/src/stylus/main.styl';
</style>
