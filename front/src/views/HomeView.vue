<template>
  <div class="hero even-sep">
    <div>
      <div class="intro">
        <h1>Bienvenue !</h1>
        <p>Tu n'as pas encore scanné de voiture...</p>
        <p>C'est par ici !</p>
      </div>

      <img class="qr-code" :src=qrCodeImg alt="Animation qr code">
    </div>

    <div class="stats">
      <div>
        <p class="data">{{ racesRan }}</p>
        <p class="label">courses effectuées</p>
      </div>

      <div>
        <p class="data">{{ activitiesRealisations }}</p>
        <p class="label">activités réalisées</p>
      </div>

      <div>
        <p class="data">{{ fastestRace }}</p>
        <p class="label">de temps de meilleure course</p>
      </div>

      <div>
        <p class="data">{{ preferredActivity }}</p>
        <p class="label">est l'activité préférée des utilisateurs</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import qrCodeImg from '../assets/img/qrCode.gif';
import { useCarStore } from '@/stores/car';
import router from '@/router';
import { onBeforeUnmount, ref } from 'vue';
import { websocket } from '@/models/api';
import { formatTime } from '@/models/race';
import activityIcon from '@/assets/img/activity.png';
import popularityIcon from '@/assets/img/popularity.png';
import raceIcon from '@/assets/img/race-flag.webp';
import timeIcon from '@/assets/img/clock.webp';

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
div.hero {
  display: flex;
  flex-direction: row;
  align-items: center;

  &:only-child {
    height: 100%;
  }

  &.even-sep {
    > div {
      width: 45%;
      height: fit-content;
    }
  }
}

h1 {
  text-align: center;
}

div.stats {
  margin: auto;
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;

  > div {
    margin: .5em;
    margin-bottom: -.5em;
    padding-bottom: 2em;
    text-align: center;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    &:not(:last-child) {
      border-bottom: 1px solid lightgray;
    }

    &:nth-child(3) {
      .data {
        font-family: "Digital-7 Mono", "Fira Code", "ui-monospace", monospace;
      }
    }

    .label {
      color: gray;
    }

    .data {
      font-weight: 500;
      padding: .5em;
      padding-bottom: 0;
      font-size: 64px;
      justify-self: center;
    }
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