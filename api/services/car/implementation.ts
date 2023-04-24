import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


/**
 * Retourne toutes les voitures de la db
 * @returns les voitures sous forme de liste
 */
export const getCars = async () => {
	return await prisma.car.findMany({
		select: {
			id_car: true,
			query_id: true,
			pseudo: true,
			avatar: {
				select: {
					id_avatar: true,
					image: true,
				},
			},
		},
	});
};

/**
 * Retourne une voiture en fonction de son ID de query
 * @param carQueryId ID de query de la voiture
 * @returns la voiture
 */
export const getCarByQueryId = async (carQueryId: string) => {
	const car = await prisma.car.findFirst({
		where: {
			query_id: carQueryId
		},
		select: {
			id_car: true,
			query_id: true,
			pseudo: true,
			id_avatar: true,
			avatar: {
				select: {
					id_avatar: true,
					image: true,
				},
			},
		}
	});

	return car;
};

/**
 * Retourne une voiture en fonction de son ID
 * @param carId id de la voiture
 * @returns la voiture
 */
export const getCarById = async (carId: number) => {
	const car = await prisma.car.findFirst({
		where: {
			id_car: carId
		},
		select: {
			id_car: true,
			query_id: true,
			pseudo: true,
			id_avatar: true,
			avatar: {
				select: {
					id_avatar: true,
					image: true,
				},
			},
		}
	});

	return car;
}

/**
 * Supprimer une voiture en fonction de son ID de query
 * @param carQueryId ID de query de la voiture
 * @returns la voiture supprimée
 */
export const deleteCarByQueryId = async (carQueryId: string) => {
	return await prisma.car.delete({
		where: {
			query_id: carQueryId
		},

	});
};

/**
 * Supprimer une voiture en fonction de son ID
 * @param carId id de la voiture
 * @returns la voiture supprimée
 */
export const deleteCarById = async (carId: number) => {
	return await prisma.car.delete({
		where: {
			id_car: carId
		}
	});
};
