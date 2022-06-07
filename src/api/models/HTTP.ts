import {Method} from "axios";

/**
 * Allowed methods
 *
 * @constant
 * @type {Array}
 * @default
 */
export const ALLOWED_HTTP_METHODS: Array<Method> = ["GET", "POST", "DELETE"];

export type QueryParam = string | number | boolean;
export type QueryParams = Record<string, QueryParam | Array<QueryParam>>;
