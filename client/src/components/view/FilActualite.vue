<template>
  <v-container fluid>
    <!-- <Calendar :customEvents="post"></Calendar> -->
    <v-card>
      <v-container fluid style="min-height: 0;" grid-list-lg>
        <v-layout row wrap>
          <v-flex v-for="(post,i) in posts" :key="i" xs12 sm12 md12>
            <v-card color="purple" class="white--text">
              <v-container fluid grid-list-lg>
                <v-layout row>
                  <v-flex xs5>
                    <v-card-media
                      :src="post.image"
                      height="200px"
                      contain
                    ></v-card-media>
                  </v-flex>
                  <v-flex xs7>
                    <div>
                      <div class="headline">{{post.titre}}</div>
                      <div>{{post.message}}</div>
                    </div>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <v-card-text style="height: 100px; position: relative">
        <v-dialog v-model="dialog" persistent max-width="500px">
          <v-fab-transition slot="activator">
            <v-btn
              color="pink"
              dark
              large
              absolute
              bottom
              right
              fab
              @click.stop="dialog = true"
            >
              <v-icon>add</v-icon>
            </v-btn>
          </v-fab-transition>
          <v-form ref="form">
            <v-card>
              <v-card-title>
                <span class="headline">Nouveau post</span>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12 sm12 md12>
                      <v-text-field label="Titre"  v-model="postTitre"
                                    hint="titre de votre post (pas obligatoire)"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                      <v-badge color="red" overlap v-if="imgPath != null">
                        <v-btn slot="badge" dark small @click="removeImage" icon>
                          <v-icon>clear</v-icon>
                        </v-btn>
                        <v-avatar size="110px" color="grey lighten-4">
                          <img :src="imgPath" alt="image"/>
                        </v-avatar>
                      </v-badge>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                      <input label="image" type="file" @change="onFileChange" v-if="imgPath == null"/>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                      <v-text-field
                        label="Texte"
                        hint="Texte que vous voulez partager"
                        multi-line
                        v-model="postMessage"
                        persistent-hint
                        required
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click="clearForm">Annuler</v-btn>
                <v-btn color="blue darken-1" flat @click="envoyer">Envoyer</v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-dialog>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import Calendar from '../part/Calendar'
import PostService from '../../services/PostService'
export default {
  name: 'Evenements',
  components: {Calendar},
  data () {
    return {
      posts: [],
      dialog: false,
      imgPath: null,
      postMessage: null,
      postTitre: null
    }
  },
  sockets: {
    connect: function () {
      console.log('socket connected')
    },
    customEmit: function (val) {
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
    },
    nouveauPost (data) {
      this.posts.push(data)
    }
  },
  methods: {
    onFileChange (e) {
      var files = e.target.files || e.dataTransfer.files
      if (files.length !== undefined) {
        this.createImage(files[0])
      }
    },
    createImage (file) {
      var reader = new FileReader()
      var vm = this

      reader.onload = (e) => {
        vm.imgPath = e.target.result
      }
      reader.readAsDataURL(file)
    },
    removeImage (e) {
      this.imgPath = null
    },
    async creerPost () {
      const data = {post: {image: this.imgPath, message: this.postMessage, titre: this.postTitre, id_am: this.$store.state.assMat.id_am}}
      try {
        let r = await PostService.create(data)
        return r.erreur == null
      } catch (error) {
        console.log(error)
        this.error = error.response.data.error
        return false
      }
    },
    envoyer () {
      if (this.creerPost()) {
        let post = {
          image: this.imgPath,
          message: this.postMessage,
          titre: this.postTitre
        }
        this.posts.push(post)
        this.$socket.emit('nouveauPost', post) // envoie le nouveau post à tous les autres
        this.clearForm()
      } else {
        console.log('Il y a un problème dans la création du post')
      }
    },
    clearForm () {
      this.$refs.form.reset()
      this.imgPath = null
      this.dialog = false
    }
  },
  mounted () {
    console.log('Mounted')
    // faire une requete ajax pour charger tous les evenements
  }
}

</script>

<style scoped>

</style>
