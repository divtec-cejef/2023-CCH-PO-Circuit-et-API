import type { Response } from 'express';
import { verifyToken } from '../authentication/implementation';

export const validateSection = async (res: Response, authorization: string | undefined) => {
  // Vérifie si l'authentification est disponible
  if (authorization === undefined) {
    res.status(401)
      .header('WWW-Authenticate', 'POST /authentication with section name and password to login')
      .json({ message: 'Unauthorised.' });
    return false;
  }

  // Vérifie si l'authentification est de type Bearer
  if (!authorization.startsWith('Bearer')) {
    res.status(401)
      .header('WWW-Authenticate', 'POST /authentication with section name and password to login')
      .json({ message: 'Unauthorised.' });
    return false;
  }

  // Vérifie si le token existe
  let auth;
  try {
    auth = await verifyToken(authorization.slice(7));
  } catch (e) {
    res.status(401)
      .header('WWW-Authenticate', 'POST /authentication with section name and password to login')
      .json({ message: 'Invalid token.' });
    return false;
  }

  // Vérification de la période de validité du token
  if (auth.expiration_date < new Date()) {
    res.status(401)
      .header('WWW-Authenticate', 'POST /authentication with section name and password to login')
      .json({ message: 'Token expired.' });
    return false;
  }

  return auth.section.id_section;
};

export default validateSection;
