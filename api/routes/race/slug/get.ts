import type { RouteHandler } from '../../../models';
import { getRacesByCar, getRankByCar } from '../../../services/race';
import { getCarById } from '../../../services/car';

/**
 * Controller pour la route /race/:slug
 * @param req Requete
 * @param res Reponse
 * @returns Toutes les manches faites par une voiture
 */
const route: RouteHandler<{ slug: string; }> = async (req, res) => {
  const id = parseInt(req.params.slug);

  if (typeof id === null || isNaN(id)) {
    res.status(400).json({ message: 'Invalid id' });
    return;
  }

  if (await getCarById(id) === null) {
    res.status(404).json({ message: 'Car not found' });
    return;
  }

  res.json({
    races: [...(await getRacesByCar(id))
    ],
    rank: await getRankByCar(id)
  });
};
export default route;
