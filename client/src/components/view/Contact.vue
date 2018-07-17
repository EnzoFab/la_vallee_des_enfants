<template>
 <v-container>
   <v-container fluid grid-list-md v-if="isAssMatConnected">
     <AllContact />
   </v-container>
   <v-container v-else row wrap>
     <SendContact /> <!-- Envoyer des message etant employeur ou non connecté -->
   </v-container>
 </v-container>
</template>

<script>
import SendContact from '../part/SendContact'
import AllContact from "../part/AllContact";
const nameLength = 20
export default {
  name: 'Contact',
  components: {AllContact, SendContact},
  data () {
    return {
    }
  },
  methods: {

  },
  computed: {
    isAssMatConnected () {
      return this.$store.getters.isAssMatConnected
    }
  }

}
</script>

<style scoped>

</style>
