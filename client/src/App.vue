<template>
  <div id="app">
    <v-app light>
      <v-toolbar fixed tabs>
        <v-tabs icons-and-text centered dark color="teal lighten-3" >
          <v-tabs-slider color="red"></v-tabs-slider>
          <v-tab href="#tab-1" color="yellow">
            Recents
            <v-icon>phone</v-icon>
          </v-tab>
          <v-tab href="#tab-2">
            Contact
            <v-icon>favorite</v-icon>
          </v-tab>
          <v-tab href="#tab-3">
            Nearby
            <v-icon>account_box</v-icon>
          </v-tab>
        </v-tabs>
      </v-toolbar>
      <router-view/>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 1080px;
}
#fixed_toolbar{
  position:sticky;
  top:1px;
  z-index: 7;
}
@import '~vuetify/src/stylus/main.styl';
</style>
