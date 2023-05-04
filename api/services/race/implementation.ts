import { Prisma } from "@prisma/client";
import buildClient from "../client";

const prisma = buildClient();

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
			realisation_date_time: true,
			sector_one: true,
			id_car: true,
		},
		orderBy: {
			sector_one: Prisma.SortOrder.asc
		}
	});
};

/**
 * Retourne les manches les plus courtes de chaque voiture
 * @returns une liste des manches les plus courtes
 */
export const getShortestRaces = async () => {
	const races = await prisma.race.groupBy({
		by: ["id_car"],
		_min: {
			sector_one: true,
		},
	});

	let res: { id_race: number; sector_one: Date | null; car: { id_car: number; pseudo: string | null; avatar: { image: string | null; }; }; }[] = [];

	for (const k in races) {
		res[k] = await prisma.race.findFirstOrThrow({
			where: {
				sector_one: races[k]._min.sector_one,
			},
			select: {
				id_race: true,
				sector_one: true,
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
	};

	return res;
};

export const getRankByCar = async (id: number) => {
	const shortestRaces = await getShortestRaces();
	for (let i = 0; i < shortestRaces.length; i++) {
		if(shortestRaces[i].car.id_car === id) {
			return i+1;
		}
	}

	return null;
}
