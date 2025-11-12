import { RouteHandler } from '../../../models';
import validateCarAuthorization from '../../../services/car/validate-token';
import { updateCarSponsor } from '../../../services/car';

interface UpdateSponsorBody {
    query_id: string;
    sponsorName: string;
}

export const route: RouteHandler<null, unknown, UpdateSponsorBody> = async (req, res) => {
  const { query_id, sponsorName } = req.body;

  // vérification de l'authentification
  const { authorization } = req.headers;
  const carId = await validateCarAuthorization(res, authorization);
  if (!carId) return;

  // Vérification de l'id
  if (!query_id || query_id.trim() === '') {
    res.status(400).json({ message: 'Invalid id' });
    return;
  }

  // Vérification du sponsorName
  if (!sponsorName || sponsorName.trim() === '') {
    res.status(400).json({ message: 'Sponsor name is required' });
    return;
  }

  // Vérification de l'autorisation
  if (String(carId) !== query_id) {
    res.status(403).json({ message: 'Not allowed' });
    return;
  }

  // Mise à jour du sponsor
  try {
    const updatedCar = await updateCarSponsor(query_id, sponsorName);
    res.status(200).json(updatedCar);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du sponsor' });
  }
};

export default route;
