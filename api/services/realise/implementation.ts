import prisma from '../../clients/prismadb';
import { realisedActivityToCreate } from '../../models';

/**
 * Associe une activité à une voiture
 * @param realisedActivity activité à associer à une voiture
 * @returns l'activité associée à une voiture
 */
export const createRealisedActivity = async (realisedActivity: realisedActivityToCreate) => {
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
export const realisationExists = async (toCheck: realisedActivityToCreate) => {
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
 * @returns
 */
export const mostRealisedActivity = async () => {
  const activities = await prisma.realise.groupBy({
    by: ['id_activity'],
    _count: {
      _all: true
    }
  });

  let mostRealised: {id_activity: number, _count: { _all: number }} | undefined;

  for (const activity of activities) {
    if (mostRealised === undefined || activity._count._all > mostRealised._count._all) {
      mostRealised = {
        id_activity: activity.id_activity,
        _count: {
          _all: activity._count._all
        }
      };
    }
  }
};
