<script setup lang="ts">
import { ref, onMounted } from 'vue';

import badgeEntreprise1 from '@/assets/img/1.png';
import badgeEntreprise2 from '@/assets/img/2.png';
import badgeEntreprise3 from '@/assets/img/3.png';
import badgeEntreprise4 from '@/assets/img/4.png';
import badgeEntreprise5 from '@/assets/img/5.png';

const sponsors = [
  { name: 'Sponsors-1', image: badgeEntreprise1 },
  { name: 'Sponsors-2', image: badgeEntreprise2 },
  { name: 'Sponsors-3', image: badgeEntreprise3 },
  { name: 'Sponsors-4', image: badgeEntreprise4 },
  { name: 'Sponsors-5', image: badgeEntreprise5 },
];

const currentIndex = ref(0);
const isRunning = ref(false);
const winner = ref<string | null>(null);
const bounce = ref(false);

function startAnimation() {
  if (isRunning.value) return;
  isRunning.value = true;
  winner.value = null;
  bounce.value = false;

  let cycles = 0;
  const totalCycles = 25 + Math.floor(Math.random() * 10);
  const targetIndex = Math.floor(Math.random() * sponsors.length);
  let speed = 100;

  const spin = () => {
    currentIndex.value = (currentIndex.value + 1) % sponsors.length;
    cycles++;

    // ralentissement progressif avec easing
    if (cycles > totalCycles - 5) {
      speed += Math.pow(cycles - (totalCycles - 5), 2) * 20;
    }

    if (cycles >= totalCycles && currentIndex.value === targetIndex) {
      isRunning.value = false;
      winner.value = sponsors[targetIndex].name;

      // déclencher le rebond à l’arrêt
      bounce.value = true;
      setTimeout(() => (bounce.value = false), 300);
    } else {
      setTimeout(spin, speed);
    }
  };

  spin();
}

// Lancer le tirage automatiquement au chargement
onMounted(() => {
  startAnimation();
});
</script>

<template>
  <div class="sponsor-container">
    <h1 class="title">Sponsors</h1>

    <div class="sponsor-display">
      <transition name="fade" mode="out-in">
        <div
            :key="currentIndex"
            class="sponsor-item"
            :class="{ bounce: bounce }"
        >
          <img
              :src="sponsors[currentIndex].image"
              :alt="sponsors[currentIndex].name"
          />
          <p class="name">{{ sponsors[currentIndex].name }}</p>
        </div>
      </transition>
    </div>

    <div v-if="winner" class="winner">
      🏆 Gagnant : <strong>{{ winner }}</strong>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sponsor-container {
  text-align: center;
  margin-top: 2rem;
  font-family: system-ui, sans-serif;
}

.title {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.sponsor-display {
  width: 250px;
  height: 250px;
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid #eee;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.sponsor-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease-out;

  &.bounce {
    animation: bounce 0.3s ease-out;
  }

  img {
    width: 120px;
    height: auto;
    margin-bottom: 0.5rem;
  }

  .name {
    font-weight: 600;
    color: white;
    margin-top: 0.5rem;
    font-size: 1.7rem;
  }
}

@keyframes bounce {
  0% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-10px);
  }
  50% {
    transform: translateY(5px);
  }
  70% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0);
  }
}

.winner {
  margin-top: 1rem;
  font-size: 1.2rem;
  color: #28a745;
  font-weight: bold;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
