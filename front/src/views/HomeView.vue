<template>
    <div class="root">
        <div>
            <div class="intro">
                <h1>Bienvenue !</h1>
                <p>Tu n'as pas encore scanné de voiture...</p>
                <p>C'est par ici !</p>
            </div>

            <img class="qr-code" :src=qrCodeImg alt="Animation qr code">
        </div>

        <ul class="stats">
            <li>
                <span class="data">{{ racesRan }}</span>
                <span class="label">Courses effectuées</span>
            </li>
            <li>
                <span class="data">{{ activitiesRealisations }}</span>
                <span class="label">Activités effectuées</span>
            </li>
            <li>
                <span class="data">{{ fastestRace }}</span>
                <span class="label">est le temps de course le plus rapide</span>
            </li>
            <li>
                <span class="data">{{ preferredActivity }}</span>
                <span class="label">est l'activité préférée des visiteurs</span>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import qrCodeImg from '../assets/img/qrCode.gif';
import { useCarStore } from '@/stores/car';
import { onBeforeUnmount, ref } from 'vue';
import { WebsocketConnection } from '@/models/api';
import { formatTime } from '@/models/race';
import { useRouter } from 'vue-router';

const router = useRouter();

const socketio = new WebsocketConnection();
const racesRan = ref<number>();
const activitiesRealisations = ref<number>();
const fastestRace = ref<string>();
const preferredActivity = ref<string>();

//Test si un utilisateur est déjà enregistré
const userCar = useCarStore();
if (localStorage.getItem('userCarId')) {
  router.push({ path: `/${userCar.car.idQuery}` });
}

socketio.onRankingReceived(data => {
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

div.root {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 200px);
  justify-content: center;

  ul.stats {
    list-style-type: none;
    padding: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;

    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      border-bottom: solid 1px lightgray;
      padding: 20px;

      &:last-child, &:nth-last-child(2) {
        border-bottom: none;
      }

      &:nth-child(odd) {
        border-right: solid 1px lightgray;
      }

      .data {
        font-weight: bold;
        font-size: 56px;
        padding-bottom: 10px;
      }
    }

    hr {
      width: 100%;
      border-style: solid;
      border-color: lightgray;
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
}


</style>
