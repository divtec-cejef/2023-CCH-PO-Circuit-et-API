<template>
    <div v-if="errorMessage">
        <h1>Une erreur s'est produite!</h1>
        <span>{{ errorMessage }}</span>
    </div>
    <div v-else-if="!hasLoaded" class="loading-ranking">
        <SpinLoading></SpinLoading>
    </div>
    <template v-else-if="listRace?.length === 0">
        <p>Aucune donnée n'est disponible</p>
    </template>
    <template v-else>
        <ClassementElement
                v-for="(race, key) in listRace"
                :key="key"
                :avatar="race.car?.avatar || genConfig()"
                :rank="key + 1"
                :pseudo="race.car?.pseudo || '<indisponible>'"
                :time="new Date(race.total_time)"
                :id-car="race.car!.id_car"
                :show-content="props.showContent"
                :is-new-element="key === props.indexNewElement"
        />
    </template>
</template>

<script setup lang="ts">
import ClassementElement from '@/components/ClassementElement.vue';
import { WebsocketConnection } from '@/models/api';
import type { models } from '@/models/api';
import { ref, onUnmounted } from 'vue';
import SpinLoading from '@/components/SpinLoading.vue';
import {genConfig} from "holiday-avatar";

const hasLoaded = ref(false);
const listRace = ref<Exclude<models.rawData.WsRaceData, models.rawData.Error>[]>();
const errorMessage = ref<string>();
const lastListRace = ref<models.rawData.WsRaceData[]>([]);
const index = ref(0);

// Se connecte au websocket
const socket = new WebsocketConnection();

//Définition des props avec valeur par défaut
const props = withDefaults(defineProps<{
  showContent?: boolean,
  indexNewElement?: number
}>(), {
  showContent: true
});

const emit = defineEmits(['indexNewRace', 'load']);

// Met à jour les données à la réception d'évènement
socket.onRankingReceived((data) => {
  if ('message' in data) {
    errorMessage.value = data.message;
    return;
  }

  console.log('Dernière liste : ', JSON.parse(JSON.stringify(lastListRace.value)));
  console.log('Récéption des données du WEBSOCKET');

  listRace.value = data.races;
  console.log('Ajout des données depuis le WEBSOCKET : ', JSON.parse(JSON.stringify(listRace.value)));

  //Si ce n'est le premier chargement alors on recherche la course ajoutée en dernier
  if (lastListRace.value.length > 0) {
    index.value = getRankLastRace();
    console.log('Recherche de l\'index :', index);
    emit('indexNewRace', index.value);
  }

  console.log('Valeur des listes après recherche : listRace : ', JSON.parse(JSON.stringify(listRace.value)), 'lastListRace : ', JSON.parse(JSON.stringify(lastListRace.value)));
  //La nouvelle liste devient l'ancienne
  lastListRace.value = listRace.value;

  console.log('Valeur des listes après changement : listRace : ', JSON.parse(JSON.stringify(listRace.value)), 'lastListRace : ', JSON.parse(JSON.stringify(lastListRace.value)));
  hasLoaded.value = true;

  emit('load');
});

/**
 * Compare les listes pour récupérer le rang de la dernière course
 */
function getRankLastRace() {
  //Si les listes sont vides
  if (!listRace.value || !lastListRace.value) {
    return -1;
  }

  console.log('Valeur des listes dans la recherche : listRace : ', JSON.parse(JSON.stringify(listRace.value)), 'lastListRace : ', JSON.parse(JSON.stringify(lastListRace.value)));

  //Compare les deux listes pour trouver le changement
  let index = 0;
  for (let race of listRace.value) {
    if ((index >= lastListRace.value.length) || (race.id_race != lastListRace.value[index].id_race)) {
      console.log('Valeur des listes au retour de l\'index : listRace : ', JSON.parse(JSON.stringify(listRace.value)), 'lastListRace : ', JSON.parse(JSON.stringify(lastListRace.value)));
      return index;
    }
    index++;
  }
  return -1;
}


// Déconnecte le websocket à la fermeture de la page
onUnmounted(() => {
  socket.destroy();
});

</script>

<style scoped lang="scss">

.loading-ranking {
  height: calc(60vh - var(--height-screen-diff));
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
