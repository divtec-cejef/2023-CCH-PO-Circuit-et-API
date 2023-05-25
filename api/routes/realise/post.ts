import { routeHandler } from '../../models';
import { checkStructureOrThrow } from 'check-structure';
import { getActivityById } from '../../services/activity/implementation';
import type { realisedActivityToCreate } from '../../models';
import { createRealisedActivity } from '../../services/realise/implementation';

declare type realisedActivityRequest = {
  id_activity: number,
  id_car: number,
  date_time: string,
}

export const route: routeHandler<null, unknown, realisedActivityRequest> = async (req, res) => {
  const realisedActivity = req.body;

  // Vérification de la structure de la requête
  try {
    checkStructureOrThrow(realisedActivity, {
      id_activity: Number,
      id_car: Number,
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
  }

  // Vérification de l'existence de l'activité
  if (await getActivityById(realisedActivity.id_activity) === null) {
    res.status(404).json({ error: 'Activity not found' });
    return;
  }

  // Création de l'activité
  const realisedActivityToCreate: realisedActivityToCreate = {
    id_activity: realisedActivity.id_activity,
    id_car: realisedActivity.id_car,
    date_time: new Date(realisedActivity.date_time)
  };

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
