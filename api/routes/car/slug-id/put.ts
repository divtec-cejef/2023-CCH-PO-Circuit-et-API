import { routeHandler } from '../../../models/types';

export const route: routeHandler = (req, res) => {
	res.send('Hello World!');
};


export default route;
