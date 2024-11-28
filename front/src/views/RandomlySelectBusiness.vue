<script setup lang="ts">
import { ref } from 'vue';

const businesses = [
  'VarinEtampage SA',
  'Willemin-Macodel SA',
  'Louis-Lang',
  'Sphinx Outils SA',
  'Louis-Belet',
  'Pierre Steulet SA',
  'CEPIM',
  'Atelier Busch'
];

const shownIndex = ref<number | null>(null);
const running = ref(false);


const start = () => {
  const randomIndex = (thenMs: number) => {
    shownIndex.value = (shownIndex.value! + 1) % businesses.length;
    setTimeout(() => {
      if(thenMs > 300){
        running.value = false;
        return;
      }

      randomIndex(thenMs * 1.1);
    }, thenMs);
  };

  running.value = true;
  shownIndex.value = Math.floor(Math.random() * businesses.length);

  randomIndex(10);
};

</script>

<template>
  <div class="flex flex-col fullscreen justify-evenly">
    <h2>
        {{ shownIndex !== null ? businesses[shownIndex] : 'Tirage au sort des entreprises' }}
    </h2>

    <button
        @click="start"
        :disabled="running"
        class="main">Lancer le tirage</button>
  </div>
</template>

<style scoped lang="scss">
h2 {
  text-align: center;
}

.flex {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
}

.flex-col {
  flex-direction: column;
}

.justify-around {
  justify-content: space-around;
}

.justify-evenly {
  justify-content: space-evenly;
}
</style>