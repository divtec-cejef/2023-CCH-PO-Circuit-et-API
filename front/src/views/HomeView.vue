<template>
    <div class="home-root">
        <div>
            <div class="intro">
                <h1>Bienvenue !</h1>
                <p>Tu n'as pas encore scanné de voiture...</p>
                <p>C'est par ici !</p>
            </div>

            <RouterLink to="/scan"><img class="qr-code dark-invert" :src=qrCodeImg alt="Animation qr code"></RouterLink>
            <form>
                <p>Entre les 4 derniers chiffres de l'URL sous ta voiture !</p>
                <div class="link">
                    <p>voiture.divtec.me/</p>
                    <input type="text" placeholder="****" v-model="userQueryId" maxlength="4">
                </div>
                <button type="submit"
                        @click.prevent="enteredQueryId">Valider
                </button>
                <span v-if="queryIdError" class="error">{{ queryIdError }}</span>
            </form>
        </div>

        <div v-if="statsError.ranking !== undefined || statsError.activityRealisation !== undefined">
            <h2>Une erreur s'est produite!</h2>
            <p>{{ statsError.ranking }}</p>
            <p>{{ statsError.activityRealisation }}</p>
        </div>
        <ul class="stats" v-else-if="dataLoaded">
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
                                :value="fastestRace?.split(':')[0]"/>
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
                        :default-value="lastActivity"
                        :value="lastActivity"
                        class="data"/>
                <span class="label">vient d'être réalisé</span>
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
import { WebsocketConnection, restful } from '@/models/api';
import { formatTime } from '@/models/race';
import { useRouter } from 'vue-router';
import { Roller } from 'vue-roller';
import 'vue-roller/dist/style.css';
import SpinLoading from '@/components/SpinLoading.vue';
import { RouterLink } from 'vue-router';

const router = useRouter();

const socketio = new WebsocketConnection();
const racesRan = ref<number>();
const activitiesRealisations = ref<number>();
const fastestRace = ref<string>();
const lastActivity = ref<string>();

const userQueryId = ref<string>();
const queryIdError = ref<string>();

const statsError = ref<{
  ranking: string | undefined,
  activityRealisation: string | undefined
}>({ activityRealisation: undefined, ranking: undefined });

const dataLoaded = computed(() =>
  racesRan.value !== undefined &&
  activitiesRealisations.value !== undefined &&
  fastestRace.value !== undefined &&
  lastActivity.value !== undefined);

//Test si un utilisateur est déjà enregistré
const userCar = useCarStore();
if (localStorage.getItem('userCarId')) {
  router.push({ path: `/${userCar.car.idQuery}` });
}

const enteredQueryId = () => {
  restful.getDataOneCarQueryId(userQueryId.value ?? '').then((v) => {
    if ('message' in v.json) {
      queryIdError.value = v.json.message;
      return;
    }
    if (v.status === 404) {
      queryIdError.value = 'Voiture introuvable.';
    } else {
      router.push({ path: `/${v.json.queryId}` });
    }
  });
};

socketio
  .onRankingReceived(data => {
    statsError.value.ranking = undefined;
    if('message' in data) {
      statsError.value.ranking = data.message;
      return;
    }

    racesRan.value = data.count;
    const fastestTime = data.fastest.total_time;
    fastestRace.value = formatTime(new Date(fastestTime));
  })
  .onActivityRealisation(data => {
    statsError.value.activityRealisation = undefined;
    if('message' in data) {
      statsError.value.activityRealisation = data.message;
      return;
    }

    activitiesRealisations.value = data.count;
    lastActivity.value = data.last.label;
  });

onBeforeUnmount(() => {
  socketio.destroy();
});

</script>

<style scoped lang="scss">
@import "@/assets/css/consts";

h1 {
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
  margin: auto;

  .link {
    display: flex;
    align-items: center;

    p {
      text-decoration: underline;
    }
  }

  p {
    text-align: center;
    font-style: italic;
    font-size: 15px;

  }

  input {
    margin: .5em;
    text-align: center;
    border-radius: 2px;
    border: 1px solid rgb(206, 206, 206);
    padding: .1em;
    width: 50px;
  }

  button {
    width: fit-content;
  }
}

div.home-root {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

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

      @media screen and (prefers-color-scheme: dark) {
        box-shadow: none;
        border: $dark-border;
      }

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

  a {
    img.qr-code {
      width: 200px;
      display: block;
      margin: 0 auto;
    }
  }
}


</style>
