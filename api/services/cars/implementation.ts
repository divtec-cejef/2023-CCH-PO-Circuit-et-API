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

export const getCar = async (carId: CarId, searchByPk: boolean | undefined) => {
	if (!searchByPk)
		return await getCarByQueryId(carId);
	else
		return await getCarByPk(parseInt(carId));
};

const getCarByQueryId = async (carQueryId: string) => {
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

async function getCarByPk(carPk: number) {
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

export const deleteCar = (carId: number) => {

};
