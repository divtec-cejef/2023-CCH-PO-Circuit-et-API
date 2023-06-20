import { Socket, io } from 'socket.io-client';
import type { models } from '@/models/interface';
import api from '@/models/api';

const routeApi: string = import.meta.env.VITE_ROUTE_API;

export namespace restful {
  export enum ReturnCodes {
    NoCode = 0,
    Success = 200,
    NotFound = 404,
    Conflict = 409,
    BadGateway = 502,
    Unauthorized = 401
  }

  export const ERROR_MESSAGE = 'Error';

  /**
   * Retourne les données d'une voiture en fonction de son ID
   * @param queryId Query id de la voiture à retourner
   */
  export async function getDataOneCarQueryId(queryId: number | string) {
    try {
      const routeCar = `${routeApi}car/query-id/${queryId}`;
      const res = await fetch(routeCar);
      return { json: (await res.json()), status: res.status };
    } catch (e) {
      return { json: ERROR_MESSAGE, status: ReturnCodes.BadGateway };
    }
  }

  /**
   * Retourne les données d'une voiture en fonction de son ID
   * @param idCar Id de la voiture à retourner
   */
  export async function getDataOneCarId(idCar: number | string) {
    try {
      const routeCar = `${routeApi}car/${idCar}`;
      const res = await fetch(routeCar);
      return { json: (await res.json()), status: res.status };
    } catch (e) {
      return { json: ERROR_MESSAGE, status: ReturnCodes.BadGateway };
    }
  }

  /**
   * Obtient toutes les manches d'une voiture passée en paramètre
   * @param idCar Id de la voiture
   */
  export async function getAllRaceOneCar(idCar: number | string) {
    try {
      const routeRaceCar = `${routeApi}race/${idCar}`;
      const res = await fetch(routeRaceCar);
      return { json: (await res.json()), status: res.status };
    } catch (e) {
      return { json: ERROR_MESSAGE, status: ReturnCodes.BadGateway };
    }
  }

  /**
   * Obtient le nom d'une section en fonction de son id
   * @param idSection Id de la section
   */
  export async function getNameSectionById(idSection: number | string) {
    try {
      const routeRaceCar = `${routeApi}section/${idSection}`;
      const res = await fetch(routeRaceCar);
      return { json: (await res.json()), status: res.status };
    } catch (e) {
      return { json: ERROR_MESSAGE, status: ReturnCodes.BadGateway };
    }
  }

  /**
   * Obtient toutes les activités présente dans une section
   * @param idSection Id de la section
   */
  export async function getAllActivityOneSection(idSection: number | string) {
    try {
      const routeRaceCar = `${routeApi}activity/by-section/${idSection}`;
      const res = await fetch(routeRaceCar);
      return { json: (await res.json()), status: res.status };
    } catch (e) {
      return { json: ERROR_MESSAGE, status: ReturnCodes.BadGateway };
    }
  }

  /**
   * Lance une requête POST pour récupérer un token d'authentification
   * @param sectionName Nom de la section
   * @param pwd Mot de passe de la section
   */
  export async function authenticationSectionPwd(sectionName: string, pwd: string) {

    //Construction des options de requête
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        // eslint-disable-next-line camelcase
        section: sectionName,
        // eslint-disable-next-line camelcase
        password: pwd
      })
    };

    try {
      const response = await fetch(`${routeApi}authentication`, requestOptions);
      return await response.json();
    } catch (e) {
      return { json: ERROR_MESSAGE, status: ReturnCodes.BadGateway };
    }
  }

  /**
   * Lance une requête POST pour l'ajout d'une nouvelle activité pour une voiture
   * @param idActivity Nom de la section
   * @param queryId Query id de la voiture
   * @param token Token d'identification
   */
  export async function addRealisationCar(idActivity: number, queryId: number | string, token: string) {

    // POST request using fetch with async/await
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token.toString()}`
      },

      body: JSON.stringify({
        // eslint-disable-next-line camelcase
        id_activity: idActivity,
        // eslint-disable-next-line camelcase
        query_id: queryId,
        // eslint-disable-next-line camelcase
        date_time: new Date()
      })
    };

    try {
      const response = await fetch(`${routeApi}realise/query-id`, requestOptions);
      return response.status;
    } catch (e) {
      return { json: ERROR_MESSAGE, status: ReturnCodes.BadGateway };
    }
  }

  /**
   * Lance une requête POST pour récupérer un token d'authentification
   * @param queryId Identifiant d'url de la voiture
   * @param pwd Mot de passe de la voiture
   */
  export async function authenticationQueryIdPwd(queryId: string, pwd: string) {

    //Construction des options de requête
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        // eslint-disable-next-line camelcase
        query_id: queryId,
        // eslint-disable-next-line camelcase
        password: pwd
      })
    };
    const response = await fetch(`${routeApi}authentication/car`, requestOptions);
    return await response.json();
  }


  export async function updateCar(userCar: any) {

    const requestOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userCar.token}`
      },

      body: JSON.stringify({
        // eslint-disable-next-line camelcase
        id_car: userCar.car.idCar,
        // eslint-disable-next-line camelcase
        pseudo: userCar.car.pseudo,
        // eslint-disable-next-line camelcase
        avatar: userCar.car.avatar,
      })
    };

    const response = await fetch(`${routeApi}car`, requestOptions);

    if (!(response.status === api.ReturnCodes.Success)) {
      throw new Error('Unauthorized');
    }

    return await response.json();
  }
}

export class websocket {
  socket: Socket;
  carId?: number;

  constructor(carId?: number) {
    this.socket = io(`${(new URL(routeApi)).protocol}//${(new URL(routeApi)).host}`, carId ? {
      query: {
        carId,
      },
    } : undefined);
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

  onActivityRealisation(callback: (data: models.realisationData ) => void) {
    this.socket.on('updatedActivities', callback);
    return this;
  }

  onConnectedError(callback: (error: any) => void) {
    this.socket.on('connect_error', callback);
  }
}

export default restful;
