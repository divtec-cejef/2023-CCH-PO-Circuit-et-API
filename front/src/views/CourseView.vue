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
                    <div class="race-time">
                        {{ car.listRace[BEST_TIME_INDEX].formatTime(car.listRace[BEST_TIME_INDEX].totalTime) }}
                    </div>
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

            <div class="informations">
                <p>N° Manche : {{ car.getNumRace(car.listRace[BEST_TIME_INDEX]) }}</p>
                <div>
                    <img class="hour" src="../assets/img/clock.png" alt="Icon d'horloge">
                    <p class="hour">{{ car.listRace[BEST_TIME_INDEX].formatHour() }}</p>
                </div>
            </div>

            <div class="video"></div>
        </div>

        <div class="content-list-classement">
            <DropDown v-if="car.listRace.length > 1" class="drop-down-course"
                      name="Toutes les courses">
                <TableListTime :car-user="car"/>
            </DropDown>

            <div class="table-large-content">
                <h2>Liste de courses</h2>
                <TableListTime :car-user="car"/>
            </div>

            <div class="content-classement">
                <h2 id="classement">Classement</h2>
                <div class="button-classement">
                    <button class="classement-user"></button>
                    <button class="classement-top"></button>
                </div>
                <div ref="classement" class="classement">
                    <ClassementElement v-for="(race, key) in listRace" :key="key" :avatar="race.car.avatar.image"
                                       :rank="key + 1"
                                       :pseudo="race.car.pseudo" :time="race.total_time"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import NumberTime from '@/components/NumberTime.vue';
import DropDown from '@/components/DropDown.vue';
import ClassementElement from '@/components/ClassementElement.vue';
import { computed, onMounted, ref } from 'vue';
import { useCarStore } from '@/stores/car';
import api from '@/models/api';
import type { models } from '@/models/api';
import TableListTime from '@/components/TableListTime.vue';

//Initialisation des constantes
const BEST_TIME_INDEX = 0;
const classement = ref<Element | null>(null);

onMounted(() => {
  //Changement du scroll
  if (classement.value) {
    classement.value.scrollTop = car.rank * 200;
  }
});

//Initialisation des données
const userCar = useCarStore();
const { car } = userCar;
let codeBackApi = ref(0);

userCar.initUserAllRaceCar().then(value => codeBackApi.value = value);

const listRace = ref<models.raceObject[]>([]);

api.onRankingRecieved((data) => {

  listRace.value = data.map((d) => {
    return {
      car: d.car,
      id_race: d.id_race,
      total_time: new Date(d.total_time),
    };
  });
});
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
    justify-content: space-between;
    align-items: center;
    min-width: 280px;

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

  div.video {
    width: 100%;
    max-width: 450px;
    height: 250px;
    margin: 0 auto;
    background-color: var(--black);
    border-radius: 2px;
  }

  a {
    margin-top: 25px;
    text-align: right;
    font-style: italic;
  }

  div.informations {
    margin: 25px 10px;
    display: flex;
    justify-content: space-between;
    font-style: italic;
    align-items: center;
    min-width: 280px;
    padding: 0 5px;

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
  margin-top: 20px;
  max-width: 100%;
}

div.classement {
  overflow-y: scroll;
  max-height: 300px;
}

div.button-classement {
  display: flex;
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
    margin-right: 15px;
    margin-left: 5px;
  }

  button.classement-user {
    background-color: transparent;
    border: none;
    border-radius: 100px;
    background-image: url("../assets/img/placeholder.png");
    background-position: center;
    background-size: 30px;
    background-repeat: no-repeat;
    width: 40px;
    height: 40px;

  }
}

div.large-content {
  display: none;
}

div.drop-down-course {
  display: block;
}

.table-large-content {
  display: none;
}
</style>
