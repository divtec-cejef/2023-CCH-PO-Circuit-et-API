import prisma from '../../clients/prismadb';
import bcrypt from 'bcrypt';

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
  const pwdHash = await bcrypt.hash(password, 10);
  const unameHash = await bcrypt.hash(section + pwdHash, 10);
  const finalHash = await bcrypt.hash(now + unameHash, 10);

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
