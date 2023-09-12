<template>
    <div class="table">
        <table class="table-list-time">
            <tr>
                <th></th>
                <th><img :src=clock alt="Image d'horloge qui représente l'heure"/></th>
                <th><img :src=speed alt="Image vitesse max"></th>
                <th><img :src=chronometer alt="Image de chronomètre"></th>
                <th><img :src=video alt="Image de video"></th>
            </tr>
            <tr v-for="(race, key) in usercar.car.sortListByOrderHour()" :key="key">
                <td>
                    <NumberTime class="num-race" :number=usercar.car.getNumRace(race).valueOf().toString()
                                color="var(--blue)"/>
                </td>
                <td>{{ race.formatHour() }}</td>
                <td>33</td>
                <td>{{ race.formatTime(race.totalTime) }}</td>
                <td class="video">
                    <div>
                        <a v-if="race.videoUrl" :href="race.videoUrl" target="_blank">
                            <img class="link dark-invert" :src=link
                                 alt="Icon de lien pour visionner la vidéo de la course">
                        </a>
                        <span v-else>
                            <img class="link dark-invert" :src=link
                                 alt="Icon de lien pour visionner la vidéo de la course">
                        </span>
                    </div>
                    <div>
                        <a v-if="race.videoUrl" :href="createBlobObject(race.videoUrl)"
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
import clock from '../assets/img/clock.webp';
import speed from '../assets/img/speed.png';
import chronometer from '../assets/img/chronometer.png';
import link from '../assets/img/link.png';
import download from '../assets/img/downloads-black.png';
import NumberTime from '@/components/NumberTime.vue';
import { useCarStore } from '@/stores/car';

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
  //Récupération de la vidéo et transformation en blob
  let response = await fetch(url);
  const blobURL = await response.blob();
  return createObjectURL(blobURL);
}

const usercar = useCarStore();

</script>

<style scoped lang="scss">
div {
    overflow-y: auto;
    max-height: 400px;
    display: flex;
    justify-content: end;
    padding: 0 10px;

  table {
    text-align: center;
    border-collapse: collapse;

    tr td:nth-child(4) {
      font-family: 'Digital-7 Mono', sans-serif;
      font-size: 22px;
      width: 45px;
    }

    tr:first-child {
      td,
      th {
        border-top: 0;
      }

      th:first-child {
        padding: 0;
      }
    }

    tr:last-child {
      td,
      th {
        border-bottom: 0;
      }
    }

    tr {
      th,
      td {
        border: 2px solid #e2e2e7;
        padding: 5px 2px;
      }

      td {
        margin-right: 5px;

        img.link {
          width: 18px;
        }

        img.flag-start {
          width: 18px;
        }
      }

      th {
        p {
          text-align: left;
          margin-left: 7px;
        }

        img {
          width: 30px;
          min-width: 30px;
        }

        padding: 5px 0 2px 0;
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
    }

    td.video {
      padding: 0 !important;

      div {
        display: inline-block;
        width: 20px;

        &:nth-child(1) {
          margin-right: 5px;
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
