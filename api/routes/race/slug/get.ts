import type { routeHandler } from '../../../models';
import { getRacesByCar } from '../../../services/race/implementation';
import { getCarById } from '../../../services/car/implementation';

/**
 * Controller pour la route /race/:slug
 * @param req Requete
 * @param res Reponse
 * @returns Toutes les manches faites par une voiture
 */
const route: routeHandler = async (req, res) => {

    const id = parseInt(req.params.slug);

    if (typeof id === null || isNaN(id)) {
        res.status(400).json({ error: 'Invalid id' });
        return;
    }

    if (await getCarById(id) === null) {
        res.status(404).json({ error: 'Car not found' });
        return;
    }

    res.json(await getRacesByCar(id));
};
export default route;
