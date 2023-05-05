<template>

    <h1>Course</h1>
    <div v-if="codeBackApi === api.ReturnCodes.Success">

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
                    <div>Temps de manche :</div>
                    <div class="race-time">{{ car.listRace[0].formatTime(car.listRace[0].sectorOne) }}</div>
                </div>
            </div>

            <div class="content-2">
                <div class="speed-max">
                    <p>65</p>
                    <p>km/h</p>
                </div>

                <div class="time-inter">
                    <div>Temps <br>
                        intermédiaires :
                    </div>
                    <ul>
                        <li>
                            <NumberTime class="num-race" number="1" color="var(--red)"/>
                            <p>03:23:08</p>
                        </li>
                        <li>
                            <NumberTime class="num-race" number="2" color="var(--blue)"/>
                            <p>03:23:08</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="informations">
            <p>N° Manche : {{ car.listRace[0].numRace }}</p>
            <div>
                <img src="../assets/img/clock.png" alt="Icon d'horloge">
                <p class="hour">{{ car.listRace[0].formatHour() }}</p>
            </div>
        </div>

        <div class="video"></div>

        <DropDown v-if="car.listRace.length > 1" class="drop-down-course" name="Autres courses">
            <table>
                <tr>
                    <th>N°</th>
                    <th>Rang</th>
                    <th>Heure</th>
                    <th>Vitesse</th>
                    <th colspan="2">Temps</th>
                    <th>Vidéo</th>
                </tr>
                <tr v-for="race in car.sortListByOrderHour()">
                    <td>{{ race.numRace }}</td>
                    <td>{{ race.formatHour() }}</td>
                    <td>33</td>
                    <td><img class="flag-start" src="../assets/img/race-flag.png" alt="Drapeau de course"></td>
                    <td>{{ race.formatTime(race.sectorOne) }}</td>
                    <td><img class="video" src="../assets/img/film.png"
                             alt="Icon de film pour visionner la vidéo de la course"></td>
                </tr>
            </table>
        </DropDown>

        <h2>Classement</h2>
        <div class="button-classement">
            <button class="classement-user">Moi</button>
            <button class="classement-top"></button>
        </div>
        <div ref="classement" class="classement">
            <ClassementElement/>
            <ClassementElement/>
            <ClassementElement/>
            <ClassementElement/>
            <ClassementElement/>
            <ClassementElement/>
            <ClassementElement/>
            <ClassementElement/>
        </div>
    </div>

</template>

<script setup lang="ts">
import NumberTime from "@/components/NumberTime.vue";
import DropDown from "@/components/DropDown.vue";
import ClassementElement from "@/components/ClassementElement.vue";
import {ref} from "vue";
import {useCarStore} from "@/stores/car";
import api from "@/models/api";

/**
 * Initialise les données de la voiture de l'utilisateur
 */
async function initDataUserCar() {

    const userCarId = localStorage.getItem("userCarId");
    if (userCarId) {
        await userCar.initUserCarId(userCarId)
        return await userCar.initUserAllRaceCar();
    }
    return 0;
}

//Initialisation des données
const userCar = useCarStore();
const {car} = userCar;
let codeBackApi = ref(0);

initDataUserCar().then(value => codeBackApi.value = value);

</script>

<style scoped lang="scss">

div.best-race {
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: fit-content;
  margin: 20px auto 0 auto;


  div.content-1 {
    display: flex;
    align-items: center;

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
      margin-left: 45px;

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
}

div.informations {
  margin: 25px 10px;
  display: flex;
  justify-content: space-between;
  font-style: italic;
  align-items: center;

  div {
    display: flex;
    align-items: center;
  }

  img {
    margin-right: 8px;
    width: 25px;
  }

  p.hour {
    flex: 1;
    margin-right: 10px;
  }
}

div.video {
  width: 100%;
  height: 200px;
  background-color: var(--black);
  border-radius: 2px;
}

.drop-down-course {
  margin-top: 20px;
  max-width: 100%;

  table {

    text-align: center;

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

div.classement {
  overflow-y: scroll;
  height: 300px;
}

div.button-classement {
  display: flex;
  width: 100%;
  justify-content: end;
  margin-top: 20px;

  button.classement-top {
    background-color: transparent;
    border: none;
    border-radius: 100px;
    background-image: url("../assets/img/top-10.png");
    background-position: center;
    background-size: 30px;
    background-repeat: no-repeat;
    width: 40px;
    height: 40px;
    margin: 0 15px;
  }
}

</style>