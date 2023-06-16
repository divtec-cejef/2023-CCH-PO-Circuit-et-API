import { routeHandler } from '../../../models';
import { checkStructureOrThrow } from 'check-structure';
import { getActivityById } from '../../../services/activity/implementation';
import type { realisedActivityToCreate } from '../../../models';
import {
  createRealisedActivity,
  getRealisationCount, mostRealisedActivity,
  realisationExists
} from '../../../services/realise/implementation';
import { getCarByQueryId } from '../../../services/car/implementation';
import validateSection from '../../../services/validate-token/implementation';
import { Server } from 'socket.io';

declare type realisedActivityRequest = {
  id_activity: number,
  query_id: string,
  date_time: string,
}

/**
 * Controller post pour la route /realise/query-id
 * @param req Requete
 * @param res Reponse
 * @returns l'activité réalisée
 */
export const route: routeHandler<null, unknown, realisedActivityRequest> = async (req, res) => {
  const realisedActivity = req.body;

  // vérification de l'authentification
  const { authorization } = req.headers;
  const sectId = await validateSection(res, authorization);
  if (!sectId) {
    return;
  }

  // Vérification de la structure de la requête
  try {
    checkStructureOrThrow(realisedActivity, {
      id_activity: Number,
      query_id: String,
      date_time: Date
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

  // Vérification de l'existence de l'activité
  const activity = await getActivityById(realisedActivity.id_activity);
  if (activity === null) {
    res.status(404).json({ message: 'Activity not found' });
    return;
  }

  if (activity.id_section !== sectId) {
    res.status(403).json({ message: 'You are not allowed to perform this action.' });
    return;
  }

  // vérification de l'existence de la voiture
  if (await getCarByQueryId(realisedActivity.query_id) === null) {
    res.status(404).json({ message: 'Car not found' });
    return;
  }

  // Création de l'activité
  const realisedActivityToCreate: realisedActivityToCreate = {
    id_activity: realisedActivity.id_activity,
    query_id: realisedActivity.query_id,
    date_time: new Date(realisedActivity.date_time)
  };

  if (await realisationExists(realisedActivityToCreate)) {
    res.status(409).json({ message: 'Activity is already realised for specified car!' });
    return;
  }

  // Création de lien entre activité et voiture
  try {
    res.json(await createRealisedActivity(realisedActivityToCreate));
  } catch (e) {
    if (typeof e === 'string') {
      res.status(500).json({ message: e });
    } else if (e instanceof Error) {
      res.status(500).json({ message: e.message });
    } else {
      res.status(500).send();
    }
  }

  (res.app.get('socketio') as Server).emit('updatedActivities', {
    count: await getRealisationCount(),
    mostPopular: await mostRealisedActivity()
  });
};

export default route;
