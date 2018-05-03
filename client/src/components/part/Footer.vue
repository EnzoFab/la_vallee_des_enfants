<template>
  <v-footer height="auto">
    <v-card
      flat
      tile
      class="blue-grey lighten-3 white--text text-xs-center"
    >
      <v-card-text>
        <v-btn
          icon
          class="mx-3 white--text"
        >
          <v-icon x-large>fab fa-facebook</v-icon>
        </v-btn>
      </v-card-text>
      <v-card-text class="white--text pt-0 bl2">
        Vous recherchez une place en crèche ? La vallée des enfants propose différentes solutions d’accueil aux parents. Expertes dans l’accueil de l’enfant en crèche, les assistantes maternelles agrées proposent également des solutions d’accompagnement aux associations. Pour plus d'informations veuillez nous contacter via la rubrique "Contact" située en haut de cette page.
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
  .bl2 {
    font-size: 20px;
    font-family: 'Handlee', cursive;;
  }
</style>
