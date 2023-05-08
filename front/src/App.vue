<template>
    <div v-if="getWidthScreen <= 760">
        <header v-if="!menuIsClicked" class="closed">
            <RouterLink :to="`/${car.idQuery}`"><img src="./assets/img/logo-d.png" alt="Logo tuture divtec">
            </RouterLink>
            <img src="./assets/img/volant.png" alt="Volant pour le menu" @click="clickMenu">
        </header>

        <main v-if="!menuIsClicked">
            <RouterView/>
        </main>

        <footer v-if="!menuIsClicked">
            <p>EMT, Portes ouvertes 2023</p>
            <div>
                <a target="_blank" href="https://www.instagram.com/emtporrentruy/">
                    <img src="./assets/img/instagram.png"
                         alt="Logo instagram"></a>
                <a target="_blank" href="https://www.facebook.com/DivtecCEJEF/">
                    <img src="./assets/img/facebook.png"
                         alt="Logo faceboook"></a>
            </div>
        </footer>

        <header class="open" v-else>
            <nav>
                <ul @click="clickMenu">
                    <li>
                        <RouterLink :to="`/${car.idQuery}`">Accueil</RouterLink>
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
            <img src="./assets/img/volant.png" alt="Volant pour le menu" @click="clickMenu">
        </header>
    </div>

    <div class="large-content" v-else>
        <header>
            <RouterLink :to="`/${car.idQuery}`"><img src="./assets/img/logo-d.png" alt="Logo tuture divtec">
            </RouterLink>
            <nav>
                <ul>
                    <li>
                        <RouterLink :to="`/${car.idQuery}`">Accueil</RouterLink>
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
        </header>

        <main>
            <RouterView/>
        </main>

        <footer>
            <p>EMT, Portes ouvertes 2023</p>
            <div>
                <a target="_blank" href="https://www.instagram.com/emtporrentruy/">
                    <img src="./assets/img/instagram.png"
                         alt="Logo instagram"></a>
                <a target="_blank" href="https://www.facebook.com/DivtecCEJEF/">
                    <img src="./assets/img/facebook.png"
                         alt="Logo faceboook"></a>
            </div>
        </footer>
    </div>
</template>

<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
import {useCarStore} from '@/stores/car'
import {computed, ref} from "vue";
import {tr} from "date-fns/locale";

/**
 * Gère le clic sur le menu
 */
function clickMenu() {
    menuIsClicked.value = !menuIsClicked.value
    localStorage.setItem('menuIsClicked', menuIsClicked.value ? "true" : "false")
}

//Récupère la largeur de l'écran
const getWidthScreen = computed(() => {
    console.log(window.innerWidth)
    return window.innerWidth;
})

//Récupération des données de la voiture, si elle est dans le localstorage
const userCar = useCarStore();
const {car} = userCar;
const userCarId = localStorage.getItem("userCarId");

if (userCarId) {
    userCar.initUserCarId(userCarId)
}

//Si aucune donnée n'est dans le localstorage alors initialisation
let menuIsClicked = ref(localStorage.getItem('menuIsClicked') == 'true');
if (!localStorage.getItem('menuIsClicked')) {
    localStorage.setItem('menuIsClicked', 'false')
    menuIsClicked.value = false;
}


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

header.closed,
div.large-content header {
  box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
  height: 100px;
}

header.open, {
  height: 100vh;

  ul {
    margin-top: 40px;
    padding: 0;
    list-style: none;

    li {
      margin-top: 12px;
      font-family: 'SF Pro Display', sans-serif;
      font-weight: bold;
      font-style: normal;

      * {
        font-size: 27px;
      }
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
      width: 25px;
    }

    img:nth-child(1) {
      margin-right: 15px;
    }
  }
}
</style>
