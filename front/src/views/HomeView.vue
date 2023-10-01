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
                    <input type="number" placeholder="****" v-model="userQueryId" max="9999">
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

                <span class="data">{{ racesRan }}</span>
                <span class="label">Courses effectuées</span>
            </li>

            <li>
                <span class="data">{{ activitiesRealisations }}</span>
                <span class="label">Activités effectuées</span>
            </li>

            <li>
                <template v-if="fastestRace !== null">
                    <span class="data">{{ fastestRace }}s</span>
                    <span class="label">est le temps de course le plus rapide</span>
                </template>
                <div class="null" v-else>
                    Pas de courses réalisées
                </div>
            </li>

            <li>
                <template v-if="lastActivity !== null">
                    <p class="data">{{lastActivity}}</p>
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
import qrCodeImg from '../assets/img/qrCode.gif';
import { useCarStore } from '@/stores/car';
import { computed, defineAsyncComponent, onBeforeUnmount, ref } from 'vue';
import type { Ref } from 'vue';
import { restful, WebsocketConnection } from '@/models/api';
import { formatTime } from '@/models/race';
import { RouterLink, useRouter } from 'vue-router';
import 'vue-roller/dist/style.css';
import { useLocalStorage } from '@vueuse/core';

const SpinLoading = defineAsyncComponent(() => import('@/components/SpinLoading.vue'));

const router = useRouter();
const display = useLocalStorage('display', 'modern');

const socketio = new WebsocketConnection();

const racesRanData = ref<number>();
const racesRan = computed<number | undefined>({
  get: () => racesRanData.value,
  set: (v : number | undefined) => {
    racesRanData.value = racesRanData.value ?? 0;
    animateNumber(racesRanData, v ?? 0);
  }
});

const activitiesRealisationsData = ref<number>();
const activitiesRealisations = computed<number | undefined>({
  get: () => activitiesRealisationsData.value,
  set: (v : number | undefined) => {
    activitiesRealisationsData.value = activitiesRealisationsData.value ?? 0;
    animateNumber(activitiesRealisationsData, v ?? 0);
  }
});

const fastestTimeMs = ref<number | null>();
const fastestRace = computed<string | null | undefined>({
  get:() => {
    const { value } = fastestTimeMs;
    if (!value && typeof value !== 'number') {
      return value;
    }
    return formatTime(new Date(value));
  },
  set: (v: string | null | undefined) => {
    if (!v && typeof v !== 'string') {
      fastestTimeMs.value = v;
      return;
    }

    fastestTimeMs.value = fastestTimeMs.value ?? 0;
    animateNumber(fastestTimeMs, (new Date(v)).getTime());
  }
});

const lastActivityValue = ref<string | null>();
const lastActivity = computed<string|null|undefined>({
  get: ()=>lastActivityValue.value,
  set: (v: string | null | undefined) => {
    if (v === undefined) {
      lastActivityValue.value = undefined;
      return;
    }
    lastActivityValue.value = lastActivityValue.value ?? '';
    animateString(lastActivityValue, v ?? '');
  }
});

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

const animateNumber = (n: Ref<number | null | undefined>, to: number, i?: number, from?: number) => {
  if (i === undefined) {
    i = 0;
  }

  if (from === undefined) {
    from = n.value || 0;
  }

  if (i >= Math.PI) {
    n.value = to;
    return;
  }

  n.value = Math.ceil(((1-Math.cos(i))/2) * (to - from) + from);

  requestAnimationFrame(() => animateNumber(n, to, (i ?? 0) + 0.1, from));
};

/**
 * Animate smoothly the apparition of a string, as well as its characters.
 * Characters can only be added or removed once per frame.
 * Already existing characters can only be replaced by a character adjacent to it in alphabetical order.
 * Characters are added or removed at the end of the string.
 * Transition of changing characters should follow a sinusoidal curve.
 *
 * @param {Ref<string | null | undefined>} n
 * @param {string} to
 * @param {number} i
 * @param {string} from
 */
const animateString = (n: Ref<string | null | undefined>, to: string, i?: number, from?: string) => {
  if (i === undefined) {
    i = 0;
  }

  if (from === undefined) {
    from = n.value || '';
  }

  if (n.value == to) {
    return;
  }

  const toLength = to.length;

  let nVal = n.value ?? '';

  if (nVal.length > toLength) {
    n.value = nVal.slice(0, nVal.length - 2);
  } else if (nVal.length < toLength) {
    n.value = nVal + 'a';
  }

  nVal = n.value ?? '';
  console.log( nVal, to );
  let newString = '';
  for (let j = 0; j < nVal.length; j++) {
    if (nVal[j] === to[j]) {
      newString += nVal[j];
      console.log('same', j, nVal[j], to[j], newString);
    } else if (nVal.charCodeAt(j) < to.charCodeAt(j)) {
      newString += String.fromCharCode((nVal.charCodeAt(j) || 97 )+ 1);
      console.log('up', j, nVal[j], to[j], newString);
    } else {
      newString += String.fromCharCode((nVal.charCodeAt(j) || 97 )- 1);
      console.log('down', j, nVal[j], to[j], newString);
    }
  }

  n.value = newString;

  requestAnimationFrame(() => animateString(n, to, (i ?? 0) + 0.1, from));
};

socketio
  .onRankingReceived(data => {
    statsError.value.ranking = undefined;
    if ('message' in data) {
      statsError.value.ranking = data.message;
      return;
    }

    racesRan.value = 0;
    animateNumber(racesRan, data.count);
    if (data.fastest?.total_time) {
      fastestTimeMs.value = fastestTimeMs.value ?? 0;
      animateNumber(fastestTimeMs,  (new Date(data.fastest?.total_time)).getTime());
    } else {
      fastestTimeMs.value = null;
    }

  })
  .onActivityRealisation(data => {
    console.dir({ data });
    statsError.value.activityRealisation = undefined;
    if ('message' in data) {
      statsError.value.activityRealisation = data.message;
      return;
    }

    if (!activitiesRealisations.value)
      activitiesRealisations.value = 0;
    animateNumber(activitiesRealisations, data.count);
    lastActivity.value = data.last?.label;
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

        justify-content: center;
      }

      span.data {
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: nowrap;
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

    div.intro {
      text-align: center;

      p:nth-child(3) {
        margin-top: 10px;
        font-weight: bold;
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
