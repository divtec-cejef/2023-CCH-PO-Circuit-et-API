<template>
    <div :class="'classement-element '+ classUserCarElement"
         :style="{ backgroundColor: backgroundColor || undefined, color : colorFont || undefined}"
         @click="clickClassementElement">
        <div v-if="props.rank > PODIUM" class="rank">#{{ props.rank }}</div>
        <div v-else class="rank-image" :style="{ backgroundImage: `url(${backgroundImage?.default})`}">
        </div>
        <AutoRegeneratedAvatar :avatar-config="props.avatar"/>
        <div class="pseudo">{{ props.pseudo }}</div>
        <div class="time">{{ formatTime(props.time) }}</div>
    </div>
    <div v-if="dropDownClicked" class="user-content">
        <template v-if="!hasError">
            <div>
                <h3>Meilleure course</h3>
                <ul>
                    <li>
                        <img :src="chronometer" alt="Icon de temps">
                        <span class="time">{{ formatTime(raceData.races[BEST_TIME_INDEX].totalTime) }}</span>
                    </li>
                    <li>
                        <img :src="speed" alt="Icon de vitesse">
                        <span>{{ raceData.races[BEST_TIME_INDEX].speed }} km/h</span>
                    </li>
                    <li class="sector">
                        Temps intermédiaires
                        <ul>
                            <li>
                                <NumberTime class="num-race" number="1" color="var(--red)"/>
                                <p class="time">{{
                                    formatTime(raceData.races[BEST_TIME_INDEX].sector1)
                                    }}</p>
                            </li>
                            <li>
                                <NumberTime class="num-race" number="2" color="var(--blue)"/>
                                <p class="time">{{
                                    formatTime(raceData.races[BEST_TIME_INDEX].sector2)
                                    }}</p>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>

            <div>
                <VideoRace :url="raceData.races[BEST_TIME_INDEX].videoUrl"></VideoRace>
            </div>

            <div class="bonus">
                <h3>Bonus</h3>
                <ul v-if="listSection.length > 0">
                    <template v-for="(section, key) in listSection" :key="key">
                        <li>
                            <DropDownBonus :section-name="section.name" :liste-activity="section.listActivity"/>
                        </li>
                    </template>
                </ul>
                <div v-else>
                    Le pilote n'a pas réalisé d'activitées !
                </div>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { formatTime } from '@/models/race';
import { useCarStore } from '@/stores/car';
import { computed, ref, triggerRef } from 'vue';
import type { Ref } from 'vue';
import AutoRegeneratedAvatar from '@/components/AutoRegeneratedAvatar.vue';
import type { Configs } from 'holiday-avatar';
import { usePreferredColorScheme } from '@vueuse/core';
import Color from 'color';
import api from '@/models/api';
import type { models } from '@/models/api';
import NumberTime from '@/components/NumberTime.vue';
import clock from '../assets/img/clock.webp';
import speed from '../assets/img/speed.png';
import chronometer from '../assets/img/chronometer.png';
import VideoRace from '@/components/VideoRace.vue';
import DropDownBonus from '@/components/DropDownBonus.vue';

const props = defineProps<{
  idCar: number | string;
  rank: number;
  pseudo: string;
  time: Date;
  avatar: Configs;
}>();

const BEST_TIME_INDEX = 0;
const userCar = useCarStore();
const dropDownClicked = ref(false);
const classUserCarElement = ref('');
const PODIUM = 4;
const backgroundImage = ref();
const raceData: Ref<models.parsedData.RacesData> | Ref<undefined> = ref();

const backgroundColor = ref(userCar.car.pseudo == props.pseudo ?
  userCar.car.avatar?.bgColor?.toString() :
  null);

const listActivityOneCar: Ref<models.parsedData.Activities> | Ref<undefined> = ref();
const hasError = ref(false);
const listSection: Ref<{
  name: string,
  idSection: number,
  listActivity: string[]
}[]> = ref([]);

const colorFont = computed<string | null>(() => {
  if (userCar.car.pseudo == props.pseudo) {
    if (Color(userCar.car.avatar?.bgColor ?? '#000').hsl().lightness() > 50) {
      return colorScheme.value === 'dark' ? '#000' : null;
    } else {
      return colorScheme.value === 'dark' ? null : '#fff';
    }
  } else {
    return null;
  }
});

const colorScheme = usePreferredColorScheme();

