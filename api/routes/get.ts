import type { routeHandler } from '../models/types';

const route: routeHandler = (req, res) => {
	res.send('It works');
};
export default route;
