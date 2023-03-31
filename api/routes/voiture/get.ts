import type { routeHandler } from '../../models/types';
import {getCars} from '../../services/cars/implementation'

const route: routeHandler = (req, res) => {
    getCars()
    res.send('It works');
};
export default route;