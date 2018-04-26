<template>
  <div>
    <login id="amlogin"
           type="assMat"
           @formSubmitted="connexion"
           titre="Connexion assistante maternelle"
           toolbar-color="pink lighten-1"
           btnColor="pink lighten-2"
    ></login>
    <!-- formSubmitted est un evenement envoyé par le composant login
     on appelle une fonction  lorsque l'evenement intervient et ça
     peut être n'importe qu'elle fonction-->
  </div>
</template>

<script>
import AuthentificationService from '../../services/AuthentificationService'
import Login from '../part/Login'
export default {
  name: 'ConnexionAM',
  components: {
    Login
  },
  methods: {
    async connexion (data) {
      console.log(AuthentificationService)
      // TODO faire la connexion du coté assMatt
    }
  }
}
</script>

<style scoped>

</style>
