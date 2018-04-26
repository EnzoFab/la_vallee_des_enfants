<template>
  <div>
    <v-container grid-list-xl>
      <section>
        <login id="amlogin"></login>
      </section>
    </v-container>
  </div>
</template>

<script>
  import Login from '../part/Login'
  export default {
    name: "ConnexionAM",
    components: {
      Login
    }
  }
</script>

<style scoped>

</style>
