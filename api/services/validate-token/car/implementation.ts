import type { Response } from 'express';
import { verifyCarToken } from '../../authentication/car/implementation';

/**
 * Vérifie l'authentification d'une voiture
 * @param res La réponse qui est renvoyée au client
 * @param authorization L'entête d'authentification
 * @returns L'identifiant de la voiture si l'authentification est valide, false sinon
 */
export const validateCarAuthorization = async (res: Response, authorization: string | undefined) => {
  // Vérification de la présence du token
  if (authorization === undefined) {
    res.status(401)
      .header('WWW-Authenticate', 'POST /authentication with query id and password to login')
      .json({ message: 'Unauthorised.' });

    return false;
  }

  if (!authorization.startsWith('Bearer')) {
    res.status(401)
      .header('WWW-Authenticate', 'POST /authentication with query id and password to login')
      .json({ message: 'Unauthorised.' });

    return false;
  }

  // Vérification de l'existence du token
  let auth;
  try {
    auth = await verifyCarToken(authorization.slice(7));
  } catch (e) {
    res.status(401)
      .header('WWW-Authenticate', 'POST /authentication with query id and password to login')
      .json({ message: 'Invalid token.' });

    return false;
  }

  // Vérification de la période de validité du token
  if (auth.expiration_date < new Date()) {
    res.status(401)
      .header('WWW-Authenticate', 'POST /authentication with query id and password to login')
      .json({ message: 'Token expired.' });

    return false;
  }

  return auth.car.id_car;
};

export default validateCarAuthorization;
