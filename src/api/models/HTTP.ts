import {Method} from "axios";

/**
 * Allowed methods
 *
 * @constant
 * @type {Array}
 * @default
 */
export const ALLOWED_HTTP_METHODS: Array<Method> = ["GET", "POST", "DELETE"];

export type QueryParam = undefined | string | number | boolean;
export type QueryParams<T = QueryParam> = Record<string, T | Array<T>>;
