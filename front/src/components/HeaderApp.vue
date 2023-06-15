<template>
    <nav>
        <ul>
            <li @click="clickMenu" class="accueil">
                <RouterLink :to="`/${userCar.car.idQuery}`">Accueil</RouterLink>
            </li>
            <li @click="clickMenu" v-if="userCar.car.idCar !== 0">
                <RouterLink to="/modifier">Modifier</RouterLink>
            </li>
            <li @click="clickMenu" v-if="userCar.car.idCar !== 0">
                <RouterLink to="/course">Course</RouterLink>
            </li>
            <li @click="clickMenu">
                <RouterLink to="/classement">Classement</RouterLink>
            </li>
            <li @click="clickMenu">
                <RouterLink to="/historique">Historique</RouterLink>
            </li>
            <li @click="clickMenu" v-if="adminPost.token !== ''">
                <RouterLink to="/admin">Admin</RouterLink>
            </li>
            <li @click="clickMenu">
                <RouterLink to="/apropos">A Propos</RouterLink>
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">

import { useCarStore } from '@/stores/car';
import { useAdminPostStore } from '@/stores/adminPost';
import { defineEmits } from 'vue';

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
    list-style: none ;

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
</style>