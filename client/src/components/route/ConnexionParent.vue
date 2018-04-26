<template>
  <div>
    <v-container grid-list-xl>
      <section>
        <login id="palogin"></login>
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
