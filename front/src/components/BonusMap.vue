<template>
    <img src="../assets/svg/division-plan.svg" alt="Carte de la division">

    <div v-for="activity in activities" :key="activity.labelActivity" class="icon" :style="{position: 'absolute', top: 'calc('+ activity.posY + '% - 12px)', left: 'calc(' + activity.posX + '% - 12px)'}" @mouseover="activity.active.value = true" @mouseleave="activity.active.value = false">
        <img src="../assets/img/clock.webp" alt="Drapeau">
    </div>
    <div v-for="activity in activities" :key="activity.labelActivity" :style="{position: 'absolute', top: calculatePositionY(activity.posY, 12), left: calculatePositionX(activity.posX, 12)}">
        <div v-show="activity.active.value" :class="`bonus-label ${activity.labelActivity}`">
            <p>Activité : {{ activity.labelActivity }}</p>
            <p>Section : {{ activity.labelSection }}</p>
        </div>
    </div>



</template>

<script setup lang="ts">
import { ref } from 'vue';

const divHeight = 50;
const divWidth = 250;


const activities = [{
  labelActivity: 'Informer',
  labelSection: 'Informatique',
  posX: 22,
  posY: 30,
  active: ref(false),
},{
  labelActivity: 'Automatiser',
  labelSection: 'Automatique',
  posX: 45,
  posY: 65,
  active: ref(false),
},{
  labelActivity: 'Horlogifier',
  labelSection: 'Horlogerie',
  posX: 88,
  posY: 65,
  active: ref(false),
},{
  labelActivity: 'Electroniser',
  labelSection: 'Electronique',
  posX: 85,
  posY: 20,
  active: ref(false),
},{
  labelActivity: 'Micromécaniser',
  labelSection: 'Micromécanique',
  posX: 55,
  posY: 15,
  active: ref(false),
},{
  labelActivity: 'Laborantiser',
  labelSection: 'Laborantin',
  posX: 75,
  posY: 79,
  active: ref(false),
},{
  labelActivity: 'Dessiner',
  labelSection: 'Dessinateur',
  posX: 35,
  posY: 20,
  active: ref(false),
}];

function calculatePositionX(posx, dif) {
  if (posx > 50) {
    return 'calc(' + posx + '% - ' + (dif + divWidth) + 'px)';
  } else {
    return 'calc(' + posx + '% + ' + dif + 'px)';
  }
}

function calculatePositionY(posy, dif) {
  if (posy > 50) {
    return 'calc(' + posy + '% - ' + (10 + dif + divHeight) + 'px)';
  } else {
    return 'calc(' + posy + '% + ' + (10 + dif) + 'px)';
  }
}
</script>

<style scoped>

template {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.icon {
    width: 24px;
}

.icon:hover {
    width: 30px;
    cursor: pointer;
}

.bonus-label {
    width: 250px;
    height: 50px;
    padding : 5px;
    background-color: #ffffff;
    border-radius: 10px;
    border: #7f7f7f 1px solid;
    box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
}

</style>