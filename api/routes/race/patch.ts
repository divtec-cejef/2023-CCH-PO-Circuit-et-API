import { routeHandler } from '../../models';
import {
  addUrlToRace,
  getRaceById
} from '../../services/race';
import { checkStructureOrThrow } from 'check-structure';
import validateSection from '../../services/section/validate-token';
import { getSectionById } from '../../services/section';

declare type raceUrlRequest = {
  id_race: number,
  video_url: string,
};

/**
 * Controller patch pour la route /race/
 * @param req Requete
 * @param res Reponse
 * @returns la manche
 */
export const route: routeHandler<null, unknown, raceUrlRequest> = async (req, res) => {
  const raceUrl = req.body;

  // vérification de l'authentification
  const { authorization } = req.headers;
  const sectId = await validateSection(res, authorization);
  if (!sectId) {
    return;
  }

  // vérifier que la section existe
  const sectionName = (await getSectionById(sectId))?.label;
  if (!sectionName) {
    res.status(404).json({ message: 'Section not found' });
    return;
  }

  let authorized = false;
  // récupérer les sections autorisées à ajouter des courses
  const sections = JSON.parse(process.env.RACE_ADDING_AUTHORIZED_SECTION || '');
  console.log(sections);
  for (const section of sections) {
    console.log(sectionName, section);
    if (section.toLowerCase() === sectionName.toLowerCase()) {
      authorized = true;
      break;
    }
  }
  // envoyer une erreur si la section n'est pas autorisée
  if (!authorized) {
    res.status(403).json({ message: 'Section not allowed to perform this action' });
    return;
  }

  // Vérification de la structure de la requête
  try {
    checkStructureOrThrow(raceUrl, {
      id_race: Number,
      video_url: String
    });
  } catch (e) {
    if (typeof e === 'string') {
      res.status(400).json({ message: e });
    } else if (e instanceof Error) {
      res.status(400).json({ message: e.message });
    } else {
      res.status(400).send();
    }
    return;
  }

  // Vérification de l'existence de la manche
  if (await getRaceById(raceUrl.id_race) === null) {
    res.status(404).json({ message: 'Race not found' });
    return;
  }

  // Ajout de l'url à la course
  try {
    res.json(await addUrlToRace(raceUrl.id_race, raceUrl.video_url));
  } catch (e) {
    if (typeof e === 'string') {
      res.status(400).json({ message: e });
    } else if (e instanceof Error) {
      res.status(400).json({ message: e.message });
    } else {
      res.status(400).send();
    }
  }
};

export default route;
