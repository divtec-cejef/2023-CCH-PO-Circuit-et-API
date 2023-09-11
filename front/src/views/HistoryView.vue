<template>
    <div class="content">
        <div v-if="currentLabel.title !== null" ref="label" class="labelActivity"
             :style="{left: divLeft, top: divTop, display: divDisplay}">
            <div v-if="currentLabel.activities.length > 0">
                <div class="label-header"><span>Activités :</span>
                    <div @click="() => {hideDiv()}"><img :src=close alt="fermer" class="dark-invert"></div>
                </div>
                <ul>
                    <li v-for="activity in currentLabel.activities" :key="activity.idActivity">
                        <img :src=trophy alt="Trophé"
                             :style="{filter: `${activity.realised ? 'none': 'grayscale(100%)'}`}"/>
                        <span>{{ activity['labelActivity'] }}</span>
                    </li>
                </ul>
            </div>
            <div v-if="currentLabel.activities.length <= 0" class="label-header">
                <span>Il n'y a pas d'activités dans cette section</span>
                <div @click="() => {hideDiv()}"><img :src=close alt="fermer" class="dark-invert"></div>
            </div>

        </div>
        <div v-if="hasError">
            <ErrorConnection></ErrorConnection>
        </div>
        <div v-else-if="!hasLoaded" class="loading-map">
            <SpinLoading></SpinLoading>
        </div>
        <div class="container" v-else>
            <div :ref="panzoomable">
                <BonusMap :display-label="displayLabel" :un-clicked="sectionUnCLicked" :sections="allSections"
                          :no-activity-sections="noActivitySections" :activated-section="activatedSection"></BonusMap>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import BonusMap from '@/components/BonusMap.vue';
import panzoom from 'panzoom';
import { ref } from 'vue';
import api from '@/models/api';
import { useCarStore } from '@/stores/car';
import trophy from '../assets/img/trophy.png';
import close from '../assets/img/close.png';
import SpinLoading from '@/components/SpinLoading.vue';
import ErrorConnection from '@/components/ErrorConnection.vue';

const userCar = useCarStore();
const { car } = userCar;

const label = ref<HTMLDivElement>();
const divLeft = ref<string>('0');
const divTop = ref<string>('0');
const divDisplay = ref<string>('none');
const sectionUnCLicked = ref<boolean>(true);
const hasLoaded = ref<boolean>(false);
const hasError = ref<boolean>(false);

let realisedActivity = ref<number[]>([]);
let sectionActivities = ref<{
  activities: { idActivity: number, labelActivity: string }[],
  idSection: number,
  labelSection: string
}[]>([]);
let activatedSection = ref<number[]>([]);
let elementString = ref<string>('');
let noActivitySections = ref<number[]>([]);

function getRealisedActivity() {
  realisedActivity.value = [];
  if (car.idCar === 0 || car.idCar === undefined) {
    getSectionAndActivities();
  } else {
    api.getActivityOneCar(car.idCar).then((v) => {
      const { json: dataActivity, status: status } = v;
      if (status.valueOf() === api.ReturnCodes.Success) {
        for (let activity of dataActivity) {
          realisedActivity.value.push(activity['id_activity']);
        }
      } else {
        hasError.value = true;
      }

      getSectionAndActivities();
    });
  }
}

