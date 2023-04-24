import type { routeHandler } from '../../../models';
import { getCarById, getCars } from '../../../services/car/implementation';

const route: routeHandler = async (req, res) => {

	const id = parseInt(req.params.slug);

	if (typeof id === null || isNaN(id)) {
		res.status(400).json({ error: 'Invalid id' });
		return;
	}

	const car = await getCarById(id);

	if (!car) {
		res.status(404).json({ error: 'Car not found' });
		return;
	}

	res.json(car);
};
export default route;
