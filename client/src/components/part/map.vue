<template>
  <div>
    <gmap-map
      :center="center"
      :zoom="13"
      style="width:100%;  height: 600px;"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
export default {
  name: 'GoogleMap',
  data () {
    return {
      center: {
        lat: 48.862725,
        lng: 2.287592 },
      markers: [{
        position: {
          lat: 48.862725,
          lng: 2.287592
        }
      }],
      places: [],
      currentPlace: null
    }
  },

  mounted () {
    this.geolocate()
    this.markers.push(this.center)
  },

  methods: {
    // receives a place object via the autocomplete component
    setPlace (place) {
      this.currentPlace = place
    },
    addMarker () {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        }
        this.markers.push({ position: marker })
        for (var i = 0; i < this.markers.length; i++) {
          console.log('Mark', this.markers[i].position)
        }
        this.places.push(this.currentPlace)
        this.center = marker
        this.currentPlace = null
      }
    },
    geolocate: function () {
      /* navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        console.log('Geo localisation')
      }) */
    }
  }
}
</script>
