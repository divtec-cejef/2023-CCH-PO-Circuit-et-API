<template>
    <div class="container">
        <h1>404</h1>
        <div class="text-container">
            <p>Cette page n'existe pas!</p>
            <RouterLink to="/">Accueil</RouterLink>
        </div>
    </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
@import "@/assets/css/consts";

.container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  h1 {
    font-size: 7rem;
    margin: 0;
  }

 .text-container {
    display: flex;
    flex-direction: column;
    align-items: center;

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
}
</style>
