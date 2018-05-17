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
        <v-alert v-model="erreur" type="error" dismissible>
         {{erreurMessage}}
        </v-alert>
        <v-layout row wrap>
          <v-flex v-if="posts == 0">
            <v-card>
              <v-card-media>
              </v-card-media>
            </v-card>
          </v-flex>
          <v-flex v-else v-for="(post,i) in posts" :key="i" xs12 sm6 offset-sm3>
            <v-card>
              <v-card-media
                :src="post.image"
                height="200px"
              >
              </v-card-media>
              <v-card-title primary-title>
                <div>
                  <div class="headline">{{post.titre}}</div>
                  <span class="grey--text">{{post.date}}</span>
                </div>
              </v-card-title>
              <v-card-actions>
                <v-btn icon @click.native="post.contentVisible = !post.contentVisible">
                  <v-icon>{{ post.contentVisible ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
                </v-btn>
              </v-card-actions>
              <v-slide-y-transition>
                <v-card-text v-show="post.contentVisible">
                  {{post.message}}
                </v-card-text>
              </v-slide-y-transition>
              <v-card-text>
                <v-btn
                  v-if="isAssMatConnected"
                  outline color="indigo"
                  @click="deletePost(post)"
                >Supprimer ce post</v-btn>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <v-card-text style="height: 100px; position: relative">
        <v-dialog v-model="dialog" persistent max-width="500px" v-if="isAssMatConnected">
          <v-fab-transition slot="activator">
            <v-btn
              v-if="isAssMatConnected"
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
let mois = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre']
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
      progress: 0,
      erreur: false,
      erreurMessage: ''
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
    },
    suppressionPost (data) {
      this.deletePost(data)
    }
  },
  methods: {
    onFileChange (e) {
      var files = e.target.files || e.dataTransfer.files
      if (files.length !== undefined) {
        this.image = files[0]
        if (!this.image.type.includes('image/')) {
          this.dialog = false
          this.clearForm()
          this.triggerErreur('Fichier non supporté')
        } else {
          this.createImage(files[0])
        }
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
      const data = {
        post: {
          image: image.url || this.image.name,
          message: this.postMessage,
          titre: this.postTitre,
          id_am: this.$store.state.assMat.id_assmat,
          image_id: image.public_id
        }
      }
      console.log('=======DATA===', data)
      try {
        let r = await PostService.create(data)
        if (r.data.erreur == null) {
          return {
            id_post: r.id_post,
            image_id: r.imageID
          }
        } else {
          this.triggerErreur('Une erreur est survenue')
        }
      } catch (error) {
        this.triggerErreur(error.toString())
        return null
      }
    },
    async saveImg () { // sauvegarde l'image sur le serveur
      if (this.image) {
        const formData = new FormData()
        console.log('IMAGE====', this.image)
        formData.append('image', this.image, this.image.name)
        try {
          let response = await FileService.postImg(formData,
            {onUploadProgress (e) {
              console.log(this.progress)
              this.progress += e.loaded * 100 / e.total
              if (this.progress === 100) {
                this.progress = 0
              }
            }}
          )
          console.log(response.data)
          if (response.data.erreur == null) {
            console.log(response.data.resultats)
            return response.data.resultats
          } else {
            this.triggerErreur('Une erreur est survenue')
            return null
          }
        } catch (e) {
          this.triggerErreur(e.toString())
          return null
        }
      } else {
        return null
      }
    },
    async envoyer () {
      try {
        let image = await this.saveImg()
        console.log(image)
        if (image != null) {
          let result = await this.creerPost(image)
          if (result != null) {
            let post = {
              image: image.url, // this.imgPath,
              message: this.postMessage,
              titre: this.postTitre,
              id_post: result.id_post,
              image_id: result.image_id,
              date: this.dateFr(new Date()),
              contentVisible: false
            }
            console.log(post)
            this.posts.push(post)
            this.$socket.emit('nouveauPost', post) // envoie le nouveau post à tous les autres
            this.clearForm()
          } else {
            this.triggerErreur('Il y a un problème dans la création du post')
          }
        } else {
          this.triggerErreur('Il y a un problème dans la création du post')
        }
      } catch (e) {
        console.log(e)
      }
    },
    async deleteHostedImage (imageId) { // supprime l'image du serveur
      console.log('PUBLIC ID ', imageId)
      try {
        let response = await FileService.deleteImg(imageId)
        if (response.data.erreur == null) {
          return true
        } else {
          console.log('SUPER ERREUR', response.data.erreur)
          // this.triggerErreur(response.data.erreur.toString())
          return false
        }
      } catch (e) {
        this.triggerErreur(e.toString())
        return false
      }
    },
    async deleteDBPost (idPost) { // permet de supprimer un dans la base de données
      try {
        let response = await PostService.delete(idPost)
        if (response.data.erreur == null) {
          return true
        } else {
          this.triggerErreur('Une erreur est survenue')
          return false
        }
      } catch (e) {
        this.triggerErreur(e.toString())
        return false
      }
    },
    async deletePost (post) {
      console.log('POST', post)
      if (await this.deleteDBPost(post.id_post) && await this.deleteHostedImage(post.image_id)) {
        this.deletePostFromArray(post)
        this.$socket.emit('suppressionPost', post)
      }
    },
    async initPost () {
      try {
        let response = await PostService.getAll()
        if (response.data.erreur == null) {
          let loadedPosts = response.data.posts
          let vm = this
          loadedPosts.forEach(function (post) {
            vm.posts.push({
              image: post.image, // this.imgPath,
              message: post.texte,
              titre: post.titre,
              id_post: post.id,
              image_id: post.image_id,
              date: vm.dateFr(post.date),
              contentVisible: false
            })
          })
        } else {
          this.triggerErreur(response.data.erreur.texte)
        }
      } catch (e) {
        this.triggerErreur(e.toString())
      }
    },
    clearForm () {
      this.$refs.form.reset()
      this.imgPath = null
      this.dialog = false
    },
    triggerErreur (erreur) {
      this.erreur = true
      this.erreurMessage = erreur
    },
    deletePostFromArray (post) { // supprime un post de la liste
      this.posts.splice(this.posts.indexOf(post), 1)
    },
    dateFr (date) {
      var dateString = null
      date = new Date(date)
      let day = date.getDate()
      let month = mois[date.getMonth()]
      let year = date.getFullYear()
      dateString = day + ' ' + month + ' ' + year

      return dateString
    }
  },
  computed: {
    /**
     * verifie si une assMat est connectée
     * @returns {boolean}
     */
    isAssMatConnected () {
      return this.$store.getters.isAssMatConnected
    }
  },
  mounted () {
    this.initPost()
  }
}

</script>

<style scoped>

</style>
