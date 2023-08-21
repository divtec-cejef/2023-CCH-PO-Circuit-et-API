<template>
    <div>
        <table>
            <tr>
                <th>N°</th>
                <th>Heure</th>
                <th>Vitesse</th>
                <th>Temps</th>
                <th>Vidéo</th>
            </tr>
            <tr v-for="(race, key) in props.carUser.sortListByOrderHour()" :key="key">
                <td>{{ props.carUser.getNumRace(race).valueOf() }}</td>
                <td>{{ race.formatHour() }}</td>
                <td>33</td>
                <td>{{ race.formatTime(race.totalTime) }}</td>
                <td><a href=""><img class="video" :src=video
                         alt="Icon de film pour visionner la vidéo de la course"></a>
                </td>
            </tr>
        </table>
    </div>
</template>

<script setup lang="ts">
import type Car from '@/models/car';
import video from '../assets/img/film.webp';

const props = defineProps<{
  carUser: Car;
}>();

</script>

<style scoped lang="scss">
div {
    overflow-y: scroll;
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
                padding: 5px 15px;
            }

            td {
                margin-right: 5px;
                img.video {
                    width: 25px;
                }
                img.flag-start {
                     width: 18px;
                 }
            }

            th {
                text-align: left;
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
    }
}

</style>