import { RequestHandler } from "express";
import QueryString from "qs";

export type routeHandler = RequestHandler<{}, any, any, QueryString.ParsedQs, Record<string, any>>;
