import type Race from '@/models/race';
import type { Configs } from 'holiday-avatar';

export default class Car {
  idCar: number | undefined = undefined;
  pseudo: string = '';
  idQuery: string = '';
  avatar: Configs | undefined = undefined;
  listRace: Race[] = [];
  rank: number = 0;

  /**
     * Tri une liste en fonction de l'heure de réalisation
     */
  sortListByOrderHour() {
    const listSortByNum = [...this.listRace];

    //Tri de la liste en fonction
    listSortByNum.sort(function compare(a, b) {
      return Number(a.startTime) - Number(b.startTime);
    });

    return listSortByNum;
  }

  /**
     * Obtient le numéro de course
     * @param raceToSearch Course à rechercher
     */
  getNumRace(raceToSearch: Race) {
    return this.sortListByOrderHour().findIndex(race => race.idRace == raceToSearch.idRace) + 1;
  }
}


