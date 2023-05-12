<template>
    <nav>
        <ul>
            <li v-if="props.screenWidth == 'thin'">
                <RouterLink :to="`/${userCar.car.idQuery}`">Accueil</RouterLink>
            </li>
            <li v-if="userCar.car.idCar !== 0">
                <RouterLink to="/course">Course</RouterLink>
            </li>
            <li>
                <RouterLink to="/classement">Classement</RouterLink>
            </li>
            <li>
                <RouterLink to="/historique">Historique</RouterLink>
            </li>
            <li>
                <RouterLink to="/apropos">A Propos</RouterLink>
            </li>
        </ul>
    </nav>

</template>

<script setup lang="ts">

import { useCarStore } from '@/stores/car';

const props = defineProps({
  screenWidth: String
});

//Récupération de la voiture
const userCar = useCarStore();

</script>

<style scoped lang="scss">
nav ul {
    margin-top: 40px;
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