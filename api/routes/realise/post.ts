import { routeHandler } from '../../models';
import { checkStructureOrThrow } from 'check-structure';
import { getActivityById } from '../../services/activity/implementation';

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
      date_time: String
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
};

export default route;
