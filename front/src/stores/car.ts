import { defineStore } from 'pinia';
import { ref } from 'vue';
import Car from '../models/car';
import api, { WebsocketConnection } from '../models/api';
import Race from '@/models/race';

export const useCarStore = defineStore('car', () => {

  //Initialisation des variables
  const car = ref<Car>(new Car());
  const token = ref<string>();

  /**
   * Initialisation de la voiture en fonction de l'URL actuel
   */
  async function initUserCarQueryId(queryId: string | string[]) {
    //Récupère les informations de la voiture
    const { json: dataUserCar, status } = await api.getDataOneCarQueryId(queryId.toString());

    if (typeof dataUserCar === 'string') {
      console.error(dataUserCar);
      return;
    }

    /**
     * Si on trouve la voiture alors, on renvoie le code
     */
    if (status.valueOf() === api.ReturnCodes.Success) {
      car.value.idCar = dataUserCar.idCar;
      car.value.pseudo = dataUserCar.pseudo;
      car.value.idQuery = dataUserCar.queryId;
      car.value.avatar = dataUserCar.avatar;

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

    if (typeof dataUserCar === 'string') {
      console.error(dataUserCar);
      return;
    }

    /**
     * Si on trouve la voiture alors, on renvoie le code
     */
    if (status.valueOf() === api.ReturnCodes.Success) {
      //Remplissage des champs de la voiture
      car.value.idCar = dataUserCar.idCar;
      car.value.pseudo = dataUserCar.pseudo;
      car.value.idQuery = dataUserCar.queryId;
      car.value.avatar = dataUserCar.avatar;

      //Stockage de l'id
      localStorage.setItem('userCarId', car.value.idCar.toString());
    }

    return status;
  }

  /**
   * Initialisation des courses de l'utilisateur dans le store
   */
  async function initUserAllRaceCar() {
    const socket = new WebsocketConnection(car.value.idCar);

    socket.onUserRace(async (races) => {
      //Récupération du rang de la voiture
      car.value.rank = races.rank;

      //Vide la liste de course
      car.value.listRace = [];

      car.value.listRace = races.races.map(race =>
        new Race(race.id_race,
          new Date(race.race_start),
          new Date(race.total_time),
          new Date(race.checkpoint1),
          new Date(race.checkpoint2))
      );
    });

    return socket;

  }

  /**
   * Reset le store
   */
  function $reset() {
    car.value = new Car();
    token.value = '';
  }

  return { car, initUserCarId, initUserCarQueryId, initUserAllRaceCar, token, $reset };
});
