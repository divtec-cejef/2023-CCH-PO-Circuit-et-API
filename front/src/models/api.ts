import {ref} from "vue";

export namespace api {
	export enum ReturnCodes {
		NoCode = 0,
		Success = 200,
		NotFound = 404,
	}

	const routeApi = import.meta.env.VITE_ROUTE_API;

	/**
	 * Retourne les données d'une voiture en fonction de son ID
	 * @param idCar Id de la voiture à retourner
	 */
	export async function getDataOneCar(idCar: number | string) {
		const routeCar = `${routeApi.value}car?id=${idCar}`;
		const res = await fetch(routeCar);
		return { json: (await res.json()), status: res.status };
	}
}

export default api;
