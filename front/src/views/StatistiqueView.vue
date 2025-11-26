<script setup lang="js">
import * as CanvasJS from '@canvasjs/charts';
import { onMounted, ref, watch, nextTick } from 'vue';

import stat2024A2025 from '../../../resultats-statistique/resultatStat_2024-2025.json';
import stat2025A2026 from '../../../resultats-statistique/resultatStat_2025-2026.json';

const statistiquesParAnnee = {
  '2024-2025': stat2024A2025,
  '2025-2026': stat2025A2026,
};

const anneeActif = ref('2024-2025');

const dataDisponible = ref(true);
const nbrActiviteEffectuer = ref(0);
const participantAyantEffectuerMinUneActivite = ref(0);
const nbrCourseEffectuer = ref(0);
const participantAyantEffectuerMinUneCourse = ref(0);
const nbrVoiture = ref(0);
const participantAyantEffectuerMinUneCourseEtUneActivite = ref(0);
const activitesLesPlusEffectue = ref([]);
const nbrCourseAvecVideo = ref(0);

// variables pour stocker les graphiques
let chartColumn = null;
let chartPie = null;

function updateStats(annee) {
  const stat = statistiquesParAnnee[annee];

  if (!stat || Object.keys(stat).length === 0) {
    dataDisponible.value = false;
    return;
  }

  dataDisponible.value = true;

  nbrActiviteEffectuer.value = stat.NombreActiviteEffectue?.[0]?.count || 0;
  participantAyantEffectuerMinUneActivite.value = stat.NombreDeVoitureAyantEffectueMinimumUneActivite?.length || 0;
  nbrCourseEffectuer.value = stat.NombreDeCourse?.[0]?.count || 0;
  participantAyantEffectuerMinUneCourse.value = stat.NombreDeVoitureAyantEffectueMinimumUneCourse?.length || 0;
  nbrVoiture.value = stat.NombreDeVoiture?.[0]?.count || 0;
  participantAyantEffectuerMinUneCourseEtUneActivite.value = stat.NombreDeParticipantEffectueeMinimumUneCourseEtUneActivite?.length || 0;
  activitesLesPlusEffectue.value = stat.ActiviteLesPlusEffectue || [];
  nbrCourseAvecVideo.value = stat.NombreDeCourseAvecVideo?.[0]?.count || 0;

  // attendre que Vue recrée les div (grâce à :key)
  nextTick(() => {
    renderCharts();
  });
}

function renderCharts() {
  if (!dataDisponible.value) return;

  // détruire les anciens graphiques s’ils existent
  if (chartColumn) chartColumn.destroy();
  if (chartPie) chartPie.destroy();

  chartColumn = new CanvasJS.Chart('chartColumnContainer', {
    title: { text: 'Activité effectuer par section' },
    data: [{
      type: 'column',
      dataPoints: activitesLesPlusEffectue.value.map(a => ({
        label: a.label,
        y: parseInt(a.count)
      }))
    }]
  });
  chartColumn.render();

  chartPie = new CanvasJS.Chart('chartPieContainer', {
    data: [{
      type: 'pie',
      dataPoints: [
        { label: 'Nombre de course possèdant une vidéo', y: nbrCourseAvecVideo.value },
        { label: 'Nombre de course sans vidéo', y: nbrCourseEffectuer.value - nbrCourseAvecVideo.value }
      ]
    }]
  });
  chartPie.render();
}

onMounted(() => {
  updateStats(anneeActif.value);
});

// déclenche updateStats automatiquement quand l’année change
watch(anneeActif, (nouvelleAnnee) => {
  updateStats(nouvelleAnnee);
});
</script>

<template>
  <h1>Statistiques {{ anneeActif }}</h1>

  <div>
    <label>Choisir une année : </label>
    <select v-model="anneeActif">
      <option v-for="(value, annee) in statistiquesParAnnee" :key="annee" :value="annee">
        {{ annee }}
      </option>
    </select>
  </div>

  <div v-if="!dataDisponible" class="aucune-donnees">
    <p>Désolée, pour l'instant aucunes statistiques disponibles pour cette année.</p>
  </div>

  <div v-else>
    <div>
      <h2>Quelques chiffres</h2>
      <div class="chiffres">
        <h3>Activité : </h3>
        <div class="stat">
          <div>
            <p><strong>{{ nbrActiviteEffectuer }}</strong></p>
            <p>Activité effectué</p>
          </div>
          <div>
            <p><strong>{{ participantAyantEffectuerMinUneActivite }}</strong></p>
            <p>Participant(e)s ayant effectuer au minimum une activité</p>
          </div>
          <div>
            <p><strong>{{ (nbrActiviteEffectuer/participantAyantEffectuerMinUneActivite).toPrecision(4) }}</strong></p>
            <p>Activité moyenne effectué par participant</p>
          </div>
        </div>
      </div>
      <div class="chiffres">
        <h3>Courses : </h3>
        <div class="stat">
          <div>
            <p><strong>{{ nbrCourseEffectuer }}</strong></p>
            <p>Course effectuées</p>
          </div>
          <div>
            <p><strong>{{ participantAyantEffectuerMinUneCourse }}</strong></p>
            <p>Participant(e)s ayant effectuer au minimum une course</p>
          </div>
          <div>
            <p><strong>{{ (nbrCourseEffectuer/participantAyantEffectuerMinUneCourse).toPrecision(4) }}</strong></p>
            <p>Course moyenne effectué par participant</p>
          </div>
        </div>
      </div>
      <div class="chiffres">
        <h3>Voitures : </h3>
        <div class="stat">
          <div>
            <p><strong>{{ nbrVoiture }}</strong></p>
            <p>Voiture</p>
          </div>
          <div>
            <p><strong>{{ participantAyantEffectuerMinUneCourseEtUneActivite }}</strong></p>
            <p>Participant(e)s ayant effectuer au minimum une course et une activité</p>
          </div>
          <div>
            <p><strong>{{ (100 / nbrVoiture * participantAyantEffectuerMinUneCourse).toPrecision(4) }}%</strong></p>
            <p>Voiture ayant effectuer au minimum une course</p>
          </div>
        </div>
      </div>
    </div>
    <div>
      <h2>Quelques graphiques</h2>
      <div :key="anneeActif + '-column'" id="chartColumnContainer" style="height: 300px; width: 100%; margin-bottom: 50px"></div>
      <div :key="anneeActif + '-pie'" id="chartPieContainer" style="height: 300px; width: 100%; margin-bottom: 50px"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.chiffres{
  background-color: black;
  padding: 20px;
  border-radius: 10px;
}

.stat{
  display: flex;
  flex-wrap: wrap;
}

.stat div {
  background-color: var(--pink-divtec);
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  max-width: 30%;
  text-align: center;
}

div {
  width: 100%;
  margin-top: 10px;
}

.aucune-donnees {
  margin-top: 20px;
  padding: 20px;
  background-color: #ffcccc;
  border-radius: 10px;
  color: #990000;
  font-weight: bold;
}
</style>
