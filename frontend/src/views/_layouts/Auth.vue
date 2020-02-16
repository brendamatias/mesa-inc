<template>
  <section>
    <TheHeader />
    <div class="app">
      <transition mode="out-in">
        <router-view />
      </transition>
    </div>
  </section>
</template>

<script>
import TheHeader from "../../components/TheHeader";

export default {
  name: "Auth",
  components: {
    TheHeader
  }
};
</script>

<style lang="scss" scoped>
section {
  background: linear-gradient(180deg, #22202c, #772b2b);
  height: 100%;
  max-width: 100%;

  .app {
    width: 100%;
    height: calc(100% - 94px);
  }
}
</style>
