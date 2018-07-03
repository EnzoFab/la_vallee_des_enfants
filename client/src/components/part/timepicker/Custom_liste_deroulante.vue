<template>
  <v-card :height="height" class="scroll-y" flat>
    <v-card-title v-if="title != null">
      <h2 class="mx-auto">{{title}}</h2>
    </v-card-title>
    <v-card-text>
      <v-list dense>
        <v-list-tile avatar v-for="(item,i) in custom_items"  class="mx-auto" :key="i" >
          <v-list-tile-avatar tile :size="item.size" class="mx-auto"
                              @mouseover.stop="hover(item)"
                              @mouseout.stop="reset(item)"
                              @click="select(item)"
          >
            <v-avatar :color="item.color">
              <span :class="item.class">{{item.number}}</span>
            </v-avatar>
          </v-list-tile-avatar>
        </v-list-tile>
      </v-list>
    </v-card-text>
  </v-card>

</template>

<script>
export default {
  name: 'custom_liste_deroulante',
  props: {
    items: {type: Array, required: true},
    title: {type: String},
    selectedColor: {type: String, default: 'teal darken-1'},
    height: {type: String, default: '200'},
    title_color: {type: String, default: 'black'},
    value: {required: true}
  },
  data () {
    return {
      custom_items: []
    }
  },
  methods: {
    select (item) {
      this.resetSelectedItem()
      item.color = this.selectedColor
      item.selected = true
      item.class = 'white--text upperSize'
      this.$emit('input', '' + item.number)
    },
    hover(item) {
      if (!item.selected) {
        item.class = 'white--text upperSize'
        item.color = 'blue lighten-5'
        item.size = 75
      }
    },
    reset(item) {
      if (!item.selected) {
        item.class = 'headline'
        item.color = 'white'
        item.size = 60
        item.selected = false
      }
    },
    init_custom_item () {
      for (let i = 0; i < this.items.length; i++) {
        this.custom_items.push({
          number: this.items[i],
          color: 'white',
          class: 'headline',
          size: 60,
          selected: false
        })
      }
    },
    resetSelectedItem () {
      let vm = this
      this.custom_items.forEach(function (item) {
        item.class = 'headline'
        item.color = 'white'
        item.size = 70
        item.selected = false
      })
    }
  },
  mounted () {
    this.init_custom_item()
  },
  watch: {
    items: {
      handle (v) {
        this.init_custom_item()
      },
      deep: true
    }
  }
}
</script>

<style scoped>
  .upperSize {
    font-size: xx-large;
  }
</style>
