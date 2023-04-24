import type { routeHandler } from '../../../../models';
import { getCarByQueryId } from '../../../../services/car/implementation';

const route: routeHandler = async (req, res) => {

	if (!req.params.slug) {
		res.status(400).json({ error: 'No given ID' });
		return;
	}

	const id = req.params.slug;

	const car = await getCarByQueryId(id);

	if (!car) {
		res.status(404).json({ error: 'Car not found' });
		return;
	}

	res.json(car);
};
export default route;