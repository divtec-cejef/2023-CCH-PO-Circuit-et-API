<template>
    <div v-if="errorMessage">
        <h1>Une erreur s'est produite!</h1>
        <span>{{ errorMessage }}</span>
    </div>
    <div v-else-if="!hasLoaded" class="loading-ranking">
        <SpinLoading></SpinLoading>
    </div>
    <template v-else-if="listRace?.length === 0">
        <div class="no-race fullscreen">
            <h2>Aucune course n'a été encore réalisée !</h2>
            <p>
                <br>
                Soit le premier à prendre le départ !
                <br>
                <br>
                3, 2, 1, GO !
            </p>
            <Road :width="width"></Road>
        </div>
    </template>
    <template v-else>
        <ClassementElement
            v-for="(race, key) in listRaceToDisplay"
            :key="key"
            :avatar="race.car?.avatar || genConfig()"
            :id-car="race.car!.id_car"
            :is-new-element="props.newElement ? key === props.newElement.index : false"
            :pseudo="race.car?.pseudo || '<indisponible>'"
            :rank="key + 1"
            :show-content="props.showContent"
            :time="new Date(race.total_time)"
        />
    </template>
</template>

<script lang="ts" setup>

import type { models } from '@/models/api';
import { WebsocketConnection } from '@/models/api';
import { defineAsyncComponent, onUnmounted, ref, watch } from 'vue';
import { genConfig } from 'holiday-avatar';
import { useWindowSize } from '@vueuse/core/index';

const ClassementElement = defineAsyncComponent(() => import('@/components/ClassementElement.vue'));
const SpinLoading = defineAsyncComponent(() => import('@/components/SpinLoading.vue'));
const Road = defineAsyncComponent(() => import('@/components/Road.vue'));

const hasLoaded = ref(false);
const listRace = ref<Exclude<models.rawData.WsRaceData, models.rawData.Error>[]>();
const listRaceToDisplay = ref<Exclude<models.rawData.WsRaceData, models.rawData.Error>[]>();
const errorMessage = ref<string>();
const lastListRace = ref<models.rawData.WsRaceData[]>([]);
const { width } = useWindowSize();
const emit = defineEmits(['indexNewRace', 'load']);

// Se connecte au websocket
const socket = new WebsocketConnection();

//Définition des props avec valeur par défaut
const props = withDefaults(defineProps<{
    showContent?: boolean,
    newElement?: models.parsedData.RankingRaceDataOneCar
}>(), {
  showContent: true
});

//Ecoute le changement d'index pour raffraichir la liste d'utilisateur
watch(() => props.newElement, async (element) => {
  if (element === undefined) {
    return;
  }

  //Si l'index est valide alors on affiche la liste complète
  if (element!.index !== -1) {
    listRaceToDisplay.value = listRace.value;
  }
});


// Met à jour les données à la réception d'évènement
socket.onRankingReceived((data) => {

  if ('message' in data) {
    errorMessage.value = data.message;
    return;
  }

  listRace.value = data.races;

  //Si ce n'est le premier chargement alors on recherche la course ajoutée en dernier
  if (lastListRace.value.length > 0) {
    const newRace = getRankLastRace();
    emit('indexNewRace', newRace);
  } else if (listRace.value?.length === 1) {
    emit('indexNewRace', { index: 0, car: listRace.value![0].car });
  } else {
    listRaceToDisplay.value = listRace.value;
  }

  //La nouvelle liste devient l'ancienne
  lastListRace.value = listRace.value;
  hasLoaded.value = true;

  emit('load');
});

/**
 * Compare les listes pour récupérer le rang de la dernière course
 */
function getRankLastRace(): models.parsedData.RankingRaceDataOneCar | undefined {
  //Si les listes sont vides
  if (!listRace.value || !lastListRace.value) {
    console.error('Liste vide');
    return;
  }

  //Compare les deux listes pour trouver le changement
  let index = 0;
  for (let race of listRace.value) {
    //Si l'index est trop grand, ou que l'id de l'utilisateur est différents alors on retourne l'index
    if ((index >= lastListRace.value.length) || ((race.id_race !== lastListRace.value[index].id_race) && (race.total_time !== lastListRace.value[index].total_time))) {
      return { index: index, car: race.car };
    }
    index++;
  }
  return { index: -2, car: undefined };
}


// Déconnecte le websocket à la fermeture de la page
onUnmounted(() => {
  socket.destroy();
});

</script>

<style lang="scss" scoped>

.loading-ranking {
    height: calc(60vh - var(--height-screen-diff));
    display: flex;
    justify-content: center;
    align-items: center;
}

.no-race {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    width: 100%;
    overflow: hidden;

    h2 {
        width: fit-content;
        text-align: center;
    }

    p {
        margin-bottom: 100px;
    }
}

</style>
