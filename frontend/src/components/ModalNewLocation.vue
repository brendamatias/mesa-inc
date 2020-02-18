<template>
  <div>
    <h1 class="title">Nova Localização</h1>

    <form v-on:submit.prevent="createNewLocation">
      <label for="street">Nome</label>
      <input name="name" type="text" id="name" v-model="newLocation.name" required />

      <label for="street">Rua</label>
      <input name="street" type="text" id="street" v-model="newLocation.street" required />

      <label for="number">Número</label>
      <input name="number" type="text" id="number" v-model="newLocation.number" required />

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
        <option v-for="state in states" :key="state.id" :value="state">
          {{
          state.sigla
          }}
        </option>
      </select>

      <label for="city">Cidade</label>
      <select v-model="city">
        <option disabled value="disabled">Escolha uma cidade</option>
        <option v-for="city in cities" :key="city.id" :value="city.nome">
          {{
          city.nome
          }}
        </option>
      </select>

      <div class="btns">
        <button class="btn-cancelar" @click="hide">Cancelar</button>
        <button type="submit" class="btn">
          <font-awesome-icon icon="spinner" class="fa-spin" v-if="loading" />
          <span v-else>Cadastrar</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ModalNewLocation",
  data() {
    return {
      loading: false,
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
      if (this.state === "disabled") {
        return this.$vToastify.error("Necessário informar o estado.", "Erro");
      }
      if (this.city === "disabled") {
        return this.$vToastify.error("Necessário informar a cidade.", "Erro");
      }

      this.loading = true;

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
            this.hide();
            this.locations = this.getLocations();
            this.loading = false;
          })
          .catch(err => {
            var error = "Ops, ocorreu um erro interno.";

            if (err.response.data.length > 0) {
              error = err.response.data[0].message;
            }

            this.$vToastify.error(error, "Erro");

            this.loading = false;
            this.hide();
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

    .btns {
      margin-top: 10px;
      float: right;
    }

    .btn-cancelar,
    .btn {
      padding: 10px 25px;
      border-radius: 5px;
      font-weight: bold;
      font-size: 14px;

      &:hover {
        opacity: 0.9;
      }
    }

    .btn-cancelar {
      border: solid 1px #e0e0e0;
      background: #fff;

      color: #c21712;
      margin-right: 10px;
    }

    .btn {
      background: #c21712;
      color: #fff;
    }
  }
}
</style>
