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

/**
 * Crée une manche de course
 * @param race Manche à créer
 * @returns la manche créée
 */
export const createRace = async (race: any) => {
	return await prisma.race.create({
		data: {
			realisation_date_time: new Date(race.realisation_date_time),
			sector_one: new Date(race.sector_one),
			id_car: race.id_car,
		}
	});
}
