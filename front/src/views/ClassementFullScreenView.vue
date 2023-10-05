<template>
    <div class="fullscreen" ref="el">
        <button v-if="buttonVisible" @click="openFullscreen">FULLSCREEN</button>
        <div class="classement">
            <ClassementRace :show-content="false" @indexNewRace="resultAction"
                            :index-new-element="newElement"/>
        </div>
    </div>
    <div v-if="newElement && raceToDisplay" :class="`fullscreen info-user ${classDisplayInfoRace}`">
        <div class="content-div">
            <div class="rank-content">
                <RankInfo :rank="newElement ? newElement.index + 1 : 600"></RankInfo>
            </div>
            <div class="result-race">
                <div class="time">{{ formatTime(raceToDisplay!.totalTime) }}<span>s</span></div>
                <RaceInfo :display-rank="false" :num-race="1" :race="raceToDisplay!" :rank="2"></RaceInfo>
            </div>
            <div class="avatar-and-pseudo">
                <AutoRegeneratedAvatar :avatar-config="newElement!.car.avatar"></AutoRegeneratedAvatar>
                <span>{{ newElement!.car.pseudo }}</span>
            </div>
        </div>
    </div>

    <div v-if="newElement" :class="`fullscreen worst-race ${classDisplayWorstRace}`">
        <div class="result">
            <h2>Résultat</h2>
            <p>
                Ta course est moins bonne que la précédente...
                <br>
                <br>
                Scanne le QR code pour récupérer ton temps et ta vidéo !
            </p>
            <Road :width="width"></Road>
        </div>
    </div>
</template>

<script setup lang="ts">

import { useScroll } from '@vueuse/core';
import { computed, onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import type { models } from '@/models/api';
import api from '@/models/api';
import AutoRegeneratedAvatar from '@/components/AutoRegeneratedAvatar.vue';
import { formatTime } from '@/models/race';
import RankInfo from '@/components/RankInfo.vue';
import RaceInfo from '@/components/RaceInfo.vue';
import ClassementRace from '@/components/ClassementRace.vue';
import Road from '@/components/Road.vue';
import { useWindowSize } from '@vueuse/core';

const el = ref<HTMLElement | null>(null);
const newElement = ref<models.parsedData.RankingRaceDataOneCar | undefined>();
const { y: posY } = useScroll(el, { behavior: 'smooth' });
const isShowedUserContent = ref(false);
const showContentWorstRace = ref(false);
const raceToDisplay = ref<models.parsedData.RaceData>();
const buttonVisible = ref(true);
const documentElement: Ref<HTMLElement | null> = ref(null);
const TIME_TO_WAIT_SHOW = 8;
const { width } = useWindowSize();

onMounted(() => {
  documentElement.value = document.documentElement;
});

const classDisplayInfoRace = computed(() => {
  return isShowedUserContent.value ? 'display' : 'none';
});

const classDisplayWorstRace = computed(() => {
  return showContentWorstRace.value ? 'display' : 'none';
});

/**
 * Met la page en full screen sans la barre de navigation
 */
function openFullscreen() {
  if (documentElement.value === null) {
    return;
  }
  if (documentElement.value.requestFullscreen) {
    documentElement.value.requestFullscreen({ navigationUI: 'hide' });
  }

  //Disparition du bouton
  buttonVisible.value = false;
}

/**
 * Fonction à lancer à l'ajout d'une nouvelle course
 * @param element Element ajoutée
 */
function resultAction(element: models.parsedData.RankingRaceDataOneCar | undefined) {
  newElement.value = element;

  //scroll jusqu'à l'élément
  if (newElement.value == undefined) {
    console.error('Car undefined');
    return;

  }

  //Si l'utilisateur réalise une course moins bonne que la précédente alors on affiche le contenu en fonction
  if (newElement.value.index === -2) {
    showContentWorstRace.value = true;
    wait(TIME_TO_WAIT_SHOW).then(() => {
      showContentWorstRace.value = false;
    });
    return;
  }

  //Si la voiture est indéfinie alors on sort
  if (!newElement.value.car) {
    console.error('Car undefined');
    return;
  }

  //Affichage des résultats et scroll à l'utilisateur
  showUserContent().then(() => {
    wait(2).then(() => {
      scrollToNewRace();
    });
  });
}

/**
 * Montre les données de la course
 */
async function showUserContent() {
  //Récupère les courses de l'utilisateur
  const { json: allRaceOneCar } = await api.getAllRaceOneCar(newElement.value?.car?.id_car!);

  if ('message' in allRaceOneCar) {
    console.error('Erreur. Récupération des courses impossibles.');
    return;
  }

  //Récupération de la course
  raceToDisplay.value = allRaceOneCar.races[0];

  //Affiche et attends 6 secondes
  isShowedUserContent.value = true;
  await wait(TIME_TO_WAIT_SHOW);
  isShowedUserContent.value = false;

  raceToDisplay.value = undefined;
}


/**
 * Attends un nombre de seconde en async
 * @param seconds Nombre de secondes à attendre
 */
function wait(seconds: number) {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000);
  });
}

