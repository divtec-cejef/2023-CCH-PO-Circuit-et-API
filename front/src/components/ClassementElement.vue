<template>
    <div class="all-content">
        <div :class="'classement-element '+ classUserCarElement + (dropDownClicked ? ' open' : ' ')"
             :style="{ backgroundColor: backgroundColor || undefined, color : colorFont || undefined}"
             @click="clickClassementElement">
            <div v-if="props.rank > PODIUM" class="rank">#{{ props.rank }}</div>
            <div v-else class="rank-image" :style="{ backgroundImage: `url(${backgroundImage?.default})`}">
            </div>
            <AutoRegeneratedAvatar :avatar-config="props.avatar"/>
            <div class="pseudo">{{ props.pseudo }}</div>
            <div class="time">{{ formatTime(props.time) }}</div>

            <img :src="arrowImg" alt="Icon de flèche pour déplier le contenu"
                 :style="{
            transform: `rotate(${rotateImage}deg)`,
            filter: userCar.car.pseudo == props.pseudo && Color(userCar.car.avatar?.bgColor ?? '#000').hsl().lightness() < 50 ? 'grayscale(1) invert(1)' : ''
        }"></div>
        <div v-if="props.showContent">
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
                                    <span>{{
                                        formatSpeed(raceData!.races[BEST_TIME_INDEX].speed)
                                        }}<span>km/h</span></span>
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
                            <ul>
                                <template v-for="(section, key) in listAllBonus" :key="key">
                                    <li>
                                        <DropDownBonus :section-name="section.name"
                                                       :realised="section.realised"
                                                       :list-activity="section.listActivity"/>
                                    </li>
                                </template>
                            </ul>
                        </div>
                    </template>
                    <div v-else><h3>Erreur !</h3></div>
                </div>
            </Transition>
            <Transition>
                <div v-if="dropDownClicked" class="user-content phone">
                    <template v-if="!hasError">
                        <div>
                            <DropDown name="Meilleure Course" @clickDropDown="clickBestRace"
                                      :drop-down-clicked="bestRaceDropDownClicked">

                                <ul>
                                    <li class="time">
                            <span class="time">{{
                                formatTime(raceData!.races[BEST_TIME_INDEX].totalTime)
                                }}<span>s</span></span>
                                    </li>
                                    <li class="speed">
                                    <span>{{
                                        formatSpeed(raceData!.races[BEST_TIME_INDEX].speed)
                                        }}<span>km/h</span></span>
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
                            <DropDown name="Vidéo" @clickDropDown="clickVideo"
                                      :drop-down-clicked="videoDropDownClicked">
                                <VideoRace :url="raceData!.races[BEST_TIME_INDEX].videoUrl"></VideoRace>
                            </DropDown>
                        </div>

                        <div class="bonus">
                            <DropDown name="Bonus" @clickDropDown="clickBonus"
                                      :drop-down-clicked="bonusDropDownClicked">
                                <ul>
                                    <template v-for="(section, key) in listAllBonus" :key="key">
                                        <li :class="section.realised ? '': 'not-realised'">
                                            <DropDownBonus :section-name="section.name"
                                                           :realised="section.realised"
                                                           :list-activity="section.listActivity"/>
                                        </li>
                                    </template>
                                </ul>
                            </DropDown>
                        </div>
                    </template>
                    <div v-else><h3>Erreur !</h3></div>
                </div>
            </Transition>
        </div>
    </div>


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
import { Section } from '@/models/section';
import arrowImg from '../assets/img/arrow.png';
import arrowImgWhite from '../assets/img/arrow-white.png';

