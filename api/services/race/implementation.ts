import { Prisma, PrismaClient } from "@prisma/client";
import prisma from "/clients/prismadb";
import { raceToCreate, raceToCreateWithQueryId } from "/models";

/**
 * Retourne les manches d'une course d'une voiture donnée
 * @param id id de la voiture
 * @returns une liste des manches dans l'ordre croissant
 */
export const getRacesByCar = async (id: number) => {
	const newPrisma = new PrismaClient();


	return await prisma.race.findMany({
		where: {
			id_car: id
		},
		select: {
			id_race: true,
			race_start: true,
			race_finish: true,
			id_car: true,
			total_time: true,
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
	const races = await prisma.race.findMany().then(r => {
		const res: typeof r = [];
		r.forEach((v) => {
			for (let race of r) {
				if (race.id_car !== v.id_car) continue;
				if (race.id_race === v.id_race) continue;
				if (v.total_time.valueOf() > race.total_time.valueOf())
					return;
			}
			if (res.every(race => v.id_car !== race.id_car))
				res.push(v);
		});

		return res;
	}
	);

	let res: {
		id_race: number;
		total_time: Date;
		car: { id_car: number; pseudo: string | null; avatar: { image: string | null; }; };
	}[] = [];

	for (const k in races) {
		res[k] = await prisma.race.findUniqueOrThrow({
			where: {
				id_race: races[k].id_race
			},
			select: {
				id_race: true,
				total_time: true,
				car: {
					select: {
						id_car: true,
						pseudo: true,
						avatar: {
							select: {
								image: true
							}
						}
					}
				}
			}
		});
	}

	return res.sort((a, b) => {
		return a.total_time.valueOf() - b.total_time.valueOf();
	});
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
export const createRace = async (race: raceToCreate) => {

	return await prisma.race.create({
		data: {
			race_start: race.race_start,
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
export const createRaceWithQueryId = async (race: raceToCreateWithQueryId) => {

	return await prisma.race.create({
		data: {
			race_start: race.race_start,
			race_finish: race.race_finish,
			car: {
				connect: {
					query_id: race.query_id
				}
			}
		}
	});
}

