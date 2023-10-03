<template>
    <div class="home-root">
        <div>
            <div class="intro">
                <h1>Bienvenue !</h1>
                <p v-if="display === 'legacy'">
                    Tu n'est pas connecté...
                </p>
                <p v-else>
                    Tu n'as pas encore scanné de voiture...
                </p>
                <p>C'est par ici !</p>
            </div>

            <RouterLink to="/scan" v-if="display !== 'legacy'">
                <div class="qr-code">
                    <img class="qr-code dark-invert" :src=qrCodeImg alt="Animation qr code">
                    <button>Scanner !</button>
                </div>
            </RouterLink>

            <div class="qr-code" v-else>
                <img class="qr-code dark-invert" :src=qrCodeImg alt="Animation qr code">
            </div>

            <form>
                <p v-if="display === 'legacy'">
                    Entre les 4 derniers chiffres du lien sous ta voiture !
                </p>
                <p v-else>
                    Ou entre les 4 derniers chiffres du lien sous ta voiture !
                </p>
                <div class="link">
                    <p>{{ domaineName }}/</p>
                    <input type="number" placeholder="****" v-model="userQueryId">
                </div>
                <button type="submit"
                        @click.prevent="enteredQueryId">Valider
                </button>
                <span v-if="queryIdError" class="error">Id invalide !</span>
            </form>
        </div>

        <div v-if="statsError.ranking !== undefined || statsError.activityRealisation !== undefined">
            <h2>Une erreur s'est produite!</h2>
            <p>{{ statsError.ranking }}</p>
            <p>{{ statsError.activityRealisation }}</p>
        </div>
        <ul class="stats" v-else-if="dataLoaded">
            <li>
                <TextTransition class="data" :data="racesRan!"/>
                <span class="label">Courses effectuées</span>
            </li>

            <li>
                <TextTransition class="data" :data="activitiesRealisations!"/>
                <span class="label">Activités effectuées</span>
            </li>

            <li>
                <template v-if="fastestRace !== null">
                    <TextTransition class="data"
                                    :data="fastestRace!"
                                    :callback="(v: string | number) =>
                                    formatTime(new Date(v)) + 's'"/>
                    <span class="label">est le temps de course le plus rapide</span>
                </template>
                <div class="null" v-else>
                    Pas de courses réalisées
                </div>
            </li>

            <li>
                <template v-if="lastActivity !== null">
                    <TextTransition class="data" :data="lastActivity!"/>
                    <span class="label">vient d'être réalisé</span>
                </template>
                <div class="null" v-else>
                    Pas d'activités réalisées
                </div>
            </li>
        </ul>
        <div v-else>
            <SpinLoading/>
        </div>
    </div>
</template>

<script setup lang="ts">
import qrCodeImg from '@/assets/img/qrCode.gif';
import { useCarStore } from '@/stores/car';
import { computed, defineAsyncComponent, onBeforeUnmount, ref } from 'vue';
import { restful, WebsocketConnection } from '@/models/api';
import { RouterLink, useRouter } from 'vue-router';
import { useLocalStorage } from '@vueuse/core';
import { formatTime } from '@/models/race';

const TextTransition = defineAsyncComponent(() => import('@/components/TextTransition.vue'));
const SpinLoading = defineAsyncComponent(() => import('@/components/SpinLoading.vue'));

const router = useRouter();
const display = useLocalStorage('display', 'modern');

const socketio = new WebsocketConnection();

const racesRan = ref<number>();
const activitiesRealisations = ref<number>();
const fastestRace = ref<number | null>();
const lastActivity = ref<string | null>();

const userQueryId = ref<string>();
const queryIdError = ref<string>();
const domaineName = import.meta.env.VITE_DOMAIN_NAME || '';

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
    if ('message' in data) {
      statsError.value.ranking = data.message;
      return;
    }

    racesRan.value = data.count;
    if (data.fastest?.total_time) {
      fastestRace.value = new Date(data.fastest?.total_time).getTime();
    } else {
      fastestRace.value = null;
    }

  })
  .onActivityRealisation(data => {
    statsError.value.activityRealisation = undefined;
    if ('message' in data) {
      statsError.value.activityRealisation = data.message;
      return;
    }

    activitiesRealisations.value = data.count;
    lastActivity.value = data.last?.label ?? null;
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
  width: 300px;
  margin: auto;


  .link {
    margin: 10px 0;
    display: flex;
    align-items: center;

    p {
      font-size: 18px;
      text-decoration: underline;
    }
  }

  p {
    text-align: center;
    font-style: italic;
    font-size: 18px;
    width: 100%;
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
  margin: 0;
  width: 100%;
  min-width: fit-content;

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

  div.qr-code {
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      opacity: 0.7;
    }

    button {
      width: fit-content;
      position: absolute;
      padding: 0.3em 12px;

    }
  }

  ul.stats {
    list-style-type: none;
    padding: 0;
    display: grid;
    grid-template-columns: calc(100vw - 40px);
    grid-gap: 20px;
    justify-items: center;
    justify-content: space-around;
    width: 100%;

    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 10px;
      box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
      padding: 30px;
      outline-offset: -12px;
      position: relative;
      width: 100%;
      overflow: hidden;

      @media screen and (prefers-color-scheme: dark) {
        box-shadow: none;
        border: $dark-border;
      }

      .data {
        font-weight: bold;
        font-size: 42px;
        margin-bottom: 10px;
        text-align: center;
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: nowrap;

        justify-content: center;
      }

      .label {
        text-align: center;
      }

      .null {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        font-weight: 500;
        text-align: center;
      }
    }
  }


  @media screen and (min-width: 860px) {
    ul.stats {
      grid-template-columns: repeat(2, 50%);

      li:nth-last-child(2), li:nth-last-child(1) {
        grid-column: 1 / 3;
      }
    }
  }

  @media screen and (min-width: 1024px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 40px;

    ul.stats {
      grid-template-columns: 100%;
      width: auto;

      li:nth-last-child(2), li:nth-last-child(1) {
        grid-column: 1 / 2;
      }
    }
  }

  @media screen and (min-width: 1280px) {
    grid-template-columns: 1fr 3fr;

    ul.stats {
      grid-template-columns: repeat(2, min(50%, 420px));
      width: 100%;

      li:nth-last-child(2), li:nth-last-child(1) {
        grid-column: 1 / 3;
      }
    }
  }
}

.error {
  margin-top: 10px;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
  -webkit-appearance: textfield;
  appearance: textfield;
}

</style>
