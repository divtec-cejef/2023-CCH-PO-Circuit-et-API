<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { useCarStore } from '@/stores/car';
import { getNumRace } from '@/models/car';

const RaceInfo = defineAsyncComponent(() => import('@/components/RaceInfo.vue'));
const cars = useCarStore();
console.log(cars);

const raceDetail = cars.listRace![(car.listRace?.length ? car.listRace?.length : 1) - 1];

console.log(raceDetail);

const getLatestRace = async () => {
  // récupération des informations de la course et de la voiture
  const race: { id_race: number, total_time: Date, id_car: number }[] = await fetch().$queryRaw`select race.* FROM cars.race order by race.id_race desc limit 1;`;

  console.dir({ race });

  // création du résultat

  return race;
};

getLatestRace();
</script>

<template>
  <div class="best-race">
    <!--<RaceInfo :display-rank="true"
              :num-race="getNumRace(raceDisplay, car.listRace!)"
              :race="raceDisplay"
              :rank="car.rank!"
    />-->
    <div class="video-race">
      <VideoRace :url="raceDetail.videoUrl"></VideoRace>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>