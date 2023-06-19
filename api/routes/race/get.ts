import { routeHandler } from '../../models';
import { getShortestRaces } from '../../services/race';

/**
 * Controller get pour la route /race
 * @param req Requete
 * @param res Reponse
 * @returns toutes les voitures
 */
export const route: routeHandler = async (req, res) => {
  try {
    res.json(await getShortestRaces());
  } catch (e) {
    if (typeof e === 'string') {
      res.status(500).json({ message: e });
    } else if (e instanceof Error) {
      res.status(500).json({ message: e.message });
    } else {
      res.status(500).send();
    }
  }
};
export default route;
