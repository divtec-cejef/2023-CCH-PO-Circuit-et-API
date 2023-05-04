import {ref} from "vue";
import type {Ref} from "vue";

export default class Race {
    idRace: Ref<number> = ref(0);
    hour: Ref<Date> = ref(new Date);
    sectoreOne : Ref<Date> = ref(new Date());

    /**
     * Constructeur d'une course
     * @param idRace Id de la course
     * @param hour Heure à laquelle la course à été fait
     * @param sectoreOne Temps de la course
     */
    constructor(idRace: Ref<number>, hour: Ref<Date>, sectoreOne: Ref<Date[]>) {
        this.idRace = idRace;
        this.hour = hour;
        this.sectoreOne = sectoreOne;
    }
}


