<template>
    <div v-if="errorMessage">
        <h1>Une erreur s'est produite!</h1>
        <span>{{ errorMessage }}</span>
    </div>
    <div v-else-if="!hasLoaded" class="loading-ranking">
        <SpinLoading></SpinLoading>
    </div>
    <template v-else-if="listRace?.length === 0">
        <p>Aucune course n'a encore été réalisé !</p>
    </template>
    <template v-else>
      <img src="src/assets/img/podium.png" alt="podium">
        <ClassementElement
            v-for="(race, key) in listRace"
            :key="key"
            :avatar="race.car?.avatar || genConfig()"
            :id-car="race.car!.id_car"
            :is-new-element="false"
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
import { defineAsyncComponent, onUnmounted, ref } from 'vue';
import { genConfig } from 'holiday-avatar';

const SpinLoading = defineAsyncComponent(() => import('@/components/SpinLoading.vue'));
const ClassementElement = defineAsyncComponent(() => import('@/components/ClassementElement.vue'));

const hasLoaded = ref(false);
const listRace = ref<Exclude<models.rawData.WsRaceData, models.rawData.Error>[]>();
const errorMessage = ref<string>();

// Se connecte au websocket
const socket = new WebsocketConnection();

//Définition des props avec valeur par défaut
const props = withDefaults(defineProps<{
    showContent?: boolean,
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
  hasLoaded.value = true;

  emit('load');
});


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

</style>
