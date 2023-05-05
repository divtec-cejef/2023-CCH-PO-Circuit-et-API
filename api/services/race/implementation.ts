import {Prisma, PrismaClient} from "@prisma/client";
import buildClient from "../client";
import {raceToCreate} from "../../models";

const prisma = buildClient();

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
			totalTime: true,
		}
	}).then(r => r.sort((a, b) => {
		return a.totalTime.valueOf() - b.totalTime.valueOf()
	}))
};

/**
 * Retourne les manches les plus courtes de chaque voiture
 * @returns une liste des manches les plus courtes
 */
export const getShortestRaces = async () => {
	const races = await prisma.race.findMany().then(r =>
		r.filter((v) => {
			for (let race of r) {
				if (race.id_car !== v.id_car) continue;
				if (race.id_race === v.id_race) continue;
				return race.totalTime.valueOf() > v.totalTime.valueOf();
			}
			return true;
		})
	);

	let res: { id_race: number; totalTime: Date | null; car: { id_car: number; pseudo: string | null; avatar: { image: string | null; }; }; }[] = [];

	for (const k in races) {
		res[k] = await prisma.race.findUniqueOrThrow({
			where: {
				id_race: races[k].id_race
			},
			select: {
				id_race: true,
				totalTime: true,
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

	return res;
};

/**
 * Retourne le classement d'une voiture
 * @param id identifiant de la voiture
 * @returns le classement de la voiture ou null si elle n'est pas classée
 */
export const getRankByCar = async (id: number) => {
	const shortestRaces = await getShortestRaces();
	for (let i = 0; i < shortestRaces.length; i++) {
		if(shortestRaces[i].car.id_car === id) {
			return i+1;
		}
	}

	return null;
}

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
}

