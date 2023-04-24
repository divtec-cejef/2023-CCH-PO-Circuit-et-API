import type { routeHandler } from '../../models';
import { getCars } from '../../services/car/implementation';

const route: routeHandler = async (req, res) => {
	res.json(await getCars());
};
export default route;
