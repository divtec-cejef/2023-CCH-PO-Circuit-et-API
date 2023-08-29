<template>
    <div class="container">
        <div :ref="panzoomable">
            <BonusMap :display-label="displayLabel" :hide-label="hideLabel" :sections="allSections" :activated-section="activatedSection"></BonusMap>
        </div>
    </div>
    <div v-if="currentLabel.title !== null" ref="label" class="labelActivity" :style="{left: divLeft, top: divTop, display: divDisplay}">
        <div v-if="currentLabel.activities.length > 0">
            <p>Activités :</p>
            <ul>
                <li v-for="activity in currentLabel.activities" :key="activity.idActivity">
                    <img :src=trophy alt="Trophé"  :style="{filter: `${activity.realised ? 'none': 'grayscale(100%)'}`}"/>
                    <span>{{ activity['labelActivity'] }}</span>
                </li>
            </ul>
        </div>
        <div v-if="currentLabel.activities.length <= 0">
            <p>Il n'y a pas d'activités dans cette section</p>
        </div>

    </div>

</template>

<script setup lang="ts">
import BonusMap from '@/components/BonusMap.vue';
import panzoom from 'panzoom';
import { ref } from 'vue';
import api from '@/models/api';
import { useCarStore } from '@/stores/car';
import trophy from '../assets/img/rank1.webp';
const userCar = useCarStore();
const { car } = userCar;

const label = ref<HTMLDivElement>();
const divLeft = ref<string>('0');
const divTop = ref<string>('0');
const divDisplay = ref<string>('none');

let realisedActivity = ref<number[]>([]);
let sectionActivities = ref<{activities: {idActivity: number, labelActivity: string}[], idSection: number, labelSection: string}[]>([]);
let activatedSection = ref<number[]>([]);

function getRealisedActivity() {
  realisedActivity.value = [];
  api.getActivityOneCar(car.idCar).then((v) => {
    const { json: dataActivity, status: status } = v;
    if (status.valueOf() === api.ReturnCodes.Success) {
      for (let activity of dataActivity) {
        realisedActivity.value.push(activity['id_activity']);
      }
    }

    getSectionAndActivities();
  });
}

function getSectionAndActivities() {
  sectionActivities.value = [];
  api.getAllSections().then((v: {json: {label: string, id_section: number}[], status: number }) => {
    const { json: dataSections, status: statusActivities } = v;

    if (statusActivities.valueOf() === api.ReturnCodes.Success) {
      for (let section of dataSections) {
        for (let sections of allSections.value) {
          if (sections['section'] === section['label']) {
            sections['id'] = section['id_section'];
          }
        }

        api.getAllActivitiesOneSection(section['id_section'])
          .then((v: {
            json: {
                label: string,
                id_section: number,
                id_activity: number
            }[],
                status: number
            }) => {
            const { json: dataActivities, status: statusActivities } = v;

            if (statusActivities.valueOf() === api.ReturnCodes.Success) {
              sectionActivities.value.push(
                {
                  idSection: section['id_section'],
                  labelSection: section['label'],
                  activities: [],
                });
              for (let activity of dataActivities) {
                for (let section of sectionActivities.value) {
                  if (section?.idSection === activity['id_section']) {
                    section?.activities.push(
                      {
                        idActivity: activity['id_activity'],
                        labelActivity: activity['label'],
                      });
                  }
                }
              }
            }
            getSectionBonusAcorded();
          });
      }
    }
  });
}

function activityIsRealised(idActivity: number) {
  return realisedActivity.value.includes(idActivity);
}

function sectionBonusAcorded(idSection: number) {
  let bonusAcorded = false;
  for (let section of sectionActivities.value) {
    if (section?.idSection === idSection) {
      for (let activity of section['activities']) {
        if (activityIsRealised(activity['idActivity'])) {
          bonusAcorded = true;
        }
      }
    }
  }
  return bonusAcorded;
}