function getSectionAndActivities() {
  sectionActivities.value = [];
  api.getAllSections().then((v: { json: { label: string, id_section: number }[], status: number }) => {
    const { json: dataSections, status: statusActivities } = v;

    if (statusActivities.valueOf() === api.ReturnCodes.Success) {
      for (let section of dataSections) {
        for (let sections of allSections.value) {
          if (sections['section'] === section['label']) {
            sections['id'] = section['id_section'];
          }
        }

        api.getAllActivitiesOneSection(section.id_section)
          .then((v) => {
            const { json: dataActivities, status: statusActivities } = v;

            if ('message' in dataActivities) {
              hasError.value = true;
              return;
            }

            if (statusActivities.valueOf() === api.ReturnCodes.Success) {
              sectionActivities.value.push(
                {
                  idSection: section.id_section,
                  labelSection: section.label,
                  activities: [],
                });
              for (let activity of dataActivities) {
                for (let section of sectionActivities.value) {
                  if (section?.idSection === activity.idSection) {
                    section?.activities.push(
                      {
                        idActivity: activity.idActivity,
                        labelActivity: activity.label,
                      });
                  }
                }
              }
              getSectionBonusAcorded();
              getNoActivitySections();
              hasLoaded.value = true;
            } else {
              hasError.value = true;
            }
          });
      }
    } else {
      hasError.value = true;
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

function getNoActivitySections() {
  for (let section of allSections.value) {
    let present = false;
    for (let sectionActivity of sectionActivities.value) {
      if (section.id === sectionActivity['idSection']) {
        present = true;
      }
    }
    if (!present) {
      noActivitySections.value.push(section['id']);
    }
  }
}

getRealisedActivity();

const divWidth = 250;

let currentSection = ref<{ id: number, labelSection: string, posX: number, posY: number, section: string }>();
let currentLabel = ref<{
  title: string | null,
  realised: boolean,
  activities: { idActivity: number, labelActivity: string, realised: boolean }[]
}>({
  title: null,
  realised: false,
  activities: []
});
let zoomfactor: number = 1;

// let posx = 0;
// let posy = 0;

const panzoomable = (v: any) => {
  let element = panzoom(v, {
    bounds: true,
    boundsPadding: 0.2,
    maxZoom: 5,
    minZoom: 0.5,
    onTouch: function (e: any) {
      e.preventDefault();
    },
    onClick: function (e: any) {
      e.target.click();
      elementString.value = e.target;
    },
  });

  element.on('transform', function () {
    zoomfactor = element.getTransform().scale;
    hideDiv();
  });
};

function hideDiv() {
  divDisplay.value = 'none';
  sectionUnCLicked.value = true;
}

const allSections = ref([{
  section: 'Informatique',
  id: -1,
  labelSection: 'Informaticien-ne',
  posX: 22,
  posY: 30,
}, {
  section: 'Automatique',
  id: -1,
  labelSection: 'Automaticien-ne',
  posX: 45,
  posY: 65,
}, {
  section: 'Horlogerie',
  id: -1,
  labelSection: 'Horloger-ère',
  posX: 77,
  posY: 65,
}, {
  section: 'Electronique',
  id: -1,
  labelSection: 'Electronicien-ne',
  posX: 73,
  posY: 17,
}, {
  section: 'Micromécanique',
  id: -1,
  labelSection: 'Micromécanicien-ne',
  posX: 47,
  posY: 8,
}, {
  section: 'Laborantin',
  id: -1,
  labelSection: 'Laborantin-e',
  posX: 77,
  posY: 79,
}, {
  section: 'Dessinateur',
  id: -1,
  labelSection: 'Dessinateur-trice',
  posX: 35,
  posY: 15,
}, {
  section: 'Mécatronique',
  id: -1,
  labelSection: 'Mécatronicien-ne',
  posX: 20,
  posY: 80,
}, {
  section: 'Industries2.0',
  id: -1,
  labelSection: 'Industrie 2.0',
  posX: 15,
  posY: 20,
}]);

function calculatePositionX(posx: number, dif: number, zoomfactor: number) {
  let pos;
  if (posx > window.innerWidth / 2) {
    pos = posx - divWidth;
  } else {
    pos = posx + dif * zoomfactor;
  }
  if (pos < 0) {
    pos = 0;
  } else if (pos > window.innerWidth - divWidth) {
    pos = window.innerWidth - divWidth;
  }

  return pos + 'px';
}

function calculatePositionY(posy: number, dif: number, zoomfactor: number, divHeight: number) {
  let pos;
  if (posy > window.innerHeight / 2) {
    pos = posy - (10 + divHeight);
  } else {
    pos = posy + (10 + dif * zoomfactor);
  }
  const minHeightPx = getComputedStyle(document.documentElement)
    .getPropertyValue('--height-screen-diff');
  const minHeight = parseInt(minHeightPx.substring(0, minHeightPx.length - 2)) + 35;
  console.log('minHeight: ' + minHeight);
  if (pos < minHeight) {
    console.log('minHeight: ' + minHeight);
    pos = minHeight;
  } else if (pos > window.innerHeight - divHeight) {
    pos = window.innerHeight - divHeight;
  }

  return pos + 'px';
}

function displayLabel(posx: number, posy: number, sectionLabel: string) {
  sectionUnCLicked.value = false;
  for (let section of allSections.value) {
    if (section.labelSection === sectionLabel) {
      currentSection.value = section;
    }
  }
  currentLabel.value = {
    title: currentSection.value?.labelSection ?? '',
    realised: currentSection.value?.id ? sectionBonusAcorded(currentSection.value?.id ?? NaN) : false,
    activities: [],
  };
  let heightOffset = 0;
  for (let section of sectionActivities.value) {
    if (section['idSection'] === currentSection.value?.id ?? -1) {
      for (let activity of section['activities']) {
        currentLabel.value.activities.push(
          {
            idActivity: activity['idActivity'],
            labelActivity: activity['labelActivity'],
            realised: activityIsRealised(activity['idActivity']),
          });
        heightOffset += 20;
        if (heightOffset > 20) {
          heightOffset += 10;
        }
      }
    }
  }
  heightOffset += 2 * 10 + 20.7 + 16 * 2;
  if (currentLabel.value.activities.length === 0) {
    heightOffset = 2 * 10 + 41.4;
  }
  divLeft.value = calculatePositionX(posx, 24, zoomfactor);
  divTop.value = calculatePositionY(posy, 24, zoomfactor, heightOffset);
  divDisplay.value = 'block';

}
</script>

<style scoped lang="scss">
@import "@/assets/css/consts";
template {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background-color: var(--white);

  @media screen and (prefers-color-scheme: dark) {
    background-color:var(--black);
  }
}

.container {
  width: 100%;
  height: calc(100vh - var(--height-screen-diff) - 70px);
  position: relative;
  overflow: hidden;
  background-color: var(--white);

  @media screen and (prefers-color-scheme: dark) {
    background-color:var(--black);
  }
}


.labelActivity {
  width: 250px;
  padding: 10px;
  display: none;
  position: absolute;
  z-index: 100;
  background-color: var(--white);
  //border: 2px solid #595959;
  border-radius: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;

  @media screen and (prefers-color-scheme: dark) {
    background-color:var(--black);
    box-shadow: none;
    border: $dark-border;
  }

  h2 {
    font-size: 23px;
    margin: 0 0 10px;
  }

  ul {
    padding-left: 0;
  }

  li {
    list-style-type: none;
    display: flex;
    padding-top: 10px;

    img {
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
  }

  li:first-child {
    padding-top: 0;
  }

  .label-header {
    display: flex;
    justify-content: space-between;
    align-items: start;
    margin-bottom: 10px;

    span {
      max-width: 200px;
    }

    img {
      height: 20px;
    }

    img:hover {
      cursor: pointer;
    }
  }
}

.loading-map {
  height: calc(60vh - var(--height-screen-diff));
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
