import { defineStore } from 'pinia';
import type { Ref } from 'vue';
import { ref } from 'vue';
import Car from '../models/car';
import api, { websocket } from '../models/api';
import Race from '@/models/race';

export const useCarStore = defineStore('car', () => {

  //Initialisation des variables
  const car: Ref<Car> = ref(new Car());
  const token: Ref<string> = ref('');

  /**
   * Initialisation de la voiture en fonction de l'URL actuel
   */
  async function initUserCarQueryId(queryId: string | string[]) {
    //Récupère les informations de la voiture
    const { json: dataUserCar, status } = await api.getDataOneCarQueryId(queryId.toString());

    /**
     * Si on trouve la voiture alors, on renvoie le code
     */
    if (status.valueOf() === api.ReturnCodes.Success) {
      car.value.idCar = dataUserCar['id_car'];
      car.value.pseudo = dataUserCar['pseudo'];
      car.value.idQuery = dataUserCar['query_id'];
      car.value.avatar = dataUserCar['avatar'];

      //Stockage de l'id
      localStorage.setItem('userCarId', car.value.idCar.toString());
    }

    return status;
  }


  /**
   * Initialisation de la voiture en fonction de l'URL actuel
   */
  async function initUserCarId(idCar: string | string[]) {

    //Récupère les informations de la voiture
    const { json: dataUserCar, status } = await api.getDataOneCarId(idCar.toString());

    /**
     * Si on trouve la voiture alors, on renvoie le code
     */
    if (status.valueOf() === api.ReturnCodes.Success) {
      //Remplissage des champs de la voiture
      car.value.idCar = dataUserCar['id_car'];
      car.value.pseudo = dataUserCar['pseudo'];
      car.value.idQuery = dataUserCar['query_id'];
      car.value.avatar = dataUserCar['avatar'];

      //Stockage de l'id
      localStorage.setItem('userCarId', car.value.idCar.toString());
    }

    return status;
  }

  /**
   * Initialisation des courses de l'utilisateur dans le store
   */
  async function initUserAllRaceCar() {
    const socket = new websocket(car.value.idCar);

    await socket.onUserRace(async (races) => {
      //Récupération du rang de la voiture
      car.value.rank = races.rank;

      //Vide la liste de course
      car.value.listRace = [];

      car.value.listRace = races.races.map((race) =>
        new Race(race.id_race, new Date(race.race_start), new Date(race.total_time), new Date(race.sector1))
      );
    });

    return socket;

  }

  return { car, initUserCarId, initUserCarQueryId, initUserAllRaceCar, token };
});

