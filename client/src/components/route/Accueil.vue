<template>
 <div>
   <v-content>
     <section>
       <Carousel id="carous"></Carousel>
     </section>
     <section>
       <v-container fluid>
         <v-layout row>

         </v-layout>
       </v-container>
     </section>
   </v-content>

 </div>
</template>

<script>
import Carousel from '../part/Carousel'
export default {
  name: 'HelloWorld',
  components: {
    Carousel
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#carous{
  height: 100vh;
}
</style>
