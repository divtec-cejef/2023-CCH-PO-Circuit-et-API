<template>
    <nav class="header">
        <ul class="links">
            <li class="accueil" @click="clickMenu">
                <RouterLink :to="`/${userCar.car.idQuery || ''}`">Accueil</RouterLink>
                <img :src="houseImg" alt="Image d'accueil">
            </li>
            <li v-if="userCar.car.idCar" @click="clickMenu">
                <RouterLink to="/pilote">Pilote</RouterLink>
                <img :src="editImg" alt="Image de modification pour le pilote">
            </li>
            <li v-if="userCar.car.idCar" @click="clickMenu">
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
            <li v-if="adminPost.idSection" @click="clickMenu">
                <RouterLink to="/admin">Admin</RouterLink>
                <img :src="qrCodeimg" alt="Image de qr code pour les admins de poste">
            </li>
            <li v-if="adminPost.idSection" @click="clickMenu">
              <RouterLink to="/admin/randomly-select-business">Tirage au sort</RouterLink>
            </li>
            <li @click="clickMenu">
                <RouterLink class="with-emoji" to="/scanneurQR">Carte Forum</RouterLink>
            </li>
            <li id="stage" @click="clickMenu">
                <RouterLink to="/stage">
                    <p>Stage</p>
                    <img :src="stageImg"
                         alt="Icon d'inscription à un stage">
                </RouterLink>
            </li>
            <li v-if="userCar.car.idCar" class="logout-phone" @click="logOutUser">
                <span>Déconnexion</span>
                <img :src="exitPhoneImg" alt="Icon de déconnexion">
            </li>
            <li v-if="userCar.car.idCar" class="logout-big tooltip" @click="logOutUser">
                <img :src="colorScheme === 'dark' ? exitPhoneImg :exitImg" alt="Icon de déconnexion">
                <span class="tooltiptext">Déconnexion</span>
            </li>
        </ul>
    </nav>
</template>

<script lang="ts" setup>
import { useCarStore } from '@/stores/car';
import { useAdminPostStore } from '@/stores/adminPost';
import exitImg from '@/assets/img/exit.webp';
import exitPhoneImg from '@/assets/img/exit-phone.webp';
import { useRouter } from 'vue-router';
import { useLocalStorage, usePreferredColorScheme } from '@vueuse/core';

import houseImg from '@/assets/img/house.webp';
import editImg from '@/assets/img/edit.webp';
import rankingImg from '@/assets/img/top-three.webp';
import carImg from '@/assets/img/car-icon.webp';
import bonusImg from '@/assets/img/trophy.webp';
import qrCodeimg from '@/assets/img/qr-code.webp';
import live from '@/assets/img/live-icon.webp';
import stageImg from '@/assets/img/contract.webp';

const colorScheme = usePreferredColorScheme();
const router = useRouter();

const displayRef = useLocalStorage('display', 'modern');

const clickMenu = () => {
  emit('clickMenu', true);
};

/**
 * Log out de l'utilisateur
 */
function logOutUser() {
  const display = displayRef.value;
  //Suppresion du localstorage
  localStorage.clear();
  localStorage.setItem('display', display);

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

<style lang="scss" scoped>
@import "src/assets/css/consts";

nav.header {

  ul.links {
    padding: 0;
    list-style: none;

    li {
      margin-top: 12px;
      font-family: 'SF Pro Display', sans-serif;
      font-weight: bold;
      font-style: normal;
      align-items: center;
      display: flex;
      justify-content: space-between;
      box-shadow: $default-shadow;
      padding: 15px 15px;
      border-radius: 50px;

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

      &.logout-phone {
        width: 100%;
        background-color: var(--gray);
        color: var(--white);
        display: none;
      }

      &.logout-big.tooltip {
        display: flex;
        width: fit-content;
        height: 45px;
        margin-left: 0 !important;

        img {
          height: 35px;
          width: 35px;
          display: block !important;
          margin-left: 0;
        }
      }

      &#stage a {
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

        &:hover {
          background-color: var(--white);

          p {
            color: var(--pink-divtec);
            margin-left: 4px;
          }
        }
      }

      img {
        width: 22px;
        margin-left: 10px;
      }
    }
  }
}

.tooltip {
  position: relative;
  display: inline-block;
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
  z-index: 10;
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
