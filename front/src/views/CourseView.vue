<template>
    <template v-if="socketConnected">
        <div v-if="car.listRace!.length > 0" class="content">
            <h1>Course</h1>
            <h2>Meilleure manche</h2>
            <p>Pas mal cette course... Tu y retrouves toutes ses informations !</p>

            <div class="best-race">
                <RaceInfo :race="car.listRace![BEST_TIME_INDEX]"
                          :rank="car.rank!"
                          :num-race="getNumRace(car.listRace![BEST_TIME_INDEX], car.listRace!)"
                          :display-rank="true"
                />

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
                    <ClassmentButton @scrollToTop="scrollToTop" @scrollToUser="scrollToUser" />
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
import { useRouter } from 'vue-router';
import { useElementSize, useScroll } from '@vueuse/core';
import { getNumRace } from '@/models/car';

import VideoRace from '@/components/VideoRace.vue';
import SpinLoading from '@/components/SpinLoading.vue';
import ErrorConnection from '@/components/ErrorConnection.vue';
import TableListTime from '@/components/TableListTime.vue';
import ClassementRace from '@/components/ClassementRace.vue';
import ClassmentButton from '@/components/ClassmentButton.vue';
import RaceInfo from '@/components/RaceInfo.vue';

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
