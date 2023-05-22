import { RequestHandler } from 'express';
import QueryString from 'qs';

export type routeHandler<SlugParams = unknown, ResBody = unknown, ReqBody = unknown> = RequestHandler<SlugParams, ResBody, ReqBody, QueryString.ParsedQs, Record<string, unknown>>;

export interface raceToCreate {
  race_start: Date;
  sector1?: Date;
  race_finish: Date;
  id_car: number;
}

export interface raceToCreateWithQueryId {
  race_start: Date;
  sector1?: Date;
  race_finish: Date;
  query_id: string;
}
