import { routeHandler } from '../../models';
import { checkStructureOrThrow } from 'check-structure';
import { getActivityById } from '../../services/activity/implementation';
import type { realisedActivityToCreate } from '../../models';
import { createRealisedActivity, realisationExists } from '../../services/realise/implementation';
import { getCarById } from '../../services/car/implementation';
import validateSection from '../../services/validate-token/implementation';

declare type realisedActivityRequest = {
  id_activity: number,
  id_car: number,
  date_time: string,
}

export const route: routeHandler<null, unknown, realisedActivityRequest> = async (req, res) => {
  const realisedActivity = req.body;

  const { authorization } = req.headers;
  const sectId = await validateSection(res, authorization);
  if (!sectId) {
    return;
  }

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
    return;
  }

  // Création de l'activité
  const realisedActivityToCreate: realisedActivityToCreate = {
    id_activity: realisedActivity.id_activity,
    id_car: realisedActivity.id_car,
    date_time: new Date(realisedActivity.date_time)
  };

  if (await realisationExists(realisedActivityToCreate)) {
    res.status(409).json({ message: 'Activity is already realised for specified car!' });
    return;
  }

  // vérification de l'existence de la voiture

  if (await getCarById(realisedActivity.id_car) === null) {
    res.status(404).json({ error: 'Car not found' });
    return;
  }

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
