import { routeHandler } from "../../models";
import {createRace} from "../../services/race/implementation";
import {checkStructureOrThrow} from "check-structure";
import {getCarById} from "../../services/car/implementation";

/**
 * Controller post pour la route /race
 * @param req Requete
 * @param res Reponse
 * @returns le temps créé
 */
export const route: routeHandler = async (req, res) => {
    const race = await req.body.json();

    // Vérification de la structure de la requête
    try {
        checkStructureOrThrow(race, {
            realisation_date_time: Date,
            sector_one: Date,
            id_car: Number,
        })
    } catch (e: any) {
        res.status(400).json({ error: e.message });
        return;
    }

    // Vérification de l'existence de la voiture
    if (await getCarById(race.id_car) === null) {
        res.status(404).json({ error: 'Car not found' });
        return;
    }

    // Création de la manche
    try {
        res.json(await createRace(race));
    } catch (e: any) {
        res.status(500).json({ error: e.message });
        return
    }
};

export default route;


