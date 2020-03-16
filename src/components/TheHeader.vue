<template>
  <header>
    <div class="navbar">
      <div class="navbar-left">
        <router-link to="/home"
          ><img :src="logoWhite" alt="Mesa Inc"
        /></router-link>
      </div>

      <div class="navbar-right">
        <div class="left">
          <font-awesome-icon icon="star" />
          <!-- <strong>Favoritos</strong> -->
        </div>
        <div class="right">
          <div class="profile">
            <div>
              <strong>{{ name }}</strong>
              <router-link to="/profile">Meu perfil </router-link>
            </div>
            <img
              src="https://api.adorable.io/avatars/285/abott@adorable.png"
              alt="Perfil"
            />
          </div>

          <button class="btn" @click="signOut">
            Sair
            <font-awesome-icon icon="sign-out-alt" />
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import logoWhite from "../assets/logo-white.svg";
import { mapFields } from "../helper";

export default {
  name: "TheHeader",
  computed: {
    ...mapFields({
      fields: ["name"],
      base: "user"
    })
  },
  data() {
    return {
      logoWhite: logoWhite,
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
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped>
header {
  background: #191620;
  padding: 15px 0;
}

.navbar {
  margin: 0 auto;
  height: 64px;
  max-width: 940px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .navbar-left {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      padding-right: 20px;

      height: 65px;
      width: 65px;
    }
  }

  .navbar-right {
    display: flex;
    align-items: center;

    .left {
      color: #fff;
      font-size: 12px;

      strong {
        opacity: 0.8;

        &:hover {
          opacity: 1;
        }
      }

      svg {
        color: #c21712;
        font-size: 18px;
        opacity: 0.8;

        &:hover {
          opacity: 1;
        }
      }
    }

    .right {
      display: flex;
      align-items: center;
      justify-content: center;

      margin-right: 10px;
      margin-left: 20px;
      padding-left: 20px;
      border-left: 1px solid #666;

      strong,
      a {
        color: #fff;
        font-size: 12px;
      }

      .profile {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;

        div {
          display: grid;

          a {
            margin-top: 5px;
            opacity: 0.8;

            &:hover {
              opacity: 1;
            }
          }
        }
      }

      img {
        margin-left: 10px;
        height: 32px;
        width: 32px;
        border-radius: 50%;
      }

      .btn {
        display: flex;
        align-items: center;
        margin-left: 15px;
        padding: 0 25px;
        height: 42px;
        border: 0;

        border-radius: 5px;
        background: #c21712;
        font-size: 14px;
        color: #fff;
        font-weight: bold;

        svg {
          margin-left: 5px;
        }
      }
    }
  }
}
</style>
