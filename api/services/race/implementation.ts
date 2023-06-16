import prisma from '../../clients/prismadb';
import { raceToCreate, raceToCreateWithQueryId } from '../../models';
import { Prisma, race } from '@prisma/client';

/**
 * Retourne les manches d'une course d'une voiture donnée
 * @param id id de la voiture
 * @returns une liste des manches dans l'ordre croissant
 */
export const getRacesByCar = async (id: number) => {
  return await prisma.race.findMany({
    where: {
      id_car: id
    },
    select: {
      id_race: true,
      race_start: true,
      sector1: true,
      race_finish: true,
      id_car: true,
      total_time: true
    }
  }).then(r => r.sort((a, b) => {
    return a.total_time.valueOf() - b.total_time.valueOf();
  }));
};

/**
 * Retourne les manches les plus courtes de chaque voiture
 * @returns une liste des manches les plus courtes
 */
export const getShortestRaces = async () => {
  // récupération des informations de la course et de la voiture
  const ranking: { id_race: number, total_time: Date, id_car: number }[] = await prisma.$queryRaw`SELECT *
                                                                                                    FROM ranking`;
  const cars: {
        id_car: number,
        pseudo: string,
        avatar: Prisma.JsonValue
    }[] = await prisma.$queryRaw`SELECT id_car, pseudo, avatar
                                 FROM car
                                 WHERE id_car IN (SELECT id_car FROM ranking)`;

  // création du résultat
  const rankingRes = [];
  for (const i in ranking) {
    const car = cars.find(car => car.id_car === ranking[i].id_car);
    if (!car) throw new Error('Car not found');
    rankingRes.push({
      id_race: ranking[i].id_race,
      total_time: ranking[i].total_time,
      car
    });
  }

  return rankingRes;
};

/**
 * Retourne le classement d'une voiture
 * @param id identifiant de la voiture
 * @returns le classement de la voiture ou null si elle n'est pas classée
 */
export const getRankByCar = async (id: number) => {
  const shortestRaces = await getShortestRaces();
  for (let i = 0; i < shortestRaces.length; i++) {
    if (shortestRaces[i].car.id_car === id) {
      return i + 1;
    }
  }

  return null;
};

/**
 * Crée une manche de course
 * @param race Manche à créer
 * @returns la manche créée
 */
export const createRace = async (race: raceToCreate): Promise<race> => {
  return await prisma.race.create({
    data: {
      race_start: race.race_start,
      sector1: race.sector1,
      race_finish: race.race_finish,
      id_car: race.id_car
    }
  });
};

/**
 * Crée une manche de course à l'aide de l'ID de query de la voiture
 * @param race Manche à créer
 * @returns la manche créée
 */
export const createRaceWithQueryId = async (race: raceToCreateWithQueryId): Promise<race> => {
  return await prisma.race.create({
    data: {
      race_start: race.race_start,
      sector1: race.sector1,
      race_finish: race.race_finish,
      car: {
        connect: {
          query_id: race.query_id
        }
      }
    }
  });
};

/**
 * Retourne le nombre de courses executées
 * @returns un nombre.
 */
export const getNumberRaces = async (): Promise<number> => {
  return await prisma.race.count();
};
