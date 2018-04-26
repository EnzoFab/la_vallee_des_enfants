<template>
  <div>
    <v-container mt-5>
      <section>
        <login id="amlogin" type="assMat"></login>
      </section>
    </v-container>
  </div>
</template>

<script>

import Login from '../part/Login'
export default {
  name: 'ConnexionAM',
  components: {
    Login
  }
}
</script>

<style scoped>

</style>
