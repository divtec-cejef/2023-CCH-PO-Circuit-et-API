import type { Avatar } from 'holiday-avatar';

export namespace models {
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

  export type race = {
    id_race: number,
    car: {
      id_car: number,
      pseudo: string,
      avatar: typeof Avatar,
    },
    total_time: Date | string
  }

  export type rankingData = {
    races: race[],
    count: number,
    fastest: race
  };

  export interface activity {
    idActivity : number,
    name : string
    idSection : number
  }

  export interface propValues {
    propValueEn: string;
    propValueFr: string;
  }

  export type radioProperty = {
    propNameFr: string;
    propNameEn: string;
    propType: string;
    propGroups: string;
    propNameSnakeCase: string;
    propValues: propValues[];
    selectedValueEn?: string;
  }
}