<template>
    <div class="fullscreen" ref="el">
        <div>
            <ClassementRace :show-content="false" @indexNewRace="scrollToNewRace" :index-new-element="indexNewElement >= 0 ? indexNewElement : undefined"/>
        </div>
    </div>
</template>

<script setup lang="ts">

import ClassementRace from '@/components/ClassementRace.vue';
import { useScroll } from '@vueuse/core';
import { ref } from 'vue';

const el = ref<HTMLElement | null>(null);
const indexNewElement = ref(-1);
const { y: posY } = useScroll(el, { behavior: 'smooth' });

/**
 * Scroll sur la page pour afficher la dernière course
 * @param index Index de l'élément
 */
function scrollToNewRace(index: number) {
  indexNewElement.value = index;

  //scroll jusqu'à l'élément
  posY.value = (index - 1) * 73 + 35 - (window.innerHeight / 2 - 60);

  // On attends 6 secondes et on revient au début
  setTimeout(() => {
    posY.value = 0;
    indexNewElement.value = -1;
  }, 6000);
}
</script>

<style scoped lang="scss">

div.fullscreen {
  background-color: var(--white);
  z-index: 10000;
  overflow-y: scroll;

  > div {
    margin: 35px auto 0 auto;
    width: 75%;
  }
}
</style>