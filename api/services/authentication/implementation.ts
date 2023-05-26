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

export const authenticateSection = async (section: string, password: string) => {
  const now = new Date().toString();
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
