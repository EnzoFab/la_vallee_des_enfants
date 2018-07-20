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
// import VueSpinners from 'vue-spinners'
import 'vue-spinners/dist/vue-spinners.css'
import VueSpinners from 'vue-spinners/dist/vue-spinners.common'
import Notifications from 'vue-notification'


Vue.use(VueSpinners)
Vue.use(VueSocketIO, process.env.BASE_URL + '/post')
Vue.use(Notifications)

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
/* Vue.directive('click-outside', {
  bind: function (el, binding, vnode) {
    el.eventSetDrag = function () {
      el.setAttribute('data-dragging', 'yes');
    }
    el.eventClearDrag = function () {
      el.removeAttribute('data-dragging');
    }
    el.eventOnClick = function (event) {
      let dragging = el.getAttribute('data-dragging');
      // Check that the click was outside the el and its children, and wasn't a drag
      if (!(el === event.target || el.contains(event.target)) && !dragging) {
        // call method provided in attribute value
        vnode.context[binding.expression](event);
      }
    };
    document.addEventListener('touchstart', el.eventClearDrag);
    document.addEventListener('touchmove', el.eventSetDrag);
    document.addEventListener('click', el.eventOnClick);
    document.addEventListener('touchend', el.eventOnClick);
  }, unbind: function (el) {
    document.removeEventListener('touchstart', el.eventClearDrag);
    document.removeEventListener('touchmove', el.eventSetDrag);
    document.removeEventListener('click', el.eventOnClick);
    document.removeEventListener('touchend', el.eventOnClick);
    el.removeAttribute('data-dragging');
  },
}); */

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
