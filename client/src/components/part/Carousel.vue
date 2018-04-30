<template>
  <v-carousel hide-controls hide-delimiters>
    <v-carousel-item v-for="(item,i) in items" :src="item.src" :key="i">
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: 'Carousel',
  data () {
    return {
      items: [
        {
          src: '/static/carousel_image/5.jpg'
        },
        {
          src: '/static/carousel_image/6.jpg'
        },
        {
          src: '/static/carousel_image/3.jpg'
        },
        {
          src: '/static/carousel_image/4.jpg'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
