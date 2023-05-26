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

/**
 * Retourne l'activité correspondante à l'id donné
 * @param id id de l'activité
 * @returns une activité correspondante à l'id donné, null sinon
 */
export const getActivityById = async (id: number) => {
  return await prisma.activity.findUnique({
    where: {
      id_activity: id
    },
    select: {
      id_activity: true,
      label: true,
      id_section: true
    }
  });
};

/**
 * Donne les activités qui ont été réalisées par le propriétaire d'une voiture
 * @param id id de la voiture
 * @returns une liste d'activités réalisées par le propriétaire d'une voiture
 */
export const getActivitiesByCarId = async (id: number) => {
  return await prisma.$queryRaw`SELECT realise.id_activity, activity.label, section.label 
                                FROM activity INNER JOIN realise ON activity.id_activity = realise.id_activity 
                                INNER JOIN car ON realise.id_car = car.id_car 
                                INNER JOIN section ON section.id_section = activity.id_section 
                                WHERE car.id_car = ${id}`;
};
