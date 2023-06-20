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
        <p>Nombre de courses effectuées:</p>
        <div>
          <img :src="raceIcon" alt="Icône de course">
          <span class="data">{{ racesRan }}</span>
        </div>
      </div>

      <div>
        <p>Nombre d'activités réalisées:</p>
        <div>
          <img :src="activityIcon" alt="Icône d'activités">
          <span class="data">{{ activitiesRealisations }}</span>
        </div>
      </div>

      <div>
        <p>Meilleur temps de course:</p>
        <div>
          <img :src="timeIcon" alt="Icône de temps">
          <span class="data">{{ fastestRace }}</span>
        </div>
      </div>

      <div>
        <p>Activité préférée des utilisateurs:</p>
        <div>
          <img :src="popularityIcon" alt="Icône de popularité">
          <span class="data">{{ preferredActivity }}</span>
        </div>
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
  flex-direction:row;
  align-items: center;

  &:only-child{
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

  div {
    margin: .5em;
    margin-bottom: 1em;
    text-align: center;
    width: 100%;

    &:nth-child(3) {
      font-family: "Digital-7 Mono", "Fira Code", "ui-monospace", monospace;
    }

    p {
      margin-bottom: .5em;
    }

    div {
      display: grid;
      grid-template-columns: 40px auto;
      width: 100%;
      align-items: center;

      img {
        height: auto;
        width: 40px;
        padding-left: .5em
      }

      .data {
        font-weight: 500;
        padding: .5em;
        font-size: 64px;
        justify-self: center;
      }
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