const props = defineProps<{
  idCar: number | string;
  rank: number;
  pseudo: string;
  time: Date;
  avatar: Configs;
  showContent: boolean
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

const bestRaceDropDownClicked = ref(false);
const videoDropDownClicked = ref(false);
const bonusDropDownClicked = ref(false);

const listActivityOneCarApi: Ref<models.parsedData.Activities> | Ref<undefined> = ref();
const hasError = ref(false);

const listAllBonus: Ref<{
  name: string,
  idSection: number,
  realised: boolean,
  listActivity: {
    name: string,
    realised: boolean
  }[]
}[]> = ref([]);
const listAllSection: Ref<models.parsedData.SectionName[]> = ref([]);

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

// Retourne l'angle de l'image en fonction de si l'utilisateur a cliqué
const rotateImage = computed(() => {
  return dropDownClicked.value ? '90' : '0';
});

// Ajoute une classe si l'élément de l'utilisateur
classUserCarElement.value = userCar.car.pseudo == props.pseudo ? 'user-element' : '';

//Importation de l'image de rank
async function importImage() {
  return await import(`../assets/img/rank${props.rank}.webp`);
}

/**
 * Fonction lancé au clic du drop down meilleure course
 * @param e Cliqué ou non
 */
const clickBestRace = (e: boolean) => {
  bestRaceDropDownClicked.value = e;
  if (bestRaceDropDownClicked.value) {
    videoDropDownClicked.value = false;
    bonusDropDownClicked.value = false;
  }
};

/**
 * Fonction lancé au clic du drop down video
 * @param e Cliqué ou non
 */
const clickVideo = (e: boolean) => {
  videoDropDownClicked.value = e;
  if (videoDropDownClicked.value) {
    bestRaceDropDownClicked.value = false;
    bonusDropDownClicked.value = false;
  }
};

/**
 * Fonction lancée au clic du drop down bonus
 * @param e Cliqué ou non
 */
const clickBonus = (e: boolean) => {
  bonusDropDownClicked.value = e;
  if (bonusDropDownClicked.value) {
    bestRaceDropDownClicked.value = false;
    videoDropDownClicked.value = false;
  }
};

/**
 * Fonction lancée au clic de l'élément de classement
 */
function clickClassementElement() {
  //Si l'élément est ouvert et cliqué pour être refermé alors on ne lance pas les requêtes
  if (dropDownClicked.value) {
    dropDownClicked.value = false;
    return;
  }

  //Récupère toutes les données pour l'utilisateur cliqué
  getAllDataUser().then(() => {
    //Tri les activités
    fillDataActivity();
    dropDownClicked.value = true;

  });

}

/**
 * Récupère les données utiles au drop down de l'utilisateur
 */
async function getAllDataUser() {

  //Récupère les courses de l'utilisateur
  const { json: allRaceOneCar } = await api.getAllRaceOneCar(props.idCar);
  if ('message' in allRaceOneCar) {
    hasError.value = true;
    return;
  }
  raceData.value = allRaceOneCar;

  //Récupère les activités d'une voiture
  const { json: dataActivityOneCar } = await api.getActivityOneCar(props.idCar);
  if ('message' in dataActivityOneCar) {
    hasError.value = true;
    return;
  }
  listActivityOneCarApi.value = dataActivityOneCar;

  //Récupère toutes les sections
  const { json: dataSections } = await api.getAllSections();
  if ('message' in dataSections) {
    hasError.value = true;
    return;
  }
  listAllSection.value = dataSections;
}

/**
 * Tri la liste des activités d'un utilisateur
 */
function fillDataActivity() {

  //Vide la liste
  listAllBonus.value = [];
  for (let section of listAllSection.value!) {

    //Test s'il y a des activités dans la section
    if (!Section.SectionNameHasActivity.includes(Section.formatName(section.label))) {
      return;
    }

    //Initialisation de la liste d'activités
    let listActivityUser: {
      name: string,
      realised: boolean
    }[] = [];

    //Récupération de toutes les activités d'une section
    api.getAllActivitiesOneSection(section.idSection).then(v => {
      const { json: dataActivity } = v;

      //S'il y a une erreur alors return
      if ('message' in dataActivity) {
        hasError.value = true;
        return;
      }
      //Récupération des données
      let listActivitySection: models.parsedData.SectionActivities = dataActivity;


      //Boucle sur toutes les activités et remplissage de la liste principal, en ajoutant l'attribut realised si l'utilisateur l'a réalisée
      for (let activitySection of listActivitySection) {
        let indexOfActivity = listActivityOneCarApi.value!.findIndex(activity => activity.idActivity === activitySection.idActivity);

        listActivityUser.push({
          name: activitySection.label,
          realised: (indexOfActivity >= 0),
        });
      }
    });

    let sectionIsRealised = listActivityOneCarApi.value!.findIndex(activity => activity.idSection === section.idSection) >= 0;

    //Ajout des éléments à la liste
    listAllBonus.value.push({
      name: section.label,
      idSection: section.idSection,
      realised: sectionIsRealised,
      listActivity: listActivityUser
    });
  }

}

//Si l'utilisateur est sur le podium alors import image
if (props.rank <= PODIUM) {
  importImage().then((v) => {
    backgroundImage.value = v;
  });
}

</script>

<style scoped lang="scss">
@import "src/assets/css/consts";

div.all-content {
  box-shadow: $default-shadow;
    border-radius: 4px;

}

div.classement-element {
  font-size: 14px;
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 9px;
  border-radius: 4px;
  transition: all ease-in-out 0.3s;

  &.open {
    margin-bottom: 0;
  }

  &:hover {
    opacity: 0.8;
  }

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

  > img {
    width: 23px;
    margin-left: 7px;
    transition: all ease-in-out 0.3s;
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
      padding: 3px 10px;
      border-radius: 7px;
      width: fit-content;
      box-shadow: $default-shadow;
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
      justify-content: center;
      align-items: center;
      margin-top: 10px;
      width: 100%;
      padding: 10px 12px;
      border-radius: 7px;
      text-align: center;
      min-height: fit-content;
      box-shadow: $default-shadow;


      ul {
        min-height: 70px;
        height: fit-content;
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

      &.not-realised {
        opacity: 0.8;
        filter: grayscale(1);
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
