import { routeHandler } from '../../models';
import { checkStructureOrThrow } from 'check-structure';
import { getActivityById } from '../../services/activity/implementation';
import type { realisedActivityToCreate } from '../../models';
import { createRealisedActivity } from '../../services/realise/implementation';
import { getCarById } from '../../services/car/implementation';
import { verifyToken } from '../../services/authentication/implementation';
import { getSectionById } from '../../services/section/implementation';

declare type realisedActivityRequest = {
  id_activity: number,
  id_car: number,
  date_time: string,
}

export const route: routeHandler<null, unknown, realisedActivityRequest> = async (req, res) => {
  const realisedActivity = req.body;

  const { authorization } = req.headers;

  // Vérifie si l'authentification est disponible
  if (authorization === undefined) {
    res.status(401)
      .header('WWW-Authenticate', 'POST /authentication with section name and password to login')
      .json({ error: 'Unauthorised.' });
    return;
  }

  // Vérifie si l'authentification est de type Bearer
  if (!authorization.startsWith('Bearer')) {
    res.status(401)
      .header('WWW-Authenticate', 'POST /authentication with section name and password to login')
      .json({ error: 'Unauthorised.' });
    return;
  }

  // Vérifie si le token existe
  let auth;
  try {
    auth = await verifyToken(authorization.slice(7));
  } catch (e) {
    res.status(401)
      .header('WWW-Authenticate', 'POST /authentication with section name and password to login')
      .json({ error: 'Invalid token.' });
    return;
  }

  // Vérification de la période de validité du token
  if (auth.expiration_date < new Date()) {
    res.status(401)
      .header('WWW-Authenticate', 'POST /authentication with section name and password to login')
      .json({ error: 'Token expired.' });
    return;
  }

  // Vérification de la structure de la requête
  try {
    checkStructureOrThrow(realisedActivity, {
      id_activity: Number,
      id_car: Number,
      date_time: Date
    });
  } catch (e) {
    if (typeof e === 'string') {
      res.status(400).json({ error: e });
    } else if (e instanceof Error) {
      res.status(400).json({ error: e.message });
    } else {
      res.status(400).send();
    }
    return;
  }

  // Vérification de l'existence de l'activité
  const activity = await getActivityById(realisedActivity.id_activity);
  if (activity === null) {
    res.status(404).json({ error: 'Activity not found' });
    return;
  }

  // Vérification des authorisations de l'utilisateur
  if ((await getSectionById(activity.id_section))?.label.toLowerCase() !== auth.section.label.toLowerCase()) {
    res.status(403).json({ error: 'Forbidden.' });
    return;
  }

  // Création de l'activité
  const realisedActivityToCreate: realisedActivityToCreate = {
    id_activity: realisedActivity.id_activity,
    id_car: realisedActivity.id_car,
    date_time: new Date(realisedActivity.date_time)
  };

  // vérification de l'existence de la voiture
  if (await getCarById(realisedActivity.id_car) === null) {
    res.status(404).json({ error: 'Car not found' });
    return;
  }

  // Création de lien entre activité et voiture
  try {
    res.json(await createRealisedActivity(realisedActivityToCreate));
  } catch (e) {
    if (typeof e === 'string') {
      res.status(500).json({ error: e });
    } else if (e instanceof Error) {
      res.status(500).json({ error: e.message });
    } else {
      res.status(500).send();
    }
  }
};

export default route;
