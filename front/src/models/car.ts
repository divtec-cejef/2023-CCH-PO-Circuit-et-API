import type Race from '@/models/race';
import type { Configs } from 'holiday-avatar';
import { sortListByOrderHour } from '@/models/race';
import type { models } from '@/models/api';

export default class Car {
  idCar: number | undefined;
  pseudo: string  | undefined;
  idQuery: string | undefined;
  avatar: Configs | undefined;
  listRace: Race[] | undefined;
  rank: number | undefined;
  sponsorName: string | undefined;
}

/**
 * Obtient le numéro de course
 * @param raceToSearch Course à rechercher
 * @param listRace Liste de course
 */
export function getNumRace(raceToSearch: Race | models.parsedData.RaceData , listRace : Race[] | models.parsedData.RaceData[]) {
  return sortListByOrderHour(listRace).findIndex(race => race.idRace == raceToSearch.idRace) + 1;
}