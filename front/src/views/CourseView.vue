<template>
    <template v-if="socketConnected">
        <div v-if="car.listRace!.length > 0" class="content">
            <h1>Course</h1>
            <h2>Meilleure manche</h2>
            <p>Pas mal cette course... Tu y retrouves toutes ses informations !</p>

            <div class="best-race">
                <div class="content-1">
                    <div class="rank">
                        <span>Rang</span>
                        <div>
                            <span>#</span>
                            <span>{{ car.rank }}</span>
                        </div>
                    </div>
                    <div class="best-time">
                        <div>Temps de manche</div>
                        <div class="race-time">
                            {{ car.listRace![BEST_TIME_INDEX].formatTime(car.listRace![BEST_TIME_INDEX].totalTime) }}
                        </div>
                    </div>
                </div>

                <div class="content-2">
                    <div class="speed-max">
                        <p>{{ car.listRace![BEST_TIME_INDEX].speed}}</p>
                        <p>km/h</p>
                    </div>

                    <div class="time-inter">
                        <div>Temps <br>
                            intermédiaires
                        </div>
                        <ul>
                            <li>
                                <NumberTime class="num-race" number="1" color="var(--red)"/>
                                <p>{{
                                    car.listRace![BEST_TIME_INDEX].formatTime(car.listRace![BEST_TIME_INDEX].sector1)
                                    }}</p>
                            </li>
                            <li>
                                <NumberTime class="num-race" number="2" color="var(--blue)"/>
                                <p>{{
                                    car.listRace![BEST_TIME_INDEX].formatTime(car.listRace![BEST_TIME_INDEX].sector2)
                                    }}</p>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="informations">
                    <p>N° Manche : {{ car.getNumRace(car.listRace![BEST_TIME_INDEX]) }}</p>
                    <div>
                        <img class="hour" :src=hourImg alt="Icon d'horloge">
                        <p class="hour">{{ car.listRace![BEST_TIME_INDEX].formatHour() }}</p>
                    </div>
                </div>

                <VideoRace :url="urlBestRace"></VideoRace>
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
                        <ClassementRace/>
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
import NumberTime from '@/components/NumberTime.vue';
import { onMounted, onUnmounted, ref } from 'vue';
import { useCarStore } from '@/stores/car';
import type { WebsocketConnection } from '@/models/api';
import TableListTime from '@/components/TableListTime.vue';
import ClassementRace from '@/components/ClassementRace.vue';
import hourImg from '@/assets/img/clock.webp';
import placeHolderImg from '../assets/img/placeholder.webp';
import topImg from '../assets/img/top-10.webp';
import SpinLoading from '@/components/SpinLoading.vue';
import ErrorConnection from '@/components/ErrorConnection.vue';
import { useRouter } from 'vue-router';
import VideoRace from '@/components/VideoRace.vue';


/**
 * Change le scroll du classement pour le mettre à la hauteur de l'utilisateur
 */
function scrollToUser() {
  //Change le scroll en fonction du rang de l'utilisateur et de son rang
  if (!classement.value) {
    return;
  }
  //Changement du scroll en fonction de son rang
  classement.value.scrollTop = car.rank! <= 3 ? 0 : (car.rank! - 2) * 50 - 20;
}

/**
 * Change le scroll du classement pour le mettre en haut du classement
 */
function scrollToTop() {
  if (classement.value) {
    classement.value.scrollTop = 0;
  }
}



//Initialisation des constantes
const BEST_TIME_INDEX = 0;
const classement = ref<Element | null>(null);
const userCar = useCarStore();
const { car } = userCar;
const socket = ref<WebsocketConnection | null>();
const socketConnected = ref();
const hasCarRaces = ref(false);
const displayContent = ref(false);
const router = useRouter();
const urlBestRace = ref('');

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
      urlBestRace.value = car.listRace![BEST_TIME_INDEX].videoUrl.toString();
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
  flex-direction: column;
  justify-content: start;
  width: 100%;
  margin: 20px auto 0 auto;

  div.content-1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-width: 280px;
    max-width: 297px;
    width: 80%;
    margin: auto;

    div.rank {
      display: flex;
      flex-direction: column;
      align-items: center;
      box-shadow: rgba(50, 50, 93, 0.25) 0 13px 27px -5px, rgba(0, 0, 0, 0.3) 0 8px 16px -8px;
      border-radius: 200px;
      padding: 14px;
      margin-top: 5px;
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
      width: 165px;
      display: flex;
      flex-direction: column;

      div.race-time {
        font-family: 'Digital-7 Mono', sans-serif;
        font-size: 45px;
        text-align: end;
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
    max-width: 297px;
    width: 80%;
    margin: auto;


    div.time-inter {
      width: 165px;
      display: flex;
      flex-direction: column;

      p:nth-child(1) {
        font-size: 40px;
      }

      ul li p {
        font-size: 22px;
      }

      .num-race {
        margin-right: 10px;
      }
    }

    div.speed-max {
      display: flex;
      width: fit-content;
      align-items: end;
      margin-bottom: 15px;
      margin-left: 10px;

      p:nth-child(1) {
        font-size: 45px;
      }
    }

    ul {
      margin: 0 10px 0 0;
      padding: 0;
      width: fit-content;
      align-self: end;
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



  a {
    margin-top: 25px;
    text-align: right;
    font-style: italic;
  }

  div.informations {
    margin: 25px auto;
    display: flex;
    justify-content: space-between;
    font-style: italic;
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
