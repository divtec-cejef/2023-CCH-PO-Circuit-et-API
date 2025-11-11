import prisma from '../../clients/prismadb';
import { race } from '@prisma/client';


export const getLastRace = async (): Promise<race | null> => {
  return await prisma.race.findFirst({
    orderBy: { id_race: 'desc' },
    include: { car: true }
  });
};
