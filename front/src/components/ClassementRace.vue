<template>
  <ClassementElement v-for="(race, key) in listRace" :key="key" :avatar="race.car.avatar.image" :rank="key + 1"
    :pseudo="race.car.pseudo" :time="race.total_time" />
  <ClassementElement v-for="(race, key) in listRace" :key="key" :avatar="race.car.avatar.image" :rank="key + 1"
    :pseudo="race.car.pseudo" :time="race.total_time" />
  <ClassementElement v-for="(race, key) in listRace" :key="key" :avatar="race.car.avatar.image" :rank="key + 1"
    :pseudo="race.car.pseudo" :time="race.total_time" />
  <ClassementElement v-for="(race, key) in listRace" :key="key" :avatar="race.car.avatar.image" :rank="key + 1"
    :pseudo="race.car.pseudo" :time="race.total_time" />
  <ClassementElement v-for="(race, key) in listRace" :key="key" :avatar="race.car.avatar.image" :rank="key + 1"
    :pseudo="race.car.pseudo" :time="race.total_time" />
  <ClassementElement v-for="(race, key) in listRace" :key="key" :avatar="race.car.avatar.image" :rank="key + 1"
    :pseudo="race.car.pseudo" :time="race.total_time" />
  <ClassementElement v-for="(race, key) in listRace" :key="key" :avatar="race.car.avatar.image" :rank="key + 1"
    :pseudo="race.car.pseudo" :time="race.total_time" />
  <ClassementElement v-for="(race, key) in listRace" :key="key" :avatar="race.car.avatar.image" :rank="key + 1"
    :pseudo="race.car.pseudo" :time="race.total_time" />
</template>

<script setup lang="ts">
import ClassementElement from '@/components/ClassementElement.vue';
import { websocket } from '@/models/api';
import { ref, onUnmounted } from 'vue';
import type { models } from '@/models/api';

const listRace = ref<models.raceObject[]>([]);

const socket = new websocket();

socket.onRankingRecieved((data) => {

  listRace.value = data.map((d) => {
    return {
      car: d.car,
      // eslint-disable-next-line camelcase
      id_race: d.id_race,
      // eslint-disable-next-line camelcase
      total_time: new Date(d.total_time),
    };
  });
});

onUnmounted(() => {
  console.log('cleanup');
  socket.destroy();
});

</script>

<style scoped lang="scss">
</style>
