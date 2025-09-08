import { RouteHandler } from '../../../models';
import { getLastRace } from '../../../services/race';

export const route: RouteHandler = async (req, res) => {
  try {
    const lastRace = await getLastRace();
    if (!lastRace) return res.status(404).json({ message: 'Aucune course trouvée' });

    res.json({
      race: lastRace
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Erreur serveur inconnue';
    res.status(500).json({ message });
  }
};

export default route;
