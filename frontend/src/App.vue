<template>
  <div id="app">
    <Default v-if="$store.state.signed" />
    <Auth v-else />
  </div>
</template>

<script>
import Auth from "./views/_layouts/Auth.vue";
import Default from "./views/_layouts/Default.vue";

export default {
  name: "App",
  components: { Auth, Default }
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
