<template>
    <div class="table">
        <table class="table-list-time">
            <tr>
                <th></th>
                <th>
                    <div>
                        <img :src=chronometer alt="Image de chronomètre">
                        <span>Temps</span>
                    </div>
                </th>
                <th>
                    <div>
                        <img :src=speed alt="Image vitesse max">
                        <span>Vitesse</span>
                    </div>
                </th>
                <th>
                    <div>
                        <img :src=video alt="Image de video">
                        <span>Vidéo</span>
                    </div>
                </th>
            </tr>
            <tr v-for="(race, key) in usercar.car.sortListByOrderHour()" :key="key">
                <td>
                    <div>
                        <NumberTime class="num-race" :number=usercar.car.getNumRace(race).valueOf().toString()
                                    color="var(--blue)"/>
                    </div>
                </td>
                <td>{{ formatTime(race.totalTime) }}<span>s</span></td>
                <td>
                    <p>{{ formatSpeed(race.speed) }}</p>
                    <p>cm/s</p>
                </td>
                <td class="video">
                    <div>
                        <a v-if="race.videoUrl" :href="race.videoUrl.toString()" target="_blank">
                            <img class="link dark-invert" :src=link
                                 alt="Icon de lien pour visionner la vidéo de la course">
                        </a>
                        <span v-else>
                            <img class="link dark-invert" :src=link
                                 alt="Icon de lien pour visionner la vidéo de la course">
                        </span>
                    </div>
                    <div>
                        <a v-if="race.videoUrl" :href="listVideoBlob[key]"
                           :download="`course-divtec-${usercar.car.getNumRace(race).valueOf().toString()}.mp4`">
                            <img :src="download" alt="Icon de téléchargement pour chaque vidéo">
                        </a>
                        <span v-else>
                            <img :src="download" alt="Icon de téléchargement pour chaque vidéo">
                        </span>
                    </div>
                </td>
            </tr>
        </table>
    </div>
</template>

<script setup lang="ts">
import video from '../assets/img/film.webp';
import speed from '../assets/img/speed.png';
import chronometer from '../assets/img/chronometer.png';
import link from '../assets/img/play-button.png';
import download from '../assets/img/downloads-black.png';
import NumberTime from '@/components/NumberTime.vue';
import { useCarStore } from '@/stores/car';
import { onMounted, ref } from 'vue';
import { formatSpeed, formatTime } from '@/models/race';

/**
 * Création de l'objet blob
 * @param object Objet
 */
function createObjectURL(object: Blob | MediaSource) {
  return (window.URL) ? window.URL.createObjectURL(object) : window.webkitURL.createObjectURL(object);
}

/**
 * Construit un objet blob en fonction de son URL
 * @param url
 */
async function createBlobObject(url: string) {
  let response = await fetch(url);
  const blobURL = await response.blob();
  return createObjectURL(blobURL);
}

const usercar = useCarStore();
const listVideoBlob = ref<string[]>([]);

onMounted(async () => {
  //Rempli les liens de toutes les courses pour les télécharger
  for (let race of usercar.car.sortListByOrderHour()) {
    //Si l'url la vidéo est vide alors boucle suivant
    if (race.videoUrl == null) {
      listVideoBlob.value.push('');
      continue;
    }

    //Lancement de la construction du blob
    try {
      let blob = await createBlobObject(race.videoUrl.toString());
      listVideoBlob.value.push(blob);
    } catch (e) {
      race.videoUrl = '';
    }
  }
});

</script>

<style scoped lang="scss">
@import '@/assets/css/consts.scss';

div.table {
  overflow-y: auto;
  max-height: 400px;
  display: flex;
  justify-content: center;
  padding: 0 10px;


  table {
    text-align: center;
    border-collapse: collapse;
    width: 100%;
    max-width: 350px;


    tr {
      th,
      td {
        border: 2px solid #e2e2e7;
        padding: 5px 2px;
      }

      td {
        margin-right: 5px;
        padding: 4px;


        img.flag-start {
          width: 18px;
        }
      }

      th {
        > div {
          display: flex;
          flex-direction: column;
          align-items: center;

          img {
            margin-bottom: 4px;
          }
        }

        p {
          text-align: left;
          margin-left: 7px;
        }

        img {
          width: 20px;
        }

        padding: 5px 0 10px 0;
        border-left: 0;
        border-right: 0;
      }

      td:first-child,
      th:first-child {
        border-left: 0;
      }

      td:last-child,
      th:last-child {
        border-right: 0;
      }

      &:first-child {
        td,
        th {
          border-top: 0;
        }

        th:first-child {
          padding: 0;
        }
      }

      td {

        &:nth-child(1) {
          max-width: 45px;

          > div {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
          }
        }

        &:nth-child(2) {
          font-family: 'Digital-7 Mono', sans-serif;
          font-size: 22px;
          width: 30%;

          span {
            font-family: 'Poppins', sans-serif;
            font-weight: normal;
            font-size: 18px;
            margin-left: 5px;
          }
        }

        &:nth-child(3) {
          font-family: 'Digital-7 Mono', sans-serif;

          p:nth-child(1) {
            font-size: 25px;
          }

          p:nth-child(2) {
            font-family: 'Poppins', sans-serif;
            font-size: 12px;
          }
        }
      }

      &:last-child {
        td,
        th {
          border-bottom: 0;
        }
      }
    }

    td.video {
      padding: 5px 10px !important;

      img {
        width: 28px;
        margin: 5px 0
      }

      div {
        display: inline-block;

        &:nth-child(1) {
          margin-right: 15px;
        }

        span {
          opacity: 0.45;
          cursor: default;

        }
      }
    }
  }

  a {
    img:hover {
      transition: all ease-in-out 0.2s;
      opacity: 0.5;
    }

    img {
      transition: all ease-in-out 0.2s;
    }
  }
}


</style>
