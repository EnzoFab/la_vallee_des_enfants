<template>
  <div id="app">
    <v-app light>
      <Toolbar v-on:toogleDrawer="toogleDrawer" class="lightOpcity"></Toolbar>
        <v-content>
          <transition name="custom-classes-transition"
                      enter-active-class="animated fadeIn"
                      leave-active-class="animated bounceOutDown"
                      mode="out-in"
                      :duration="500"
          >
            <router-view />
          </transition>
        </v-content>
      <Footer></Footer>
    </v-app>
  </div>
</template>

<script>
import Drawer from './components/part/Drawer'
import Toolbar from './components/part/Toolbar'
import Footer from './components/part/Footer'
export default {
  name: 'App',
  components: {Footer, Toolbar, Drawer},
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
@import '~vuetify/src/stylus/main.styl';
</style>
