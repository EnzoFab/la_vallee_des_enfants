<template>
    <v-layout row wrap>
      <v-flex xs2 offset-xs8>
        <v-tab-reverse-transition>
          <v-btn icon large v-if="canDelete" @click="deleteSelectionneMessage">
            <v-icon>delete</v-icon>
          </v-btn>
        </v-tab-reverse-transition>
      </v-flex>
      <v-flex xs12>
        <v-expansion-panel expand popout focusable>
          <v-expansion-panel-content
            v-for="(message,i) in messages"
            :key="i"
            hide-actions
            :class="messageColor(message)"
            v-model="message.panelOuvert"
            lazy
          >
            <div slot="header">
              <v-layout row wrap>
                <v-flex xs1>
                  <v-checkbox v-model="message.selectionne"
                              @click.stop="message.selectionne = !message.selectionne"></v-checkbox>
                </v-flex>
                <v-flex xs2>{{message.mail}}</v-flex>
                <v-flex xs2>{{message.sujet}}</v-flex>
                <v-flex xs2>{{message.nom}}</v-flex>
                <v-flex xs2> {{message.date_envoi}}</v-flex>
                <v-flex xs3>{{message.truncate_text}}</v-flex>
              </v-layout>
            </div>
            <v-card class="grey lighten-4 scroll-y">
              <v-card-text>{{message.texte}}</v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
      <!-- <infinite-loading
        v-if="posts.length > 0"
        @infinite="infiniteHandler"
        force-use-infinite-wrapper="true"
        spinner="circles">
        <span slot="no-results"></span>
      </infinite-loading> -->
    </v-layout>
</template>

<script>
export default {
  name: 'AllContact',
  data () {
    return {
      messages: null
    }
  },
  methods: {
    /**
     *
     * @param limit: le nombre limite de message souhaité
     * @param offset: à partir de quel message on veut prendre 'limit' nombre de post
     */
    loadMessages (limit, offset) {
      this.messages = []
      for (let i = 0; i < 5; i++) {
        this.messages.push({
          mail: 'e@mail.com',
          date_envoi: new Date (),
          nom: 'Kevin',
          message_id: i,
          texte: 'Je suis un texte bien sympa qui est le meme partout',
          sujet: 'Un petit message',
          selectionne: false,
          messageOuvert: false,
          panelOuvert: false,
          truncate_text: 'Je suis un texte bien sympa...'
        })
      }
    },
    deleteMessage (id) {
      //
    },
    infiniteHandler ($state) {
      // load more mails
    },
    messageColor (message) {
      if (message.messageOuvert) {
        return 'blue-grey lighten-5'
      } else {
        return 'blue lighten-5'
      }
    },
    deleteSelectionneMessage () {
      let promises = []
      let vm = this
      for (let i = 0; i < this.messages.length; i++) {
        if (this.messages[i].selectionne) {
          promises.push(
            this.deleteMessage(this.messages[i].message_id).then(function () {
              vm.messages.splice(vm.messages.indexOf(this.messages[i]), 1)
            })
          )
        }
      }
      Promise.all(promises).then(function () {
        // attend que toutes les promises du tableau aient finies pour passer a la suite
        vm.$notify({
          group: 'assistante',
          title: 'Suppression',
          text: 'Les messages ont été supprimés avec succès',
          duration: 4000,
          speed: 500,
          type: 'success'
        })
      })
    }
  },
  computed: {
    canDelete () { // montrer ou non le bouton
      let resultat = false
      let i = 0
      while (i < this.messages.length && !resultat) {
        if (this.messages[i].selectionne) {
          resultat = true
        }
        i++
      }
      return resultat
    }
  },
  watch: {
    messages: {
      handler (v) {
        for (let i = 0; i < this.messages.length; i++) {
          if (this.messages[i].panelOuvert && !this.messages[i].messageOuvert) {
            this.messages[i].messageOuvert = true
          }
        }
      },
      deep: true
    }
  },
  mounted () {
    this.loadMessages(10, 0)
  }
}
</script>

<style scoped>

</style>
