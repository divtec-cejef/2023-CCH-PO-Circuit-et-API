import {ref} from "vue";
import type {Ref} from "vue";

export default class Race {
    idRace: number = 0;
    hour: Date = new Date;
    sectorOne : Date = new Date();
    numRace : number = 0;

    /**
     * Constructeur d'une course
     * @param idRace Id de la course
     * @param hour Heure à laquelle la course à été fait
     * @param sectorOne Temps de la course
     */
    constructor(idRace: number, hour: Date, sectorOne: Date) {
        this.idRace = idRace;
        this.hour = hour;
        this.sectorOne = sectorOne;
    }
}


