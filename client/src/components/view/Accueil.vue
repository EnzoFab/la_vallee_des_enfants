<template>
 <div>
   <section>
     <v-flex md12 lg12 xs12>
     <Carousel id="carous"></Carousel>
     </v-flex>
   </section>

   <section>
     <v-container>
       <img src="/static/logo.jpg"/>
     </v-container>

     <v-layout column wrap class="my-5" align-center>
       <v-flex xs6>
         <div class="text-xs-center">
           <h1 class="bl2"  >La vallée des enfants en bref</h1>
           <span class="subheading">
               <p>
                 Cette association existe pour coordonner toutes les initiatives susceptibles d'améliorer les conditions d'accueil des enfants.
                 <br>
                 Chaque enfant est pris en compte dans son individualité mais il a l'avantage d'être en collectivité.
               </p>
              </span>
         </div>
       </v-flex>

       <v-flex xs12>
         <v-container grid-list-xl>
           <v-layout row wrap align-center>
             <v-flex xs6>
               <v-card class="elevation-0 transparent">
                 <v-card-text class="text-xs-center">
                   <v-icon x-large class="blue--text transparent">child_friendly</v-icon>
                 </v-card-text>
                 <v-card-title primary-title class="layout justify-center">
                   <div class="headline text-xs-center bl2">Parents</div>
                 </v-card-title>
                 <p>
                   Trouvez une place dans notre crèche pour votre enfant
                 </p>
               </v-card>
             </v-flex>

             <v-flex xs6>
               <v-card class="elevation-0 transparent">
                 <v-card-text class="text-xs-center">
                   <v-icon x-large class="transparent blue--text" >child_care</v-icon>
                 </v-card-text>
                 <v-card-title primary-title class="layout justify-center">
                   <div class="headline text-xs-center bl2">Notre mission</div>
                 </v-card-title>
                 <p>
                   Garantir le bonheur de votre enfant
                 </p>
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
         <div class="headline white--text mb-3 text-xs-center">J'essaie un contrat</div>
         <v-btn class="blue-grey darken-1" dark large to="/contrat/Simulation">
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
           <h1 class="bl2">Retrouvez nous</h1>
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
h1, h2, span {
  font-size: 30px;
  font-family: 'Handlee', cursive;
}
ul {
  list-style-type: none;
  padding: 0;
}
p {
  font-size: 20px;
  font-family: 'Handlee', cursive;;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.bl2 {
  color: #58a0cc;
  font-family: 'Handlee', cursive;
}
#carous{
  height: 95vh;
}
  .lightOpcity{
    opacity: 0.8;
  }
  img{
    width: 95%;
  }
</style>
