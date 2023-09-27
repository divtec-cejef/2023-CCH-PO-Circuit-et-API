<template>
    <template v-if="socketConnected">
        <div v-if="car.listRace!.length > 0" class="content">
            <h1>Course</h1>
            <h2>Meilleure manche</h2>
            <p>Pas mal cette course... Tu y retrouves toutes ses informations !</p>

            <div class="best-race">
                <div class="race-content">
                    <div class="content-1">
                        <div class="rank">
                            <span>Rang</span>
                            <div>
                                <span>#</span>
                                <span>{{ car.rank }}</span>
                            </div>
                        </div>
                        <div class="best-time">
                            <div>Manche n°{{ car.getNumRace(car.listRace![BEST_TIME_INDEX]) }}</div>
                            <p class="hour">{{ formatHourDay(car.listRace![BEST_TIME_INDEX].startTime) }}</p>
                            <div class="race-time">
                                <span>{{ formatTime(car.listRace![BEST_TIME_INDEX].totalTime) }}</span>
                                <span>s</span>
                            </div>
                        </div>
                    </div>
                    <div class="content-2">
                        <div class="vitesse">
                            <div>Vitesse instantanée</div>
                            <div class="speed-max">
                                <p>{{ formatSpeed(car.listRace![BEST_TIME_INDEX].speed) }}</p>
                                <p>cm/s</p>
                            </div>
                        </div>

                        <div class="time-inter">
                            <div>Temps intermédiaires</div>
                            <ul>
                                <li>
                                    <NumberTime class="num-race" number="1" color="var(--red)"/>
                                    <p>{{
                                        formatTime(car.listRace![BEST_TIME_INDEX].sector1)
                                        }}</p>
                                    <span>s</span>
                                </li>
                                <li>
                                    <NumberTime class="num-race" number="2" color="var(--blue)"/>
                                    <p>{{
                                        formatTime(car.listRace![BEST_TIME_INDEX].sector2)
                                        }}</p>
                                    <span>s</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="video-race">
                    <VideoRace :url="urlBestRace"></VideoRace>
                </div>
            </div>

            <div class="content-list-classement">
                <div class="table-large-content" v-if="car.listRace!.length > 1">
                    <h2>Liste de courses</h2>
                    <TableListTime/>
                </div>

                <div class="content-classement">
                    <h2>Classement</h2>
                    <div class="button-classement">
                        <button class="classement-user" @click="scrollToUser"
                                :style="{ backgroundImage: `url(${placeHolderImg})`}"></button>
                        <button class="classement-top" @click="scrollToTop"
                                :style="{ backgroundImage: `url(${topImg})`}"></button>
                    </div>
                    <div ref="classement" class="classement-content">
                        <ClassementRace :show-content="false" />
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="hasCarRaces" class="content">
            <p>Tu n'as encore fait aucune course ! Rendez-vous en bas du bâtiment pour y participer !</p>
        </div>
    </template>
    <div class="loading-race" v-else-if="socketConnected === undefined">
        <SpinLoading></SpinLoading>
    </div>
    <ErrorConnection v-else></ErrorConnection>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useCarStore } from '@/stores/car';
import type { WebsocketConnection } from '@/models/api';
import placeHolderImg from '../assets/img/placeholder.webp';
import topImg from '../assets/img/top-10.webp';
import { useRouter } from 'vue-router';
import { formatHourDay, formatSpeed, formatTime } from '@/models/race';
import { useElementSize, useScroll } from '@vueuse/core';

import NumberTime from '@/components/NumberTime.vue';
import VideoRace from '@/components/VideoRace.vue';
import SpinLoading from '@/components/SpinLoading.vue';
import ErrorConnection from '@/components/ErrorConnection.vue';
import TableListTime from '@/components/TableListTime.vue';
import ClassementRace from '@/components/ClassementRace.vue';

//Initialisation des constantes
const BEST_TIME_INDEX = 0;
const classement = ref<HTMLElement | null>(null);
const userCar = useCarStore();
const { car } = userCar;
const socket = ref<WebsocketConnection | null>();
const socketConnected = ref();
const hasCarRaces = ref(false);
const displayContent = ref(false);
const router = useRouter();
const urlBestRace = ref('');
const classementScroll = useScroll(classement);
const { height: classementHeight } = useElementSize(classement);

/**
 * Change le scroll du classement pour le mettre à la hauteur de l'utilisateur
 */
function scrollToUser() {
  const middle = classementHeight.value / 2;
  const rank = car.rank || 0;
  const elementOffset = (rank - 1) * (63 + 10);
  const targetMiddlePosition = elementOffset + (63 / 2 + 10);
  classementScroll.y.value = Math.max(0, targetMiddlePosition - middle);
}

/**
 * Change le scroll du classement pour le mettre en haut du classement
 */
function scrollToTop() {
  classementScroll.y.value = 0;
}

//Scroll sur l'utilisateur
onMounted(() => {
  scrollToUser();
});

