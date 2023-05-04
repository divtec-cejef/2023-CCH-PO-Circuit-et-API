import {defineStore} from 'pinia'
import {computed, ref} from "vue";
import Car from "../models/car";
import api from "../models/api";
import {useRouter} from "vue-router";
import Race from "@/models/race";

export const useCarStore = defineStore('car', () => {

    let userCar = new Car();

    /**
     * Initialisation de la voiture en fonction de l'URL actuel
     */
    async function initUserCarQueryId(queryId: string | string[]) {

        //Récupère les informations de la voiture
        let {json: dataUserCar, status} = await api.getDataOneCarQueryId(queryId.toString())

        //Remplissage des champs de la voiture
        userCar.idCar.value = dataUserCar["id_car"];
        userCar.pseudo.value = dataUserCar["pseudo"];
        userCar.idQuery.value = dataUserCar["query_id"];
        userCar.avatar.value = dataUserCar["id_avatar"];

        localStorage.setItem("userCarId", userCar.idCar.value.toString())

        return status
    }


    /**
     * Initialisation de la voiture en fonction de l'URL actuel
     */
    async function initUserCarId(idCar: string | string[]) {

        //Récupère les informations de la voiture
        let {json: dataUserCar, status} = await api.getDataOneCarId(idCar.toString())

        //Remplissage des champs de la voiture
        userCar.idCar.value = await dataUserCar["id_car"];
        userCar.pseudo.value = await dataUserCar["pseudo"];
        userCar.idQuery.value = await dataUserCar["query_id"];
        userCar.avatar.value = await dataUserCar["id_avatar"];

        console.log(userCar.idCar.value)
        return status;
    }

    /**
     * Initialisation des courses de l'utilisateur dans le store
     */
    async function initUserAllRaceCar() {
        let {json: dataUserRaceCar, status} = await api.getAllRaceOneCar(userCar.idCar.value);
        console.log(dataUserRaceCar)
        dataUserRaceCar.forEach(function (race:any) {
            userCar.listRace.value.push(
                new Race(race['id_race'], race['realisation_date_time'], race['sectore_one'])
            )
        })
        console.log(dataUserRaceCar[0]['realisation_date_time'])
        return status;
    }

    return {...userCar, initUserCarId, initUserCarQueryId, initUserAllRaceCar};
})