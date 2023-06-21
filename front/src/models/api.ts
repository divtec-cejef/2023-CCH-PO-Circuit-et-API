import { Socket, io } from 'socket.io-client';
import api from '@/models/api';
import type Avatar from '@/models/avatar';

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
        'Authorization': `Bearer ${token.toString()}`
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

  declare type Car = {
    idCar: number,
    pseudo: string,
    avatar: Avatar.Avatar
  }

  /**
   * Lance une requête PATCH pour modifier une voiture
   * @param userCar la voiture de l'utilisateur, contenant le token
   */
  export async function updateCar(userCar: { token: string, car: Car }) {

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

    // Envoie la requête
    const response = await fetch(`${routeApi}car`, requestOptions);

    if (!(response.status === api.ReturnCodes.Success)) {
      throw new Error('Unauthorized');
    }

    return await response.json();
  }
}

/**
 * Classe représentant une connexion au webSocket
 */
export class WebsocketConnection {
  socket: Socket;
  carId?: number;

  /**
   * Initialise une connection. Il est possible de s'identifier en passant un identifiant de voiture, ou de rester
   * anonyme en laissant le paramètre vide.
   * @param carId L'id de la voiture. La connection n'acceptera pas de UpdatedUserRaces si ce paramètre est vide.
   */
  constructor(carId?: number) {
    // Définis les paramètres du socket, si on doit passer la voiture ou pas
    const parameters =
      carId === undefined
        ? {
          query: {
            carId,
          },
        }
        : undefined;

    // Se connecte au websocket
    this.socket = io(`${(new URL(routeApi)).protocol}//${(new URL(routeApi)).host}`, parameters);
    this.carId = carId;
  }

  /**
   * Déconnecte le socket.
   */
  destroy() {
    this.socket.disconnect();
  }

  /**
   * Évènement exécuté à la mise à jour du classement
   * @param callback Code à exécuter à la réception de l'évènement
   * @event updatedRaces
   */
  onRankingReceived(callback: (data: models.rankingData) => void) {
    this.socket.on('updatedRaces', callback);
    return this;
  }

  /**
   * Évènement exécuté à la mise à jour des courses d'un utilisateur
   * <p style="color: red; font-weight: bold;">
   *   Il est nécessaire d'initialiser le websocket avec un carId pour utiliser cette fonction!
   *   </p>
   * @param callback Code à exécuter à la réception de l'évènement
   * @event updatedUserRaces
   */
  onUserRace(callback: (data: models.racesData) => void) {
    // Interdit l'utilisation de l'évènement si la connexion est anonyme
    if (this.carId === undefined)
      throw new Error('carId is undefined');

    this.socket.on('updatedUserRaces', callback);
    return this;
  }

  /**
   * Évènement exécuté à la réalisation d'activités
   * @param callback Code à exécuter à la réception de l'évènement
   * @event updatedActivities
   */
  onActivityRealisation(callback: (data: models.realisationData) => void) {
    this.socket.on('updatedActivities', callback);
    return this;
  }

  onConnectedError(callback: (error: any) => void) {
    this.socket.on('connect_error', callback);
  }
}

export namespace models {
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
      avatar: Avatar.Avatar,
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
   * Représente une donnée de statistiques sur la réalisation des activités
   */
  export interface realisationData {
    count: number,
    mostPopular: activity & {count: number}
  }
}

export default restful;
