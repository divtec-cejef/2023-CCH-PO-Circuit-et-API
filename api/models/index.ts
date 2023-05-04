import { RequestHandler } from "express";
import QueryString from "qs";

export type routeHandler = RequestHandler<any, any, any, QueryString.ParsedQs, Record<string, any>>;

export interface raceToCreate {
    realisation_date_time: Date;
    sector_one: Date;
    id_car: number;
}