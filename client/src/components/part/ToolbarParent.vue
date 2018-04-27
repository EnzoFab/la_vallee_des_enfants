<template>
  <v-toolbar app fixed tabs clipped-left light dense color="blue-grey lighten-5">
    <v-tabs icons-and-text fixed-tabs slot="extension" light color="blue-grey lighten-5" >
      <v-tabs-slider color="blue"></v-tabs-slider>
      <v-tab>
        <router-link to="/assistante/accueil" tag="v-tab">
          <h4 class="purple--text">Accueil</h4>
          <v-icon x-large color="purple">home</v-icon>
        </router-link>
      </v-tab>
      <v-tab>
        <router-link to="/assistante/presence" tag="v-tab">
          <h4 class="pink--text">Présences</h4>
          <v-icon x-large color="pink">access_time</v-icon>
        </router-link>
      </v-tab>
      <v-tab>
        <router-link to="/assistante/contrat" tag="v-tab">
          <h4 class="blue--text">Contrats</h4>
          <v-icon x-large color="blue">attach_file</v-icon>
        </router-link>
      </v-tab>
      <v-tab>
        <router-link to="/assistante/facture" tag="v-tab">
          <h4 class="green--text">Factures</h4>
          <v-icon x-large color="green">library_books</v-icon>
        </router-link>
      </v-tab>
      <v-tab align="right" @click="logout">
          <h4 class="teal--text">Se déconnecter</h4>
          <v-icon x-large color="teal">exit_to_app</v-icon>
      </v-tab>
    </v-tabs>
  </v-toolbar>
</template>

<script>
export default {
  name: 'ToolbarAssMat',
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setParent', null)
      this.$router.push({
        name: 'Accueil'
      })
    }
  }

}
</script>

<style scoped>

</style>
