<template>
 <div>
   <section>
     <Carousel id="carous"></Carousel>
   </section>

   <section>
     <v-layout column wrap class="my-5" align-center>
       <v-flex xs12 sm4 class="my-3">
         <div class="text-xs-center">
           <h2 class="headline">La vallée des enfants</h2>
           <span class="subheading">
                en attente d'une punchline
              </span>
         </div>
       </v-flex>

       <v-flex xs12>
         <v-container grid-list-xl>
           <v-layout row wrap align-center>
             <v-flex xs6>
               <v-card class="elevation-0 transparent">
                 <v-card-text class="text-xs-center">
                   <v-icon x-large class="grey--text transparent">child_friendly</v-icon>
                 </v-card-text>
                 <v-card-title primary-title class="layout justify-center">
                   <div class="headline text-xs-center">Phrase accroche 1</div>
                 </v-card-title>
                 <v-card-text>
                   texte à venir
                 </v-card-text>
               </v-card>
             </v-flex>

             <v-flex xs6>
               <v-card class="elevation-0 transparent">
                 <v-card-text class="text-xs-center">
                   <v-icon x-large class="grey--text transparent">child_care</v-icon>
                 </v-card-text>
                 <v-card-title primary-title class="layout justify-center">
                   <div class="headline">Phrase accroche 2</div>
                 </v-card-title>
                 <v-card-text>
                   text à venir
                 </v-card-text>
               </v-card>
             </v-flex>

           </v-layout>
         </v-container>

       </v-flex>
     </v-layout>
   </section>
   <section>
     <v-parallax src="/static/toy.jpg" height="400">
       <v-layout column align-center justify-center>
         <div class="headline white--text mb-3 text-xs-center">Web development has never been easier</div>
         <em>Kick-start your application today</em>
         <v-btn class="blue-grey darken-1" dark large href="/pre-made-themes">
           Simulation de contrat
           <v-icon right dark>send</v-icon>
         </v-btn>
       </v-layout>
     </v-parallax>
   </section>

   <section>
     <v-layout column wrap class="my-5" align-center>
       <v-flex xs12 sm4 class="my-3">
         <div class="text-xs-center">
           <v-icon x-large color="red">fa-map-marker-alt</v-icon>
           <h1>Retrouvez nous</h1>
         </div>
       </v-flex>
     </v-layout>
   </section>
   <v-container fluid>
     <Map></Map>
   </v-container>
 </div>
</template>

<script>
import Carousel from '../part/Carousel'
import Drawer from '../part/Drawer'
import Map from '../part/map'
export default {
  name: 'HelloWorld',
  components: {
    Map,
    Carousel,
    Drawer
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      titre: 'Accueil'
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
  .lightOpcity{
    opacity: 0.8;
  }
</style>
