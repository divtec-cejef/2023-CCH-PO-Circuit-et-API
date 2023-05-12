<template>
    <div v-if="codeBackApi === api.ReturnCodes.Success" class="content-classement">
        <h2>Classement</h2>
        <div class="button-classement">
            <button class="classement-user" @click="scrollToUser"></button>
            <button class="classement-top" @click="scrollToTop"></button>
        </div>
        <div ref="classement" class="scroll-classement">
            salutodin
<!--            <ClassementElement v-for="(race, key) in listRace" :key="key" :avatar="race.car.avatar.image"-->
<!--                               :rank="key + 1"-->
<!--                               :pseudo="race.car.pseudo" :time="race.total_time"/>-->
<!--            <ClassementElement v-for="(race, key) in listRace" :key="key" :avatar="race.car.avatar.image"-->
<!--                               :rank="key + 1"-->
<!--                               :pseudo="race.car.pseudo" :time="race.total_time"/>-->
<!--            <ClassementElement v-for="(race, key) in listRace" :key="key" :avatar="race.car.avatar.image"-->
<!--                               :rank="key + 1"-->
<!--                               :pseudo="race.car.pseudo" :time="race.total_time"/>-->
<!--            <ClassementElement v-for="(race, key) in listRace" :key="key" :avatar="race.car.avatar.image"-->
<!--                               :rank="key + 1"-->
<!--                               :pseudo="race.car.pseudo" :time="race.total_time"/>-->
<!--            <ClassementElement v-for="(race, key) in listRace" :key="key" :avatar="race.car.avatar.image"-->
<!--                               :rank="key + 1"-->
<!--                               :pseudo="race.car.pseudo" :time="race.total_time"/>-->
<!--            <ClassementElement v-for="(race, key) in listRace" :key="key" :avatar="race.car.avatar.image"-->
<!--                               :rank="key + 1"-->
<!--                               :pseudo="race.car.pseudo" :time="race.total_time"/>-->
<!--            <ClassementElement v-for="(race, key) in listRace" :key="key" :avatar="race.car.avatar.image"-->
<!--                               :rank="key + 1"-->
<!--                               :pseudo="race.car.pseudo" :time="race.total_time"/>-->
<!--            <ClassementElement v-for="(race, key) in listRace" :key="key" :avatar="race.car.avatar.image"-->
<!--                               :rank="key + 1"-->
<!--                               :pseudo="race.car.pseudo" :time="race.total_time"/>-->
        </div>
    </div>
</template>

<script setup lang="ts">

import { onMounted, ref } from 'vue';
import Classement from '@/components/ClassementRace.vue';
import { useCarStore } from '@/stores/car';
import api from '@/models/api';
import type { models } from '@/models/api';
import ClassementElement from '@/components/ClassementElement.vue';

// let classement = ref(null);
// /**
//  * Change le scroll du classement pour le mettre à la hauteur de l'utilisateur
//  */
// function scrollToUser() {
//   //Change le scroll en fonction du rang de l'utilisateur et de son rang
//   if (!classement.value) {
//     return;
//   }
//
//   //Changement du scroll en fonction de son rang
//   classement.value.scrollTop = 400;
// }
//
//
// //Initialisation des constantes
//
// onMounted(() => {
//   scrollToUser();
// });

/**
 * Change le scroll du classement pour le mettre à la hauteur de l'utilisateur
 */
function scrollToUser() {
  //Change le scroll en fonction du rang de l'utilisateur et de son rang
  if (!classement.value) {
    return;
  }

  let rank = 10;
  //Changement du scroll en fonction de son rang
  classement.value.scrollTop = 300;
}

/**
 * Change le scroll du classement pour le mettre en haut du classement
 */
function scrollToTop() {
  if (classement.value) {
    classement.value.scrollTop = 0;
  }
}

//Initialisation des constantes
const BEST_TIME_INDEX = 0;
const classement = ref<Element | null>(null);

onMounted(() => {
  scrollToUser();
  console.dir(classement.value);
});

console.dir(classement.value);

//Initialisation des données
const userCar = useCarStore();
const { car } = userCar;
let codeBackApi = ref(0);

//Initialisation des courses de l'utilisateur
userCar.initUserAllRaceCar().then(value => codeBackApi.value = value);

const listRace = ref<models.raceObject[]>([]);


api.onRankingRecieved((data) => {

  listRace.value = data.map((d) => {
    return {
      car: d.car,
      // eslint-disable-next-line camelcase
      id_race: d.id_race,
      // eslint-disable-next-line camelcase
      total_time: new Date(d.total_time),
    };
  });
});

</script>

<style scoped>
div.scroll-classement {
    width: 200px;
    height: 150px;
    overflow-y: scroll;
}
</style>