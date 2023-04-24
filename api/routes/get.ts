import type { routeHandler } from '../models';

/**
 * Controller pour la route de test à la racine
 * @param req Requete
 * @param res Reponse
 * @returns "It works" si l'api est en ligne
 */
const route: routeHandler = (req, res) => {
	res.send('It works');
};
export default route;
