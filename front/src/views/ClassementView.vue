<template>
    <div class="content">
        <h1>Classement</h1>
        <p>Ici tu vois tout les temps des pilotes !</p>

        <div class="button-classement">
            <div>
                <button v-if="userCar.car.idCar !== 0"
                        class="classement-user"
                        @click="scrollToUser"
                        :style="{ backgroundImage: `url(${placeHolderImg})`}">
                </button>
                <button
                        class="classement-top"
                        @click="scrollToTop"
                        :style="{ backgroundImage: `url(${topImg})`}">
                </button>
            </div>
        </div>

        <div class="classement" ref="classment">
            <ClassementRace/>
        </div>
    </div>
</template>
<script setup lang="ts">
import ClassementRace from '@/components/ClassementRace.vue';
import placeHolderImg from '../assets/img/placeholder.webp';
import topImg from '../assets/img/top-10.webp';
import { useCarStore } from '@/stores/car';
import { useWindowSize, useElementBounding, useScroll } from '@vueuse/core';
import { ref } from 'vue';

const classment = ref<HTMLElement | null>(null);
const scroll = useScroll(window);
const { height: classementHeight } = useWindowSize();
const { top: classmentTop } = useElementBounding(classment);
const userCar = useCarStore();
userCar.initUserAllRaceCar();

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


div.button-classement {
  width: 100%;
  margin: -35px auto 0 auto;
  display: flex;
  justify-content: end;
  position: sticky;
  top: 40px;

  div {
    background-color: var(--white);
    border-radius: 20px;
    padding: .5em;
    box-shadow: rgba(50, 50, 93, 0.25) 0 13px 27px -5px, rgba(0, 0, 0, 0.3) 0 8px 16px -8px;
    display: flex;
    align-content: center;
    justify-content: space-evenly;

    @media screen and (prefers-color-scheme: dark) {
      background-color: transparent;
      box-shadow: none;
      border: $dark-border;
    }

    button {
      background-color: transparent;
      border: none;
      border-radius: 100%;
      background-position: center;
      background-size: 30px;
      background-repeat: no-repeat;
      width: 40px;
      height: 40px;


      &.classement-top {
        margin-left: 5px;
      }

      &:hover {
        transform: scale(1.1);
        background-color: rgba(lightgray, 0.25);
      }
    }
  }
}

.classement {
    margin: 0;
}
button {
  cursor: pointer;
  transition: 0.3s all ease-in-out;
}

</style>
