import type { routeHandler } from '../../models/types';
import {deleteCar, getCar, getCars} from '../../services/cars/implementation';

const route: routeHandler = async (req, res) => {
	if (!req.query.id) {
		res.status(400).json({ error: 'No ID specified !' });
	}

	const { id, by_pk } = req.query;

	if (typeof id !== 'string' || (typeof by_pk !== 'string' && by_pk !== undefined)) {
		res.status(400).json({ error: 'Invalid id' });
		return;
	}
    const car = await deleteCar(id, by_pk === 'true');

	if (!car) {
		res.status(404).json({ error: 'Car not found' });
		return;
	}
    res.status(200).json(car);
};
export default route;