function getSectionBonusAcorded() {
  for (let section of sectionActivities.value) {
    if (sectionBonusAcorded(section.idSection)) {
      if (!activatedSection.value.includes(section['idSection'])) {
        activatedSection.value.push(section['idSection']);
      }
    }
  }
}

getRealisedActivity();

const divHeight = 50;
const divWidth = 250;

let currentSection = ref<{id: number, labelSection: string, posX: number, posY: number, section: string}>();
let currentLabel = ref<{title: string | null, realised: boolean, activities: {idActivity: number, labelActivity: string, realised: boolean}[]}>({
  title: null,
  realised: false,
  activities: [] });
let zoomfactor: number = 1;

const panzoomable = (v: any)  => {
  let element = panzoom(v, {
    bounds: true,
    boundsPadding: 0.6,
    maxZoom: 5,
    minZoom: 1,
    onTouch: function(e: any) {
      return false;
    },
  });

  element.on('transform', function() {
    zoomfactor = element.getTransform().scale;
    divDisplay.value = 'none';
  });
};
const allSections = ref([{
  section: 'Informatique',
  id: -1,
  labelSection: 'Informaticien-ne',
  posX: 22,
  posY: 30,
},{
  section: 'Automatique',
  id: -1,
  labelSection: 'Automaticien-ne',
  posX: 45,
  posY: 65,
},{
  section: 'Horlogerie',
  id: -1,
  labelSection: 'Horloger-ère',
  posX: 77,
  posY: 65,
},{
  section: 'Electronique',
  id: -1,
  labelSection: 'Electronicien-ne',
  posX: 73,
  posY: 17,
},{
  section: 'Micromécanique',
  id: -1,
  labelSection: 'Micromécanicien-ne',
  posX: 47,
  posY: 8,
},{
  section: 'Laborantin',
  id: -1,
  labelSection: 'Laborantin-e',
  posX: 77,
  posY: 79,
},{
  section: 'Dessinateur',
  id: -1,
  labelSection: 'Dessinateur-trice',
  posX: 35,
  posY: 15,
},{
  section: 'Mécatronique',
  id: -1,
  labelSection: 'Mécatronicien-ne',
  posX: 20,
  posY: 80,
},{
  section: 'Industries2.0',
  id: -1,
  labelSection: 'Industrie 2.0',
  posX: 15,
  posY: 20,
}]);

function calculatePositionX(posx: number, dif: number, zoomfactor: number) {
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

function calculatePositionY(posy: number, dif: number, zoomfactor: number) {
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

function displayLabel(posx: number, posy: number, sectionLabel: string) {
  // console.log(posx, posy, sectionLabel);
  for (let section of allSections.value) {
    if (section.labelSection === sectionLabel) {
      currentSection.value = section;
    }
  }

  divLeft.value = calculatePositionX(posx, 24, zoomfactor);
  divTop.value = calculatePositionY(posy, 24, zoomfactor);
  divDisplay.value = 'block';

  currentLabel.value = {
    title: currentSection.value?.labelSection ?? '',
    realised: currentSection.value?.id ? sectionBonusAcorded(currentSection.value?.id ?? NaN) : false,
    activities: [],
  };

  for (let section of sectionActivities.value) {
    if (section['idSection'] === currentSection.value?.id ?? -1) {
      for (let activity of section['activities']) {
        currentLabel.value.activities.push(
          {
            idActivity: activity['idActivity'],
            labelActivity: activity['labelActivity'],
            realised: activityIsRealised(activity['idActivity']),
          });
      }
    }
  }
  console.log(currentLabel.value, realisedActivity.value);
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
    padding: 10px;
    display: none;
    position: absolute;
    background-color: #ffffff;
    //border: 2px solid #595959;
    border-radius: 10px;
    box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;

    h2 {
        font-size: 23px;
        margin: 0;
        margin-bottom: 10px;
    }

    ul {
        padding-left: 0;
    }

    li {
        list-style-type: none;
        display: flex;

        img {
            width: 20px;
            height: 20px;
            margin-right: 10px;
        }

    }
}
</style>