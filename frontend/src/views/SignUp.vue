<template>
  <section>
    <div class="left">
      <img :src="logoWhite" alt="Mesa Inc" />
    </div>

    <div class="right">
      <img :src="logo" alt="Mesa" />

      <form v-on:submit.prevent="signUp">
        <label for="name">Nome</label>
        <input name="name" type="name" id="name" v-model="user.name" required />

        <label for="email">E-mail</label>
        <input
          name="email"
          type="email"
          id="email"
          v-model="user.email"
          required
        />

        <label for="password">
          Senha
        </label>
        <input
          type="password"
          name="password"
          id="password"
          v-model="user.password"
          required
        />

        <button>Cadastrar</button>
      </form>

      <span>
        Já tem uma conta?
        <router-link to="/">Efetue o login aqui.</router-link>
      </span>
    </div>
  </section>
</template>

<script scoped>
import logo from "../assets/logo.svg";
import logoWhite from "../assets/logo-white.svg";

export default {
  data() {
    return {
      logo: logo,
      logoWhite: logoWhite,
      user: {
        name: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    signUp() {
      this.$store
        .dispatch("signUp", this.user)
        .then(() => {
          this.$router.push({ name: "home" });
        })
        .catch(() => {
          this.$vToastify.error(
            "Ocorreu um erro. Verifique seus dados.",
            "Erro"
          );
        });
    }
  },
  created() {
    document.title = "Cadastre-se";
  }
};
</script>

<style scoped>
section {
  height: 100%;
}
</style>
