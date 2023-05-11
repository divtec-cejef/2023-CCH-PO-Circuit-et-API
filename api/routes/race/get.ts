import { routeHandler } from '../../models';
import { getShortestRaces } from '../../services/race/implementation';

/**
 * Controller get pour la route /race
 * @param req Requete
 * @param res Reponse
 * @returns toutes les voitures
 */
export const route: routeHandler = async (req, res) => {
  try {
    res.json(await getShortestRaces());
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};

export default route;
