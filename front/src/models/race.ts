import { format } from 'date-fns';

export default class Race {
  idRace: number = 0;
  hour: Date = new Date;
  totalTime: Date = new Date();

  /**
	 * Constructeur d'une course
	 * @param idRace Id de la course
	 * @param hour Heure à laquelle la course a été faite
	 * @param totalTime Temps de la course
	 */
  constructor(idRace: number, hour: Date, totalTime: Date) {
    this.idRace = idRace;
    this.hour = hour;
    this.totalTime = totalTime;
  }

  /**
	 * Retourne la date formatée pour l'affichage
	 * @param date Date à formater
	 */
  formatTime(date: Date) {
    return format(date, 'mm:ss:SS');
  }

  formatHour() {
    return format(this.hour, 'kk:mm');
  }
}

export function formatTime(date: Date) {
  return format(date, 'mm:ss:SS');
}
