<template>
  <div class="auth">
    <transition mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: "Auth"
};
</script>

<style lang="scss">
.auth {
  height: 100%;
  width: 100%;

  section {
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
}
</style>
