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

  export interface Avatar {
    bgColor: string,
    hatColor:  string,
    faceColor:  string,
    hairColor:  string,
    shirtColor:  string,
    hairColorRandom: boolean,
    sex: string,
    earSize: string,
    hatType: string,
    eyeType: string,
    hairType: string,
    noseType: string,
    mouthType: string,
    shirtType: string,
    eyeBrowType: string,
    glassesType: string,
    shape: string
  }

  export type rankingData = {
    id_race: number,
    car: {
      id_car: number,
      pseudo: string,
      avatar: Avatar,
    },
    total_time: Date | string
  }[]
}