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
          <router-view id="body" />
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
    ToolbarAssMat,
    ToolbarEmployeur},
  data () {
    return {
      drawer: false
    }
  },
  methods: {
    toogleDrawer: function () {
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
/* Custom scrollbar */
body::-webkit-scrollbar {
  width: 9px;
  background-color: #BDBDBD;
  border-radius: 10px;
}
body::-webkit-scrollbar-thumb {
  background-color: #BDBDBD;
  border-radius: 10px;
}
body::-webkit-scrollbar-track {
  -webkit-box-shadow: 0 0 6px rgba(0,0,0,0.3);
  background-color: #ECEFF1;
}

/* Custom scrollbar */
.scroll-y::-webkit-scrollbar {
  width: 6px;
  background-color: #E1F5FE;
  border-radius: 45px;
}
.scroll-y::-webkit-scrollbar-thumb {
  background-color: #E1F5FE;
  border-radius: 45px;
}
.scroll-y::-webkit-scrollbar-track {
  background-color: #ECEFF1;
}


.lightOpcity{
  opacity: 0.9;
}
#body{
  min-height: 30vw;
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
