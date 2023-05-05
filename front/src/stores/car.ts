import {defineStore} from 'pinia'
import {computed, ref} from "vue";
import type {Ref} from "vue";
import Car from "../models/car";
import api from "../models/api";
import {useRouter} from "vue-router";
import Race from "@/models/race";

export const useCarStore = defineStore('car', () => {

    let car: Ref<Car> = ref(new Car());

    /**
     * Initialisation de la voiture en fonction de l'URL actuel
     */
    async function initUserCarQueryId(queryId: string | string[]) {

        //Récupère les informations de la voiture
        let {json: dataUserCar, status} = await api.getDataOneCarQueryId(queryId.toString())

        //Remplissage des champs de la voiture
        car.value.idCar = dataUserCar["id_car"];
        car.value.pseudo = dataUserCar["pseudo"];
        car.value.idQuery = dataUserCar["query_id"];
        car.value.avatar = dataUserCar["id_avatar"];

        /**
         * Si on trouve la voiture alors on renvoit le code
         */
        if (status.valueOf() === 200) {
            localStorage.setItem("userCarId", car.value.idCar.toString())
        }

        return status;
    }


    /**
     * Initialisation de la voiture en fonction de l'URL actuel
     */
    async function initUserCarId(idCar: string | string[]) {

        //Récupère les informations de la voiture
        let {json: dataUserCar, status} = await api.getDataOneCarId(idCar.toString())

        //Remplissage des champs de la voiture
        car.value.idCar = dataUserCar["id_car"];
        car.value.pseudo = dataUserCar["pseudo"];
        car.value.idQuery = dataUserCar["query_id"];
        car.value.avatar = dataUserCar["id_avatar"];

        return status;
    }

    /**
     * Initialisation des courses de l'utilisateur dans le store
     */
    async function initUserAllRaceCar() {
        let {json: dataUserRaceCar, status} = await api.getAllRaceOneCar(car.value.idCar);

        //Récupération du rang de la voiture
        car.value.rank = dataUserRaceCar['rank'];

        //Remplissage de la liste de course
        dataUserRaceCar['races'].forEach(function (race:any) {
            car.value.listRace.push(
                new Race(race['id_race'], new Date(race['realisation_date_time']), new Date(race['sector_one']))
            )
        })

        car.value.determinePositionOfRaces();
        return status;
    }

    return {car, initUserCarId, initUserCarQueryId, initUserAllRaceCar};
})