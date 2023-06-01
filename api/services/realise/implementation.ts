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
