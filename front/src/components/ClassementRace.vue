<template>
    <div v-if="!hasLoaded" class="loading-ranking">
        <SpinLoading></SpinLoading>
    </div>
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
import SpinLoading from '@/components/SpinLoading.vue';

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

.loading-ranking {
    height: calc(60vh - var(--height-screen-diff));
    width: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>
