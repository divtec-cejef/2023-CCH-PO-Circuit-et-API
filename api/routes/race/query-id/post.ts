import { RaceToCreateWithQueryId, RouteHandler } from '../../../models';
import {
  createRaceWithQueryId,
  getNumberRaces,
  getRacesByCar,
  getRankByCar,
  getShortestRace,
  getShortestRaces
} from '../../../services/race';
import { checkStructureOrThrow } from 'check-structure';
import { getCarByQueryId } from '../../../services/car';
import type { Server } from 'socket.io';
import validateSection from '../../../services/section/validate-token';
import { getSectionById } from '../../../services/section';
import { emitEvent } from "../../../clients/socketio";

declare type Datable = Date | string

declare type RaceRequest = {
  query_id: string;
  race_start: Datable;
  sector1: Datable;
  sector2: Datable;
  speed: number;
  race_finish: Datable;
};

/**
 * Controller post pour la route /race/query-id
 * @param req Requete
 * @param res Reponse
 * @returns le temps créé
 */
export const route: RouteHandler<null, unknown, RaceRequest> = async (req, res) => {
  const race = req.body;

  // vérification de l'authentification
  const { authorization } = req.headers;
  const sectId = await validateSection(res, authorization);
  if (!sectId) {
    return;
  }

  // vérifier que la section existe
  const sectionName = (await getSectionById(sectId))?.label;
  if (!sectionName) {
    res.status(404).json({ message: 'Section not found' });
    return;
  }

  let authorized = false;
  // récupérer les sections authorisées à ajouter des courses
  const sections = JSON.parse(process.env.RACE_ADDING_AUTHORIZED_SECTION || '["race"]');
  console.log(sections);
  for (const section of sections) {
    console.log(sectionName, section);
    if (section.toLowerCase() === sectionName.toLowerCase()) {
      authorized = true;
      break;
    }
  }
  // envoyer une erreur si la section n'est pas autorisée
  if (!authorized) {
    res.status(403).json({ message: 'Section not allowed to perform this action' });
    return;
  }

  // Vérification de la structure de la requête
  try {
    checkStructureOrThrow(race, {
      race_start: Date,
      sector1: Date,
      sector2: Date,
      speed: Number,
      race_finish: Date,
      query_id: String
    });
  } catch (e) {
    if (typeof e === 'string') {
      res.status(400).json({ message: e });
    } else if (e instanceof Error) {
      res.status(400).json({ message: e.message });
    } else {
      res.status(400).send();
    }
    return;
  }

  // Vérification de l'existence de la voiture
  if (await getCarByQueryId(race.query_id) === null) {
    res.status(404).json({ message: 'Car not found' });
    return;
  }

  const raceToCreate: RaceToCreateWithQueryId = {
    race_start: new Date(race.race_start),
    sector1: new Date(race.sector1),
    sector2: new Date(race.sector2),
    speed: race.speed,
    race_finish: new Date(race.race_finish),
    query_id: race.query_id
  };

  // Création de la manche
  try {
    res.json(await createRaceWithQueryId(raceToCreate));
  } catch (e) {
    if (typeof e === 'string') {
      res.status(400).json({ message: e });
    } else if (e instanceof Error) {
      res.status(400).json({ message: e.message });
    } else {
      res.status(400).send();
    }
    return;
  }

  const car = await getCarByQueryId(race.query_id);
  if (car === null) {
    res.status(500).json({ message: "Can't find car." });
    return;
  }

  // Envoi les données de classement aux clients
  const socketio: Server = res.app.get('socketio');
  await emitEvent(socketio, 'updatedRaces', {
    races: await getShortestRaces(),
    count: await getNumberRaces(),
    fastest: await getShortestRace()
  });

  const sockets = await socketio.fetchSockets();
  for (const s1 of sockets.filter(s => s.data.carId === car.id_car)) {
    await emitEvent(s1, 'updatedUserRaces', {
      races: await getRacesByCar(s1.data.carId),
      rank: await getRankByCar(s1.data.carId)
    })
  }
};

export default route;
