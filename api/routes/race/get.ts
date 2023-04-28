import { routeHandler } from "../../models";
import { getShortestRaces } from "../../services/race/implementation";

/**
 * Controller get pour la route /race
 * @param req Requete
 * @param res Reponse
 * @returns toutes les voitures
 */
export const route: routeHandler = async (req, res) => {
	await getShortestRaces();
};

export default route;
