import type { RouteHandler } from '../../models';
import { getSections } from '../../services/section';

/**
 * Controller get pour la route /section/
 * @param req Requete
 * @param res Reponse
 * @returns toutes les sections
 */
const route: RouteHandler = async (req, res) => {
  res.json(await getSections());
};
export default route;
