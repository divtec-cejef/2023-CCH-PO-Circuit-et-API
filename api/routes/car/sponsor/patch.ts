import { RouteHandler } from '../../../models';
import { updateCarSponsor } from '../../../services/car/sponsor/patch';

/**
 * Controller patch pour /car/sponsor?id=...
 * Modifie uniquement le sponsor, sans token
 */
export const route: RouteHandler<null, unknown, { sponsor: string }> = async (req, res) => {
  const { sponsor } = req.body;
  const carIdQuery = Number(req.query.id);

  // Vérification du sponsor
  if (!sponsor || typeof sponsor !== 'string') {
    res.status(400).json({ message: 'Sponsor must be a string.' });
    return;
  }

  // Vérification du query_id
  if (isNaN(carIdQuery)) {
    res.status(400).json({ message: 'Invalid car id in query.' });
    return;
  }

  try {
    // Met à jour le sponsor
    const updatedCar = await updateCarSponsor(String(carIdQuery), sponsor);
    res.status(200).json(updatedCar);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Impossible de mettre à jour le sponsor.' });
  }
};

export default route;
