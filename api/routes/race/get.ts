import { RouteHandler } from '../../models';
import { getLastRace } from '../../services/race';

/**
 * Controller pour récupérer la dernière course
 */
export const route: RouteHandler = async (req, res) => {
  try {
    const lastRace = await getLastRace();
    if (!lastRace) return res.status(404).json({ message: 'Aucune course trouvée' });
    res.json(lastRace);
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
