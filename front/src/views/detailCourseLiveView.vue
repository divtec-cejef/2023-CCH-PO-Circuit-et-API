<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { defineAsyncComponent } from 'vue';
import { useCarStore } from '@/stores/car';
import { getNumRace } from '@/models/car';

const RaceInfo = defineAsyncComponent(() => import('@/components/RaceInfo.vue'));

// Store Pinia
const cars = useCarStore();
const car = cars.currentCar; // Assure-toi que c'est bien la voiture courante

// Variable réactive pour la course
const raceDisplay = ref<{ id_race: number } | null>(null);

const API_URL = import.meta.env.VITE_ROUTE_API;

const getLatestRace = async () => {
  try {
    const res = await fetch(`${API_URL}/race/last`);
    if (!res.ok) throw new Error(`Erreur ${res.status}`);
    const data = await res.json();
    console.log('Dernière course récupérée:', data);
    return data; // { id: number }
  } catch (err) {
    console.error('Impossible de récupérer la dernière course:', err);
    return null;
  }
};

// Au montage du composant, on récupère la dernière course
onMounted(async () => {
  raceDisplay.value = await getLatestRace();
});
</script>

<template>
  <div class="best-race">
    <!-- Affichage uniquement si la course est récupérée -->
    <RaceInfo
        v-if="raceDisplay && car"
        :display-rank="true"
        :num-race="getNumRace(raceDisplay.value, car.listRace || [])"
        :race="raceDisplay.value"
        :rank="car.rank || 0"
    />

    <div class="video-race">
      <!-- Vidéo ou autre contenu ici -->
    </div>
  </div>
</template>

<style scoped lang="scss">
.best-race {
  /* Ajoute ton style ici */
}
.video-race {
  margin-top: 1rem;
}
</style>
