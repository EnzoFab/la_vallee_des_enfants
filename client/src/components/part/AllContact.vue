<template>
    <v-layout row wrap>
      <v-flex xs2 offset-xs9>
        <v-fade-transition>
          <div >
            <v-btn icon large @click="deleteSelectionneMessage" :disabled="!canDelete">
              <v-icon x-large color="blue-grey darken-1">delete_sweep</v-icon>
            </v-btn>
            <span :class="textColor">Supprimer mail(s)</span>
          </div>


        </v-fade-transition>
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
                <v-flex xs3>{{message.sujet}}</v-flex>
                <v-flex xs2> {{message.date_envoi}}</v-flex>
                <v-flex xs3>{{message.truncate_text}}</v-flex>
                <v-flex xs1>
                 <v-scale-transition>
                   <v-avatar v-if="!message.messageOuvert" color="transparent"  style="opacity: 0.8;">
                     <v-icon large color="indigo darken-4">fiber_new</v-icon>
                   </v-avatar>
                 </v-scale-transition>

                </v-flex>
              </v-layout>
            </div>
            <v-card class="grey lighten-4 scroll-y">
              <v-card-text>
                <v-layout row wrap>
                  <v-flex offset-xs2 xs8>{{message.texte}}</v-flex>
                  <v-flex offset-xs9 xs3>
                    <v-btn large outline>Répondre</v-btn>
                  </v-flex>
                </v-layout>
              </v-card-text>
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
import DateHelper from '../../helper/DateHelper'
import ContactService from '../../services/ContactService'


export default {
  name: 'AllContact',
  data () {
    return {
      messages: []
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
      let vm = this
      ContactService.getAll()
        .then(function (r) {
          if (r.data.erreur == null) {
            let contacts = r.data.contacts
            let truncateText = ''
            for (let i = 0; i < contacts.length; i++) {
              truncateText = contacts[i].message
              console.log(contacts[i])
              if (truncateText.length > 12) {
                truncateText = truncateText.substr(0, 12) + '...'
              }
              vm.messages.push({
                mail: contacts[i].mail,
                date_envoi: DateHelper.getDateFr(new Date (contacts[i].date_envoi)),
                message_id: contacts[i].id_contact,
                texte: contacts[i].message,
                sujet: contacts[i].sujet,
                selectionne: false,
                messageOuvert: contacts[i].ouvert,
                panelOuvert: false,
                truncate_text: truncateText
              })
            }
          } else {
            throw r.data.erreur
          }
        })
        .catch(function (e) {
        console.error(e.toString())
      })

    },
    deleteMessage (id) {
      return ContactService.delete(id)
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
            vm.deleteMessage(vm.messages[i].message_id).then(function () {
              vm.messages.splice(vm.messages.indexOf(vm.messages[i]), 1)
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
    },
    textColor () {
      let resultat = false
      let i = 0
      while (i < this.messages.length && !resultat) {
        if (this.messages[i].selectionne) {
          resultat = true
        }
        i++
      }
      if (resultat) {
        return 'black--text text-xs-center'
      } else {
        return 'grey--text'
      }
    }
  },
  watch: {
    messages: {
      handler (v) {
        let vm = this
        for (let i = 0; i < this.messages.length; i++) {
          if (this.messages[i].panelOuvert && !this.messages[i].messageOuvert) {
            ContactService.update(vm.messages[i].message_id).then((r) => {
              if (r.data.erreur == null) {
                vm.messages[i].messageOuvert = true
              } else {
                throw r.data.erreur
              }
            }).catch(() => {
              vm.$notify({
                group: 'assistante',
                title: 'Erreur',
                text: 'Une erreur est survenue',
                duration: 4000,
                speed: 500,
                type: 'error'
              })
            })
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
