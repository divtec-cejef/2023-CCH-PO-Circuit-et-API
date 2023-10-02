<template>

    <header :class="classMenuHeader">
        <RouterLink v-if="menuIsClicked" :to="userCar.car.idQuery !== undefined ? `/${userCar.car.idQuery}` : '/'">
            <img :src=logoImg alt="Logo tuture divtec">
        </RouterLink>

        <div class="flex">
            <div :class="'btn ' + classMenuIcon" @click="clickMenu">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>

        <HeaderApp v-if="!menuIsClicked" @clickMenu="menuIsClicked = $event"></HeaderApp>
    </header>

    <header class="large">
        <RouterLink :to="userCar.car.idQuery !== undefined ? `/${userCar.car.idQuery}` : '/'">
            <img :src=logoImg alt="Logo grand prix de la Divtec">
        </RouterLink>
        <HeaderApp></HeaderApp>
    </header>

    <main :class="classMenuClicked">
        <RouterView v-if="hasFinishedLoading"/>
        <SpinLoading class="load-element" v-else-if="hasError === false"></SpinLoading>
        <ErrorConnection v-else></ErrorConnection>
    </main>

    <footer id="main-footer" :class="classMenuClicked">
        <FooterApp/>
    </footer>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { useCarStore } from '@/stores/car';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import HeaderApp from '@/components/TheHeader.vue';
import FooterApp from '@/components/TheFooter.vue';
import logoImg from '@/assets/img/logo.webp';
import SpinLoading from '@/components/SpinLoading.vue';
import { useLocalStorage } from '@vueuse/core';
import ErrorConnection from '@/components/ErrorConnection.vue';

/**
 * Gère le clic sur le menu
 */
function clickMenu() {
  menuIsClicked.value = !menuIsClicked.value;
}

/**
 * Enregistrer display=legacy
 */
const display = useLocalStorage('display', 'modern');
const params = location.search.slice(1).split('&');
params.forEach((item) => {
  if (item === 'display=legacy') {
    display.value = 'legacy';
  }
});

/**
 * Change la valeur de la taille de l'écran
 */
const changeValueWidthScreen = () => {
  widthScreen.value = window.innerWidth;
};


// Change la classe des éléments des menus pour le petit contenu
const classMenuClicked = computed(() => {
  if (widthScreen.value < LIMIT_LARGE_CONTENT) {
    return menuIsClicked.value ? 'display' : 'none';
  } else {
    return 'display';
  }
});

// Change la classe de l'header en fonction de l'état du menu
const classMenuHeader = computed(() => {
  return menuIsClicked.value ? 'closed thin' : 'open thin';
});

// Change la classe pour le logo du menu
const classMenuIcon = computed(() => {
  return menuIsClicked.value ? 'not-active' : 'active';
});

//Ecoute du resize de la page pour changer la largeur
onMounted(() => {
  window.addEventListener('resize', changeValueWidthScreen);
});

onUnmounted(() => {
  window.removeEventListener('resize', changeValueWidthScreen);
});

//Initialisation de la voiture
const userCar = useCarStore();
const hasFinishedLoading = ref(false);
const widthScreen = ref(0);
const LIMIT_LARGE_CONTENT = 700;
const menuIsClicked = ref(true);
const hasError = ref(false);

//Initialisation des variables avec des données de l'écran actuel
changeValueWidthScreen();

//Récupération des données de la voiture, si elle est dans le localstorage
const userCarId = localStorage.getItem('userCarId');
if (userCarId) {
  userCar.initUserCarId(userCarId).then((v) => {

    if (v == undefined) {
      hasError.value = true;
    }
    hasFinishedLoading.value = true;

  });
} else {
  hasFinishedLoading.value = true;
}

</script>

<style scoped lang="scss">

//Le contenu large est caché pour les petits écran
.large {
  display: none;
}

//Elelement qui doivent disparaître
.none {
  display: none !important;
}

footer#main-footer.display {
  display: flex;
}

header {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  background-color: var(--white);
  overflow-y: scroll;

  img {
    height: 55px;
  }

  .img-menu {
    svg {
      width: 50px;
    }
  }

  &.closed {
    align-items: center;

  }

  &.open.thin {
    display: block;
    height: calc(100vh + 20px - env(safe-area-inset-bottom) - env(safe-area-inset-top));
  }
}

main {
  padding-top: 125px;
}

header.closed.thin,
header.large {
  box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
  height: 100px;
}

header.large {
  position: fixed;
  top: env(safe-area-inset-top);
  left: 0;
  right: 0;
  z-index: 1000;
  overflow-y: unset;
}

.flex {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: end;

  .btn {
    width: 57px;
    height: 70px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: center;
    right: 20px;
    top: calc(env(safe-area-inset-top) + 20px);

    span {
      display: block;
      width: 100%;
      border-radius: 3px;
      height: 5px;
      background: var(--gray);
      transition: all .3s;
      position: relative;
    }
  }
}


span + span {
  margin-top: 8.75px;
}

html body div header .active span {
  width: 45px !important;
}

.active span:nth-child(1) {
  width: 100%;
  animation: ease .7s top forwards;
}

.not-active span:nth-child(1) {
  width: 60%;
  animation: ease .7s top-2 forwards;
}

.active span:nth-child(2) {
  width: 100%;
  animation: ease .7s scaled forwards;
}

.not-active span:nth-child(2) {
  width: 90%;
  animation: ease .7s scaled-2 forwards;
}

.active span:nth-child(3) {
  width: 100%;
  animation: ease .7s bottom forwards;
}

.not-active span:nth-child(3) {
  width: 78%;
  animation: ease .7s bottom-2 forwards;
}

@keyframes top {
  0% {
    top: 0;
    transform: rotate(0);
  }
  50% {
    top: 13.75px;
    transform: rotate(0);
  }
  100% {
    top: 13.75px;
    transform: rotate(45deg);
  }
}

@keyframes top-2 {
  0% {
    top: 13.75px;
    transform: rotate(45deg);
  }
  50% {
    top: 13.75px;
    transform: rotate(0deg);
  }
  100% {
    top: 0;
    transform: rotate(0deg);
  }
}

@keyframes bottom {
  0% {
    bottom: 0;
    transform: rotate(0);
  }
  50% {
    bottom: 13.75px;
    transform: rotate(0);
  }
  100% {
    bottom: 13.75px;
    transform: rotate(135deg);
  }
}

@keyframes bottom-2 {
  0% {
    bottom: 13.75px;
    transform: rotate(135deg);
  }
  50% {
    bottom: 13.75px;
    transform: rotate(0);
  }
  100% {
    bottom: 0;
    transform: rotate(0);
  }
}

@keyframes scaled {
  50% {
    transform: scale(0);
  }
  100% {
    transform: scale(0);
  }
}

@keyframes scaled-2 {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}

.load-element {
  height: calc(100vh - var(--height-screen-diff));
  display: flex;
  justify-content: center;
  align-items: center;
}

footer {
  bottom: 0;
  width: 100%;
  height: 65px;
  background-color: var(--gray);
  color: var(--white);
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 0 35px;
  margin-top: 15px;
}
</style>
