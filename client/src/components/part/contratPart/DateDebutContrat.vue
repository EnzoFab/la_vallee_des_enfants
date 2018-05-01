<template>
  <v-layout row wrap>
    <v-flex  xs12 md6 offset-md3 class="my-5">
      <v-toolbar :color="toolbarColor" class="light-blue lighten-4">
        <v-spacer></v-spacer>
        <v-toolbar-title>Début du contrat</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-form>
        <v-flex xs12 sm6 md4 mt-3 offset-md4>
          <v-menu
            ref="menu"
            lazy
            :close-on-content-click="false"
            v-model="menu"
            transition="scale-transition"
            offset-y
            full-width
            :nudge-right="40"
            min-width="290px"
            :return-value.sync="date"
          >
            <v-text-field
              slot="activator"
              color="blue"
              label="Date de fin de contrat"
              v-model="date"
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker
              locale="fr"
              v-model="date"
              no-title
              scrollable
              >
              <v-spacer></v-spacer>
            </v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex offset-md1>
          <h3>Nombre de semaines de congés supplémentaires de l'employeur : </h3>
          <v-flex offset-md4 md2>
          <v-text-field
            label="Nombre"
            color="blue"
          ></v-text-field>
          </v-flex>
        </v-flex>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'DateFinContrat',
  data: () => ({
    date: null,
    menu: false
  })
}
</script>

<style scoped>

</style>
