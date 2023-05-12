<template>
    <h1>Classement</h1>
    <p>Ici tu vois tout les temps des pilotes !</p>

    <div class="button-classement">
        <div>
            <button class="classement-user" @click="scrollToUser"></button>
            <button class="classement-top" @click="scrollToTop"></button>
        </div>
    </div>

    <div class="classement">
        <ClassementRace/>
    </div>
</template>

<script setup lang="ts">

import ClassementRace from '@/components/ClassementRace.vue';

/**
 * Scroll à l'élément de l'utilisateur
 */
function scrollToUser() {
  let screenHeight = window.innerHeight;
  console.log(screenHeight);
  window.scrollTo(0, 10 * 50 + 250 - screenHeight / 2);
}

/**
 * Scroll jusqu'au haut de la page
 */
function scrollToTop() {
  window.scrollTo(0, document.body.scrollTop);
}


</script>

<style scoped lang="scss">

.classement {
    width: 90%;
    margin: 20px auto 0 auto;
}

div.button-classement {
    width: 90%;
    margin: -30px auto 0 auto;
    display: flex;
    justify-content: end;
    position: sticky;
    top: 40px;

    div {
        background-color: var(--white);
        border-radius: 20px;
        padding: 4px;
        box-shadow: rgba(50, 50, 93, 0.25) 0 13px 27px -5px, rgba(0, 0, 0, 0.3) 0 8px 16px -8px;
        margin-right: 10px;
    }

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