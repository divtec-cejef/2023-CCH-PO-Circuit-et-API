<script setup lang="js">

import * as CanvasJS from '@canvasjs/charts';
import { onMounted } from 'vue';
onMounted(async () => {
  var chart = new CanvasJS.Chart('chartContainer', {
    title: {
      text: 'Activité effectuer par section'
    },
    data: [{
      type: 'column',
      dataPoints: [
        { label: 'Mécanicien-auto', y: 90 },
        { label: 'Qualiticien', y: 96 },
        { label: 'Laborantin', y: 113 },
        { label: 'Micromécanique', y: 115 },
        { label: 'Informatique', y: 116 },
        { label: 'Electronique', y: 182 },
        { label: 'Automatique', y: 186 },
        { label: 'Horlogerie', y: 192 },
        { label: 'Dessinateur', y: 197 }
      ]
    }]
  });
  chart.render();
});
</script>
<template>
  <h1>Statistiques</h1>
  <div>
    <h2>Quelque chiffres</h2>
    <div class="chiffres">
      <h3>Activité : </h3>
      <div class="stat">
        <div>
          <p>1288</p>
          <p>Activité effectué</p>
        </div>
        <div>
          <p>428</p>
          <p>Participant(e)s ayant effectuer au minimum une activité</p>
        </div>
        <div>
          <p>3</p>
          <p>Activité moyenne effectué par participant</p>
        </div>
      </div>
    </div>
    <div class="chiffres">
      <h3>Courses : </h3>
      <div class="stat">
        <div>
          <p>543</p>
          <p>Course effectuées</p>
        </div>
        <div>
          <p>302</p>
          <p>Participant(e)s ayant effectuer au minimum une course</p>
        </div>
        <div>
          <p>1.79</p>
          <p>Course moyenne effectué par participent</p>
        </div>
      </div>
    </div>
    <div class="chiffres">
      <h3>Voitures : </h3>
      <div class="stat">
        <div>
          <p>700</p>
          <p>Voiture</p>
        </div>
        <div>
          <p>253</p>
          <p>Participant(e)s ayant effectuer au minimum une course et une activité</p>
        </div>
        <div>
          <p>43%</p>
          <p>Voiture ayant effectuer au minimum une course</p>
        </div>
      </div>
    </div>
  </div>
  <div>
    <h2>Quelque graphiques</h2>
    <div id="chartContainer" style="height: 300px; width: 100%;">
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
}

div {
  width: 100%;
}
</style>