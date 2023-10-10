import prisma from '../../clients/prismadb';
import { CarToUpdate } from '../../models';

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
      avatar: true
    }
  });
};

/**
 * Retourne une voiture en fonction de son ID de query
 * @param carQueryId ID de query de la voiture
 * @returns la voiture
 */
export const getCarByQueryId = async (carQueryId: string) => {
  return await prisma.car.findFirst({
    where: {
      query_id: carQueryId
    },
    select: {
      id_car: true,
      query_id: true,
      pseudo: true,
      avatar: true
    }
  });
};

/**
 * Retourne une voiture en fonction de son ID
 * @param carId id de la voiture
 * @returns la voiture
 */
export const getCarById = async (carId: number) => {
  return await prisma.car.findFirst({
    where: {
      id_car: carId
    },
    select: {
      id_car: true,
      query_id: true,
      pseudo: true,
      avatar: true
    }
  });
};

/**
 * Supprimer une voiture en fonction de son ID de query
 * @param carQueryId ID de query de la voiture
 * @returns la voiture supprimée ou null si pas de voiture
 */
export const deleteCarByQueryId = async (carQueryId: string) => {
  try {
    return await prisma.car.delete({
      where: {
        query_id: carQueryId
      }
    });
  } catch (e) {
    return null;
  }
};

/**
 * Supprimer une voiture en fonction de son ID
 * @param carId id de la voiture
 * @returns la voiture supprimée ou null si pas de voiture
 */
export const deleteCarById = async (carId: number) => {
  try {
    return await prisma.car.delete({
      where: {
        id_car: carId
      }
    });
  } catch (e) {
    return null;
  }
};

/**
 * Permet d'obtenir le hash du mot de passe d'une voiture en fonction de son ID de query
 * @param carQueryId ID de query de la voiture
 * @returns le hash du mot de passe de la voiture
 */
export const getPasswordByQueryId = async (carQueryId: string) => {
  const car = await prisma.car.findFirstOrThrow({
    where: {
      query_id: {
        equals: carQueryId
      }
    }
  });

  return car.password;
};

/**
 * Permet la mise à jour d'une voiture
 * @param carToUpdate la voiture à mettre à jour
 * @returns la voiture mise à jour
 */
export const updateCar = async (carToUpdate: CarToUpdate) => {
  if(await prisma.car.findFirst({
    where: {
      pseudo: carToUpdate.pseudo,
      NOT: {
        id_car: carToUpdate.id_car
      }
    }
  })) {
    throw new Error('Pseudo déjà utilisé');
  }

  return await prisma.car.update({
    where: {
      id_car: carToUpdate.id_car
    },
    data: {
      pseudo: carToUpdate.pseudo,
      avatar: carToUpdate.avatar
    }
  });
};
