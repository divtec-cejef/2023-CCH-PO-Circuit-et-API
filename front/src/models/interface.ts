import type { Avatar as HaAvatar } from 'holiday-avatar';

export namespace models {
  export type Avatar = typeof HaAvatar;

  /**
   * Représente les courses d'un utilisateur
   */
  export interface racesData {
    races: [
      {
        id_race: number,
        race_start: Date | string,
        race_finish: Date | string,
        id_car: number,
        total_time: Date | string
        sector1: Date | string
      }
    ],
    rank: number
  }

  /**
   * Représente une course unique du classement
   */
  export type race = {
    id_race: number,
    car: {
      id_car: number,
      pseudo: string,
      avatar: Avatar,
    },
    total_time: Date | string
  }

  /**
   * Représente le classement des courses
   */
  export type rankingData = {
    races: race[],
    count: number,
    fastest: race
  };

  /**
   * Représente une activité
   */
  export interface activity {
    idActivity : number,
    label : string
    idSection : number
  }

  /**
   *
   */
  export type radioProperty = {
    propNameFr: string;
    propNameEn: string;
    propType: string;
    propGroups: string;
    propNameSnakeCase: string;
    propValues: {
      propValueEn: string;
      propValueFr: string;
    }[];
    selectedValueEn?: string;
  }

  export interface realisationData {
    count: number,
    mostPopular: activity & {count: number}
  }

}
