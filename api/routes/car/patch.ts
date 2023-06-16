import { carToUpdate, routeHandler } from '../../models';
import validateCarAuthorization from '../../services/validate-token/car/implementation';
import { checkStructureOrThrow } from 'check-structure';
import { getCarById, updateCar } from '../../services/car/implementation';

/**
 * Controller patch pour la route /car
 * @param req Requete
 * @param res Reponse
 * @returns la voiture modifiée
 */
export const route: routeHandler<null, unknown, carToUpdate> = async (req, res) => {
  const carToUpdate = req.body;

  // vérification de l'authentification
  const { authorization } = req.headers;
  const carId = await validateCarAuthorization(res, authorization);
  if (!carId) {
    return;
  }

  // Vérification de la structure de la requête
  try {
    checkStructureOrThrow(carToUpdate, {
      id_car: Number,
      pseudo: String,
      avatar: {
        bgColor: String,
        hatColor: String,
        faceColor: String,
        hairColor: String,
        shirtColor: String,
        sex: String,
        earSize: String,
        hatType: String,
        eyeType: String,
        hairType: String,
        noseType: String,
        mouthType: String,
        shirtType: String,
        eyeBrowType: String,
        glassesType: String
      }
    });
  } catch (e) {
    if (typeof e === 'string') {
      res.status(400).json({ message: e });
    } else if (e instanceof Error) {
      res.status(400).json({ message: e.message });
    } else {
      res.status(400).send();
    }
    return;
  }

  // Vérification de la longueur du pseudo
  if (carToUpdate.pseudo.length > 20 || carToUpdate.pseudo.length < 3) {
    res.status(400).json({ message: 'Pseudo must be between 3 and 10 characters.' });
    return;
  }

  // Vérification de l'existence de la voiture
  const car = await getCarById(carToUpdate.id_car);
  if (car === null) {
    res.status(404).json({ message: 'Car not found' });
    return;
  }

  // Vérification de l'autorisation à mettre à jour la voiture
  if (car.id_car !== carId) {
    res.status(403).json({ message: 'You are not allowed to perform this action.' });
    return;
  }

  // modification de la voiture
  try {
    res.status(200).send(await updateCar(carToUpdate));
  } catch (e) {
    if (typeof e === 'string') {
      res.status(500).json({ message: e });
    } else if (e instanceof Error) {
      res.status(500).json({ message: e.message });
    } else {
      res.status(500).send();
    }
  }
};

export default route;
