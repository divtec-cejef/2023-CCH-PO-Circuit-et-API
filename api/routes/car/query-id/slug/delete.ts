import type { routeHandler } from '../../../../models/';
import { deleteCarByQueryId } from '../../../../services/car/implementation';

/**
 * Controller delete pour la route /car/query-id/:slug
 * @param req Requete
 * @param res Reponse
 * @returns une voiture correspondant à l'ID de query
 */
const route: routeHandler = async (req, res) => {
  if (!req.params.slug) {
    console.log('No given ID');
    res.status(400).json({ error: 'No given ID' });
    return;
  }

  const id = req.params.slug;
  const car = await deleteCarByQueryId(id);

  if (!car) {
    res.status(404).json({ error: 'Car not found' });
    return;
  }

  res.json(car);
};
export default route;
