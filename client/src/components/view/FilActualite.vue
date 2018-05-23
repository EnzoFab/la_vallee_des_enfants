<template>
  <v-container fluid class="my-1" >
    <v-layout column >
      <v-alert v-model="erreur" type="error" dismissible>
        {{erreurMessage}}
      </v-alert>
      <v-snackbar
        v-model="snackbar"
        absolute
        top
        right
        :color="snackBarColor"
      >
        <span>{{snackbarMessage}}</span>
        <v-icon dark>check_circle</v-icon>
        <v-btn dark flat fab @click.native="snackbar = false">
          <v-icon small dark>fa-times</v-icon>
        </v-btn>
      </v-snackbar>
      <v-flex xs12 sm6 >
        <v-toolbar color="purple lighten-3" dark>
          <v-dialog v-model="dialog" persistent max-width="500px" v-if="isAssMatConnected">
            <v-btn
              slot="activator"
              v-if="isAssMatConnected"
              color="deep-purple lighten-1"
              dark
              large
              icon
              @click.stop="dialog = true"
            >
              <v-icon large>add</v-icon>
            </v-btn>
            <v-toolbar color="pink" dark>
              <v-spacer></v-spacer>
              <span class="headline">Nouveau post</span>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-form ref="form" enctype="multipart/form-data" v-model="estValide">
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
                          <v-btn slot="badge" dark @click="removeImage" icon>
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
                          label="Message"
                          hint="Message que vous voulez partager"
                          multi-line
                          v-model="postMessage"
                          :rules="regleMessage"
                          persistent-hint
                          required
                        ></v-text-field>
                      </v-flex>
                      <v-fade-transition>
                        <v-flex xs12 sm12 md12>
                          <v-progress-circular :size="40" :width="7" indeterminate color="purple" v-if="showProgress"></v-progress-circular>
                        </v-flex>
                      </v-fade-transition>

                    </v-layout>
                  </v-container>
                  <small>*indicates required field</small>
                </v-card-text>
                <v-fade-transition>
                  <v-card-actions v-if="!showProgress">
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="clearForm">Annuler</v-btn>
                    <v-btn color="blue darken-1" flat @click="envoyer" :disabled="!estValide">Envoyer</v-btn>
                  </v-card-actions>
                </v-fade-transition>

              </v-card>
            </v-form>
          </v-dialog>
          <v-spacer></v-spacer>
          <v-toolbar-title>Fil d'actualité</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card style="overflow-y: scroll;" height="70vh" class="grey lighten-3">
          <v-container fluid grid-list-md >
            <v-layout row wrap>
              <v-flex v-if="posts.length == 0">
                <h1>Pas d'actualité pour le moment</h1><br>
                <img src="/static/baby.png" height="350vh"/>
              </v-flex>
              <v-flex v-if="posts.length > 0" v-for="(post,i) in posts" :key="i" v-bind="postLayout(i)" xs12>
                <v-slide-y-transition>
                  <v-card class="blue-grey lighten-5 elevation-8" >
                    <v-card-media
                      v-if="post.image != null"
                      :src="post.image"
                      height="400"
                    >
                    </v-card-media>
                    <v-card-title primary-title>
                      <div>
                        <div class="headline">{{post.titre}}</div>
                        <span class="grey--text">{{post.date}}</span>
                      </div>
                    </v-card-title>
                    <v-card-actions v-if="post.image != null">
                      <v-btn icon @click.native="post.contentVisible = !post.contentVisible">
                        <v-icon>{{ post.contentVisible ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
                      </v-btn>
                    </v-card-actions>
                    <v-card-text v-if="post.image == null">
                      {{post.message}}
                    </v-card-text>
                    <v-slide-y-transition>
                      <v-card-text v-show="post.contentVisible" v-if="post.image != null">
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
                </v-slide-y-transition>
              </v-flex>
              <infinite-loading
                v-if="posts.length > 0"
                @infinite="infiniteHandler"
                force-use-infinite-wrapper="true"
                spinner="circles">
                <span slot="no-results"></span>
              </infinite-loading>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import Calendar from '../part/Calendar'
import PostService from '../../services/PostService'
import FileService from '../../services/FileService'
import InfiniteLoading from 'vue-infinite-loading'
let mois = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre']
export default {
  name: 'Evenements',
  components: {Calendar, InfiniteLoading},
  data () {
    return {
      posts: [],
      dialog: false,
      progress: false,
      showProgress: false,
      imgPath: null,
      image: null,
      postMessage: null,
      postTitre: null,
      erreur: false,
      erreurMessage: '',
      snackbar: false,
      snackbarMessage: '',
      snackBarColor: '',
      estValide: false,
      regleMessage: [
        v => !!v || 'Impossible d\'envoyer un post vide'
      ]
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
      this.sortPost()
      this.triggerSnackBar('Nouveau post', 'success')
    },
    suppressionPost (data) {
      this.deletePost(data)
    }
  },
  methods: {
    infiniteHandler ($state) {
      let vm = this
      PostService.getAllLimit(9, this.posts.length).then(function (rslt) {
        if (rslt.data.erreur == null) {
          let loadedPost = rslt.data.posts
          loadedPost.forEach(function (post) {
            vm.posts.push({
              image: post.image, // this.imgPath,
              message: post.texte,
              titre: post.titre,
              id_post: post.id,
              image_id: post.image_id,
              date: vm.dateFr(post.date),
              contentVisible: false
            })
            $state.loaded()
          })
        } else {
          $state.complete()
          // vm.triggerErreur(rslt.data.erreur.texte)
        }
      }).catch(function (err) {
        console.log(err)
        vm.triggerErreur('Une erreur est survenue')
        $state.complete()
      })
    },
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
    async creerPost (data) {
      try {
        let r = await PostService.create(data)
        if (r.data.erreur == null) {
          return {
            id_post: r.data.id_post,
            image_id: r.data.imageID
          }
        } else {
          this.triggerErreur('Une erreur est survenue')
          return null
        }
      } catch (error) {
        this.triggerErreur(error.toString())
        return null
      }
    },
    async saveImg () { // sauvegarde l'image sur le serveur
      if (this.image && this.image != null) {
        const formData = new FormData()
        formData.append('image', this.image, this.image.name)
        try {
          let response = await FileService.postImg(formData,
            {onUploadProgress (e) {
              this.progress += e.loaded * 100 / e.total
              if (this.progress === 100) {
                this.progress = 0
              }
            }}
          )
          if (response.data.erreur == null) {
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
      this.showProgress = true
      try {
        let image = await this.saveImg()
        if (image && image != null) {
          let data = {
            post: {
              image: image.url || this.image.name,
              message: this.postMessage,
              titre: this.postTitre,
              id_am: this.$store.state.assMat.id_assmat,
              image_id: image.public_id
            }
          }
          let result = await this.creerPost(data)
          if (result != null) {
            let post = {
              image: image.url || null, // this.imgPath,
              message: this.postMessage,
              titre: this.postTitre,
              id_post: result.id_post,
              image_id: result.image_id || null,
              date: this.dateFr(new Date()),
              contentVisible: false
            }
            this.posts.push(post)
            this.$socket.emit('nouveauPost', post) // envoie le nouveau post à tous les autres
            this.showProgress = false
            this.clearForm()
          } else {
            this.dialog = false
            this.showProgress = false
            this.triggerErreur('Il y a un problème dans la création du post')
          }
        } else {
          let data = {
            post: {
              image: null,
              message: this.postMessage,
              titre: this.postTitre || null,
              id_am: this.$store.state.assMat.id_assmat,
              image_id: null
            }
          }
          let result = await this.creerPost(data)
          if (result != null) {
            let post = {
              image: null, // this.imgPath,
              message: this.postMessage,
              titre: this.postTitre,
              id_post: result.id_post,
              image_id: null,
              date: this.dateFr(new Date()),
              contentVisible: false
            }
            this.posts.push(post)
            this.showProgress = false
            this.$socket.emit('nouveauPost', post) // envoie le nouveau post à tous les autres
            this.clearForm()
          } else {
            this.dialog = false
            this.triggerErreur('Il y a un problème dans la création du post')
            this.showProgress = false
          }
        }
      } catch (e) {
        this.dialog = false
        console.log(e)
        this.triggerErreur('Une erreur est survenue')
        this.showProgress = false
      }
    },
    async deleteHostedImage (imageId) { // supprime l'image du serveur
      if (imageId != null) {
        try {
          let response = await FileService.deleteImg(imageId)
          if (response.data.erreur == null) {
            return true
          } else {
            this.triggerErreur(response.data.erreur.toString())
            return false
          }
        } catch (e) {
          this.triggerErreur(e.toString())
          return false
        }
      } else { // s'il n'y a pas d'image alors pas besoin de la supprimer du cloud
        return true
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
      if (this.deleteDBPost(post.id_post) && this.deleteHostedImage(post.image_id)) {
        this.deletePostFromArray(post)
        this.triggerSnackBar('Post supprimé avec succès', 'success')
        this.$socket.emit('suppressionPost', post)
      } else {
        this.triggerErreur('Une erreur est survenue')
      }
    },
    loadPost (limit, offset, $state) {
      let vm = this
      PostService.getAllLimit(limit, offset).then(function (rslt) {
        if (rslt.data.erreur == null) {
          let loadedPost = rslt.data.posts
          loadedPost.forEach(function (post) {
            vm.posts.push({
              image: post.image, // this.imgPath,
              message: post.texte,
              titre: post.titre,
              id_post: post.id,
              image_id: post.image_id,
              date: vm.dateFr(post.date),
              contentVisible: false
            })
            if ($state) {
              $state.loaded()
            }
          })
        } else {
          if ($state) {
            $state.loaded()
          }
          vm.triggerErreur(rslt.data.erreur.texte)
        }
      }).catch(function (err) {
        console.log(err)
        vm.triggerErreur('Une erreur est survenue')
        if ($state) {
          $state.loaded()
        }
      })
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
    triggerSnackBar (message, color) {
      this.snackbar = true
      this.snackbarMessage = message
      this.snackBarColor = color
    },
    deletePostFromArray (post) { // supprime un post de la liste
      this.posts.splice(this.posts.indexOf(post), 1)
      this.sortPost() // trie le tableau
    },
    dateFr (date) {
      var dateString = null
      date = new Date(date)
      let day = date.getDate()
      let month = mois[date.getMonth()]
      let year = date.getFullYear()
      dateString = day + ' ' + month + ' ' + year

      return dateString
    },
    sortPost () {
      this.posts.sort(function (a, b) {
        return -(a.id_post - b.id_post)
      })
    },
    postLayout (itemI) { // organise les post
      let mod = itemI % 3
      let flex = 0
      if (mod === 0) {
        flex = 12
      } else {
        flex = 6
      }
      return [{ [`md${flex}`]: true }, { [`lg${flex}`]: true }, { [`xl${flex}`]: true }]
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
    this.loadPost(9, 0)
  }
}

</script>

<style scoped>

</style>
