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
                :is-new-element="props.indexNewElement ? key === props.indexNewElement.index : false"
        />
    </template>
</template>

<script setup lang="ts">
import ClassementElement from '@/components/ClassementElement.vue';
import { WebsocketConnection } from '@/models/api';
import type { models } from '@/models/api';
import { ref, onUnmounted } from 'vue';
import SpinLoading from '@/components/SpinLoading.vue';
import { genConfig } from 'holiday-avatar';

const hasLoaded = ref(false);
const listRace = ref<Exclude<models.rawData.WsRaceData, models.rawData.Error>[]>();
const errorMessage = ref<string>();
const lastListRace = ref<models.rawData.WsRaceData[]>([]);

// Se connecte au websocket
const socket = new WebsocketConnection();

//Définition des props avec valeur par défaut
const props = withDefaults(defineProps<{
  showContent?: boolean,
  indexNewElement?: models.parsedData.RankingRaceDataOneCar
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

  listRace.value = data.races;

  //Si ce n'est le premier chargement alors on recherche la course ajoutée en dernier
  if (lastListRace.value.length > 0) {
    const newRace = getRankLastRace();
    emit('indexNewRace', newRace);
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

<style scoped lang="scss">

.loading-ranking {
  height: calc(60vh - var(--height-screen-diff));
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
