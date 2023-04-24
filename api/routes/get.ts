import type { routeHandler } from '../models';

const route: routeHandler = (req, res) => {
	res.send('It works');
};
export default route;
