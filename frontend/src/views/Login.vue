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
        <a class="label-link" target="_black" href="#"
          >Crie a sua conta aqui.</a
        >
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
        email: "brenda5@mesainc.com.br",
        password: "1234567"
      },
      errors: []
    };
  },
  methods: {
    signIn() {
      this.errors = [];
      this.$store
        .dispatch("signIn", this.user)
        .then(() => {
          this.$router.push({ name: "home" });
        })
        .catch(error => {
          this.errors.push(error);
        });
    }
  },
  created() {
    document.title = "Login";
  }
};
</script>

<style scoped>
section {
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 0.6fr;
}

.left {
  background: #c21712;
  display: flex;
  align-items: center;
  justify-content: center;
}

.left img {
  max-width: 300px;
}

.right img {
  margin-bottom: 20px;
}

.right {
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
  text-align: center;
}

form label {
  display: block;
  margin-bottom: 7px;
  text-align: left;
  color: #24292e;
  font-weight: 600;
}

a {
  color: #0366d6;
  text-decoration: none;
  float: right;
  font-size: 12px;
}

input {
  display: block;

  padding: 10px 15px;
  margin-top: 5px;
  margin-bottom: 15px;
  width: 300px;
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

  width: 100%;
}

span {
  font-size: 12px;
  margin-top: 15px;
  color: #24292e;
}

span a {
  padding-left: 4px;
}
</style>
