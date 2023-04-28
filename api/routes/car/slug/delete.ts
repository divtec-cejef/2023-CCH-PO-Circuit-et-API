import type { routeHandler } from '../../../models/';
import {deleteCarById} from '../../../services/car/implementation';

/**
 * Controller delete pour la route /car/query-id/:slug
 * @param req Requete
 * @param res Reponse
 * @returns une voiture correspondant à l'ID de query
 */
const route: routeHandler = async (req, res) => {
    const id = parseInt(req.params.slug);

    if (typeof id === null || isNaN(id)) {
        res.status(400).json({ error: 'Invalid id' });
        return;
    }

    const car = await deleteCarById(id);

    if (!car) {
        res.status(404).json({ error: 'Car not found' });
        return;
    }

    res.json(car);
};
export default route;