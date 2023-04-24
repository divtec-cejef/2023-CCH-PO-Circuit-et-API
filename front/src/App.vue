<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import {useCarStore} from '@/stores/car'

const userCar = useCarStore();

const userCarId = localStorage.getItem("userCarId");

if (userCarId) {
    userCar.initUserCarUrl(userCarId)
}

</script>

<template>
    <header>
        <nav>
            <RouterLink :to="`/${userCar.idQuery}`">Accueil</RouterLink>
            <RouterLink to="/scan">Scan</RouterLink>
        </nav>
    </header>

  <RouterView />

</template>

<style scoped lang="scss">

header {
  background-color: lightblue;
  margin: 0;
  width: 100%;
}
</style>
