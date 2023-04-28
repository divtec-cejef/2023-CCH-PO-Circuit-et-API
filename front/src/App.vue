<template>
    <header v-if="!menuIsClicked" class="closed">
        <img src="./assets/img/logo-d.png" alt="Logo du Vue pour test">
        <img src="./assets/img/volant.png" alt="Volant pour le menu" @click="menuIsClicked = !menuIsClicked">
    </header>

    <main v-if="!menuIsClicked">
        <RouterView/>
    </main>

    <footer v-if="!menuIsClicked">
        <p>EMT Porrentruy, Portes ouvertes 2023</p>
        <div>
            <a href=""><img src="./assets/img/instagram.png" alt="Logo instagram"></a>
            <a href=""><img src="./assets/img/facebook.png" alt="Logo faceboook"></a>
        </div>
    </footer>

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

<style scoped lang="scss">

header {
  display: flex;
  justify-content: space-between;
  padding: 25px 35px;
  img {
    height: 55px;
  }
}

header.closed {
  box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
  height: 100px;
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

footer {
  bottom: 0;
  width: 100%;
  height: 65px;
  background-color: var(--gray);
  color: var(--white);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 35px;

  div {
    justify-self: end;
    align-items: center;
    display: flex;
    flex-direction: row;

    img {
      width: 35px;
    }

    img:nth-child(1) {
      margin-right: 15px;
    }
  }
}
</style>
