import type { routeHandler } from '../../../models';
import { getSectionById } from '../../../services/section/implementation';

/**
 * Controller pour la route /section/:slug
 * @param req Requete
 * @param res Reponse
 * @returns La section correspondante à l'id
 */
const route: routeHandler<{ slug: string; }> = async (req, res) => {
  const id = parseInt(req.params.slug);

  // Vérification de l'id
  if (typeof id === null || isNaN(id)) {
    res.status(400).json({ error: 'Invalid id' });
    return;
  }

  const section = await getSectionById(id);

  // Vérification de l'existence de la section
  if (section === null) {
    res.status(404).json({ error: 'Section not found' });
    return;
  }

  // Envoi des informations
  res.json(section);
};
export default route;
