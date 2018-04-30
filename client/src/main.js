// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/fonts/material-icons.css'
import * as VueGoogleMaps from 'vue2-google-maps'
import { sync } from 'vuex-router-sync'
import store from '@/store/store'
import VueSocketIO from 'vue-socket.io'

Vue.use(VueSocketIO, 'http://localhost:3000/evenements/')

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAabldVSjuMacgEoLn5rKy2KJng0qLX6kk',
    libraries: 'places'
  }
}) // utiliser google map

/* Vue.directive('pageTitre', {
  inserted: function (el, binding) {
    document.title = binding.value
  },
  update: function (el, binding) {
    document.title = binding.value
  }
}) */
// creation d'une directive permettant de changer le titre de la page

Vue.use(Vuetify)

sync(store, router)

Vue.config.productionTip = false
// in init router file
router.afterEach(route => {
  document.title = route.meta.title
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
