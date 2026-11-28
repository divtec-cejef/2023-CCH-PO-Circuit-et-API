<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

// Import des images
//import badgeVictorinoxSwissArmy from '@/assets/img/victorinox-swiss-army.png';
import badgeJAGJakob from '@/assets/img/jag-jakob.png';
import badgeWilleminMacodel from '@/assets/img/willemin-macodel.png';
import badgeLouisLang from '@/assets/img/louis-lang.png';
//import badgeGlobaz from '@/assets/img/globaz.png';
import badgeVarinEtampage from '@/assets/img/varin-etampage.png';
//import badgeSwatchGroup from '@/assets/img/swatch-group.png';
//import badgeRecomatic from '@/assets/img/recomatic.png';
//import badgeBusch from '@/assets/img/busch.png';
//import badgeBaccinex from '@/assets/img/baccinex.png';
//import badgeGroupeTavon from '@/assets/img/groupe-tavon.png';
//import badgeTornos from '@/assets/img/tornos.png';
//import badgeDecovi from '@/assets/img/decovi.png';
//import badgeLemo5 from '@/assets/img/lemo-5.png';
//import badgeManufactureCartierHorlogerie from '@/assets/img/manufacture-cartier-horlogerie.png';
//import badgeBiwi from '@/assets/img/biwi.png';
//import badgeHumardAutomation from '@/assets/img/humard-automation.png';

// Sponsors
const sponsors = [
  { name: 'JAG Jakob SA', image: badgeJAGJakob },
  { name: 'Louis Lang SA', image: badgeLouisLang },
  //{ name: 'Globaz SA', image: badgeGlobaz },
  //{ name: 'Biwi SA', image: badgeBiwi },
  //{ name: 'Swatch Group', image: badgeSwatchGroup },
  //{ name: 'Recomatic SA', image: badgeRecomatic },
  //{ name: 'Atelier Busch SA', image: badgeBusch },
  //{ name: 'Baccinex SA', image: badgeBaccinex },
  //{ name: 'Groupe Tavon', image: badgeGroupeTavon },
  //{ name: 'Tornos SA', image: badgeTornos },
  //{ name: 'Décovi SA', image: badgeDecovi },
  //{ name: 'Lémo 5 SA', image: badgeLemo5 },
  //{ name: 'Victorinox Swiss Army SA', image: badgeVictorinoxSwissArmy },
  //{ name: 'Manufacture Cartier Horlogerie, Branch of Richemont International SA', image: badgeManufactureCartierHorlogerie},
  { name: 'Willemin-Macodel SA', image: badgeWilleminMacodel },
  { name: 'Varin-étampage SA', image: badgeVarinEtampage },
  //{ name: 'Humard Automation SA', image: badgeHumardAutomation },
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
  const totalCycles = sponsors.length * 2 + targetIndex;
  let cycle = 0;
  let speed = Math.max(100, 200 - (sponsors.length * 10));
  let lastTime = performance.now();

  const spin = (time: number) => {
    if (time - lastTime >= speed) {
      currentHighlight.value = (currentHighlight.value + 1) % sponsors.length;
      cycle++;
      lastTime = time;

      // Ralentissement progressif à la fin
      if (cycle > totalCycles - 4) speed += speed;

      if (cycle >= totalCycles) {
        isRunning.value = false;
        winner.value = sponsors[targetIndex].name;
        sendSponsorToApi(carQueryId, winner.value!);
        return;
      }
    }
    requestAnimationFrame(spin);
  };

  requestAnimationFrame(spin);
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
  <div v-if="winner" class="winner">
    <div style="margin-top: 30px"><h2 style="text-align: center">Que faut-il faire ?</h2></div>
    <div style="text-align: center; line-height: 1.6;">
      Allez à la salle de GYM, au stand
      <strong style="background-color: #28a745; padding: 5px; border-radius: 5%">{{ winner }}</strong>,
      pour gagner un prix
    </div>
    <div style="color: red; margin-top: 15px">
      Plus d'information sur la page bonus, dans l'onglet sponsor
    </div>
  </div>
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
  </div>
</template>

<style>
.sponsor-row {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  justify-items: center;
  align-items: center;
  gap: 1rem;
  width: 100%;
  margin-bottom: 1rem;
}

/* Tablettes */
@media (max-width: 1024px) {
  .sponsor-row {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

/* Téléphones */
@media (max-width: 600px) {
  .sponsor-row {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}


.sponsor-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: background-color 0.3s, transform 0.3s;
  width: 180px;
  min-width: 180px;
  box-sizing: border-box;
}


.sponsor-item img {
  width: 100px;
  height: auto;
  margin-bottom: 0.5rem;
}

.sponsor-item .name {
  font-weight: 600;
  color: white;
  font-size: 1.2rem;

  max-width: 180px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.sponsor-item.highlighted {
  background-color: #f39c12; /* couleur qui défile */
  transform: scale(1.05);
}

.sponsor-item.winner {
  background-color: #28a745 !important; /* couleur gagnant */
  transform: scale(1.1);
}

.winner {
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 2rem;
}
</style>
