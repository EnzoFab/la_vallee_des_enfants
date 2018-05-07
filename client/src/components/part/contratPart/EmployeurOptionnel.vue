<template>
  <v-flex  xs12 class="my-1">
    <v-toolbar color="red lighten-2">
      <v-spacer></v-spacer>
      <v-toolbar-title>Information Employeur</v-toolbar-title>
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
              color="red lighten-3"
              required
            ></v-text-field>
          </v-flex>
          <v-flex offset-md1 md10>
            <v-text-field
              label="Nom d'usage"
              v-model="nomUsage"
              :rules="regleNom"
              prepend-icon="account_circle"
              color="red lighten-3"
              required
            ></v-text-field>
          </v-flex>
          <v-flex offset-md1 md10>
            <v-text-field
              label="Prénom"
              v-model="prenom"
              :rules="reglePrenom"
              prepend-icon="person_outline"
              color="red lighten-3"
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
              color="red lighten-3"
              required
            ></v-text-field>
          </v-flex>
          <v-flex offset-md1 md10>
            <v-text-field
              label="Code postal"
              v-model="codePostal"
              :rules="regleCodeP"
              prepend-icon="mail_outline"
              color="red lighten-3"
              required
            ></v-text-field>
          </v-flex>
          <v-flex offset-md1 md10>
            <v-text-field
              label="Ville"
              v-model="ville"
              :rules="regleVille"
              prepend-icon="location_city"
              color="red lighten-3"
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
              color="red lighten-3"
              required
            ></v-text-field>
          </v-flex>
          <v-flex offset-md1 md10>
            <v-text-field
              label="Téléphone 1"
              v-model="telephone1"
              :rules="regleTel"
              prepend-icon="smartphone"
              color="red lighten-3"
              required
            ></v-text-field>
          </v-flex>
          <v-flex offset-md1 md10>
            <v-text-field
              label="Téléphone 2"
              v-model="telephone2"
              :rules="regleTelOpt"
              prepend-icon="phone"
              color="red lighten-3"
            ></v-text-field>
          </v-flex>
        </v-card>
        </v-flex>
      </v-layout>
        <v-flex>
          <v-card>
        <v-layout>
          <v-flex pl-4 md4>
            <v-text-field
              label="Profession"
              v-model="profession"
              prepend-icon="business_center"
              color="red lighten-3"
            ></v-text-field>
          </v-flex>
          <v-flex offset-md1 md4>
            <v-text-field
              label="Téléphone Professionnel"
              v-model="telephonePro"
              :rules="regleTelOpt"
              prepend-icon="contact_phone"
              color="red lighten-3"
            ></v-text-field>
          </v-flex>
          <v-flex offset-md1 pr-5 md4>
            <v-text-field
              label="semaines de congés supplémentaires"
              v-model="congesSupp"
              :rules="regleConges"
              prepend-icon="date_range"
              color="red lighten-3"
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
        @click="back"
      >Précédent</v-btn>
      <v-btn
        depressed large round
        class="red lighten-2"
        @click="envoyer"
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
      congesSupp: 0,
      estValide: false,
      reglePrenom: [
        v => !!v || 'Veuillez saisir le prénom'
      ],
      regleNom: [
        v => !!v || 'Veuillez saisir le nom'
      ],
      regleAdresse: [
        v => !!v || 'Veuillez saisir l\'adresse'
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
      ],
      regleConges: [
        v => !!v || 'Veuillez saisir le nombre de semaines',
        v => /^[0-9]([0-9]?)$/.test(v) || 'Le nombre de semaines n\'est pas valide'
      ]
    }
  },
  methods: {
    envoyer () {
      let data = {employeur: {
        nomNaissance: this.nomNaissance,
        nomUsage: this.nomUsage,
        prenom: this.prenom,
        adresse: this.adresse,
        codePostal: this.codePostal,
        ville: this.ville,
        email: this.email,
        telephone1: this.telephone1,
        telephone2: this.telephone2,
        profession: this.profession,
        telephonePro: this.telephonePro,
        congesSupp: this.congesSupp
      }
      }
      this.$emit('submit', data)
    },
    back () {
      this.$emit('back')
    }
  }
}
</script>

<style scoped>

</style>
