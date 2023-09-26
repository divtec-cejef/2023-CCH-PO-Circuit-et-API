import type Race from '@/models/race';
import type { Configs } from 'holiday-avatar';
import { sortListByOrderHour } from '@/models/race';

export default class Car {
  idCar: number | undefined;
  pseudo: string  | undefined;
  idQuery: string | undefined;
  avatar: Configs | undefined;
  listRace: Race[] | undefined;
  rank: number | undefined;

  /**
     * Obtient le numéro de course
     * @param raceToSearch Course à rechercher
     */
  getNumRace(raceToSearch: Race) {
    return sortListByOrderHour(this.listRace!).findIndex(race => race.idRace == raceToSearch.idRace) + 1;
  }
}


