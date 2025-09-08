<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { defineAsyncComponent } from 'vue';
import {calculateSector, formatHourDayV2, formatTime} from "@/models/race";
import AutoRegeneratedAvatar from "@/components/AutoRegeneratedAvatar.vue";

const RaceInfo = defineAsyncComponent(() => import('@/components/RaceInfo.vue'));
const NumberTime = defineAsyncComponent(() => import('@/components/NumberTime.vue'));

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

function getSecondsInDate(x: String) {
  const date = new Date(x);
  const seconds = date.getTime() / 1000.0;
  return seconds.toFixed(2);
}
</script>
<template>
  <div class="race-container">
    <h1 class="title">Résultats de la course</h1>

    <div v-if="race" class="race-card">
      <section class="driver-info">
        <h2>Qui es-tu ?</h2>
        <AutoRegeneratedAvatar
            style="height: 130px; width: 130px"
            class="avatar"
            :avatar-config="race.car.avatar"
        />
        <p class="pseudo">{{ race.car.pseudo }}</p>
      </section>

      <section class="race-details">
        <h2>Détails de la course</h2>
        <p><strong>Heure de début :</strong> {{ formatHourDayV2(race.race_start) }}</p>
        <p><strong>Temps total :</strong> {{ getSecondsInDate(race.total_time) }} s</p>
        <p><strong>Temps de réaction :</strong> {{ (race.speed / 100).toFixed(2) }} s</p>
      </section>

      <section class="sectors">
        <h2>Temps intermédiaires</h2>
        <div class="sector-times">
          <p>1️⃣ Premier secteur : {{ getSecondsInDate(race.sector1) - getSecondsInDate(race.race_start) }} s</p>
          <p>2️⃣ Deuxième secteur : {{ getSecondsInDate(race.sector2) - getSecondsInDate(race.race_start) }} s</p>
        </div>
      </section>
    </div>
  </div>
</template>

<style>
section {
  margin: 25px 0;
  p {
    margin-top: 15px;
  }
}
.pseudo {
  font-size: 24px;
}
</style>