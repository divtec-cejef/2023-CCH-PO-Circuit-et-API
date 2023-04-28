import buildClient from "../client";

const prisma = buildClient();

/**
 * Retourne les manches d'une course d'une voiture donnée
 * @param id id de la voiture
 * @returns une liste des manches
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
		}
	});
};

/**
 * Retourne les manches les plus courtes de chaque voiture
 * @returns une liste des manches les plus courtes
 */
export const getShortestRaces = async () => {
	const races = await prisma.race.groupBy({
		by: ["id_car", "id_race"],
		_min: {
			sector_one: true,
		},
	});

	return races.map(async (v, k) => {
		return await prisma.race.findUnique({
			where: {
				id_race: v.id_race
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
	});
};
