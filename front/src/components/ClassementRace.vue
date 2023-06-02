<template>
    <template v-if="!hasLoaded">
        <h2>Chargement en cours...</h2>
    </template>
    <template v-else-if="listRace?.length === 0">
        <h2>Aucune donnée n'est disponible</h2>
    </template>
    <template v-else>
    <ClassementElement v-for="(race, key) in listRace" :key="key" :avatar="race.car.avatar" :rank="key + 1"
                       :pseudo="race.car.pseudo" :time="new Date(race.total_time)"/>
    </template>
</template>

<script setup lang="ts">
import ClassementElement from '@/components/ClassementElement.vue';
import { websocket } from '@/models/api';
import { ref, onUnmounted } from 'vue';
import type { models } from '@/models/interface';

const hasLoaded = ref(false);
const listRace = ref<models.rankingData>();

const socket = new websocket();

socket.onRankingRecieved((data) => {
  listRace.value = data;
  hasLoaded.value = true;
});

onUnmounted(() => {
  console.log('cleanup');
  socket.destroy();
});

</script>

<style scoped lang="scss">
</style>
