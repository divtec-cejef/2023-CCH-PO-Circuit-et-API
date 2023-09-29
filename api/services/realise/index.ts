import prisma from '../../clients/prismadb';
import { Activity, RealisedActivityToCreate } from '../../models';

/**
 * Associe une activité à une voiture
 * @param realisedActivity activité à associer à une voiture
 * @returns l'activité associée à une voiture
 */
export const createRealisedActivity = async (realisedActivity: RealisedActivityToCreate) => {
  return await prisma.realise.create({
    data: {
      activity: {
        connect: {
          id_activity: realisedActivity.id_activity
        }
      },
      date_time: realisedActivity.date_time,
      car: {
        connect: {
          query_id: realisedActivity.query_id
        }
      }
    }
  });
};

/**
 * Permet de définir si une activité a déjà été réalisée par une voiture
 * @param toCheck L'activité à réaliser.
 * @returns true si l'activité a été réalisée, false sinon.
 */
export const realisationExists = async (toCheck: RealisedActivityToCreate) => {
  return await prisma.realise.findFirst({
    where: {
      id_activity: toCheck.id_activity,
      car: {
        query_id: toCheck.query_id
      }
    }
  }) !== null;
};

/**
 * Permet d'obtenir le nombre d'activités réalisées
 * @returns le nombre d'activités réalisées
 */
export const getRealisationCount = async (): Promise<number> => {
  return await prisma.realise.count();
};

/**
 * Permet d'obtenir l'activité la plus populaire
 * @returns - L'activité en question
 */
export const mostRealisedActivity = async (): Promise<(Activity & { count: number }) | null> => {
  const activities = await prisma.realise.groupBy({
    by: ['id_activity'],
    _count: {
      _all: true
    }
  });

  let mostRealised: { id_activity: number, _count: { _all: number } } | null = null;

  for (const activity of activities) {
    if (mostRealised === null || activity._count._all > mostRealised._count._all) {
      mostRealised = {
        id_activity: activity.id_activity,
        _count: {
          _all: activity._count._all
        }
      };
    }
  }

  if (!mostRealised) {
    return null;
  }

  const data = await prisma.activity.findUniqueOrThrow({
    where: {
      id_activity: mostRealised.id_activity
    }
  });

  return { ...data, count: mostRealised._count._all };
};

export const lastRealisedActivity = async (): Promise<Activity | null> => {
  const lastDate = await prisma.realise.aggregate({
    _max: {
      date_time: true
    }
  });

  if (!lastDate._max.date_time) {
    return null;
  }

  const lastRealisation = await prisma.realise.findFirstOrThrow({
    where: {
      date_time: lastDate._max.date_time
    }
  });

  return await prisma.activity.findUniqueOrThrow({
    where: {
      id_activity: lastRealisation.id_activity
    }
  });
};
