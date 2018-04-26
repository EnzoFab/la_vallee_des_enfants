<template>
  <div>
    <v-container mt-5>
      <section>
        <login id="palogin" type="parent"></login>
      </section>
    </v-container>
  </div>
</template>

<script>

import Login from '../part/Login'
export default {
  name: 'ConnexionPa',
  components: {
    Login
  }
}
</script>

<style scoped>

</style>
