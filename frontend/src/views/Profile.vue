<template>
  <form v-on:submit.prevent="updateUser">
    <input name="name" placeholder="Seu nome completo" v-model="name" />
    <input name="email" type="email" placeholder="Seu e-mail" v-model="email" />

    <hr />

    <input
      name="oldPassword"
      type="password"
      placeholder="Sua senha atual"
      v-model="user.oldPassword"
    />
    <input
      name="password"
      type="password"
      placeholder="Sua nova senha"
      v-model="user.password"
    />
    <input
      name="confirmPassword"
      type="password"
      placeholder="Confirme a nova senha"
      v-model="user.confirmPassword"
    />
    <button type="submit">
      <font-awesome-icon icon="save" />Salvar perfil
    </button>
  </form>
</template>

<script>
import { mapFields } from "../helper";
import { api } from "../services/api.js";

export default {
  name: "Profile",
  computed: {
    ...mapFields({
      fields: ["name", "email"],
      base: "user",
      mutation: "UPDATE_USER"
    })
  },
  data() {
    return {
      user: {
        oldPassword: "",
        password: "",
        confirmPassword: ""
      }
    };
  },
  methods: {
    updateUser() {
      const user = {
        name: this.$store.state.user.name,
        email: this.$store.state.user.email,
        password: this.user.password,
        oldPassword: this.user.oldPassword,
        confirmPassword: this.user.confirmPassword
      };

      console.log(user);
      api
        .put("/users", user)
        .then(() => {
          this.$vToastify.success("Perfil atualizado com sucesso!", "Sucesso");
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
form {
  margin: 0 auto;
  max-width: 940px;
  display: flex;
  flex-direction: column;
  padding-top: 50px;

  input {
    background: rgba(0, 0, 0, 0.2);
    border: 0;
    border-radius: 5px;
    height: 50px;
    padding: 0 20px;
    color: #fff;
    margin: 0 0 10px;

    & ::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
  }

  hr {
    border: 0;
    height: 1px;
    background: rgba(255, 255, 255, 0.1);
    margin: 20px 0;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px 0 0 0;

    border: 0;
    border-radius: 5px;

    width: 160px;
    height: 50px;
    background: #c21712;
    color: #fff;
    font-size: 14px;
    opacity: 0.8;

    svg {
      margin-right: 5px;
    }

    &:hover {
      opacity: 1;
    }
  }
}
</style>
