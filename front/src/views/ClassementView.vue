<template>
    <div class="content">
        <h1>Classement</h1>
        <p>Ici tu vois tout les temps des pilotes !</p>

        <ClassmentButton @scrollToUser="scrollToUser" @scrollToTop="scrollToTop"/>

        <div class="classement" ref="classment">
            <ClassementRace/>
        </div>
    </div>
</template>
<script setup lang="ts">
import ClassementRace from '@/components/ClassementRace.vue';
import { useCarStore } from '@/stores/car';
import { useWindowSize, useElementBounding, useScroll } from '@vueuse/core';
import { ref } from 'vue';
import ClassmentButton from '@/components/ClassmentButton.vue';

const classment = ref<HTMLElement | null>(null);
const scroll = useScroll(window);
const { height: classementHeight } = useWindowSize();
const { top: classmentTop } = useElementBounding(classment);
const userCar = useCarStore();

if (userCar.car.idCar !== undefined) {
  userCar.initUserAllRaceCar();
}

/**
 * Change le scroll du classement pour le mettre à la hauteur de l'utilisateur
 */
function scrollToUser() {
  const middle = classementHeight.value / 2 - 50;
  const rank = userCar.car.rank || 0;
  const elementOffset = (rank - 1) * (63 + 10) + classmentTop.value - 100;
  const targetMiddlePosition = elementOffset + (63 / 2);
  console.dir({
    top: classmentTop.value,
    toContainerOffset: (rank - 1) * (63 + 10),
    middle,
    rank,
    elementOffset,
    targetMiddlePosition,
    scroll: Math.max(0, targetMiddlePosition - middle)
  });
  scroll.y.value = Math.max(0, targetMiddlePosition - middle);
}

/**
 * Change le scroll du classement pour le mettre en haut du classement
 */
function scrollToTop() {
  scroll.y.value = 0;
}

</script>

<style scoped lang="scss">
@import "@/assets/css/consts.scss";

.classement {
  width: 100%;
  margin: 20px 10px ;
}

p {
  width: 70%;
}

.classement {
    margin: 0;
}
button {
  cursor: pointer;
  transition: 0.3s all ease-in-out;
}

</style>
