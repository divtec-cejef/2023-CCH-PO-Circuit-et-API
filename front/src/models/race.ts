import { format } from 'date-fns';

export default class Race {
  idRace: number = 0;
  startTime: Date = new Date;
  totalTime: Date = new Date();
  checkpoint1: Date = new Date();
  checkpoint2: Date = new Date();

  /**
   * Constructeur d'une course
   * @param idRace Id de la course
   * @param startTime Heure à laquelle la course a été faite
   * @param totalTime Temps de la course
   * @param checkpoint1 Premier temps intermédiaire
   */
  constructor(idRace: number, startTime: Date, totalTime: Date, checkpoint1: Date, checkpoint2: Date) {
    this.idRace = idRace;
    this.startTime = startTime;
    this.totalTime = totalTime;
    this.checkpoint1 = this.calculateSector(checkpoint1);
    this.checkpoint2 = this.calculateSector(checkpoint2);
  }

  /**
   * Calcul du temps intermédiaire
   * @param sector Temps du temps intermédiaire
   */
  calculateSector(sector: Date) {
    return new Date(sector.getTime() - this.startTime.getTime());
  }

  /**
   * Retourne la date formatée pour l'affichage
   * @param date Date à formater
   */
  formatTime(date: Date) {
    return format(date, 'mm:ss:SS');
  }

  formatHour() {
    return format(this.startTime, 'kk:mm');
  }
}

export function formatTime(date: Date) {
  if (date.getMinutes() === 0)
    return format(date, 'ss.SS');
  else
    return format(date, 'mm:ss.SS');
}
