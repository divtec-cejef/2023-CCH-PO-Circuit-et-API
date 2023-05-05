import { RequestHandler } from "express";
import QueryString from "qs";

export type routeHandler = RequestHandler<any, any, any, QueryString.ParsedQs, Record<string, any>>;

export interface raceToCreate {
    race_start: Date;
    race_finish: Date;
    id_car: number;
}

export interface raceToCreateWithQueryId {
    race_start: Date;
    race_finish: Date;
    query_id: string;
}