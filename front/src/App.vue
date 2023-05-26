<template>
    <header v-if="menuIsClicked" class="closed thin">
        <RouterLink :to="`/${car.idQuery}`">
            <img :src=logoImg alt="Logo tuture divtec">
        </RouterLink>
        <img :src=menuImg alt="Volant pour le menu" @click="clickMenu">
    </header>

    <header class="large">
        <RouterLink :to="`/${car.idQuery}`">
            <img :src=logoImg alt="Logo tuture divtec">
        </RouterLink>
        <HeaderApp></HeaderApp>
    </header>

    <main :class="classMenuClicked" v-if="hasFinishedLoading">
        <RouterView/>
    </main>

    <FooterApp id="footer" :class="classMenuClicked"/>

    <header v-if="!menuIsClicked" class="open thin">
        <HeaderApp></HeaderApp>
        <img :src=menuImg alt="Volant pour le menu" @click="clickMenu">
    </header>

</template>

<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router';
import { useCarStore } from '@/stores/car';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import HeaderApp from '@/components/HeaderApp.vue';
import FooterApp from '@/components/FooterApp.vue';
import menuImg from '@/assets/img/volant.webp';
import logoImg from '@/assets/img/logo.webp';

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
const changeWidthScreen = () => {
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

//Ecoute du resize de la page pour changer la largeur
onMounted(() => {
  window.addEventListener('resize', changeWidthScreen);
});

onUnmounted(() => {
  window.removeEventListener('resize', changeWidthScreen);
});

//Initialisation de la voiture
const userCar = useCarStore();
const { car } = userCar;
const hasFinishedLoading = ref(false);
let widthScreen = ref(window.innerWidth);
const LIMIT_LARGE_CONTENT = 700;
const route = useRoute();

//Ecoute sur le changement de lien
watch(route, async () => {
  clickMenu();
});

//Récupération des données de la voiture, si elle est dans le localstorage
const userCarId = localStorage.getItem('userCarId');
if (userCarId) {
  userCar.initUserCarId(userCarId).then(() => {
    hasFinishedLoading.value = true;
  });
} else {
  hasFinishedLoading.value = true;
}

//Si aucune donnée n'est dans le localstorage alors initialisation
let menuIsClicked = ref(localStorage.getItem('menuIsClicked') == 'true');
if (!localStorage.getItem('menuIsClicked')) {
  localStorage.setItem('menuIsClicked', 'false');
  menuIsClicked.value = false;
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

    img {
        height: 55px;
    }
}

header.closed.thin,
header.large {
    box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
    height: 100px;
}

header.open.thin {
    height: 100vh;
}
</style>
