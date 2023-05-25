import prisma from '../../clients/prismadb';

/**
 * Retourne les activités correspondantes à l'id de la section donnée
 * @param id id de la section
 * @returns une liste d'activités correspondantes à l'id de la section donnée
 */
export const getActivitiesBySectionId = async (id: number) => {
  return await prisma.activity.findMany({
    where: {
      id_section: id
    },
    select: {
      id_activity: true,
      label: true,
      id_section: true
    }
  });
};
