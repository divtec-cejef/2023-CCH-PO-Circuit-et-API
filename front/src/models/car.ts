import type Race from '@/models/race';
import type { Configs } from 'holiday-avatar';

export default class Car {
  idCar: number | undefined;
  pseudo: string  | undefined;
  idQuery: string | undefined;
  avatar: Configs | undefined;
  listRace: Race[] | undefined;
  rank: number | undefined;

  /**
     * Tri une liste en fonction de l'heure de réalisation
     */
  sortListByOrderHour() {
    //Si la liste n'est pas défini alors retour
    if(!this.listRace) {
      throw new Error('List race is undefined');
    }

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


