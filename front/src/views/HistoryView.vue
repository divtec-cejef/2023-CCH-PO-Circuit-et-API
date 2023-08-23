<template>
    <div class="container">
        <div :ref="panzoomable">
            <BonusMap :display-label="displayLabel" :hide-label="hideLabel" :sections="allSections"></BonusMap>
        </div>
    </div>
    <div ref="label" class="labelActivity" :style="{left: divLeft, top: divTop, display: divDisplay}">
        <p>{{ currentSection === null ? null : currentSection['labelSection'] }}</p>
        <p>Activités :</p>
        <ul>
            <li v-for="activity in currentSection === null ? null : currentSection['activities']">
                <p>{{ activity }}</p>
            </li>
        </ul>
    </div>

</template>

<script setup lang="ts">
import BonusMap from '@/components/BonusMap.vue';
import panzoom from 'panzoom';
import { ref } from 'vue';
import api from '@/models/api';
import { useCarStore } from '@/stores/car';
const userCar = useCarStore();
const { car } = userCar;

const label = ref<HTMLDivElement>();
const divLeft = ref('0');
const divTop = ref('0');
const divDisplay = ref('none');

let realisedActivity = [];

// récupération de la voiture
const { json: dataUserCar, status } = await api.getActivityOneCar(car.idCar);
if (status.valueOf() === api.ReturnCodes.Success) {
  for (let activity of dataUserCar.activities) {
    realisedActivity.push(activity['labelActivity']);
  }
}

// récupération des activités dans les sections
const { json: dataActivities, status: statusActivities } = await api.getActivities();

const divHeight = 50;
const divWidth = 250;

let currentSection = null;
let zoomfactor = 1;

const panzoomable = v => {
  let element = panzoom(v, {
    bounds: true,
    boundsPadding: 0.6,
    maxZoom: 5,
    minZoom: 1
  });

  element.on('transform', function() {
    zoomfactor = element.getTransform().scale;
    divDisplay.value = 'none';
  });
};

const allSections = [{
  labelSection: 'Informaticien-ne',
  posX: 22,
  posY: 30,
},{
  labelSection: 'Automaticien-ne',
  posX: 45,
  posY: 65,
},{
  labelSection: 'Horloger-ère',
  posX: 77,
  posY: 65,
},{
  labelSection: 'Electronicien-ne',
  posX: 73,
  posY: 17,
},{
  labelSection: 'Micromécanicien-ne',
  posX: 47,
  posY: 8,
},{
  labelSection: 'Laborantin-e',
  posX: 77,
  posY: 79,
},{
  labelSection: 'Dessinateur-trice',
  posX: 35,
  posY: 15,
},{
  labelSection: 'Mécatronicien-ne',
  posX: 20,
  posY: 80,
},{
  labelSection: 'Industrie 2.0',
  posX: 15,
  posY: 20,
}];

function calculatePositionX(posx, dif, zoomfactor) {
  console.log(posx, window.innerWidth / 2);
  let pos;
  if (posx > window.innerWidth / 2) {
    console.log(posx, (posx - (dif + divWidth)) * zoomfactor + 'px');
    pos = posx - divWidth;
  } else {
    pos = posx + dif*zoomfactor;
  }
  if (pos < 0) {
    pos = 0;
  } else if (pos > window.innerWidth - divWidth) {
    pos = window.innerWidth - divWidth;
  }

  return pos + 'px';
}

function calculatePositionY(posy, dif, zoomfactor) {
  let pos;
  if (posy > window.innerHeight / 2) {
    console.log(posy, (posy - (10 + dif + divHeight)) * zoomfactor + 'px');
    pos = posy - (10 + divHeight);
  } else {
    pos = posy + (10 + dif*zoomfactor);
  }
  if (pos < 0) {
    pos = 0;
  } else if (pos > window.innerHeight - divHeight) {
    pos = window.innerHeight - divHeight;
  }

  return pos + 'px';
}

function displayLabel(posx, posy, sectionLabel) {
  // console.log(posx, posy, sectionLabel);
  for (let section of allSections) {
    if (section.labelSection === sectionLabel) {
      currentSection = section;
    }
  }

  divLeft.value = calculatePositionX(posx, 24, zoomfactor);
  divTop.value = calculatePositionY(posy, 24, zoomfactor);
  divDisplay.value = 'block';
}

function hideLabel() {
  divDisplay.value = 'none';
}
</script>

<style scoped lang="scss">
.container {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    background-color: #fff;
}

.labelActivity {
    width: 250px;
    height: 50px;
    display: none;
    position: absolute;
    background-color: #ffffff;
    border: 1px solid #000000;
}
</style>