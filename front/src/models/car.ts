import type {Ref} from "vue";
import {ref} from "vue";
import type Race from "@/models/race";

export default class Car {
    idCar: number = 0;
    pseudo: string = '';
    idQuery: number | string = '';
    avatar: string = '';
    listRace: Race[] = [];
    rank: number = 0;


    /**
     * Determine la position de chaque manche en fonction du temps
     * Rempli donc le champs NumRace pour chaque manche
     */
    determinePositionOfRaces() {
        let listSortByNum = this.listRace.sort((a, b) => {
            return a.sectorOne.getTime() + b.sectorOne.getTime();
        });

        listSortByNum.forEach((race: Race, index) => {
            let raceToChange = ref(this.listRace.find(raceToChange => raceToChange.idRace == race.idRace))
            if(raceToChange.value !== undefined) {
                raceToChange.value.numRace = index;
            }
        });
    }

    getTime(date?: Date) {
        return date != null ? date.getTime() : 0;
    }

    /**
     * Tri la liste en fonction de
     */
    sortListRace() {
        this.listRace = this.listRace.sort((a, b) =>
            a.idRace - b.idRace);

        console.log(this.listRace)
    }


    /**
     * Retourne la course la plus rapide de la voiture
     */
    getBestRace() {
        //Test si la liste est vide
        if (this.listRace.length == 0) {
            return
        }

        //Boucle sur toutes les courses pour trouver la plus rapide
        let bestRace = this.listRace[0];
        this.listRace.forEach(function (race: Race) {
            if (race.sectorOne < bestRace.sectorOne) {
                bestRace = race;
            }
        });
        return bestRace;
    }
}


