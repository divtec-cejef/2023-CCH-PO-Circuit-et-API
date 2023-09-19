import { format } from 'date-fns';

export default class Race {
  idRace: number = 0;
  startTime: Date = new Date;
  totalTime: Date = new Date();
  sector1: Date = new Date();
  sector2: Date = new Date();
  speed: number;
  videoUrl : String = '';

  /**
   * Constructeur d'une course
   * @param idRace Id de la course
   * @param startTime Heure à laquelle la course a été faite
   * @param totalTime Temps de la course
   * @param sector1 Premier temps intermédiaire
   * @param sector2 Deuxième temps intermédiaire
   * @param speed Vitesse de la course
   * @param videoUrl Url de la vidéo
   */
  constructor(idRace: number, startTime: Date, totalTime: Date, sector1: Date, sector2: Date, speed : number, videoUrl : string) {
    this.idRace = idRace;
    this.startTime = startTime;
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
