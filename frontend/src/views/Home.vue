<template>
  <section>
    <modal name="new-location" id="new-location" :width="600" :height="650">
      <h1 class="title">Nova Localização</h1>

      <form v-on:submit.prevent="createNewLocation">
        <label for="street">Nome</label>
        <input
          name="name"
          type="text"
          id="name"
          v-model="newLocation.name"
          required
        />

        <label for="street">Rua</label>
        <input
          name="street"
          type="text"
          id="street"
          v-model="newLocation.street"
          required
        />

        <label for="number">Número</label>
        <input
          name="number"
          type="text"
          id="number"
          v-model="newLocation.number"
          required
        />

        <label for="neighborhood">Bairro</label>
        <input
          name="neighborhood"
          type="text"
          id="neighborhood"
          v-model="newLocation.neighborhood"
          required
        />

        <label for="state">Estado</label>
        <select v-model="state" v-on:change="getCities">
          <option disabled value="disabled">Escolha um estado</option>
          <option v-for="state in states" :key="state.id" :value="state">{{
            state.sigla
          }}</option>
        </select>

        <label for="city">Cidade</label>
        <select v-model="city">
          <option disabled value="disabled">Escolha uma cidade</option>
          <option v-for="city in cities" :key="city.id" :value="city.nome">{{
            city.nome
          }}</option>
        </select>

        <button>Cadastrar</button>
      </form>
    </modal>

    <div class="locations">
      <div class="header">
        <p>Localizações</p>
        <button><font-awesome-icon icon="plus" @click="show" /></button>
      </div>
      <ul>
        <li v-for="location in locations" :key="location.id">
          <div>
            <strong>{{ location.name }} </strong>
            <span>{{ location.address }}</span>
          </div>
          <font-awesome-icon icon="star" />
        </li>
      </ul>
    </div>
    <google-map :locations="locations" />
  </section>
</template>

<script>
import GoogleMap from "../components/GoogleMap";
import axios from "axios";

export default {
  name: "home",
  data() {
    return {
      state: "disabled",
      states: [],
      city: "disabled",
      cities: [],
      newLocation: {
        name: "Antiga casa da Brenda",
        street: "Demócrito de Souza Filho",
        number: "300",
        neighborhood: "Madalena",
        latitude: "",
        longitude: ""
      },
      locations: [],
      errors: []
    };
  },
  components: {
    GoogleMap
  },
  mounted() {
    this.getStates();
    this.getLocations();
  },
  methods: {
    async getLocations() {
      await this.$store.dispatch("getLocations");
      this.locations = this.$store.state.locations;
    },
    async getStates() {
      const { data } = await axios.get(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      );

      this.states = data;
    },
    async getCities() {
      const { data } = await axios.get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${this.state.id}/distritos`
      );

      this.cities = data;
    },
    show() {
      this.$modal.show("new-location");
    },
    hide() {
      this.$modal.hide("new-location");
    },
    async createNewLocation() {
      console.log(this.state.sigla);
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
#new-location {
  h1.title {
    font-size: 18px;
    background: #a01614;
    padding: 15px;
    text-align: center;
    color: #fff;
  }

  form {
    width: 450px;
    margin: 20px auto 0 auto;

    label {
      margin-bottom: 7px;
      color: #24292e;
      font-weight: 600;
    }

    input,
    select {
      display: block;
      padding: 10px 15px;
      margin-top: 5px;
      margin-bottom: 15px;
      width: 100%;
      border-radius: 5px;
      border: 1px solid #ddd;
    }

    button {
      background: #c21712;
      padding: 10px 25px;
      margin-top: 10px;

      border: none;
      border-radius: 5px;

      color: #fff;
      font-weight: bold;
      font-size: 16px;
    }
  }
}

section {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #eee;

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

      button {
        border: none;
        background: none;
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

        strong {
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
