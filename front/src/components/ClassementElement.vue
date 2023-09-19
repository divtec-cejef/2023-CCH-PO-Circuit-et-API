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
    <Transition>
        <div v-if="dropDownClicked" class="user-content big">
            <template v-if="!hasError">
                <div>
                    <h3>Meilleure course</h3>
                    <ul>
                        <li class="time">
                            <span class="time">{{
                                formatTime(raceData!.races[BEST_TIME_INDEX].totalTime)
                                }}<span>s</span></span>
                        </li>
                        <li class="speed">
                            <span>{{ formatSpeed(raceData!.races[BEST_TIME_INDEX].speed) }}<span>km/h</span></span>
                        </li>
                        <li class="sector">
                            Temps intermédiaires
                            <ul>
                                <li>
                                    <NumberTime class="num-race" number="1" color="var(--red)"/>
                                    <p class="time">{{
                                        formatTime(raceData!.races[BEST_TIME_INDEX].sector1)
                                        }}<span>s</span></p>
                                </li>
                                <li>
                                    <NumberTime class="num-race" number="2" color="var(--blue)"/>
                                    <p class="time">{{
                                        formatTime(raceData!.races[BEST_TIME_INDEX].sector2)
                                        }}<span>s</span></p>
                                </li>
                            </ul>
                        </li>
                        <li class="hour">
                            <img :src="clock" alt="Icon d'horloge">
                            <span>{{
                                formatHour(raceData!.races[BEST_TIME_INDEX].raceStart)
                                }}</span>
                        </li>

                    </ul>
                </div>

                <div>
                    <h3>Vidéo</h3>
                    <VideoRace :url="raceData!.races[BEST_TIME_INDEX].videoUrl"></VideoRace>
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
            <div v-else><h3>Erreur !</h3></div>
        </div>
    </Transition>
    <Transition>
        <div v-if="dropDownClicked" class="user-content phone">
            <template v-if="!hasError">
                <div>
                    <DropDown name="Meilleure Course">

                        <ul>
                            <li class="time">
                            <span class="time">{{
                                formatTime(raceData!.races[BEST_TIME_INDEX].totalTime)
                                }}<span>s</span></span>
                            </li>
                            <li class="speed">
                                <span>{{ formatSpeed(raceData!.races[BEST_TIME_INDEX].speed) }}<span>km/h</span></span>
                            </li>
                            <li class="sector">
                                Temps intermédiaires
                                <ul>
                                    <li>
                                        <NumberTime class="num-race" number="1" color="var(--red)"/>
                                        <p class="time">{{
                                            formatTime(raceData!.races[BEST_TIME_INDEX].sector1)
                                            }}<span>s</span></p>
                                    </li>
                                    <li>
                                        <NumberTime class="num-race" number="2" color="var(--blue)"/>
                                        <p class="time">{{
                                            formatTime(raceData!.races[BEST_TIME_INDEX].sector2)
                                            }}<span>s</span></p>
                                    </li>
                                </ul>
                            </li>
                            <li class="hour">
                                <img :src="clock" alt="Icon d'horloge">
                                <span>{{
                                    formatHour(raceData!.races[BEST_TIME_INDEX].raceStart)
                                    }}</span>
                            </li>

                        </ul>
                    </DropDown>
                </div>

                <div>
                    <DropDown name="Vidéo">
                        <VideoRace :url="raceData!.races[BEST_TIME_INDEX].videoUrl"></VideoRace>
                    </DropDown>
                </div>

                <div class="bonus">
                    <DropDown name="Bonus">
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
                    </DropDown>
                </div>
            </template>
            <div v-else><h3>Erreur !</h3></div>
        </div>
    </Transition>

</template>

<script setup lang="ts">
import { formatHour, formatSpeed, formatTime } from '@/models/race';
import { useCarStore } from '@/stores/car';
import type { Ref } from 'vue';
import { computed, ref } from 'vue';
import AutoRegeneratedAvatar from '@/components/AutoRegeneratedAvatar.vue';
import type { Configs } from 'holiday-avatar';
import { usePreferredColorScheme } from '@vueuse/core';
import Color from 'color';
import type { models } from '@/models/api';
import api from '@/models/api';
import NumberTime from '@/components/NumberTime.vue';
import VideoRace from '@/components/VideoRace.vue';
import DropDownBonus from '@/components/DropDownBonus.vue';
import clock from '@/assets/img/clock.webp';
import DropDown from '@/components/DropDown.vue';

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


  > div:nth-child(1) ul {
    height: calc(100% - 35px);
    max-height: 330px;
  }


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

    h3 {
      margin-bottom: 5px;
    }
  }

  h3 {
    margin: 0 0 15px 0;
  }

  ul {
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;

    li.time, li.speed {
      display: flex;
      justify-content: center;
      box-shadow: $default-shadow;
      padding: 3px 10px;
      border-radius: 7px;
      width: fit-content;
    }

    li.time {
      width: 100%;
      margin-bottom: 10px;

      > span {
        font-size: 40px;

      }

      span span {
        font-size: 18px;
        font-family: 'Poppins', sans-serif;
        margin-left: 5px;
      }
    }

    li.speed {
      width: 100%;

      > span {
        font-size: 35px;
      }

      span span {
        font-size: 15px;
        margin-left: 5px;
      }
    }

    .sector {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 10px;
      width: 100%;
      box-shadow: $default-shadow;
      padding: 8px 12px;
      border-radius: 7px;
      text-align: center;
      min-height: fit-content;


      ul {
        flex-direction: column;

        li {
          margin-top: 5px;

          &:nth-child(1) {
            margin-top: 10px;
          }

          > :nth-child(1) {
            margin-right: 10px;
          }
        }

        li span {
          font-family: 'Poppins', sans-serif;
          margin-left: 5px;
          font-size: 15px;
        }
      }
    }

    li.hour {
      margin-top: 12px;
      width: 100%;
      display: flex;
      justify-content: center;
      box-shadow: $default-shadow;
      padding: 9px 4px;
      font-size: 18px;
      border-radius: 7px;
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
        margin-right: 6px;
      }
    }
  }
}

.user-content.big {
  display: flex;

  > div {

    &:nth-child(1) {
      flex: 3;
    }

    &:nth-child(2) {
      flex: 5;
      margin: 0 20px;
    }

    &:nth-child(3) {
      flex: 4;
    }
  }
}

.user-content.phone {
  display: none;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;


  > div:nth-child(1) ul {
    height: calc(100% - 65px);
    max-height: 330px;
  }

  > div {
    margin-top: 20px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    &:nth-child(1) {
      margin-top: 0;

      ul {
        max-width: 250px;
      }

      .sector {
        height: fit-content;
      }
    }
  ;

    &:nth-child(2) {
      > {
        max-width: 372px;
      }
    }

    &.bonus {
      ul {
        width: 90%;
        max-width: 372px;
        flex-direction: column;
        min-width: 200px;
      }

      > div {
        width: 100%;
      }
    }
  }
}

/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  transform: translateY(-5px);
  opacity: 0.6;
}
</style>
