<template>
    <div v-if="!hasLoaded" class="loading-ranking">
        <SpinLoading></SpinLoading>
    </div>
    <template v-else-if="listRace?.length === 0">
        <p>Aucune donnée n'est disponible</p>
    </template>
    <template v-else>
        <ClassementElement v-for="(race, key) in listRace" :key="key" :avatar="race.car.avatar" :rank="key + 1"
                           :pseudo="race.car.pseudo" :time="new Date(race.total_time)"/>
    </template>
</template>

<script setup lang="ts">
import ClassementElement from '@/components/ClassementElement.vue';
import { WebsocketConnection } from '@/models/api';
import type { models } from '@/models/api';
import { ref, onUnmounted } from 'vue';
import SpinLoading from '@/components/SpinLoading.vue';

const hasLoaded = ref(false);
const listRace = ref<models.rawData.WsRaceData[]>();

// Se connecte au websocket
const socket = new WebsocketConnection();

// Met à jour les données à la réception d'évènement
socket.onRankingReceived((data) => {
  listRace.value = data.races;
  hasLoaded.value = true;
});

// Déconnecte le websocket à la fermeture de la page
onUnmounted(() => {
  console.log('cleanup');
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
