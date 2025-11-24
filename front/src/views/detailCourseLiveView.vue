<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { formatHourDayV2 } from '@/models/race';
import AutoRegeneratedAvatar from '@/components/AutoRegeneratedAvatar.vue';
import QrcodeVue from 'qrcode.vue';

const API_URL = 'https://gp.divtec.ch/api';

const race = ref<any | null>(null);

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
      <section class="content">
        <section class="race-details">
          <h2>Détails de la course</h2>
          <p><strong>Temps total :</strong> <strong style="font-size: 30px; color: greenyellow">{{ getSecondsInDate(race.total_time) }}</strong> s</p>
          <p><strong>Temps de réaction :</strong> {{ (race.speed / 100).toFixed(2) }} s</p>
          <p><strong>Heure de début :</strong> {{ formatHourDayV2(race.race_start) }}</p>
        </section>

        <section class="sectors">
          <h2>Temps intermédiaires</h2>
          <div class="sector-times">
            <p>1️⃣ Premier secteur : {{ (getSecondsInDate(race.sector1) - getSecondsInDate(race.race_start)).toFixed(2) }} s</p>
            <p>2️⃣ Deuxième secteur : {{ (getSecondsInDate(race.sector2) - getSecondsInDate(race.race_start)).toFixed(2) }} s</p>
          </div>
        </section>
      </section>

      <section class="qr-code">
        <h2>QR Code :</h2>
        <QrcodeVue
            :value="`https://cpp.ch/videos/courses/${race.id_race}.mp4`"
            :size="150"
            level="H"
        />
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
h1 {
  margin-left: 15%;
}

.driver-info {
  margin-left: 35%;
  p {
    margin-left: 8%;
  }
}
.qr-code {
  margin-left: 35%;
}

.content {
  display: flex;
  section {
    margin-right: 30px;
  }
}
</style>