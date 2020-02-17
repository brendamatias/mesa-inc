<template>
  <div>
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
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ModalNewLocation",
  data() {
    return {
      state: "disabled",
      states: [],
      city: "disabled",
      cities: [],
      newLocation: {
        name: "",
        street: "",
        number: "",
        neighborhood: "",
        latitude: "",
        longitude: ""
      },
      locations: []
    };
  },
  mounted() {
    this.getStates();
  },
  methods: {
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
  }
};
</script>

<style lang="scss">
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
</style>
