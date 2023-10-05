<template>
    <img :src="image?.default"
         :alt="`Icon changement ${imageNameFr}` ">
</template>

<script setup lang="ts">

import { ref } from 'vue';

const props = defineProps<{
  imageName: string
  imageNameFr: string
}>();

const image = ref();


//Importation de l'image de rank
async function importImage() {
  return await import(`../assets/img/${props.imageName}.webp`);
}

//Si l'utilisateur est sur le podium alors import image
importImage().then((v) => {
  image.value = v;
});

</script>

<style scoped>

</style>
