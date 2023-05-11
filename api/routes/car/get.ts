import type { routeHandler } from '../../models';
import { getCars } from '../../services/car/implementation';

/**
 * Controller get pour la route /car/query-id/
 * @param req Requete
 * @param res Reponse
 * @returns toutes les voitures
 */
const route: routeHandler = async (req, res) => {
	res.json(await getCars());
};
export default route;
