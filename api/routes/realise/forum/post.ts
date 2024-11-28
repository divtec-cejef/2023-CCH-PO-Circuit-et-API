import type { RealisedActivityToCreate } from '../../../models';
import { RouteHandler } from '../../../models';
import { checkStructureOrThrow } from 'check-structure';
import { getActivityById } from '../../../services/activity/';
import {
    createRealisedActivity,
    getRealisationCount,
    mostRealisedActivity,
    realisationExists
} from '../../../services/realise';
import { getCarByQueryId } from '../../../services/car';
import validateSection from '../../../services/section/validate-token';
import { Server } from 'socket.io';
import { emitEvent } from "../../../clients/socketio";

declare type RealisedActivityRequest = {
    id_activity: number,
    query_id: string,
    date_time: string,
}

/**
 * Controller post pour la route /realise/query-id
 * @param req Requete
 * @param res Reponse
 * @returns l'activité réalisée
 */
export const route: RouteHandler<null, unknown, RealisedActivityRequest> = async (req, res) => {
    const realisedActivity = req.body;
    // Vérification de la structure de la requête
    try {
        checkStructureOrThrow(realisedActivity, {
            query_id: String,
            date_time: Date
        });
    } catch (e) {
        if (typeof e === 'string') {
            res.status(400).json({message: e});
        } else if (e instanceof Error) {
            res.status(400).json({message: e.message});
        } else {
            res.status(400).send();
        }
        return;
    }

    // Vérification de l'existence de l'activité
    const activity = await getActivityById(33);
    if (activity === null) {
        res.status(404).json({message: 'Activity not found'});
        return;
    }

    // vérification de l'existence de la voiture
    if (await getCarByQueryId(realisedActivity.query_id) === null) {
        res.status(404).json({message: 'Car not found'});
        return;
    }

    // Création de l'activité
    const realisedActivityToCreate: RealisedActivityToCreate = {
        id_activity: 33,
        query_id: realisedActivity.query_id,
        date_time: new Date(realisedActivity.date_time)
    };

    if (await realisationExists(realisedActivityToCreate)) {
        res.status(409).json({message: 'Activity is already realised for specified car!'});
        return;
    }

    // Création de lien entre activité et voiture
    try {
        res.json(await createRealisedActivity(realisedActivityToCreate));
    } catch (e) {
        if (typeof e === 'string') {
            res.status(500).json({message: e});
        } else if (e instanceof Error) {
            res.status(500).json({message: e.message});
        } else {
            res.status(500).send();
        }
        return;
    }

    const socket: Server = req.app.get('socketio');
    await emitEvent(socket, 'updatedActivities', {
        count: await getRealisationCount(),
        mostPopular: await mostRealisedActivity(),
        last: await getActivityById(realisedActivityToCreate.id_activity)
    })
};

export default route;
