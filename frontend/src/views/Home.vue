<template>
  <section>
    <modal name="new-location" id="new-location" :width="600" :height="650">
      <ModalNewLocation />
    </modal>

    <modal
      name="details-location"
      id="details-location"
      :width="600"
      :height="650"
    >
      <ModalDetailsLocation />
    </modal>

    <modal
      name="evaluation-location"
      id="evaluation-location"
      :width="600"
      :height="450"
    >
      <ModalEvaluationLocation />
    </modal>

    <div class="locations">
      <div class="header">
        <p>Localizações</p>
        <button v-on:click="show('new-location')">
          <font-awesome-icon icon="plus" />
        </button>
      </div>
      <ul>
        <li v-for="location in locations" :key="location.id">
          <div>
            <button
              class="name"
              v-on:click="showDetails('details-location', location.id)"
            >
              <strong>{{ location.name }} </strong>
            </button>
            <span>{{ location.address }}</span>
          </div>
          <div>
            <button
              class="start"
              v-on:click="showDetails('evaluation-location', location.id)"
            >
              <strong><font-awesome-icon icon="star"/></strong>
            </button>
          </div>
        </li>
      </ul>
    </div>
    <google-map :locations="locations" />
  </section>
</template>

<script>
import ModalNewLocation from "../components/ModalNewLocation";
import ModalDetailsLocation from "../components/ModalDetailsLocation";
import ModalEvaluationLocation from "../components/ModalEvaluationLocation";
import GoogleMap from "../components/GoogleMap";

import axios from "axios";

export default {
  name: "home",
  components: {
    ModalNewLocation,
    ModalDetailsLocation,
    ModalEvaluationLocation,
    GoogleMap
  },
  data() {
    return {
      locations: [],
      selectLocation: []
    };
  },
  mounted() {
    this.getLocations();
  },
  methods: {
    async getLocations() {
      await this.$store.dispatch("getLocations");
      this.locations = this.$store.state.locations;
    },
    show(modal) {
      this.$modal.show(modal);
    },
    showDetails(modal, selectLocation) {
      this.$modal.show(modal);
      console.log(selectLocation);
    },
    async createNewLocation() {
      if (this.state === "disabled") {
        return this.$vToastify.error("Necessário informar o estado.", "Erro");
      }
      if (this.city === "disabled") {
        return this.$vToastify.error("Necessário informar a cidade.", "Erro");
      }

      let name = this.newLocation.name;
      let street = this.newLocation.street.trim().replace(/ /g, "+");
      let city = this.city.trim().replace(/ /g, "+");
      let uf = this.state.sigla;

      let location =
        this.newLocation.number + "+" + street + "+" + city + "+" + uf;

      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyBJSI1G4JlXXbceQiPksP8cgo8OMd1TQ4A`;

      axios.get(url).then(res => {
        const newLocation = {
          name,
          address: res.data.results[0].formatted_address,
          latitude: res.data.results[0].geometry.location.lat,
          longitude: res.data.results[0].geometry.location.lng
        };

        this.$store
          .dispatch("newLocation", newLocation)
          .then(() => {
            this.$vToastify.success(
              "Localização cadastrada com sucesso!",
              "Sucesso"
            );
            this.locations = this.getLocations();
            this.hide();
          })
          .catch(error => {
            this.$vToastify.error(error, "Error");
          });
      });
    }
  },
  created() {
    document.title = "Início";
  }
};
</script>

<style lang="scss" scoped>
section {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #eee;

  button {
    border: none;
    background: none;
  }

  .locations {
    padding: 20px 30px;

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 30px;

      background: #a01614;
      border-radius: 5px 5px 0 0;
      font-weight: 600;

      p,
      button {
        color: #fff;
        font-size: 16px;
      }
    }

    ul {
      overflow: auto;
      display: flex;
      flex-direction: column;
      width: 300px;
      height: 600px;

      border-radius: 5px;
      background: rgba(221, 221, 221, 0.692);

      li {
        border-bottom: 1px solid #bbb;
        padding: 25px;

        display: flex;
        align-items: center;
        justify-content: space-between;

        .start {
        }

        div {
          padding-right: 10px;
        }
        svg {
          font-size: 20px;
          color: #353535;
        }

        .name {
          display: block;
        }

        span {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
