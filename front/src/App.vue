<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
import {useCarStore} from '@/stores/car'
import {ref} from "vue";

const userCar = useCarStore();

const userCarId = localStorage.getItem("userCarId");

if (userCarId) {
    userCar.initUserCarUrl(userCarId)
}

let menuIsClicked = ref(false);

</script>

<template>

    <div v-if="menuIsClicked">
        <header class="closed">
            <img src="./assets/logo.svg" alt="Logo du Vue pour test">
            <img src="./assets/img/volant.png" alt="Volant pour le menu" @click="menuIsClicked = !menuIsClicked">
        </header>

        <RouterView/>
    </div>

    <header class="open" v-else>
        <nav>
            <ul>
                <li>
                    <RouterLink :to="`/${userCar.idQuery}`">Accueil</RouterLink>
                </li>
                <li>
                    <RouterLink to="/course">Course</RouterLink>
                </li>
                <li>
                    <RouterLink to="/historique">Historique</RouterLink>
                </li>
                <li>
                    <RouterLink to="/apropos">A Propos</RouterLink>
                </li>
            </ul>
        </nav>
        <img src="./assets/img/volant.png" alt="Volant pour le menu" @click="menuIsClicked = !menuIsClicked">
    </header>
</template>


<style scoped lang="scss">

header {
  display: flex;
  justify-content: space-between;

  background-color: red;
  padding: 35px;

  img {
    width: 45px;
    height: 45px;
  }
}

header.closed {
}

header.open {
  height: 100vh;

  ul {
    padding: 0;
    list-style: none;
  }
}
</style>