//Si aucune voiture n'est initialisée alors redirection
if (!userCar.car.idCar) {
  router.push({ path: '/' });
} else {
  //Initialisation des courses de l'utilisateur
  userCar.initUserAllRaceCar().then((value) => {
    socket.value = value;

    //Si une erreur est rencontrée alors, on affiche une erreur à l'écran
    value.onConnectedError(() => {
      socketConnected.value = false;
    });

    //Au remplissage des courses, on affiche le contenu
    value.onUserRace(() => {
      socketConnected.value = true;
      hasCarRaces.value = true;

      //Ajout du bouton de téléchargement de la vidéo
      urlBestRace.value = (car.listRace![BEST_TIME_INDEX].videoUrl || '').toString();
    });
  });

  displayContent.value = true;
}

onUnmounted(() => socket.value?.destroy());

</script>

<style scoped lang="scss">
@import "src/assets/css/consts";

div.best-race {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0 auto;

  div.race-content {
    flex: 1;
    height: fit-content;
    margin-right: 25px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    div.content-1 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-width: 280px;
      max-width: 297px;
      margin: 0;
      width: 100%;

      div.rank {
        display: flex;
        flex-direction: column;
        align-items: center;
        box-shadow: rgba(50, 50, 93, 0.25) 0 13px 27px -5px, rgba(0, 0, 0, 0.3) 0 8px 16px -8px;
        border-radius: 200px;
        padding: 14px;
        margin-top: 5px;
        margin-left: 10px;
        background-color: var(--dark-green);
        color: var(--white);
        width: 90px;
        height: 90px;

        > span {
          font-size: 12px;
          margin-bottom: -6px;
        }

        div {
          display: flex;
          align-items: center;

          span:nth-child(1) {
            font-size: 26px;
          }

          span:nth-child(2) {
            font-size: 52px;
            margin-top: 2px;
            margin-bottom: 10px;
          }
        }
      }

      div.best-time {
        width: 140px;
        display: flex;
        text-align: center;
        flex-direction: column;

        div:nth-child(1) {
          font-weight: 550;
        }

        p.hour {
          font-size: 15px;
          font-style: italic;
        }

        div.race-time {
          font-family: 'Digital-7 Mono', sans-serif;
          font-size: 45px;

          span:nth-child(2) {
            font-family: 'Poppins', sans-serif;
            font-size: 24px;
            margin-left: 7px;
          }
        }

        img {
          width: 35px;
        }
      }
    }

    div.content-2 {
      display: flex;
      justify-content: space-between;
      min-width: 280px;
      max-width: 305px;
      margin: 35px 0 0 0;
      width: 100%;

      div.vitesse {
        width: fit-content;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;

        > div:nth-child(1) {
          width: 120px;
          font-weight: 550;
          margin-bottom: 10px;
        }
      }

      div.time-inter {
        width: 140px;
        display: flex;
        flex-direction: column;
        text-align: center;
        justify-content: center;
        align-items: center;

        > div {
          font-weight: 550;
        }

        p:nth-child(1) {
          font-size: 40px;
        }

        ul li:nth-child(1) {
          margin-top: 8px;
        }

        ul li p {
          font-size: 22px;
        }

        .num-race {
          margin-right: 10px;
        }

        span {
          font-family: 'Poppins', sans-serif;
          font-size: 20px;
          margin-left: 5px;
        }
      }

      div.speed-max {
        display: flex;
        width: fit-content;
        align-items: end;

        p:nth-child(1) {
          font-size: 45px;
        }

        p:nth-child(2) {
          font-size: 15px;
        }
      }

      ul {
        margin: 0;
        padding: 0;
        width: fit-content;
        list-style: none;

        li {
          display: flex;
          align-items: center;
          font-family: 'Digital-7 Mono', sans-serif;
          width: fit-content;
          font-size: 26px;
          margin-top: 10px;
        }
      }
    }
  }

  div.video-race {
    flex: 1;
    margin-left: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  a {
    margin-top: 25px;
    text-align: right;
    font-style: italic;
  }

  div.informations {
    margin: 25px auto;
    display: flex;
    align-items: center;
    min-width: 280px;
    max-width: 297px;
    padding: 0 5px;
    width: 80%;

    div {
      display: flex;
      align-items: center;
    }

    img.hour {
      margin-right: 8px;
      width: 25px;
    }

    p.hour {
      flex: 1;
      margin-right: 10px;
    }
  }
}

.drop-down-course {
  margin: 20px 0 30px 0;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

div.classement-content {
  overflow-y: auto;
  max-height: 400px;
  margin-top: 10px;
  padding: 0 10px;
}


div.button-classement {
  display: flex;
  justify-content: end;
  margin-top: -50px;


  button.classement-top {
    background-color: transparent;
    border: none;
    border-radius: 100px;
    background-position: center;
    background-size: 30px;
    background-repeat: no-repeat;
    width: 40px;
    height: 40px;
    margin-right: 15px;
    margin-left: 5px;
  }

  button.classement-user {
    background-color: transparent;
    border: none;
    border-radius: 100px;
    background-position: center;
    background-size: 30px;
    background-repeat: no-repeat;
    width: 40px;
    height: 40px;

  }

  button {
    cursor: pointer;
    transition: 0.2s filter ease-in-out;

  }


  button:hover {
    filter: grayscale(0.3);
    transition: 0.2s filter ease-in-out;
  }
}

div.large-content {
  display: none;
}


.table-large-content {

  p {
    margin-bottom: 20px;
  }
}

.loading-race {
  height: calc(100vh - var(--height-screen-diff));
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
}
</style>
