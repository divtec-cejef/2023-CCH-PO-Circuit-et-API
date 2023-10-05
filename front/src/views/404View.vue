<template>
    <div class="container">
        <h1>404</h1>

        <Road :width="width" />

        <div class="text-container">
            <p class="summary">Cette page n'existe pas!</p>
            <RouterLink to="/">Accueil</RouterLink>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent } from "vue";
import { useWindowSize } from "@vueuse/core";

const { width } = useWindowSize();
const Road = defineAsyncComponent(() => import("@/components/Road.vue"));
</script>

<style lang="scss" scoped>
@import "@/assets/css/consts";

.container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding-top: 80px;
}

h1 {
  font-size: 7rem;
  margin: 0;
}

.text-container {
  display: flex;
  flex-direction: column;
  align-items: center;

  .summary {
    font-weight: 500;
    margin: 0 0 1em 0;
  }

  a {
    text-decoration: none;
    font-weight: bold;
    padding: .75em;
    box-shadow: $default-shadow;
    margin: 1em auto;
    border-radius: .75em;
    transition: all 300ms ease-in;

    &:hover {
      background-color: gray;
      color: var(--white);
      transition-timing-function: ease-out;
    }
  }
}
</style>
