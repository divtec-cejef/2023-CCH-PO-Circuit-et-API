import { routeHandler } from '../../../models';
import { checkStructureOrThrow } from 'check-structure';
import { SHA256 } from 'crypto-js';
import { getPasswordByQueryId } from '../../../services/car/implementation';
import { authenticateCar } from '../../../services/authentication/car/implementation';

export const route: routeHandler<null, unknown, { query_id: string, password: string }> = async (req, res) => {
  // Vérification des types de données
  try {
    checkStructureOrThrow(req.body, {
      query_id: String,
      password: String
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

  // Récupération des données
  const { password } = req.body;
  const queryId = req.body.query_id;

  const reqPassword = SHA256(password).toString();
  // récupération du mot de passe de la voiture
  let dbPassword = '';
  try {
    dbPassword = await getPasswordByQueryId(queryId);
  } catch (e) {
    res.status(401).json({ message: 'Invalid credentials.' });
    return;
  }

  // Vérification du mot de passe
  if (dbPassword !== reqPassword) {
    res.status(401).json({ message: 'Invalid credentials.' });
    return;
  }

  // Création du token
  let token = '';
  try {
    token = await authenticateCar(queryId, password);
  } catch (e) {
    if (typeof e === 'string') {
      res.status(500).json({ message: e });
    } else if (e instanceof Error) {
      res.status(500).json({ message: e.message });
    } else {
      res.status(500).send();
    }
    return;
  }

  // Envoi du token
  res.status(200).json({ token });
};

export default route;
