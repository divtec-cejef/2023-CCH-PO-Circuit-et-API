import type { routeHandler } from '../../models/types';
import { getCar, getCars } from '../../services/cars/implementation';

const route: routeHandler = async (req, res) => {
	if (!req.query.id) {
		res.json(await getCars());
		return;
	}

	const { id, by_pk } = req.query;

	if (typeof id !== 'string' || (typeof by_pk !== 'string' && by_pk !== undefined)) {
		res.status(400).json({ error: 'Invalid id' });
		return;
	}

	const car = await getCar(id, by_pk === 'true');

	if (!car) {
		res.status(404).json({ error: 'Car not found' });
		return;
	}

	res.json(car);
};
export default route;
