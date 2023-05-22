<template>
    <ClassementElement v-for="(race, key) in listRace" :key="key" :avatar="race.car.avatar" :rank="key + 1"
                       :pseudo="race.car.pseudo" :time="new Date(race.total_time)"/>
</template>

<script setup lang="ts">
import ClassementElement from '@/components/ClassementElement.vue';
import { websocket } from '@/models/api';
import { ref, onUnmounted } from 'vue';
import type { models } from '@/models/api';

const listRace = ref<models.rankingData>();

const socket = new websocket();

socket.onRankingRecieved((data) => {
  listRace.value = data;
});

onUnmounted(() => {
  console.log('cleanup');
  socket.destroy();
});

</script>

<style scoped lang="scss">
</style>
