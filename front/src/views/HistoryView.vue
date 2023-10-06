<template>
    <div class="content bonus-map">
        <div v-if="currentLabel.title !== null" ref="label" :style="{left: divLeft, top: divTop, display: divDisplay}"
             class="labelActivity">
            <div v-if="currentLabel.activities.length > 0">
                <div class="label-header"><span>Activités :</span>
                    <div @click="() => {hideDiv()}"><img :src=close alt="fermer" class="dark-invert"></div>
                </div>
                <ul>
                    <li v-for="activity in currentLabel.activities" :key="activity.idActivity">
                        <img :src=trophy
                             :style="{filter: `${activity.realised ? 'none': 'grayscale(100%)'}`, opacity: `${activity.realised ? '1': '0.4'}`}"
                             alt="Trophé"/>
                        <span>{{ activity[ 'labelActivity' ] }}</span>
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
        <div v-else class="container">
            <div :ref="panzoomable">
                <BonusMap :activated-section="activatedSection" :display-label="displayLabel"
                          :no-activity-sections="noActivitySections"
                          :sections="allSections" :un-clicked="sectionUnCLicked"></BonusMap>
            </div>

            <div v-if="isNotTouchPointer()" class="zoom-buttons">
                <button @mouseup="zoomIn"><img :src="plus" alt="Image de plus pour zoomer"></button>
                <button @mouseup="zoomOut"><img :src="minus" alt="Image de moins pour dézoomer"></button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import BonusMap from '@/components/BonusMap.vue';
