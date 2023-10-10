import prisma from '../../clients/prismadb';
import { RaceToCreate, RaceToCreateWithQueryId } from '../../models';
import { Prisma } from '@prisma/client';

/**
 * Retourne les manches d'une course d'une voiture donnée
 * @param id id de la voiture
 * @returns une liste des manches dans l'ordre croissant
 */
export const getRacesByCar = async (id: number) => {
  const res = await prisma.race.findMany({
    where: {
      id_car: id
    },
    select: {
      id_race: true,
      race_start: true,
      sector1: true,
      sector2: true,
      speed: true,
      race_finish: true,
      video_url: true,
      id_car: true,
      total_time: true
    }
  });
  return res.sort((a, b) => a.total_time.valueOf() - b.total_time.valueOf());
};

declare type Race = {
  id_race: number,
  total_time: Date,
  car: {
    id_car: number,
    pseudo: string,
    avatar: Prisma.JsonValue
  }
}

/**
 * Retourne une manche en fonction de son id
 * @param id Id de la manche
 */
export const getRaceById = async (id: number) => {
  return await prisma.race.findUnique({
    where: {
      id_race: id
    }
  });
};

/**
 * Retourne les manches les plus courtes de chaque voiture
 * @returns - une liste des manches les plus courtes
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

  console.dir({ ranking });
  console.dir({ cars });

  // création du résultat
  const rankingRes = [] as Race[];
  for (const i in ranking) {
    const car = cars.find(car => car.id_car === ranking[i].id_car);
    if (!car) {
      throw new Error('Car not found');
    }
    if (rankingRes.some(v => v.car.id_car === car.id_car)) {
      continue;
    }
    rankingRes.push({
      id_race: ranking[i].id_race,
      total_time: ranking[i].total_time,
      car
    });
  }

  return rankingRes.sort((a, b) => {
    const time = a.total_time.valueOf() - b.total_time.valueOf();
    return time === 0 ? a.id_race - b.id_race : time;
  });
};

/**
 * Retourne la manche la plus courte de tout le système.
 * @returns La manche la plus courte
 */
export const getShortestRace = async () => {
  // récupération des courses les plus courtes
  const races = await getShortestRaces();

  // filtration des courses
  let shortest: Race
    | null = null;

  for (const racesElement of races) {
    if (!shortest || shortest.total_time.valueOf() > racesElement.total_time.valueOf()) {
      shortest = racesElement;
    }
  }
  return shortest;
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
 * Ajoute l'url d'une vidéo à une manche
 * @param id Id de la manche
 * @param url Url de la vidéo
 */
export const addUrlToRace = async (id: number, url: string) => {
  return await prisma.race.update({
    where: {
      id_race: id
    },
    data: {
      video_url: url
    }
  });
};

/**
 * Crée une manche de course
 * @param race Manche à créer
 * @returns la manche créée
 */
export const createRace = async (race: RaceToCreate): Promise<Race> => {
  return await prisma.race.create({
    data: race,
    include: {
      car: true
    }
  });
};

/**
 * Crée une manche de course à l'aide de l'ID de query de la voiture
 * @param race Manche à créer
 * @returns la manche créée
 */
export const createRaceWithQueryId = async (race: RaceToCreateWithQueryId): Promise<Race> => {
  return await prisma.race.create({
    data: {
      race_start: race.race_start,
      race_finish: race.race_finish,
      sector1: race.sector1,
      sector2: race.sector2,
      speed: race.speed,
      car: {
        connect: {
          query_id: race.query_id
        }
      }
    },
    include: {
      car: true
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
