<template>
  <section>
    <div class="left">
      <img :src="logoWhite" alt="Mesa Inc" />
    </div>

    <div class="right">
      <img :src="logo" alt="Mesa" />

      <form v-on:submit.prevent="signIn">
        <label for="email">E-mail</label>
        <input name="email" type="email" id="email" v-model="user.email" />

        <label for="password">
          Senha
          <a class="label-link" target="_black" href="#">Esqueceu sua senha?</a>
        </label>
        <input
          type="password"
          name="password"
          id="password"
          v-model="user.password"
        />

        <button>Entrar</button>
      </form>

      <span>
        Não tem uma conta?
        <router-link to="/signup">Crie a sua conta aqui.</router-link>
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
        email: "brenda@mesainc.com.br",
        password: "1234567"
      }
    };
  },
  methods: {
    signIn() {
      this.$store
        .dispatch("signIn", this.user)
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
    document.title = "Efetue login";
  }
};
</script>

<style scoped>
section {
  height: 100%;
}
</style>