import type { PanZoom } from 'panzoom';
import panzoom from 'panzoom';
import { ref } from 'vue';
import api from '@/models/api';
import { useCarStore } from '@/stores/car';
import trophy from '@/assets/img/trophy.webp';
import close from '@/assets/img/close.webp';
import plus from '@/assets/img/plus.webp';
import minus from '@/assets/img/minus.webp';
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
      if ('message' in dataActivity) {
        hasError.value = true;
        return;
      }

      if (status.valueOf() === api.ReturnCodes.Success) {
        for (let activity of dataActivity) {
          realisedActivity.value.push(activity.idActivity);
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
  api.getAllSections().then(v => {
    const { json: dataSections, status: statusActivities } = v;

    if ('message' in dataSections) {
      hasError.value = true;
      return;
    }

    if (statusActivities.valueOf() === api.ReturnCodes.Success) {
      for (let section of dataSections) {
        for (let sections of allSections.value) {
          if (sections.section === section.label) {
            sections.id = section.idSection;
          }
        }

        api.getAllActivitiesOneSection(section.idSection)
          .then((v) => {
            const { json: dataActivities, status: statusActivities } = v;

            if ('message' in dataActivities) {
              hasError.value = true;
              return;
            }

            if (statusActivities.valueOf() === api.ReturnCodes.Success) {
              sectionActivities.value.push(
                {
                  idSection: section.idSection,
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
      for (let activity of section[ 'activities' ]) {
        if (activityIsRealised(activity[ 'idActivity' ])) {
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
      if (!activatedSection.value.includes(section[ 'idSection' ])) {
        activatedSection.value.push(section[ 'idSection' ]);
      }
    }
  }
}

function getNoActivitySections() {
  for (let section of allSections.value) {
    let present = false;
    for (let sectionActivity of sectionActivities.value) {
      if (section.id === sectionActivity[ 'idSection' ]) {
        present = true;
      }
    }
    if (!present) {
      noActivitySections.value.push(section[ 'id' ]);
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

function isNotTouchPointer() {
  return !matchMedia('(pointer: coarse)').matches;
}

let panzoomElement: null | PanZoom = null;
let mapElement: null | HTMLElement = null;

const panzoomable = (v: any) => {
  let element = panzoom(v, {
    bounds: true,
    boundsPadding: 0.2,
    maxZoom: 2.5,
    minZoom: 0.5,
    zoomDoubleClickSpeed: 1,
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

  panzoomElement = element;
  mapElement = v;
};

function zoomIn() {
  if (panzoomElement === null || mapElement === null) {
    return;
  }
  let boundings = mapElement.getBoundingClientRect();
  let transform = panzoomElement.getTransform();
  let cx = transform.x + ( boundings.width - boundings.left ) / 2;
  let cy = transform.y + ( boundings.height - boundings.top ) / 2;
  panzoomElement.smoothZoom(cx, cy, 1.3);
}

function zoomOut() {
  if (panzoomElement === null || mapElement === null) {
    return;
  }
  let boundings = mapElement.getBoundingClientRect();
  let transform = panzoomElement.getTransform();
  let cx = transform.x + ( boundings.width - boundings.left ) / 2;
  let cy = transform.y + ( boundings.height - boundings.top ) / 2;
  panzoomElement.smoothZoom(cx, cy, 0.7);
}

function hideDiv() {
  divDisplay.value = 'none';
  sectionUnCLicked.value = true;
}

const allSections = ref([{
  section: 'Informatique',
  id: -1,
  labelSection: 'Informaticien-ne',
  posX: 26,
  posY: 25,
}, {
  section: 'Automatique',
  id: -1,
  labelSection: 'Automaticien-ne',
  posX: 35,
  posY: 45,
}, {
  section: 'Horlogerie',
  id: -1,
  labelSection: 'Horloger-ère',
  posX: 77.5,
  posY: 48,
}, {
  section: 'Electronique',
  id: -1,
  labelSection: 'Electronicien-ne',
  posX: 73,
  posY: 8,
}, {
  section: 'Micromécanique',
  id: -1,
  labelSection: 'Micromécanicien-ne',
  posX: 38,
  posY: 6,
}, {
  section: 'Laborantin',
  id: -1,
  labelSection: 'Laborantin-e',
  posX: 77,
  posY: 63,
}, {
  section: 'Dessinateur',
  id: -1,
  labelSection: 'Dessinateur-trice',
  posX: 22,
  posY: 1.9,
}, {
  section: 'Mécatronique',
  id: -1,
  labelSection: 'Mécatronicien-ne',
  posX: 20,
  posY: 63,
}, {
  section: 'Industries4.0',
  id: -1,
  labelSection: 'Industrie 4.0',
  posX: 10,
  posY: 10.7,
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
    pos = posy - ( 10 + divHeight );
  } else {
    pos = posy + ( 10 + dif * zoomfactor );
  }
  const minHeightPx = getComputedStyle(document.documentElement)
    .getPropertyValue('--height-screen-diff');
  const minHeight = parseInt(minHeightPx.substring(0, minHeightPx.length - 2)) + 35;
  if (pos < minHeight) {
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
    if (section[ 'idSection' ] === currentSection.value?.id ?? -1) {
      for (let activity of section[ 'activities' ]) {
        currentLabel.value.activities.push(
          {
            idActivity: activity[ 'idActivity' ],
            labelActivity: activity[ 'labelActivity' ],
            realised: activityIsRealised(activity[ 'idActivity' ]),
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

<style lang="scss" scoped>
@import "@/assets/css/consts";

div.content {
  width: 100vw;
  max-width: 1175px;
}

template {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background-color: var(--white);

  @media screen and (prefers-color-scheme: dark) {
    background-color: var(--black);
  }
}

.container {
  width: 100%;
  height: calc(100vh - var(--height-screen-diff) - 70px);
  //position: relative;
  overflow: hidden;
  background-color: var(--white);

  @media screen and (prefers-color-scheme: dark) {
    background-color: var(--black);
  }

  div.zoom-buttons {
    z-index: 10000000;
    position: absolute;
    right: 10px;
    bottom: 10px;
    display: flex;
    flex-direction: column;

    button {
      padding: 10px;
      margin: 0;
      line-height: 0;
      font-size: 0;
      background-color: var(--white);
      box-shadow: rgba(100, 100, 111, 0.3) 0 7px 10px 0;
      border: none;
      width: 50px;
      height: 50px;
      border-radius: 20px;

      img {
        width: 25px;
        cursor: pointer;
        margin: 0;
        padding: 0;
      }
    }


    button:first-child {
      margin-bottom: 10px;
    }
  }
}


.labelActivity {
  width: 250px;
  padding: .75em 1.25em;
  display: none;
  position: absolute;
  z-index: 100;
  background-color: var(--white);
  //border: 2px solid #595959;
  border-radius: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;

  @media screen and (prefers-color-scheme: dark) {
    background-color: var(--black);
    box-shadow: none;
    border: $dark-border;
  }

  h2 {
    font-size: 23px;
    margin: 0 0 10px;
  }

  ul {
    padding-left: 0;
    margin: 10px 0;
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
    margin: 5px 0;
    font-weight: 500;

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
