<template>
    <nav class="header">
        <ul class="links">
            <li @click="clickMenu" class="accueil">
                <RouterLink :to="`/${userCar.car.idQuery}`">Accueil</RouterLink>
                <img :src="houseImg" alt="Image d'accueil">
            </li>
            <li @click="clickMenu" v-if="userCar.car.idCar">
                <RouterLink to="/pilote">Pilote</RouterLink>
                <img :src="editImg" alt="Image de modification pour le pilote">
            </li>
            <li @click="clickMenu" v-if="userCar.car.idCar">
                <RouterLink to="/course">Mes Courses</RouterLink>
                <img :src="carImg" alt="Image de voiture">
            </li>
            <li @click="clickMenu">
                <RouterLink to="/bonus">Bonus</RouterLink>
                <img :src="bonusImg" alt="Image de bonus">
            </li>
            <li @click="clickMenu">
                <RouterLink to="/classement">Classement</RouterLink>
                <img :src="rankingImg" alt="Image de classement">
            </li>
            <li @click="clickMenu" v-if="adminPost.idSection">
                <RouterLink to="/admin">Admin</RouterLink>
                <img :src="qrCodeimg" alt="Image de qr code pour les admins de poste">
            </li>
            <li @click="clickMenu" id="stage">
                <RouterLink to="stage">
                    <p>Stage</p>
                    <img src="../assets/img/contract.png"
                         alt="Icon d'inscription à un stage">
                </RouterLink>
            </li>
        </ul>
        <ul class="buttons">

            <li v-if="userCar.car.idCar">
                <button class="logout-button tooltip" @click="logOutUser">
                    <span>Déconnexion</span>
                    <img :src="colorScheme === 'dark' ? exitPhoneImg :exitImg" alt="Icon de déconnexion">
                    <img :src="exitPhoneImg" alt="Icon de déconnexion">
                    <span class="tooltiptext">Déconnexion</span>
                </button>
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
import { useCarStore } from '@/stores/car';
import { useAdminPostStore } from '@/stores/adminPost';
import exitImg from '@/assets/img/exit.png';
import exitPhoneImg from '@/assets/img/exit-phone.png';
import { useRouter } from 'vue-router';
import { usePreferredColorScheme } from '@vueuse/core';

import houseImg from '@/assets/img/house.png';
import editImg from '@/assets/img/edit.png';
import rankingImg from '@/assets/img/top-three.png';
import carImg from '@/assets/img/car.png';
import bonusImg from '@/assets/img/trophy.png';
import qrCodeimg from '@/assets/img/qr-code.png';

const colorScheme = usePreferredColorScheme();
const router = useRouter();

const clickMenu = () => {
  emit('clickMenu', true);
};

/**
 * Log out de l'utilisateur
 */
function logOutUser() {
  //Suppresion du localstorage
  localStorage.clear();

  //Clear les stores pinia
  userCar.$reset();
  useAdminPostStore().$reset();

  clickMenu();

  //Retour à la page d'accueil
  router.push('/');
}

//Récupération de la voiture
const emit = defineEmits(['clickMenu']);
const userCar = useCarStore();
const adminPost = useAdminPostStore();

</script>

<style scoped lang="scss">
@import "src/assets/css/consts";

nav {
  height: 100%;

  ul {
    margin-top: 75px;
    padding: 0;
    list-style: none;

    li#stage a {
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: space-between;
      background-color: var(--pink-divtec);
      border: 2px solid var(--pink-divtec);
      padding: 7px 10px;
      border-radius: 30px;

      p {
        color: var(--white);
        margin-left: 4px;
      }


    }

    li#stage {
      a:hover {
        background-color: var(--white);

        p {
          color: var(--pink-divtec);
          margin-left: 4px;
        }
      }
    }

    li {
      margin-top: 12px;
      font-family: 'SF Pro Display', sans-serif;
      font-weight: bold;
      font-style: normal;
      align-items: center;
      display: flex;
      justify-content: space-between;


      * {
        font-size: 27px;
      }

      a {
          width: 100%;
        transition: ease-in-out 0.15s;

        &:hover {
          color: var(--gray);
          transition: ease-in-out 0.15s;
        }
      }
    }
  }

  ul.links {

    li {
      box-shadow: $default-shadow;
      padding: 10px 15px;
      border-radius: 50px;
    }

    li:last-child {
      box-shadow: none;
      padding: 0;
    }

    img {
      width: 22px;
      margin-left: 10px;
    }
  }
}

button.logout-button {
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;


  img {
    height: 35px;
  }

  img:nth-child(3) {
    display: none;
  }

  span:nth-child(1) {
    display: none;
  }
}


.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 110px;
  background-color: var(--gray);
  color: var(--white);
  text-align: center;
  padding: 5px 2px;
  border-radius: 100px;
  font-size: 15px !important;
  position: absolute;
  z-index: 1;
  font-style: italic;
  transition: all linear 0.3s;
  font-weight: normal;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  transition: all linear 0.3s 1s;
}

.tooltip .tooltiptext {
  width: 120px;
  top: 115%;
  left: 50%;
  margin-left: -80px;
}

</style>
