<template>
    <div class="classement">
        <ClassementElement v-for="(race, key) in listRace" :key="key" :avatar="race.car.avatar.image"
                           :rank="key + 1"
                           :pseudo="race.car.pseudo" :time="race.total_time"/>
        <ClassementElement v-for="(race, key) in listRace" :key="key" :avatar="race.car.avatar.image"
                           :rank="key + 1"
                           :pseudo="race.car.pseudo" :time="race.total_time"/>
        <ClassementElement v-for="(race, key) in listRace" :key="key" :avatar="race.car.avatar.image"
                           :rank="key + 1"
                           :pseudo="race.car.pseudo" :time="race.total_time"/>
        <ClassementElement v-for="(race, key) in listRace" :key="key" :avatar="race.car.avatar.image"
                           :rank="key + 1"
                           :pseudo="race.car.pseudo" :time="race.total_time"/>
        <ClassementElement v-for="(race, key) in listRace" :key="key" :avatar="race.car.avatar.image"
                           :rank="key + 1"
                           :pseudo="race.car.pseudo" :time="race.total_time"/>
        <ClassementElement v-for="(race, key) in listRace" :key="key" :avatar="race.car.avatar.image"
                           :rank="key + 1"
                           :pseudo="race.car.pseudo" :time="race.total_time"/>
        <ClassementElement v-for="(race, key) in listRace" :key="key" :avatar="race.car.avatar.image"
                           :rank="key + 1"
                           :pseudo="race.car.pseudo" :time="race.total_time"/>
        <ClassementElement v-for="(race, key) in listRace" :key="key" :avatar="race.car.avatar.image"
                           :rank="key + 1"
                           :pseudo="race.car.pseudo" :time="race.total_time"/>
    </div>
</template>

<script setup lang="ts">
import ClassementElement from '@/components/ClassementElement.vue';
import api from '@/models/api';
import { ref } from 'vue';
import type { models } from '@/models/api';

const listRace = ref<models.raceObject[]>([]);

api.onRankingRecieved((data) => {

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

</script>

<style scoped lang="scss">

</style>