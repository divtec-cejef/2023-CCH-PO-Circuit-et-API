import {raceToCreate, raceToCreateWithQueryId, routeHandler} from "../../../models";
import {createRace, createRaceWithQueryId, getShortestRaces} from "../../../services/race/implementation";
import {checkStructureOrThrow} from "check-structure";
import {getCarByQueryId} from "../../../services/car/implementation";
import type {Server} from "socket.io";

/**
 * Controller post pour la route /race/query-id
 * @param req Requete
 * @param res Reponse
 * @returns le temps créé
 */
export const route: routeHandler = async (req, res) => {
    const race = req.body;

    // Vérification de la structure de la requête
    try {
        checkStructureOrThrow(race, {
            race_start: Date,
            race_finish: Date,
            query_id: String,
        })
    } catch (e: any) {
        res.status(400).json({ error: e.message });
        return;
    }

    // Vérification de l'existence de la voiture
    if (await getCarByQueryId(race.query_id) === null) {
        res.status(404).json({ error: 'Car not found' });
        return;
    }

    const raceToCreate: raceToCreateWithQueryId = {
        race_start: new Date(race.race_start),
        race_finish: new Date(race.race_finish),
        query_id: race.query_id,
    }

    // Création de la manche
    try {
        res.json(await createRaceWithQueryId(raceToCreate));
    } catch (e: any) {
        res.status(500).json({ error: e.message });
        return
    }

    // Envoi les données de classement aux clients
    res.app.get<Server>("socketio").emit("updatedRaces", await getShortestRaces())
};

export default route;