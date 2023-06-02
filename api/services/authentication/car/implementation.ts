import prisma from '../../../clients/prismadb';
import { SHA256 } from 'crypto-js';

/**
 * Crée un token d'authentification et l'enregistre dans la base de données.
 * @param queryId L'identifiant de query de la voiture
 * @param password Le mot de passe avec lequel authentifier le token
 * @returns Le token d'authentification
 */
export const authenticateCar = async (queryId: string, password: string) => {
  const now = new Date().toISOString();
  const pwdHash = SHA256(password).toString();
  const queryIdHash = SHA256(queryId + pwdHash).toString();
  const finalHash = SHA256(now + queryIdHash).toString();

  await prisma.car_token.create({
    data: {
      token: finalHash,
      expiration_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
      car: {
        connect: {
          query_id: queryId
        }
      }
    }
  });

  return finalHash;
};
