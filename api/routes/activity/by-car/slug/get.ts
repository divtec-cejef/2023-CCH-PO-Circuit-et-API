import type { routeHandler } from '../../../../models';
import { getCarById } from '../../../../services/car/implementation';
import { getActivitiesByCarId } from '../../../../services/activity/implementation';

/**
 * Controller pour la route /activity/:slug
 * @param req Requete
 * @param res Reponse
 * @returns une activité correspondant à l'id de la section
 */
const route: routeHandler<{ slug: string; }> = async (req, res) => {
  const id = parseInt(req.params.slug);

  // vérifie la validité de l'id
  if (typeof id === null || isNaN(id)) {
    res.status(400).json({ error: 'Invalid id' });

    return;
  }

  // vérifie l'existence de la voiture
  if (await getCarById(id) === null) {
    res.status(404).json({ error: 'Car not found' });
    return;
  }

  // retourne les activités de la voiture
  res.json(await getActivitiesByCarId(id));
};
export default route;
