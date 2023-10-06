import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { models }  from '@/models/api';

export default class Race {
  idRace: number = 0;
  raceStart: Date = new Date;
  totalTime: Date = new Date();
  sector1: Date = new Date();
  sector2: Date = new Date();
  speed: number;
  videoUrl: String = '';

  /**
   * Constructeur d'une course
   * @param idRace Id de la course
   * @param raceStart Heure à laquelle la course a été faite
   * @param totalTime Temps de la course
   * @param sector1 Premier temps intermédiaire
   * @param sector2 Deuxième temps intermédiaire
   * @param speed Vitesse de la course
   * @param videoUrl Url de la vidéo
   */
  constructor(idRace: number, raceStart: Date, totalTime: Date, sector1: Date, sector2: Date, speed: number, videoUrl: string) {
    this.idRace = idRace;
    this.raceStart = raceStart;
    this.totalTime = totalTime;
    this.sector1 = this.calculateSector(sector1);
    this.sector2 = this.calculateSector(sector2);
    this.speed = speed;
    this.videoUrl = videoUrl;
  }


  /**
   * Calcul du temps intermédiaire
   * @param sector Temps du temps intermédiaire
   */
  calculateSector(sector: Date) {
    return new Date(sector.getTime() - this.raceStart.getTime());
  }
}

/**
 * Formate une date en un temps en secondes
 * @param date
 */
export function formatTime(date: Date) {
  console.log(date.getMinutes());
  if (date.getMinutes() === 0)
    return format(date, 'ss.SS');
  else
    return format(date, 'mm:ss.SS');
}


/**
 * Retourne une date en un format d'heure
 * @param hour Heure à formatter
 */
export function formatHour(hour: Date) {
  return format(hour, 'kk:mm');
}

/**
 * Formate une date heure pour afficher le jour en français, l'heure et les secondes
 * @param hour
 */
export function formatHourDay(hour: Date) {
  const formatHour = format(hour, 'EEEE kk', { locale: fr }) + 'h' + format(hour, 'mm', { locale: fr });
  return formatHour[0].toUpperCase() + formatHour.slice(1);
}

/**
 * Tri une liste en fonction de l'heure de réalisation
 */
export function sortListByOrderHour(listRace: Race[] | models.parsedData.RaceData[]) {

  //Si la liste n'est pas défini alors retour
  if (!listRace) {
    throw new Error('List race is undefined');
  }

  const listSortByNum = [...listRace];

  //Tri de la liste en fonction
  listSortByNum.sort(function compare(a, b) {
    return Number(a.raceStart) - Number(b.raceStart);
  });

  return listSortByNum;

}

//Constante d'unité de course
export const unitSpeed = 'cm/s';

/**
 * Transforme une vitesse de base en km/h en cm/s
 */
export function formatkmHtoCmS(speed: number) {
  return speed * 100000 / 3600;
}

/**
 * Arrondi la vitesse à une décimale
 * @param speed Vitesse à arrondir
 */
export function formatSpeed(speed: number) {
  return Math.round(formatkmHtoCmS(speed) * 10) / 10;
}

/**
 * Calcul du temps intermédiaire
 * @param sector Temps du temps intermédiaire
 * @param raceStart Heure du début de course
 */
export function calculateSector(sector: Date, raceStart : Date) {
  console.log(sector.getTime() - raceStart.getTime());
  return new Date(sector.getTime() - raceStart.getTime());
}
