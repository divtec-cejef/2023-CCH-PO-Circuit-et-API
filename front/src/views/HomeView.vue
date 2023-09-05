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

        <ul class="stats" v-if="dataLoaded">
            <li>
                <Roller
                        :duration="1000"
                        :value="racesRan?.toString()"
                        :default-value="racesRan?.toString()"
                        class="data"/>
                <span class="label">Courses effectuées</span>
            </li>

            <li>
                <span class="data">
                    <template v-if="/:/.test(fastestRace || '')">
                        <Roller
                                char-set="number"
                                :default-value="fastestRace?.split(':')[0]"
                                :duration="1000"
                                :value="fastestRace?.split(':')[0]" />
                        <span>:</span>
                        <Roller
                                char-set="number"
                                :default-value="fastestRace?.split(':')[1].split('.')[0]"
                                :duration="1000"
                                :value="fastestRace?.split(':')[1].split('.')[0]"/>
                    </template>
                    <template v-else>
                        <Roller
                                char-set="number"
                                :default-value="fastestRace?.split('.')[0]"
                                :duration="1000"
                                :value="fastestRace?.split('.')[0]"/>
                    </template>
                    <span>.</span>
                    <Roller
                            char-set="number"
                            :default-value="fastestRace?.split('.')[1]"
                            :duration="1000"
                            :value="fastestRace?.split('.')[1]"/>
                    <span v-if="fastestRace?.split(':').length === 1">s</span>
                </span>
                <span class="label">est le temps de course le plus rapide</span>
            </li>

            <li>
                <Roller
                        :duration="1000"
                        :value="activitiesRealisations?.toString()"
                        :default-value="activitiesRealisations?.toString()"
                        class="data"/>
                <span class="label">Activités effectuées</span>
            </li>

            <li>
                <Roller
                        char-set="alphabet"
                        :duration="1000"
                        :default-value="preferredActivity"
                        :value="preferredActivity"
                        class="data"/>
                <span class="label">est l'activité préférée des visiteurs</span>
            </li>
        </ul>
        <div v-else>
            <SpinLoading/>
        </div>
    </div>
</template>

<script setup lang="ts">
import qrCodeImg from '../assets/img/qrCode.gif';
import { useCarStore } from '@/stores/car';
import { computed, onBeforeUnmount, ref } from 'vue';
import { WebsocketConnection } from '@/models/api';
import { formatTime } from '@/models/race';
import { useRouter } from 'vue-router';
import { Roller } from 'vue-roller';
import 'vue-roller/dist/style.css';
import SpinLoading from '@/components/SpinLoading.vue';

const router = useRouter();

const socketio = new WebsocketConnection();
const racesRan = ref<number>();
const activitiesRealisations = ref<number>();
const fastestRace = ref<string>();
const preferredActivity = ref<string>();

const dataLoaded = computed(() =>
  racesRan.value !== undefined &&
    activitiesRealisations.value !== undefined &&
    fastestRace.value !== undefined &&
    preferredActivity.value !== undefined);

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
  justify-content: space-evenly;
  min-height: inherit;

  ul.stats {
    list-style-type: none;
    padding: 0;
    display: grid;
    grid-template-columns: 420px;
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
        font-size: 42px;
        padding-bottom: 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
      }

      .label {
        text-align: center;
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
}


</style>
