import type { routeHandler } from '../../../models';
import { getCarById } from '../../../services/car/implementation';

/**
 * Controller pour la route /car/:slug
 * @param req Requete
 * @param res Reponse
 * @returns une voiture correspondant à son ID
 */
const route: routeHandler<{ slug: string; }> = async (req, res) => {
  const id = parseInt(req.params.slug);

  if (typeof id === null || isNaN(id)) {
    res.status(400).json({ message: 'Invalid id' });

    return;
  }

  const car = await getCarById(id);

  if (!car) {
    res.status(404).json({ message: 'Car not found' });
    return;
  }

  res.json(car);
};
export default route;
