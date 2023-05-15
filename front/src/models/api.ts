import { Socket, io } from 'socket.io-client';

const routeApi: string = import.meta.env.VITE_ROUTE_API;

export namespace restful {
  export enum ReturnCodes {
    NoCode = 0,
    Success = 200,
    NotFound = 404,
  }


  /**
   * Retourne les données d'une voiture en fonction de son ID
   * @param queryId Query id de la voiture à retourner
   */
  export async function getDataOneCarQueryId(queryId: number | string) {
    const routeCar = `${routeApi}car/query-id/${queryId}`;
    const res = await fetch(routeCar);
    return { json: (await res.json()), status: res.status };
  }


  /**
   * Retourne les données d'une voiture en fonction de son ID
   * @param idCar Id de la voiture à retourner
   */
  export async function getDataOneCarId(idCar: number | string) {
    const routeCar = `${routeApi}car/${idCar}`;
    const res = await fetch(routeCar);
    return { json: (await res.json()), status: res.status };
  }

  /**
   * Obtient toutes les manches d'une voiture passée en paramètre
   * @param idCar Id de la voiture
   */
  export async function getAllRaceOneCar(idCar: number | string) {
    const routeRaceCar = `${routeApi}race/${idCar}`;
    const res = await fetch(routeRaceCar);
    return { json: (await res.json()), status: res.status };
  }
}

export class websocket {
  socket: Socket;
  carId?: number;

  constructor(carId?: number) {
    this.socket = io(routeApi, carId ? {
      query: {
        carId,
      },
    }: undefined);
    this.carId = carId;
  }

  destroy() {
    this.socket.disconnect();
  }

  onRankingRecieved(callback: (data: models.rankingData) => void) {
    this.socket.on('updatedRaces', callback);
    return this;
  }

  onUserRace(callback: (data: models.racesData) => void) {
    if (this.carId === undefined)
      throw new Error('carId is undefined');
    this.socket.on('updatedUserRaces', callback);
    return this;
  }
}


export namespace models {
  export interface racesData {
   races: [
     {
       id_race: number,
       race_start: Date | string,
       race_finish: Date | string,
       id_car: number,
       total_time: Date | string
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

export default restful;
