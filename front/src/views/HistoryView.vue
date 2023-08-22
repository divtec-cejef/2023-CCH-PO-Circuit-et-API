<template>
    <div class="container">
        <div :ref="panzoomable">
            <BonusMap :display-label="displayLabel" :hide-label="hideLabel" :activities="allActivities"></BonusMap>
        </div>
        <div ref="label" class="labelActivity" :style="{left: divLeft, top: divTop, hidden: divHidden}">
            <p>{{currentActivity === null ? null : currentActivity['labelActivity']}}</p>
        </div>
    </div>

</template>

<script setup lang="ts">
import BonusMap from '@/components/BonusMap.vue';
import panzoom from 'panzoom';
import { ref } from 'vue';

const label = ref<HTMLDivElement>();
const divLeft = ref('0');
const divTop = ref('0');
const divHidden = ref(true);


const divHeight = 50;
const divWidth = 250;

let currentActivity = null;

const panzoomable = v => {
  panzoom(v, {
    bounds: true,
    boundsPadding: 0.6,
    maxZoom: 5,
    minZoom: 1
  });
};

const allActivities = [{
  labelActivity: 'Informer',
  labelSection: 'Informatique',
  posX: 22,
  posY: 30,
},{
  labelActivity: 'Automatiser',
  labelSection: 'Automatique',
  posX: 45,
  posY: 65,
},{
  labelActivity: 'Horlogifier',
  labelSection: 'Horlogerie',
  posX: 88,
  posY: 65,
},{
  labelActivity: 'Electroniser',
  labelSection: 'Electronique',
  posX: 85,
  posY: 20,
},{
  labelActivity: 'Micromécaniser',
  labelSection: 'Micromécanique',
  posX: 55,
  posY: 15,
},{
  labelActivity: 'Laborantiser',
  labelSection: 'Laborantin',
  posX: 75,
  posY: 79,
},{
  labelActivity: 'Dessiner',
  labelSection: 'Dessinateur',
  posX: 35,
  posY: 20,
}];

function calculatePositionX(posx, dif) {
  if (posx > window.innerWidth / 2) {
    return 'calc(' + posx + 'px - ' + (dif + divWidth) + 'px)';
  } else {
    return 'calc(' + posx + 'px + ' + dif + 'px)';
  }
}

function calculatePositionY(posy, dif) {
  if (posy > window.innerHeight / 2) {
    return 'calc(' + posy + 'px - ' + (10 + dif + divHeight) + 'px)';
  } else {
    return 'calc(' + posy + 'px + ' + (10 + dif) + 'px)';
  }
}

function displayLabel(posx, posy, activityLabel) {
  console.log(posx, posy, activityLabel);
  for (let activity of allActivities) {
    if (activity.labelActivity === activityLabel) {
      currentActivity = activity;
    }
  }

  divLeft.value = calculatePositionX(posx, 10);
  divTop.value = calculatePositionY(posy, 10);
  divHidden.value = false;
}

function hideLabel() {
  divHidden.value = true;
}
</script>

<style scoped>
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
}
</style>