// Ajoute une classe si l'élément de l'utilisateur
classUserCarElement.value = userCar.car.pseudo == props.pseudo ? 'user-element' : '';

//Importation de l'image de rank
async function importImage() {
  return await import(`../assets/img/rank${props.rank}.webp`);
}

/**
 * Fonction lancée au clic de l'élément de classement
 */
function clickClassementElement() {
  //Si l'élément est ouvert et cliqué pour être refermé alors on ne lance pas les requêtes
  if (dropDownClicked.value) {
    dropDownClicked.value = false;
    return;
  }

  //Récupération de toutes les courses de l'utilisateur
  let raceFinish = false;
  let bonusFinish = false;
  api.getAllRaceOneCar(props.idCar).then(v => {
    const { json: allRaceOneCar, status: statusRace } = v;

    if ('message' in allRaceOneCar) {
      hasError.value = true;
      return;
    }
    raceData.value = allRaceOneCar;
    raceFinish = true;

    //Si les deux requêts sont passées alors on affiche le composant
    if (bonusFinish && raceFinish) {
      dropDownClicked.value = true;
    }
  }
  );

  //Récupère les activités d'une voiture
  api.getActivityOneCar(props.idCar).then(v => {
    const { json: dataSections, status: statusActivities } = v;

    if ('message' in dataSections) {
      hasError.value = true;
      return;
    }
    listActivityOneCar.value = dataSections;
    bonusFinish = true;

    //Tri les activités
    fillActivityOneCar();

    //Si les deux requêtes sont passées alors on affiche le composant
    if (bonusFinish && raceFinish) {
      dropDownClicked.value = true;
    }
  });
}

//Si l'utilisateur est sur le podium alors import image
if (props.rank <= PODIUM) {
  importImage().then((v) => {
    backgroundImage.value = v;
  });
}

/**
 * Tri la liste des activités d'un utilisateur
 */
function fillActivityOneCar() {
  //Vide la liste
  listSection.value = [];

  for (let activity of listActivityOneCar.value!) {
    //Si aucun n'index n'est présent on ajoute la section
    let indexOfActivity = listSection.value.findIndex(section => section.idSection === activity.idSection);
    if (indexOfActivity < 0) {
      listSection.value.push({
        name: activity.labelSection,
        idSection: activity.idSection,
        listActivity: [activity.labelActivity]
      });
    } else {
      listSection.value[indexOfActivity].listActivity.push(activity.labelActivity);
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/css/consts";

div.classement-element {
  font-size: 14px;
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: start;
  box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
  padding: 9px;
  border-radius: 4px;

  div.rank-image {
    width: 30px;
    height: 30px;
    background-size: 30px 30px;
    background-position: center;
    margin-right: 10px;
    margin-left: 5px;
  }

  div.rank {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    width: 30px;
    height: 30px;
    margin-left: 5px;
    margin-right: 10px;
  }

  img {
    width: 30px;
    margin-left: 12px;
  }

  div.pseudo {
    flex: 10;
    margin-left: 15px;
  }

  div.time {
    justify-self: end;
    font-family: 'Digital-7 Mono', sans-serif;
    font-size: 22px;
  }
}

div.avatar {
  width: 45px;
  height: 45px;
}

.user-content {
  border-radius: 4px;
  box-shadow: $default-shadow;
  padding: 20px;


  div.bonus {
    > ul {
      > li {
        list-style: none;
        width: 100%;
      }
    }

    > div {
      width: 90%;
    }
  }

  h3 {
    margin: 0
  }

  ul {
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;

    li:nth-child(1) {
      span {
        font-size: 35px;
      }
    }

    li:nth-child(2) {
      span {
        font-size: 35px;
      }
    ;
    }

    .sector {
      display: flex;
      flex-direction: column;
      justify-content: start;
      align-items: start;

      ul {
        margin-left: 20px;
        flex-direction: column;

        li {
          &:nth-child(1) {
            margin-top: 10px;
          }

          > :nth-child(1) {
            margin-right: 10px;
          }
        }
      }
    }

    li {
      list-style: none;
      display: flex;
      align-items: center;

      .time {
        font-family: 'Digital-7 Mono', sans-serif;
        font-size: 22px;
      }

      img {
        width: 20px;
        margin-right: 10px;
      }
    }
  }
}

.user-content {
  display: flex;

  > div {
    flex: 1;

    &:nth-child(2) {
      margin: 0 20px;
    }
  }
}
</style>
