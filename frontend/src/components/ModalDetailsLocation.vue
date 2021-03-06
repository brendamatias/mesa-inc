<template>
  <div>
    <div v-if="loading" class="loading">
      <font-awesome-icon icon="spinner" class="fa-spin" />
    </div>
    <div v-else class="details">
      <div class="resume">
        <div class="header">
          <div>
            <strong>{{ location.name }}</strong>
            <span>{{ location.address }}</span>
          </div>

          <button class="btn">
            <font-awesome-icon icon="star" />Favoritar
          </button>
        </div>

        <span class="title">Resumo das avaliações</span>

        <div class="graph-container">
          <div>
            <div class="graph" v-for="score in scores" :key="score.id">
              <span>{{ score.id }}</span>
              <div class="grey">
                <div class="orange" :style="{ width: score.width }"></div>
              </div>
            </div>
          </div>
          <div class="right">
            <h1>{{ average }}</h1>
            <h5>{{ evaluationsLength }} comentários</h5>
          </div>
        </div>
      </div>
      <span class="title">Comentários</span>
      <div v-if="evaluations.length === 0" class="not-value">
        <span>Ops, essa localização não foi avaliada por nenhum usuário :(</span>
        <button class="btn" v-on:click="show('evaluation-location')">Avaliar</button>
      </div>
      <ul v-else>
        <li v-for="evaluation in evaluations" :key="evaluation.id">
          <img src="https://api.adorable.io/avatars/285/abott@adorable.png" alt="Perfil" />
          <div>
            <strong>{{ evaluation.user.name }}</strong>
            <p>{{ evaluation.comment }}</p>
            <button>
              <font-awesome-icon icon="heart" />Gostei
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { api } from "../services/api.js";

export default {
  name: "ModalDetailsLocation",
  props: {
    locationSelect: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      loading: true,
      evaluations: [],
      scores: [],
      location: [],
      average: 0,
      evaluationsLength: 0
    };
  },
  mounted() {
    this.getLocation();
    this.getEvaluations();
  },
  methods: {
    show(modal) {
      this.$modal.show(modal);
      this.$modal.hide("details-location");
    },
    getLocation() {
      const id = this.locationSelect;

      this.loading = true;

      api.get(`/locations/${id}`).then(res => {
        this.location = res.data;
        this.loading = false;
      });
    },
    getEvaluations() {
      const id = this.locationSelect;
      this.loading = true;

      api.get(`/locations/${id}/evaluations`).then(res => {
        this.evaluations = res.data;
        this.evaluationsLength = res.data.length;
        this.average = this.returnAverage(res.data);
        this.getScores();

        this.loading = false;
      });
    },
    getScores() {
      const scores = [
        {
          id: 5,
          width: this.getWidth(5) + "px"
        },
        {
          id: 4,
          width: this.getWidth(4) + "px"
        },
        {
          id: 3,
          width: this.getWidth(3) + "px"
        },
        {
          id: 2,
          width: this.getWidth(2) + "px"
        },
        {
          id: 1,
          width: this.getWidth(1) + "px"
        }
      ];

      this.scores = scores;
    },
    getWidth(id) {
      const array = this.evaluations;
      const length = array.length;
      let result = 0;

      if (length === 0) {
        return 0;
      }

      for (let i = 0; i < length; i++) {
        if (array[i].rating === id) {
          result = result + 1;
        }
      }

      result = (result / length) * 250;

      return result;
    },
    returnAverage(data) {
      let result = 0;
      const length = data.length;

      if (length === 0) {
        return 0;
      }

      for (let i = 0; i < length; i++) {
        result = result + data[i].rating;
      }

      result /= length;
      result = result.toFixed(1);

      return result.replace(".", ",");
    }
  }
};
</script>

<style lang="scss">
#details-location {
  .loading {
    font-size: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 650px;
    color: #c21712;
  }

  .details {
    padding: 40px;

    .title {
      color: #222;
      font-size: 18px;
    }
  }

  button {
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 25px;
    height: 42px;
    border: 0;

    border-radius: 5px;
    background: #c21712;
    font-size: 14px;
    color: #fff;
    font-weight: bold;

    svg {
      margin-right: 5px;
    }
  }

  .resume {
    margin-bottom: 26px;

    .header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 16px;

      strong {
        display: block;
        color: #333;
        font-size: 22px;
      }

      span {
        color: #999;
        font-size: 13px;
      }
    }

    .graph-container {
      display: flex;
      h1 {
        color: #e7711b;
        font-size: 56px;
        margin-bottom: 6px;
      }

      h5 {
        font-size: 14px;
        color: #878787;
      }

      h1,
      h5 {
        font-weight: 400;
      }

      .right {
        margin-left: 30px;
        text-align: center;
      }
    }

    .graph {
      display: flex;
      align-items: center;
      margin-top: 6px;
      margin-right: auto;

      span {
        font-size: 14px;
        color: #70757a;
        padding-right: 12px;
      }
    }

    .grey,
    .orange {
      width: 100%;
      border-radius: 9px;
      height: 9px;
    }

    .grey {
      background-color: #e8eaed;
      width: 250px;
    }

    .orange {
      background: #e7711b;
    }
  }

  .not-value {
    margin-top: 80px;
    text-align: center;

    span {
      font-weight: bold;
    }

    button {
      margin: 30px auto 0 auto;
    }
  }

  ul {
    overflow: auto;
    display: flex;
    flex-direction: column;
    height: 300px;
    margin-top: 16px;

    li {
      display: flex;
      padding: 20px 0;
      font-size: 13px;
      line-height: 18px;

      border-bottom: 1px solid #eee;

      img {
        height: 32px;
        width: 32px;
        border-radius: 50%;
      }

      div {
        display: flex;
        flex-direction: column;
        padding: 0 15px;

        p {
          padding: 5px 0 10px 0;
          color: #222;
        }

        button {
          border: none;
          background: none;
          bottom: 1px;
          color: #999;
          font-size: 13px;
          text-align: left;

          svg {
            margin-right: 6;

            &:hover {
              color: #7b7b7b;
              cursor: pointer;
            }
          }

          &:hover {
            cursor: default;
          }
        }
      }
    }
  }
}
</style>
