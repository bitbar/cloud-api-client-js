/**
 * Allowed methods
 *
 * @constant
 * @type {Array}
 * @default
 */
export enum ALLOWED_HTTP_METHODS {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE'
}

export type QueryParam = undefined | string | number | boolean;
export type QueryParams<T = QueryParam> = Record<string, T | Array<T>>;
