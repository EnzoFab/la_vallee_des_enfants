<template>
  <v-flex  xs12 class="my-1">
    <v-toolbar color="red lighten-2">
      <v-spacer></v-spacer>
      <v-toolbar-title>Employeur</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-form>
      <v-layout mt-3>
        <v-flex md4>
        <v-card>
          <v-flex offset-md1 md10>
            <v-text-field
              label="Nom de naissance"
              v-model="nomNaissance"
              :rules="regleNom"
              prepend-icon="account_box"
              required
            ></v-text-field>
          </v-flex>
          <v-flex offset-md1 md10>
            <v-text-field
              label="Nom d\'usage"
              v-model="nomUsage"
              :rules="regleNom"
              prepend-icon="account_circle"
              required
            ></v-text-field>
          </v-flex>
          <v-flex offset-md1 md10>
            <v-text-field
              label="Prénom"
              v-model="prenom"
              :rules="reglePrenom"
              prepend-icon="person_outline"
              required
            ></v-text-field>
          </v-flex>
        </v-card>
        </v-flex>
        <v-flex md4>
        <v-card>
          <v-flex offset-md1 md10>
            <v-text-field
              label="Adresse"
              v-model="adresse"
              :rules="regleAdresse"
              prepend-icon="home"
              required
            ></v-text-field>
          </v-flex>
          <v-flex offset-md1 md10>
            <v-text-field
              label="Code postal"
              v-model="codePostal"
              :rules="regleCodeP"
              prepend-icon="mail_outline"
              required
            ></v-text-field>
          </v-flex>
          <v-flex offset-md1 md10>
            <v-text-field
              label="Ville"
              v-model="ville"
              :rules="regleVille"
              prepend-icon="location_city"
              required
            ></v-text-field>
          </v-flex>
        </v-card>
        </v-flex>
        <v-flex md4>
        <v-card>
          <v-flex offset-md1 md10>
            <v-text-field
              label="E-mail"
              v-model="email"
              :rules="regleMail"
              prepend-icon="mail"
              required
            ></v-text-field>
          </v-flex>
          <v-flex offset-md1 md10>
            <v-text-field
              label="Téléphone 1"
              v-model="telephone1"
              :rules="regleTel"
              prepend-icon="smartphone"
              required
            ></v-text-field>
          </v-flex>
          <v-flex offset-md1 md10>
            <v-text-field
              label="Téléphone 2"
              v-model="telephone2"
              :rules="regleTelOpt"
              prepend-icon="phone"
            ></v-text-field>
          </v-flex>
        </v-card>
        </v-flex>
      </v-layout>
      <v-flex>
      <v-card>
        <v-layout>
          <v-flex offset-md1 md4>
            <v-text-field
              label="Profession"
              v-model="profession"
              prepend-icon="business_center"
            ></v-text-field>
          </v-flex>
          <v-flex offset-md2 md4>
            <v-text-field
              label="Téléphone Professionnel"
              v-model="telephonePro"
              :rules="regleTelOpt"
              prepend-icon="contact_phone"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-card>
      </v-flex>
    </v-form>
    <v-flex mt-3 xs12>
      <v-btn
        class="red lighten-2"
        depressed large round
        @click="annuler"
      >Annuler</v-btn>
      <v-btn
        depressed large round
        class="red lighten-2"
        @click="submit"
        :disabled="!estValide"
      >Suivant</v-btn>
    </v-flex>
  </v-flex>
</template>

<script>
export default {
  name: 'EmployeurOptionnel',
  data () {
    return {
      nomNaissance: null,
      nomUsage: null,
      prenom: null,
      adresse: null,
      codePostal: null,
      ville: null,
      email: null,
      telephone1: null,
      telephone2: null,
      profession: null,
      telephonePro: null,
      estValide: false,
      reglePrenom: [
        v => !!v || 'Veuillez saisir le prénom'
      ],
      regleNom: [
        v => !!v || 'Veuillez saisir le nom'
      ],
      regleAdresse: [
        v => !!v || 'Veuillez saisir l\'adresse',
        v => /^\w \(?\)?\w$/.test(v) || 'Le format d\'adresse est incorrect'
      ],
      regleCodeP: [
        v => !!v || 'Veuillez saisir le code postal',
        v => /^[1-9]([0-9]{4})$/.test(v) || 'Le code postal n\'est pas valide'
      ],
      regleVille: [
        v => !!v || 'Veuillez saisir la ville'
      ],
      regleMail: [
        v => !!v || 'Veuillez saisir l\'email',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'L\'email n\'est pas valide '
      ],
      regleTel: [
        v => !!v || 'Veuillez saisir un téléphone',
        v => /^0[1-9]([0-9]{8})$/.test(v) || 'Le numéro n\'est pas valide'
      ],
      regleTelOpt: [
        v => /^0[1-9]([0-9]{8})$/.test(v) || 'Le numéro n\'est pas valide'
      ]
    }
  }
}
</script>

<style scoped>

</style>
