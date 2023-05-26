import prisma from '../../clients/prismadb';
import { SHA256 } from 'crypto-js';

/**
 * Permet d'obtenir le mot de passe d'une section en fonction de son nom
 * @param name Le nom de la section
 * @
 */
export const getPasswordBySectionName = async (name: string) => {
  const section = await prisma.section.findFirstOrThrow({
    where: {
      label: {
        equals: name,
        mode: 'insensitive'
      }
    }
  });

  return section.password;
};

/**
 * Crée un token d'authentification et l'enregistre dans la base de données.
 * @param section La section à laquelle appartient le token
 * @param password Le mot de passe avec le quel authentifier le token
 */
export const authenticateSection = async (section: string, password: string) => {
  const now = new Date().toISOString();
  const pwdHash = SHA256(password).toString();
  const unameHash = SHA256(section + pwdHash).toString();
  const finalHash = SHA256(now + unameHash).toString();

  const sectionName = (await prisma.section.findFirstOrThrow({
    where: {
      label: {
        equals: section,
        mode: 'insensitive'
      }
    }
  })).label;

  if (pwdHash !== await getPasswordBySectionName(section)) {
    throw new Error('invalid password!');
  }

  await prisma.token.create({
    data: {
      token: finalHash,
      expiration_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
      section: {
        connect: {
          label: sectionName
        }
      }
    }
  });

  return finalHash;
};

/**
 * Permet de vérifier si un token est valide. Retourne la date d'exiration et la section a la quelle se rapporte le token.
 * @param token Le token a vérifier.
 */
export const verifyToken = async (token: string) => {
  return await prisma.token.findUniqueOrThrow({
    where: {
      token
    },
    select: {
      expiration_date: true,
      token: true,
      section: {
        select: {
          label: true,
          id_section: true
        }
      }
    }
  });
};
