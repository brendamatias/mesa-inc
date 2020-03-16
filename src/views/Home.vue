<template>
  <section>
    <modal name="new-location" id="new-location" :width="600" :height="650">
      <ModalNewLocation />
    </modal>

    <modal name="details-location" id="details-location" :width="600" :height="650">
      <ModalDetailsLocation :locationSelect="locationSelect" />
    </modal>

    <modal name="evaluation-location" id="evaluation-location" :width="600" :height="450">
      <ModalEvaluationLocation :locationSelect="locationSelect" />
    </modal>

    <div class="locations">
      <div class="header">
        <p>Localizações</p>
        <button v-on:click="show('new-location', '')">
          <font-awesome-icon icon="plus" />
        </button>
      </div>
      <ul>
        <li v-for="location in locations" :key="location.id">
          <div>
            <button class="name" v-on:click="show('details-location', location.id)">
              <strong>{{ location.name }}</strong>
            </button>
            <span>{{ location.address }}</span>
          </div>
          <div>
            <button v-on:click="show('evaluation-location', location.id)">
              <strong>
                <font-awesome-icon icon="star" v-bind="getFav(location.id)" :id="location.id" />
              </strong>
            </button>
          </div>
        </li>
      </ul>
    </div>
    <google-map :locations="locations" />
  </section>
</template>

<script>
import { api } from "../services/api.js";

import ModalNewLocation from "../components/ModalNewLocation";
import ModalDetailsLocation from "../components/ModalDetailsLocation";
import ModalEvaluationLocation from "../components/ModalEvaluationLocation";
import GoogleMap from "../components/GoogleMap";

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
      locationSelect: ""
    };
  },
  mounted() {
    this.getLocations();
  },
  methods: {
    async getFav(id) {
      api.get(`/locations/${id}/evaluations`).then(res => {
        if (res.data.length > 0) {
          var element = document.getElementById(`${id}`);
          element.classList.add("fav");
        }
      });
    },
    async getLocations() {
      await this.$store.dispatch("getLocations");
      this.locations = this.$store.state.locations;
    },
    show(modal, locationSelect) {
      if (!(locationSelect === "")) {
        this.locationSelect = locationSelect;
      }

      this.$modal.show(modal);
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

  .fav {
    color: #e7711b !important;
  }
}
</style>