/**
 * Scroll sur la page pour afficher la dernière course
 */
function scrollToNewRace() {

  //Récupération de l'index
  posY.value = (newElement.value?.index! - 1) * 73 + 50 - (window.innerHeight / 2 - 60);

  //On attends 6 seconde    s et on revient au début
  setTimeout(() => {
    posY.value = 0;
    newElement.value!.index = -1;
  }, 6000);
}
</script>

<style scoped lang="scss">

div.fullscreen {
  display: flex;
  align-items: center;
  flex-direction: column;

  button {
    margin-top: 30px;
  }

  .result {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    width: 80%;

    h2 {
      width: fit-content;

    }

    p {
      margin-bottom: 100px;
    }
  }
}

div.fullscreen.worst-race {
  opacity: 0;
  transition: opacity 0.8s ease-out;
  z-index: 0;

  &.display {
    opacity: 1;
    transition: opacity 0.8s ease-in;
    z-index: 10002;
  }
}

div.fullscreen.info-user {
  background-color: var(--white);
  z-index: 0;
  opacity: 0;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  transition: opacity 1s ease-out;

  &.display {
    opacity: 1;
    transition: opacity 1s ease-in;
    z-index: 10002;
  }

  div.content-div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    flex-wrap: wrap;
    max-width: 700px;

    div.avatar-and-pseudo {
      width: fit-content;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-top: 5px;

      span {
        font-size: 20px;
        font-weight: bold;
      }

      div.avatar {
        width: 150px;
        height: 150px;
        margin-bottom: 10px;
      }
    }

    div.result-race {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: fit-content;


      > .time {
        width: fit-content;
        font-size: 70px;
        font-family: 'Digital-7 Mono', sans-serif;
        display: flex;
        align-items: center;
        margin: 10px 0;

        span {
          font-family: 'Poppins', sans-serif;
          font-size: 35px;
          margin-left: 10px;
          margin-top: 20px;
        }
      }
    }

    :deep(div.race-content) {

      .content-2 {
        justify-content: center;
        align-items: center;
        flex-direction: column-reverse !important;
        max-width: unset;
        margin-top: 5px !important;


        .vitesse {
          width: fit-content;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-top: 8px !important;
          margin-bottom: 10px;

          div:nth-child(1) {
            text-align: left;
            width: fit-content;
            font-size: 20px;
          }
        }

        .time-inter {
          width: 250px;
          margin-bottom: 15px;

          > div {
            width: 100%;
            text-align: center;
            margin-bottom: 5px;
            font-size: 20px;
          }

          ul {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: start;
            margin-right: 0;
            width: 100%;

            li {
              span {
                font-size: 28px;
              }

              p {
                font-size: 32px;
              }

              div.number {
                width: 30px;
                height: 30px;

                p {
                  font-size: 26px !important;
                }
              }
            }
          }
        }
      }

      .best-time {
        display: none;
      }
    }
  }

  div.rank-content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;

    .rank {
      width: 110px;
      height: 110px;
      margin: 0;

      &:deep(> span) {
        font-size: 18px;
        margin-bottom: -15px;
        margin-top: 5px;
      }

      &:deep(div) {
        padding: 10px;
        display: flex;
        align-items: center;

        span:nth-child(1) {
          font-size: 22px;
        }

        span:nth-child(2) {
          font-size: 42px;
          margin-top: 12px;
          margin-bottom: 10px;
        }
      }
    }
  }
}

div.fullscreen {
  background-color: var(--white);
  z-index: 10000;
  overflow-y: scroll;

  > div.classement {
    margin: 0 auto 0 auto;
    width: 70%;
  }
}

</style>