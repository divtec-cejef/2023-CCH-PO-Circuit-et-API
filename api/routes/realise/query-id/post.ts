import { routeHandler } from '../../../models';
import { checkStructureOrThrow } from 'check-structure';
import { getActivityById } from '../../../services/activity/implementation';
import type { realisedActivityToCreate } from '../../../models';
import { createRealisedActivity } from '../../../services/realise/implementation';
import { getCarByQueryId } from '../../../services/car/implementation';
import validateSection from '../../../services/validate-token/implementation';

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
      res.status(400).json({ error: e });
    } else if (e instanceof Error) {
      res.status(400).json({ error: e.message });
    } else {
      res.status(400).send();
    }
    return;
  }

  // Vérification de l'existence de l'activité
  const activity = await getActivityById(realisedActivity.id_activity);
  if (activity === null) {
    res.status(404).json({ error: 'Activity not found' });
    return;
  }

  if (activity.id_section !== sectId) {
    res.status(403).json({ error: 'You are not allowed to perform this action.' });
  }

  // vérification de l'existence de la voiture
  if (await getCarByQueryId(realisedActivity.query_id) === null) {
    res.status(404).json({ error: 'Car not found' });
    return;
  }

  // Création de l'activité
  const realisedActivityToCreate: realisedActivityToCreate = {
    id_activity: realisedActivity.id_activity,
    query_id: realisedActivity.query_id,
    date_time: new Date(realisedActivity.date_time)
  };

  // Création de lien entre activité et voiture
  try {
    res.json(await createRealisedActivity(realisedActivityToCreate));
  } catch (e) {
    if (typeof e === 'string') {
      res.status(500).json({ error: e });
    } else if (e instanceof Error) {
      res.status(500).json({ error: e.message });
    } else {
      res.status(500).send();
    }
  }
};

export default route;
