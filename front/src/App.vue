<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
import {useCarStore} from '@/stores/car'
import {ref} from "vue";

const userCar = useCarStore();

const userCarId = localStorage.getItem("userCarId");

if (userCarId !== null) {
    userCar.initUserCarUrl(userCarId)
}

let menuIsClicked = ref(false);

</script>

<template>

    <div v-if="!menuIsClicked">
        <header class="closed">
            <img src="./assets/logo.png" alt="Logo du Vue pour test">
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
                <li>
                    <RouterLink to="/graphics">Graphics</RouterLink>
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
  padding: 25px 35px;

  img {
    height: 45px;
  }
}

header.closed {
  box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
  margin-bottom: 30px;
}

header.open {
  height: 100vh;

  ul {
    margin-top: 40px;
    padding: 0;
    list-style: none;

    li {
      font-size: 25px;
      margin-top: 10px;
      font-family: 'SF Pro Display', sans-serif;
      font-weight: bold;
      font-style: normal;
    }
  }
}
</style>
