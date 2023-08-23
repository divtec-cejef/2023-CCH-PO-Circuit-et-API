<template>
    <div class="home-root">
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

socketio
  .onRankingReceived(data => {
    racesRan.value = data.count;
    const fastestTime = data.fastest.total_time;
    fastestRace.value = formatTime(new Date(fastestTime));
  })
  .onActivityRealisation(data => {
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

div.home-root {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  min-height: inherit;

  ul.stats {
    list-style-type: none;
    padding: 0;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 20px;

    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 10px;
      box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
      padding: 30px;
      outline-offset: -12px;
      position: relative;

      .data {
        font-weight: bold;
        font-size: 56px;
        padding-bottom: 10px;
      }
    }
  }


  /*@media screen and (min-width: 1400px) {
    ul.stats {
      grid-template-columns: 1fr 1fr;
    }
  }*/

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
