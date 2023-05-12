<template>
    <h1>Classement</h1>
    <p>Ici tu vois tout les temps des pilotes !</p>

    <div class="button-classement">
        <button class="classement-user" @click="scrollToUser"></button>
        <button class="classement-top" @click="scrollToTop"></button>
    </div>

    <div class="classement">
        <ClassementRace/>
    </div>
</template>

<script setup lang="ts">

import ClassementRace from '@/components/ClassementRace.vue';
import { useCarStore } from '@/stores/car';

function scrollToUser() {
  let screenHeight = window.innerHeight;
  console.log(screenHeight);
  window.scrollTo(0, 10 * 50 + 250 - screenHeight / 2);
}

function scrollToTop() {
  window.scrollTo(0, document.body.scrollTop);
}

const userCar = useCarStore();

</script>

<style scoped lang="scss">

.classement {
    margin-top: 20px;
    width: 90%;
}

div.button-classement {
    width: 100%;
    display: flex;
    justify-content: end;
    margin-top: -30px;
}

button.classement-top {
    background-color: transparent;
    border: none;
    border-radius: 100px;
    background-image: url("../assets/img/top-10.png");
    background-position: center;
    background-size: 30px;
    background-repeat: no-repeat;
    width: 40px;
    height: 40px;
    margin-right: 15px;
    margin-left: 5px;
}

button.classement-user {
    background-color: transparent;
    border: none;
    border-radius: 100px;
    background-image: url("../assets/img/placeholder.png");
    background-position: center;
    background-size: 30px;
    background-repeat: no-repeat;
    width: 40px;
    height: 40px;
}

</style>