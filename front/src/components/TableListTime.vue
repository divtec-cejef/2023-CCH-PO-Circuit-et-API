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
                <td><img class="video" src="../assets/img/film.png"
                         alt="Icon de film pour visionner la vidéo de la course">
                </td>
            </tr>
        </table>
    </div>
</template>

<script setup lang="ts">
import type Car from '@/models/car';

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

        tr td:nth-child(4) {
            font-family: 'Digital-7 Mono', sans-serif;
            font-size: 22px;
            width: 45px;
        }

        td {
            margin-right: 5px;
        }

        th {
            text-align: left;
        }

        img.video {
            width: 25px;
        }

        img.flag-start {
            width: 18px;
        }
    }
}

</style>