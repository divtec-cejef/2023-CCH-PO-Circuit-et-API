<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

// Import des images
import badgeGlobaz from '@/assets/img/globaz.png';
import badgeDecovi from '@/assets/img/decovi.png';
import badgeBusch from '@/assets/img/Busch.png';
import badgeLouisLang from '@/assets/img/Louis lang.png';
import badgeWillemin from '@/assets/img/badgeWillemin-macodel.png';

// Sponsors
const sponsors = [
  { name: 'Globaz', image: badgeGlobaz },
  { name: 'Décovi', image: badgeDecovi },
  { name: 'Atelier Busch', image: badgeBusch },
  { name: 'Louis-lang', image: badgeLouisLang },
  { name: 'Willemin-Macodel', image: badgeWillemin },
];

const currentHighlight = ref(0); // index du logo sur lequel le background est
const isRunning = ref(false);
const winner = ref<string | null>(null);

const route = useRoute();
const carQueryId = Number(route.query.query_id);
const API_URL = 'https://gp.divtec.ch/api';

function startAnimation() {
  if (isRunning.value) return;
  isRunning.value = true;
  winner.value = null;
  currentHighlight.value = 0;

  const targetIndex = Math.floor(Math.random() * sponsors.length);
  const totalCycles = sponsors.length * 5 + targetIndex; // plusieurs passages
  let cycle = 0;
  let speed = 150; // vitesse visible

  const spin = () => {
    currentHighlight.value = (currentHighlight.value + 1) % sponsors.length;
    cycle++;

    // Ralentissement progressif à la fin
    if (cycle > totalCycles - 4) speed += 150;

    if (cycle >= totalCycles) {
      isRunning.value = false;
      winner.value = sponsors[targetIndex].name;
      sendSponsorToApi(carQueryId, winner.value!);
      return;
    }

    setTimeout(spin, speed);
  };

  spin();
}

async function sendSponsorToApi(carQueryId: number, selectedSponsor: string) {
  try {
    const res = await fetch(`${API_URL}/car/sponsor?id=${carQueryId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sponsor: selectedSponsor }),
    });

    if (!res.ok) {
      console.error('Erreur API:', await res.json());
      return;
    }

    const updatedCar = await res.json();
    console.log('Sponsor mis à jour:', updatedCar);
  } catch (err) {
    console.error('Erreur réseau:', err);
  }
}

onMounted(() => startAnimation());
</script>
<template>
  <div class="sponsor-container">
    <div class="sponsor-row">
      <div
          v-for="(sponsor, i) in sponsors"
          :key="i"
          class="sponsor-item"
          :class="{ highlighted: currentHighlight === i, winner: winner === sponsor.name }"
      >
        <img :src="sponsor.image" :alt="sponsor.name" />
        <p class="name">{{ sponsor.name }}</p>
      </div>
    </div>

    <div v-if="winner" class="winner">
      <div style="margin-top: 30px"><h2 style="text-align: center">Que faut il faire ?</h2></div>
        <div style="text-align: center">
          Allez à la salle de GYM, au stand <strong style="background-color: #28a745; padding: 5px; border-radius: 5%">{{ winner }}</strong>, pour gagner un prix
          </div>
      <div style="color: red; margin-top: 15px">Plus d'information sur la page bonus, dans l'onglet sponsor</div>
    </div>
  </div>
</template>

<style>
.sponsor-row {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 1rem;
}

.sponsor-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: background-color 0.3s, transform 0.3s;

  img {
    width: 100px;
    height: auto;
    margin-bottom: 0.5rem;
  }

  .name {
    font-weight: 600;
    color: white;
    font-size: 1.2rem;
  }

  &.highlighted {
    background-color: #f39c12; /* couleur qui défile */
    transform: scale(1.05);
  }

  &.winner {
    background-color: #28a745 !important; /* couleur gagnant */
    transform: scale(1.1);
  }
}

.winner {
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
}

</style>