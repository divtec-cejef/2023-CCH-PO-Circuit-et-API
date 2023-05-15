import type Race from '@/models/race';

export default class Car {
  idCar: number = 0;
  pseudo: string = '';
  idQuery: number | string = '';
  avatar: string = '';
  listRace: Race[] = [];
  rank: number = 0;

  /**
     * Tri une liste en fonction de l'heure de réalisation
     */
  sortListByOrderHour() {
    const listSortByNum = [...this.listRace];

    //Tri de la liste en fonction
    listSortByNum.sort(function compare(a, b) {
      return Number(a.hour) - Number(b.hour);
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


