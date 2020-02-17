<template>
  <div>
    <h1 class="title">Avaliação</h1>

    <div class="container">
      <div class="header">
        <div>
          <img
            src="https://api.adorable.io/avatars/285/abott@adorable.png"
            alt="Perfil"
          />
        </div>
        <div>
          <strong>Brenda Matias</strong>
          <span>brendamatias@gmail.com</span>
        </div>
      </div>

      <div class="form" v-on:submit.prevent="createNewLocation">
        <div>
          <button class="star" @click="setRating(1)">
            <font-awesome-icon
              v-bind="[
                rating > 0 ? { color: '#e7711b' } : { color: '#969696' }
              ]"
              icon="star"
            />
          </button>

          <button class="star" @click="setRating(2)">
            <font-awesome-icon
              v-bind="[
                rating > 1 ? { color: '#e7711b' } : { color: '#969696' }
              ]"
              icon="star"
            />
          </button>

          <button class="star" @click="setRating(3)">
            <font-awesome-icon
              v-bind="[
                rating > 2 ? { color: '#e7711b' } : { color: '#969696' }
              ]"
              icon="star"
            />
          </button>

          <button class="star" @click="setRating(4)">
            <font-awesome-icon
              v-bind="[
                rating > 3 ? { color: '#e7711b' } : { color: '#969696' }
              ]"
              icon="star"
            />
          </button>

          <button class="star" @click="setRating(5)">
            <font-awesome-icon
              v-bind="[
                rating === 5 ? { color: '#e7711b' } : { color: '#969696' }
              ]"
              icon="star"
              id="5"
            />
          </button>
        </div>

        <label for="comment">Comentário</label>
        <textarea id="comment" rows="10" cols="50" v-model="comment" />

        <div class="btns">
          <button class="btn-cancelar" @click="hide">Cancelar</button>
          <button type="submit" class="btn" @click="evaluate">
            Avaliar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from "../services/api.js";

export default {
  name: "ModalEvaluationLocation",
  data() {
    return {
      rating: 0,
      comment: ""
    };
  },
  methods: {
    setRating(value) {
      this.rating = value;
    },
    hide() {
      this.$modal.hide("evaluation-location");
    },
    evaluate() {
      const id = 5;
      const evaluation = { rating: this.rating, comment: this.comment };

      if (this.rating === 0) {
        return this.$vToastify.error("Por favor, avalie a localização", "Erro");
      }

      if (this.comment.trim() == "") {
        return this.$vToastify.error("Por favor, deixe um comentário", "Erro");
      }

      api
        .post(`/locations/${id}/evaluations`, evaluation)
        .then(() => {
          this.$vToastify.success(
            "Avaliação cadastrada com sucesso!",
            "Sucesso"
          );

          this.hide();
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss">
#evaluation-location {
  h1.title {
    font-size: 18px;
    background: #a01614;
    padding: 15px;
    text-align: center;
    color: #fff;
  }

  .container {
    width: 450px;
    margin: 20px auto 0 auto;

    .header {
      display: flex;

      strong {
        color: rgba(0, 0, 0, 0.87);
        display: block;
        margin-bottom: 6px;
        font-size: 16px;
      }

      span {
        color: rgba(0, 0, 0, 0.54);
        font-size: 14px;
      }

      img {
        height: 32px;
        width: 32px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }

    .form {
      strong {
        color: rgba(0, 0, 0, 0.87);
        font-size: 16px;
        font-weight: 500;
      }

      div {
        margin: 10px 0 20px 0;
      }

      label {
        margin-bottom: 7px;
        color: #24292e;
        font-weight: 600;
      }

      textarea {
        display: block;
        padding: 10px 15px;
        margin-top: 5px;
        margin-bottom: 15px;
        width: 100%;
        border-radius: 5px;
        border: 1px solid #ddd;
        resize: none;
      }

      .star,
      .btn-cancelar,
      .btn {
        border: none;
      }

      .star {
        background: none;
        margin-right: 8px;

        svg {
          font-size: 18px;

          &:hover {
            color: #e7711b;
          }
        }
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
}
</style>
