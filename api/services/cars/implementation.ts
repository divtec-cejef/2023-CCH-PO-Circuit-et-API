import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


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

type CarId = string;

// export const getCar = async (carId: CarId, searchByPk: boolean | undefined) => {
// 	if (!searchByPk)
// 		return await getCarByQueryId(carId);
// 	else
// 		return await getCarByPk(parseInt(carId));
// };

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

export const getCarById = async (carPk: number) => {
	const car = await prisma.car.findFirst({
		where: {
			id_car: carPk
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

export const updateCar = (carId: number) => {

};

export const deleteCarByQueryId = async (carQueryId: string) => {
	return await prisma.car.delete({
		where: {
			query_id: carQueryId
		},

	})
};

export const deleteCarByPk = async (carPK: number) => {
	return await prisma.car.delete({
		where: {
			id_car: carPK
		}
	})
};

export const deleteCar = async (carId: CarId, searchByPk: boolean | undefined) => {
	try {
		if (!searchByPk)
			return await deleteCarByQueryId(carId);
		else
			return await deleteCarByPk(parseInt(carId));
	}catch (e) {
		console.log(e);
		return null;
	}
};
