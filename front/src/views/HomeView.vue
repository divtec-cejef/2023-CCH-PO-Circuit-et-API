<template>
  <div class="intro">
    <h1>Bienvenue !</h1>
    <p>Tu n'as pas encore scanné de voiture...</p>
    <p>C'est par ici !</p>
  </div>

  <img class="qr-code" :src=qrCodeImg alt="Animation qr code">

  <div class="stats">
    <p>Nombre de courses effectuées: </p><span class="data">{{ racesRan }}</span>
    <p>Nombre d'activités réalisées: </p><span class="data">{{ activitiesRealisations }}</span>
    <p>Meilleur temps de course: </p><span class="data">{{ fastestRace }}</span>
    <p>Activité préférée des utilisateurs: </p><span class="data">{{ preferredActivity }}</span>
  </div>
</template>

<script setup lang="ts">
import qrCodeImg from '../assets/img/qrCode.gif';
import { useCarStore } from '@/stores/car';
import router from '@/router';
import { onBeforeUnmount, ref } from 'vue';
import { websocket } from '@/models/api';
import { formatTime } from '@/models/race';

const socketio = new websocket();

const racesRan = ref<number>();
const activitiesRealisations = ref<number>();
const fastestRace = ref<string>();
const preferredActivity = ref<string>();
//Test si un utilisateur est déjà enregistré
const userCar = useCarStore();
if (userCar.car.idCar != undefined && userCar.car.idCar != 0) {
  router.push({ path: `/${userCar.car.idQuery}` });
}

socketio.onRankingRecieved(data => {
  racesRan.value = data.count;

  const fastestTime = data.fastest.total_time;
  fastestRace.value = formatTime(new Date(fastestTime));
}).onActivityRealisation(data => {
  activitiesRealisations.value = data.count;
  preferredActivity.value = data.mostPopular.label;
});

onBeforeUnmount(() => {
  socketio.destroy();
});

</script>

<style scoped lang="scss">
h1 {
  text-align: center;
}

div.stats {
  margin: auto;
  width: fit-content;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 5px;
  grid-auto-rows: 1fr;
  align-items: center;

  :nth-child(odd) {
    text-align: right;
  }

  .data {
    font-weight: bold;
  }
}

div.intro {
  text-align: center;

  p:nth-child(3) {
    margin-top: 10px;
    font-weight: bold;
  }
}

img.qr-code {
  width: 200px;
  display: block;
  margin: 0 auto;
}
</style>