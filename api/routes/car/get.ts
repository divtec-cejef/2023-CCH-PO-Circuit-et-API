import type { RouteHandler } from '../../models';
import { getCars } from '../../services/car';

/**
 * Controller get pour la route /car/query-id/
 * @param req Requete
 * @param res Reponse
 * @returns toutes les voitures
 */
const route: RouteHandler = async (req, res) => {
  res.json(await getCars());
};
export default route;
