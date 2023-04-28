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
}