<template>
    <nav>
        <ul>
            <li @click="clickMenu" class="accueil">
                <RouterLink :to="`/${userCar.car.idQuery}`">Accueil</RouterLink>
            </li>
            <li @click="clickMenu" v-if="!isNaN(userCar.car.idCar)">
                <RouterLink to="/pilote">Pilote</RouterLink>
            </li>
            <li @click="clickMenu" v-if="!isNaN(userCar.car.idCar)">
                <RouterLink to="/course">Mes Courses</RouterLink>
            </li>
            <li @click="clickMenu">
                <RouterLink to="/historique">Bonus</RouterLink>
            </li>
            <li @click="clickMenu">
                <RouterLink to="/classement">Classement</RouterLink>
            </li>
            <li @click="clickMenu" v-if="adminPost.idSection != ''">
                <RouterLink to="/admin">Admin</RouterLink>
            </li>
            <li @click="clickMenu" id="stage">
                <a href="https://forms.office.com/Pages/ResponsePage.aspx?id=p6gkJM1-REK-fgRvoEMkIDWILil6JahCo6JdgNf5EXJUMVpKQjBWOFZDT0IzRzc0QlY4RUNQTFk5SCQlQCN0PWcu"
                   target="_blank">
                    <img src="../assets/img/contract.png"
                         alt="Icon d'inscription à un stage">
                    <p>Stage</p>
                </a>
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">

import { useCarStore } from '@/stores/car';
import { useAdminPostStore } from '@/stores/adminPost';
import { ref } from 'vue';

const clickMenu = () => {
  localStorage.setItem('menuIsClicked', 'true');
  emit('clickMenu', true);
};

//Récupération de la voiture
const emit = defineEmits(['clickMenu']);
const userCar = useCarStore();
const adminPost = useAdminPostStore();

</script>

<style scoped lang="scss">
nav ul {
  margin-top: 50px;
  padding: 0;
  list-style: none;

  li#stage a {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    background-color: var(--pink-divtec);
    border: 2px solid var(--pink-divtec);
    padding: 7px 10px;
    border-radius: 30px;

    p {
      color: var(--white);
      margin-left: 4px;
    }

    img {
      width: 20px;
    }
  }

  li#stage a:hover {
    background-color: var(--white);

    p {
      color: var(--pink-divtec);
      margin-left: 4px;
    }
  }

  li {
    margin-top: 12px;
    font-family: 'SF Pro Display', sans-serif;
    font-weight: bold;
    font-style: normal;

    * {
      font-size: 27px;
    }

    a {
      transition: ease-in-out 0.15s;

      &:hover {
        color: var(--gray);
        transition: ease-in-out 0.15s;
      }


    }
  }
}
</style>