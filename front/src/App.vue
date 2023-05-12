<template>
    <div  class="thin-content">
        <header v-if="!menuIsClicked" class="closed">
            <RouterLink :to="`/${car.idQuery}`">
                <img src="./assets/img/logo.png" alt="Logo tuture divtec">
            </RouterLink>
            <img src="./assets/img/volant.png" alt="Volant pour le menu" @click="clickMenu">
        </header>

        <main v-if="!menuIsClicked && hasFinishedLoading">
            <RouterView/>
        </main>

        <FooterApp :screen-width="'large'" v-if="!menuIsClicked"/>

        <header class="open" v-else>
            <HeaderApp></HeaderApp>
            <img src="./assets/img/volant.png" alt="Volant pour le menu" @click="clickMenu">
        </header>
    </div>
    <div  class="large-content">
        <header>
            <RouterLink :to="`/${car.idQuery}`"><img src="./assets/img/logo.png" alt="Logo tuture divtec">
            </RouterLink>
            <HeaderApp :screen-width="'large'"></HeaderApp>
        </header>

        <main v-if="hasFinishedLoading">
            <RouterView/>
        </main>

        <FooterApp :screen-width="'large'"/>
    </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { useCarStore } from '@/stores/car';
import { ref } from 'vue';
import HeaderApp from '@/components/HeaderApp.vue';
import FooterApp from '@/components/FooterApp.vue';

/**
 * Gère le clic sur le menu
 */
function clickMenu() {
  menuIsClicked.value = !menuIsClicked.value;
  localStorage.setItem('menuIsClicked', menuIsClicked.value ? 'true' : 'false');
}

//Initialisation de la voiture
const userCar = useCarStore();
const { car } = userCar;
const hasFinishedLoading = ref(false);

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
.large-content {
    display: none;
}

header {
    display: flex;
    justify-content: space-between;
    padding: 25px 35px;

    img {
        height: 55px;
    }
}

.thin-content header.closed,
div.large-content header {
    box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
    height: 100px;
}

.thin-content header.open {
    height: 100vh;


}


</style>
