<template>

    <header :class="classMenuHeader">
        <RouterLink v-if="menuIsClicked" :to="URL_HOME">
            <img :src=logoImg alt="Logo tuture divtec">
        </RouterLink>

        <HeaderApp v-else @clickMenu="menuIsClicked = $event"></HeaderApp>

        <div :class="'btn ' + classMenuIcon" @click="clickMenu">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </header>

    <header class="large">
        <RouterLink :to="`/${car.idQuery}`">
            <img :src=logoImg alt="Logo tuture divtec">
        </RouterLink>
        <HeaderApp></HeaderApp>
    </header>

    <main :class="classMenuClicked">
        <RouterView v-if="hasFinishedLoading"/>
        <SpinLoading class="load-element" v-else></SpinLoading>
    </main>

    <footer>
        <FooterApp id="footer" :class="classMenuClicked"/>
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

/**
 * Gère le clic sur le menu
 */
function clickMenu() {
  menuIsClicked.value = !menuIsClicked.value;
  localStorage.setItem('menuIsClicked', menuIsClicked.value ? 'true' : 'false');
}

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
const { car } = userCar;
const hasFinishedLoading = ref(false);
const widthScreen = ref(0);
const LIMIT_LARGE_CONTENT = 700;
const URL_HOME = `/${car.idQuery}`;

//Initialisation des variables avec des données de l'écran actuel
changeValueWidthScreen();

//Récupération des données de la voiture, si elle est dans le localstorage
const userCarId = localStorage.getItem('userCarId');
if (userCarId) {
  userCar.initUserCarId(userCarId).then(() => {
    hasFinishedLoading.value = true;
    car.idCar = Number(userCarId);
  });
} else {
  hasFinishedLoading.value = true;
  car.idCar = Number(userCarId);
}

//Si aucune donnée n'est dans le localstorage alors initialisation
let menuIsClicked = ref(localStorage.getItem('menuIsClicked') == 'true');
if (!localStorage.getItem('menuIsClicked')) {
  localStorage.setItem('menuIsClicked', 'true');
  menuIsClicked.value = true;
}

</script>

<style scoped lang="scss">

//Le contenu large est caché pour les petits écran
.large {
  display: none;
}

//Elelement qui doivent disparaître
.none {
  display: none;
}

footer#footer.display {
  display: flex;
}

.display {
  display: block;
}

header {
  display: flex;
  justify-content: space-between;
  padding: 25px 35px;
  position: fixed;
  width: 100%;
  z-index: 1000;
    background-color: var(--white);

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
    height: calc(100vh + 20px);

    .btn {
      margin-top: 8px;
    }
  }
}

main {
    padding-top: 125px ;
}

header.closed.thin,
header.large {
  box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
  height: 100px;
}

.btn {
  width: 57px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: center;
  height: fit-content;

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
}
</style>
