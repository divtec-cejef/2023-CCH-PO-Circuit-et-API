import type { RouteHandler } from '../models';
import type { Server } from 'socket.io';
import { emitEvent } from "../clients/socketio";

/**
 * Controller pour la route de test à la racine
 * @param req Requete
 * @param res Reponse
 * @returns "It works" si l'api est en ligne
 */
const route: RouteHandler = (req, res) => {
  res.send('It works');
  const server: Server  = req.app.get('socketio');
  emitEvent(server, 'updatedUserRaces', { message: 'test' })
};
export default route;
