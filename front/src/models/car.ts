import type {Ref} from "vue";
import {ref} from "vue";
import {format, compareAsc} from 'date-fns'
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
     * Rempli donc le champ NumRace pour chaque manche
     */
    determinePositionOfRaces() {
        let listSortByNum = [...this.listRace];

        //Tri de la liste en fonction
        listSortByNum.sort(function compare(a, b) {
            return Number(a.hour) - Number(b.hour);
        });

        listSortByNum.forEach((race: Race, index) => {
            let raceToChange = ref(this.listRace.find( function(raceToChange) {
                return raceToChange.idRace === race.idRace;
            }));

            if(raceToChange.value !== undefined) {
                raceToChange.value.numRace = index;
            }
        });

        console.log("Liste triée : ")
        console.log(listSortByNum)
        console.log("Liste de course : ")
        console.log(this.listRace)
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


}


