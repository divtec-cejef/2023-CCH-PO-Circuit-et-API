import type { RouteHandler } from '../models';
import type { Server } from 'socket.io';

/**
 * Controller pour la route de test à la racine
 * @param req Requete
 * @param res Reponse
 * @returns "It works" si l'api est en ligne
 */
const route: RouteHandler = (req, res) => {
  res.send('It works');
  req.app.get<Server>('socketio').emit('hello', 'world');
};
export default route;
