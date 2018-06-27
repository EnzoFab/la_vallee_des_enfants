<template>
    <!--
    Composant qui permet de chercher dans une liste passé en parametre
    -->
  <v-layout row wrap>
    <v-flex xs12>
      <v-text-field
        v-model="searchWord"
        append-icon="search"
        auto-grow
        clearable
        prepend-icon-cb="search"
        :box="box"
        :solo-inverted="inverted"
        color="orange darken-1"
        :label="label"
        @input="handleChange"
      >
      </v-text-field>
    </v-flex>
    <v-flex xs12>
      <v-card>
        <v-card-text>
          <slot :items="elements">
            {{elements}}
          </slot>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'Searcher',
  props: {
    items: {type: Array,
      default: function () {
        return []
      }
    },
    itemAttribute: {type: String, required: true}, // attribut sur lequel on va effectuer la recherche
    label: {type: String},
    box: {type: Boolean, default: false},
    inverted: {type:Boolean, default: false}
  },
  data () {
    return {
      elements: [],
      searchWord: null
    }
  },
  methods: {
    handleChange (val) {
      if (val == null || val.trim() === '') {
        this.searchWord = ''
      }
    },
    recherche (val) {
      if (val == null || val.trim() === '') {
        this.elements = this.items
      } else {
        let vm = this
        this.elements = []
        this.items.forEach(function (item) {
          if (item[vm.itemAttribute].toLowerCase().startsWith(val.trim().toLowerCase())) {
            vm.elements.push(item)
          }
        })
      }
    }
  },
  watch: {
    searchWord (val) {
      this.recherche(val)
    },
    items (val) { // si jamais la props change
      this.elements = this.items // les elements sont egals à la pros
      this.recherche(this.searchWord) // on refait une recherche sur les nouveaux elements
     }
  },
  mounted () {
    this.elements = this.items
  }
}
</script>

<style scoped>

</style>
