import { RequestHandler } from 'express';
import QueryString from 'qs';
import prismadb from '../clients/prismadb';
import { Prisma } from '@prisma/client';

export type routeHandler<SlugParams = unknown, ResBody = unknown, ReqBody = unknown> = RequestHandler<SlugParams, ResBody, ReqBody, QueryString.ParsedQs, Record<string, unknown>>;

export interface raceToCreate {
  race_start: Date;
  sector1: Date;
  race_finish: Date;
  id_car: number;
}

export interface raceToCreateWithQueryId {
  race_start: Date;
  sector1: Date;
  race_finish: Date;
  query_id: string;
}

export interface realisedActivityToCreate {
  id_activity: number;
  query_id: string;
  date_time: Date;
}

export interface carToUpdate {
  id_car: number;
  pseudo: string;
  avatar: Prisma.JsonObject;
}
