<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { defineAsyncComponent } from 'vue';
import { useCarStore } from '@/stores/car';
import { getNumRace } from '@/models/car';
import {formatHourDay, formatHourDayV2} from "@/models/race";

const RaceInfo = defineAsyncComponent(() => import('@/components/RaceInfo.vue'));
// const raceDisplay = ref<{ id_race: number } | null>(null);

const API_URL = 'http://localhost:3000';

const getLatestRace = async () => {
  try {
    const res = await fetch(`${API_URL}/race/last`);
    if (!res.ok) throw new Error(`Erreur ${res.status}`);
    const data = await res.json();
    console.log(data.race);
    return data.race;
  } catch (err) {
    console.error('Impossible de récupérer la dernière course:', err);
    return null;
  }
};


const race = ref<any | null>(null);
onMounted(async () => {
  race.value = await getLatestRace();
});

</script>

<template>
  <div v-if="race">
    {{ formatHourDayV2(race.race_start) }}
  </div>
</template>

