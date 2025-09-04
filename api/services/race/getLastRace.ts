export const getLastRace = async (): Promise<Race | null> => {
    return await prisma.race.findFirst({
        orderBy: { id_race: 'desc' },
        include: { car: true }
    });
};
