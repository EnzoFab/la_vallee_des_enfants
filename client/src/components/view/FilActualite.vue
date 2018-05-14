<template>
  <v-container fluid>
    <!-- <Calendar :customEvents="post"></Calendar> -->
    <v-progress-circular
      :size="100"
      :width="15"
      :rotate="360"
      :value="progress"
      v-if="progress !== 0"
      color="teal"
    ></v-progress-circular>
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
          <v-toolbar color="pink" dark>
            <v-spacer></v-spacer>
            <span class="headline">Nouveau post</span>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-form ref="form" enctype="multipart/form-data">
            <v-card>
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
                      <input label="image" style="display: none" type="file" @change="onFileChange" name="image" accept="image/*"
                      ref="fileInput"/>
                      <v-btn
                        round color="indigo"
                        outline large
                        v-if="imgPath == null"
                        @click="$refs.fileInput.click()"
                      >
                        Ajouter une image
                      </v-btn>
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
import FileService from '../../services/FileService'
export default {
  name: 'Evenements',
  components: {Calendar},
  data () {
    return {
      posts: [],
      dialog: false,
      imgPath: null,
      image: null,
      postMessage: null,
      postTitre: null,
      progress: 0
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
        this.image = files[0]
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
      this.image = null
    },
    async creerPost (image) {
      const data = {post: {image: image || this.image.name, message: this.postMessage, titre: this.postTitre, id_am: this.$store.state.assMat.id_assmat}}
      try {
        let r = await PostService.create(data)
        return r.erreur != null
      } catch (error) {
        console.log(error)
        this.error = error.response.data.error
        return false
      }
    },
    async saveImg () { // sauvegarde l'image sur le serveur
      const formData = new FormData()
      formData.append('image', this.image, this.image.name)
      try {
        let response = await FileService.postImg(formData
          /*, {
          onUploadProgress (e) {
            console.log(this.progress)
            this.progress += e.loaded * 100 / e.total
            if (this.progress === 100) {
              this.progress = 0
            }
          }
        } */
        )
        if (response.data.erreur == null) {
          console.log(response.data)
          return response.data.image
        } else {
          return null
        }
      } catch (e) {
        console.log(e)
        return null
      }
    },
    async envoyer () {
      try {
        let image = await this.saveImg()
        console.log(image)
        if (image != null && this.creerPost(image)) {
          let post = {
            image: process.env.BASE_URL + '/' + image, // this.imgPath,
            message: this.postMessage,
            titre: this.postTitre
          }
          console.log(post)
          this.posts.push(post)
          this.$socket.emit('nouveauPost', post) // envoie le nouveau post à tous les autres
          this.clearForm()
        } else {
          console.log('Il y a un problème dans la création du post')
        }
      } catch (e) {
        console.log(e)
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
