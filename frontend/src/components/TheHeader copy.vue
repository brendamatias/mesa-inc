<template>
  <header>
    <img
      src="https://api.adorable.io/avatars/285/abott@adorable.png"
      alt="Perfil"
    />

    <p>
      Olá,
      <span>Brenda Matias</span>
    </p>
    <ul>
      <li><font-awesome-icon icon="user-alt" />Perfil</li>
      <li><font-awesome-icon icon="map-marked-alt" />Mapa</li>
      <li><font-awesome-icon icon="list-ul" />Lista</li>
      <li><font-awesome-icon icon="star" />Favoritos</li>
      <li>
        <button @click="signOut"></button>
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  name: "TheHeader",
  data() {
    return {
      user: {
        name: "",
        email: ""
      }
    };
  },
  mounted() {
    this.user = this.$store.state.user;
  },
  methods: {
    signOut() {
      this.$store.dispatch("signOut");
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
section {
  background: #fff;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 16px;
}

img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 5px solid #ce4440;

  margin-bottom: 25px;
}

p {
  color: #b0b9c7;
}

span {
  font-weight: 600;
}

ul {
  margin-top: 20px;
}

li {
  margin: 30px 0;
  display: grid;
  grid-template-columns: 0.8fr 1fr;
  align-items: right;
}

li svg {
  color: #c21712;
}

button {
  border: none;
  background: none;
}
</style>
