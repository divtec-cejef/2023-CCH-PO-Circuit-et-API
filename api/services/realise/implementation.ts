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
