import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function updateCarSponsor (queryId: string, newSponsor: string) {
  return prisma.car.update({
    where: { query_id: queryId },
    data: { sponsor_name: newSponsor }
  });
}
