<template>
    <div class="content">
        <div class="top-container">
            <div class="text-container">
                <h1>Classement</h1>
            </div>
        </div>
        <div class="with-100">
            <ClassmentButton class="buttons" @scrollToTop="scrollToTop" @scrollToUser="scrollToUser"/>
        </div>

        <div ref="classment" class="classement">
            <ClassementRace/>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useCarStore } from '@/stores/car';
import { useElementBounding, useScroll, useWindowSize } from '@vueuse/core';
import { defineAsyncComponent, ref } from 'vue';

const ClassementRace = defineAsyncComponent(() => import('@/components/ClassementRace.vue'));
const ClassmentButton = defineAsyncComponent(() => import('@/components/ClassmentButton.vue'));

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

<style lang="scss" scoped>
@import "@/assets/css/consts.scss";

.content {
  flex: 1;

  .top-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: calc(100% - 110px);
    margin-bottom: 1.5rem;
  }

  .with-100 {
    width: 100%;
    position: sticky;
    display: flex;
    z-index: 10;
    justify-content: end;
    top: 110px;
    margin-top: -80px;

    .buttons {
      width: fit-content
    }
  }

  .classement {
    width: 100%;
    margin: 30px 0 0 0;
  }
}


</style>
