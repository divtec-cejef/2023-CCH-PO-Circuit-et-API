import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()

export const getCars = () => {
    return true
}

type IdVoiture = string | number

export const getCar = async (id_voiture: IdVoiture) => {
    if (typeof id_voiture == 'string') {
        return await getCarWithString(id_voiture)
    } else {
        return await getCarWithNumber(id_voiture);
    }
}

async function getCarWithString(idVoiture:string) {
    const car = await prisma.
}

async function getCarWithNumber(idVoiture:number) {

}

export const updateCar = (id_voiture: number) => {

}

export const deleteCar = (id_voiture: number) => {

}
