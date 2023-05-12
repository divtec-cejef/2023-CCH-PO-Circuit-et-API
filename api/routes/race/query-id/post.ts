import { raceToCreateWithQueryId, routeHandler } from '../../../models';
import { createRaceWithQueryId, getShortestRaces } from '../../../services/race/implementation';
import { checkStructureOrThrow } from 'check-structure';
import { getCarByQueryId } from '../../../services/car/implementation';
import type { Server } from 'socket.io';

declare type raceRequest = {
  query_id: string,
  race_start: Date | string,
  race_finish: Date | string;
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
      race_finish: Date,
      query_id: String
    });
  } catch (e) {
    if (typeof e === 'string') {
      res.status(400).json({ error: e });
    } else if (e instanceof Error) {
      res.status(400).json({ error: e.message });
    } else {
      res.status(400).send();
    }
    return;
  }

  // Vérification de l'existence de la voiture
  if (await getCarByQueryId(race.query_id) === null) {
    res.status(404).json({ error: 'Car not found' });
    return;
  }

  const raceToCreate: raceToCreateWithQueryId = {
    race_start: new Date(race.race_start),
    race_finish: new Date(race.race_finish),
    query_id: race.query_id
  };

  // Création de la manche
  try {
    res.json(await createRaceWithQueryId(raceToCreate));
  } catch (e) {
    if (typeof e === 'string') {
      res.status(400).json({ error: e });
    } else if (e instanceof Error) {
      res.status(400).json({ error: e.message });
    } else {
      res.status(400).send();
    }
    return;
  }

  // Envoi les données de classement aux clients
  (res.app.get('socketio') as Server).emit('updatedRaces', await getShortestRaces());
  const sockets = await (res.app.get('socketio') as Server).fetchSockets();
  sockets.filter(s => s.data.carId === race.query_id).forEach(async s => s.emit('updatedUserRaces', await getShortestRaces()));
};

export default route;
