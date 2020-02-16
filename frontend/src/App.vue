<template>
  <div id="app">
    <Auth v-if="$store.state.signed" />
    <Login v-else />
  </div>
</template>

<script>
import Login from "./views/Login.vue";
import Auth from "./views/_layouts/Auth.vue";

export default {
  name: "App",
  components: { Login, Auth }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
}

*:focus {
  outline: 0;
}

html,
body,
#app {
  width: 100%;
  height: 100%;
}

body {
  -webkit-font-smoothing: antialiased;
}

body,
input,
button {
  font: 14px "Roboto", sans-serif;
}

a {
  text-decoration: none;
}

ul {
  list-style: none;
}

button {
  cursor: pointer;
}
</style>
