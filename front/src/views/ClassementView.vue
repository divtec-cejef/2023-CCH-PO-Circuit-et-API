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

        <div class="classement">
            <ClassementRace/>
        </div>
    </div>
</template>
<script setup lang="ts">
import ClassementRace from '@/components/ClassementRace.vue';
import placeHolderImg from '../assets/img/placeholder.webp';
import topImg from '../assets/img/top-10.webp';
import { useCarStore } from '@/stores/car';

/**
 * Scroll à l'élément de l'utilisateur
 */
function scrollToUser() {
  let screenHeight = window.innerHeight;
  window.scrollTo(0, 10 * 50 + 250 - screenHeight / 2);
}

/**
 * Scroll jusqu'au haut de la page
 */
function scrollToTop() {
  window.scrollTo(0, document.body.scrollTop);
}

const userCar = useCarStore();

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
