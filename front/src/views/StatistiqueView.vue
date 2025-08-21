<script setup lang="js">

import * as CanvasJS from '@canvasjs/charts';
import { onMounted } from 'vue';
import * as statistique from '../../../result.json';
console.log(statistique);

const nbrActiviteEffectuer = statistique.NombreActiviteEffectue[0].count;
const participantAyantEffectuerMinUneActivite = statistique.NombreDeVoitureAyantEffectueMinimumUneActivite.length;
const nbrCourseEffectuer = statistique.NombreDeCourse[0].count;
const participantAyantEffectuerMinUneCourse = statistique.NombreDeVoitureAyantEffectueMinimumUneCourse.length;
const nbrVoiture = statistique.NombreDeVoiture[0].count;
const participantAyantEffectuerMinUneCourseEtUneActivite = statistique.NombreDeParticipantEffectueeMinimumUneCourseEtUneActivite.length;

onMounted(async () => {
  var chartColumn = new CanvasJS.Chart('chartColumnContainer', {
    title: {
      text: 'Activité effectuer par section'
    },
    data: [{
      type: 'column',
      dataPoints: [
        { label: statistique.ActiviteLesPlusEffectue[0].label, y: parseInt(statistique.ActiviteLesPlusEffectue[0].count) },
        { label: statistique.ActiviteLesPlusEffectue[1].label, y: parseInt(statistique.ActiviteLesPlusEffectue[1].count) },
        { label: statistique.ActiviteLesPlusEffectue[2].label, y: parseInt(statistique.ActiviteLesPlusEffectue[2].count) },
        { label: statistique.ActiviteLesPlusEffectue[3].label, y: parseInt(statistique.ActiviteLesPlusEffectue[3].count) },
        { label: statistique.ActiviteLesPlusEffectue[4].label, y: parseInt(statistique.ActiviteLesPlusEffectue[4].count) },
        { label: statistique.ActiviteLesPlusEffectue[5].label, y: parseInt(statistique.ActiviteLesPlusEffectue[5].count) },
        { label: statistique.ActiviteLesPlusEffectue[6].label, y: parseInt(statistique.ActiviteLesPlusEffectue[6].count) },
        { label: statistique.ActiviteLesPlusEffectue[7].label, y: parseInt(statistique.ActiviteLesPlusEffectue[7].count) },
        { label: statistique.ActiviteLesPlusEffectue[8].label, y: parseInt(statistique.ActiviteLesPlusEffectue[8].count) },
      ]
    }]
  });
  chartColumn.render();
  var chartPie = new CanvasJS.Chart('chartPieContainer', {
    data: [{
      type: 'pie',
      dataPoints: [
        { label: 'Nombre de course possèdant une vidéo', y: parseInt(statistique.NombreDeCourseAvecVideo[0].count) },
        { label: 'Nombre de course sans vidéo', y: nbrCourseEffectuer - parseInt(statistique.NombreDeCourseAvecVideo[0].count) }
      ]
    }]
  });
  chartPie.render();
});

</script>
<template>
  <h1>Statistiques</h1>
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
          <p>Course moyenne effectué par participent</p>
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
    <h2>Quelque graphiques</h2>
    <div id="chartColumnContainer" style="height: 300px; width: 100%;">
    </div>
    <div id="chartPieContainer" style="height: 300px; width: 100%;">
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
</style>