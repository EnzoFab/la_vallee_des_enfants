<template>
  <v-flex offset-md2 mt-3 md8 class="center">
    <v-card>
      <v-flex>
        <v-toolbar color="teal" dark>
          <v-spacer></v-spacer>
          <v-toolbar-title>Réinitialiser le mot de passe</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </v-flex>
      <v-flex md10 offset-md1>
        <v-text-field
          v-model="ancienpassword"
          :append-icon="e1 ? 'visibility' : 'visibility_off'"
          :append-icon-cb="() => (e1 = !e1)"
          :type="e1 ? 'password' : 'text'"
          label="Ancien mot de passe"
          hint="Au moins 8 caractères"
          min="8"
          counter>
        </v-text-field>
      </v-flex>
      <v-flex md10 offset-md1>
        <v-text-field
          v-model="nouveaupassword"
          :append-icon="e2 ? 'visibility' : 'visibility_off'"
          :append-icon-cb="() => (e2 = !e2)"
          :type="e2 ? 'password' : 'text'"
          label="Nouveau mot de passe"
          hint="Au moins 8 caractères"
          min="8"
          counter>
        </v-text-field>
      </v-flex>
      <v-flex md10 offset-md1>
        <v-text-field
          v-model="reecrirepassword"
          :append-icon="e3 ? 'visibility' : 'visibility_off'"
          :append-icon-cb="() => (e3 = !e3)"
          :type="e3 ? 'password' : 'text'"
          label="Entrer de nouveau le mot de passe"
          hint="Au moins 8 caractères"
          min="8"
          counter>
        </v-text-field>
      </v-flex>
    </v-card>
  </v-flex>

</template>

<script>
export default {
  name: 'ParametresCompte',
  data () {
    return {
      e1: true,
      e2: true,
      e3: true
    }
  }
}
</script>

<style scoped>

</style>
