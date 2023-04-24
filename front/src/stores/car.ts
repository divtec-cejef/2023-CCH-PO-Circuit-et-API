import {defineStore} from 'pinia'
import {computed, ref} from "vue";
import Car from "../../models/car"
import api from "../../models/api";
import {useRouter} from "vue-router";

export const useCarStore = defineStore('car', () => {

    let userCar = new Car();

    /**
     * Initialisation de la voiture en fonction de l'URL actuel
     */
    async function initUserCarUrl(idCar : string | string[] ) {

        //Récupère les informations de la voiture
        let {json: dataUserCar, status} = await api.getDataOneCar(idCar.toString())

        //Remplissage des champs de la voiture
        userCar.idCar.value = dataUserCar["id_car"];
        userCar.pseudo.value = dataUserCar["pseudo"];
        userCar.idQuery.value = dataUserCar["query_id"];
        userCar.avatar.value = dataUserCar["id_avatar"];

        localStorage.setItem("userCarId", idCar.toString())

        return status
    }

    return {...userCar, initUserCarUrl};
})