export namespace api {
    export enum ReturnCodes {
        NoCode = 0,
        Success = 200,
        NotFound = 404,
    }

    const routeApi = import.meta.env.VITE_ROUTE_API;

    /**
     * Retourne les données d'une voiture en fonction de son ID
     * @param queryId Query id de la voiture à retourner
     */
    export async function getDataOneCarQueryId(queryId: number | string) {
        const routeCar = `${routeApi}car/query-id/${queryId}`;
        const res = await fetch(routeCar);
        return {json: (await res.json()), status: res.status};
    }


    /**
     * Retourne les données d'une voiture en fonction de son ID
     * @param idCar Id de la voiture à retourner
     */
    export async function getDataOneCarId(idCar: number | string) {
        const routeCar = `${routeApi}car/${idCar}`;
        const res = await fetch(routeCar);
        return {json: (await res.json()), status: res.status};
    }

    /**
     * Obtient toutes les manches d'une voiture passée en paramètre
     * @param idCar Id de la voiture
     */
    export async function getAllRaceOneCar(idCar: number | string) {
        const routeRaceCar = `${routeApi}race/${idCar}`;
        const res = await fetch(routeRaceCar);
        return {json: (await res.json()), status: res.status}
    }
}

export default api;
