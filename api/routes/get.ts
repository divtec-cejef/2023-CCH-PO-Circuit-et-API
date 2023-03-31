import type { routeHandler } from '../models/types';

const route: routeHandler = (req, res) => {
	res.send('Hello World!');
};
export default route;
