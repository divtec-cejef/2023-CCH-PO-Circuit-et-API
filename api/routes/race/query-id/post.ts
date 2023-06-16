import { raceToCreateWithQueryId, routeHandler } from '../../../models';
import {
  createRaceWithQueryId, getNumberRaces,
  getRacesByCar,
  getRankByCar, getShortestRace,
  getShortestRaces
} from '../../../services/race/implementation';
import { checkStructureOrThrow } from 'check-structure';
import { getCarByQueryId } from '../../../services/car/implementation';
import type { Server } from 'socket.io';

declare type datable = Date | string

declare type raceRequest = {
  query_id: string,
  race_start: datable,
  sector1: datable
  race_finish: datable;
};

/**
 * Controller post pour la route /race/query-id
 * @param req Requete
 * @param res Reponse
 * @returns le temps créé
 */
export const route: routeHandler<null, unknown, raceRequest> = async (req, res) => {
  const race = req.body;

  // Vérification de la structure de la requête
  try {
    checkStructureOrThrow(race, {
      race_start: Date,
      sector1: Date,
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

  const raceToCreate: raceToCreateWithQueryId = {
    race_start: new Date(race.race_start),
    sector1: new Date(race.sector1),
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
  (res.app.get('socketio') as Server).emit('updatedRaces', {
    races: await getShortestRaces(),
    count: await getNumberRaces(),
    fastest: await getShortestRace()
  });
  const sockets = await (res.app.get('socketio') as Server).fetchSockets();
  for (const s1 of sockets.filter(s => s.data.carId === car.id_car)) {
    s1.emit('updatedUserRaces', {
      races: await getRacesByCar(s1.data.carId),
      rank: await getRankByCar(s1.data.carId)
    });
  }
};

export default route;
