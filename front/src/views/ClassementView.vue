<template>
    <div class="content">
        <div class="top-container">
            <div class="text-container">
                <h1>Classement</h1>
                <p>Ici tu vois tout les temps des pilotes !</p>
            </div>

            <ClassmentButton class="buttons" @scrollToUser="scrollToUser" @scrollToTop="scrollToTop"/>
        </div>

        <div class="classement" ref="classment">
            <ClassementRace/>
        </div>
    </div>
</template>
<script setup lang="ts">
import ClassementRace from '@/components/ClassementRace.vue';
import { useCarStore } from '@/stores/car';
import { useWindowSize, useElementBounding, useScroll, useElementByPoint } from '@vueuse/core';
import { ref } from 'vue';
import ClassmentButton from '@/components/ClassmentButton.vue';

const classment = ref<HTMLElement | null>(null);
const scroll = useScroll(window, { behavior: 'smooth' });
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
  const rank = userCar.car.rank || 0;
  const self = classment.value?.children[rank - 1] as HTMLElement;
  if (!self)
    return;
  const { top: topPos } = useElementBounding(self);

  const middle = classementHeight.value / 2 - 236; // 236 = offset entre le haut de la page et le haut du classement
  const elementOffset = topPos.value - classmentTop.value;
  const targetMiddlePosition = elementOffset + (63 / 2);
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

.content {
  .top-container {
    /*display: flex;
    flex-direction: row;
    justify-content: space-between;*/
    width: 100%;
    margin-bottom: 1.5rem;

    .buttons {
      position: fixed;
      top: 120px;
      right: 35px;
    z-index: 2;

      @media screen and (min-width:  1024px) {
        left: calc(50% + (930px / 2) - 101px);
      }
    }
  }

  .classement {
    width: 100%;
    margin: 0;
  }
}


</style>
