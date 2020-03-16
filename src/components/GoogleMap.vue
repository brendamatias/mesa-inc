<template>
  <GmapMap
    id="map"
    ref="mapRef"
    :center="{ lat: center.lat, lng: center.lng }"
    :zoom="17"
    map-type-id="roadmap"
  >
  </GmapMap>
</template>

<script>
export default {
  name: "GoogleMap",
  data() {
    return {
      locations: [],
      places: [],
      currentPlace: null,
      center: {
        lat: 0.0,
        lng: 0.0
      },
      gettingLocation: false,
      errorStr: null,
      res: {}
    };
  },
  mounted() {
    this.onMapChange();
    this.geolocate();
  },

  methods: {
    async onMapChange() {
      await this.$store.dispatch("getLocations");
      this.locations = this.$store.state.locations;

      this.$refs.mapRef.$mapPromise.then(map => {
        this.$gmapApiPromiseLazy().then(res => {
          const recife = new res.maps.LatLng(-8.0565689, -34.9091322);

          var service = new res.maps.places.PlacesService(map);

          function createMarker(place) {
            var placeLoc = place.geometry.location;
            var infowindow = new res.maps.InfoWindow();
            var marker = new res.maps.Marker({
              map: map,
              position: placeLoc
            });
            res.maps.event.addListener(marker, "click", function() {
              infowindow.setContent(place.name);
              infowindow.open(map, this);
            });
          }

          const callback = (results, status) => {
            if (status === res.maps.places.PlacesServiceStatus.OK) {
              for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);
                const { id, name, vicinity } = results[i];
                this.places.push({ id, name, vicinity });
                this.emitToParent();
              }
            }
          };

          for (let i = 0; i < this.locations.length; i++) {
            service.textSearch(
              {
                location: recife,
                query: this.locations[i].address
              },
              callback
            );
          }
        });
      });
    },
    emitToParent() {
      this.$emit("mapToParent", this.places);
    },
    geolocate() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    }
  }
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>
