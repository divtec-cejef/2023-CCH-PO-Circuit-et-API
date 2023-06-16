import prisma from '../../clients/prismadb';

/**
 * Retourne la section correpsondante à l'id
 * @param id id de la section
 * @returns une section correspondante à l'id ou null si pas de section correspondante
 */
export const getSectionById = async (id: number) => {
  return await prisma.section.findFirst({
    where: {
      id_section: id
    },
    select: {
      id_section: true,
      label: true
    }
  });
};
