<template>
  <div>

  </div>
</template>

<script>
  export default {
    name: 'map',
    props: ['name'],
    data: function () {
      return {
        mapName: this.name + "-map",
      }
    }
  }
</script>

<style scoped>

</style>
