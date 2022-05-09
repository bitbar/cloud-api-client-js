import {APIEntity} from './APIEntity'
import {QueryParams} from "./models/HTTP";


/**
 * APIResource
 *
 * @class
 * @extends APIEntity
 */
export class APIResource<RESPONSE = any, QUERY_PARAMS extends QueryParams | void = QueryParams, DATA = any>
  extends APIEntity<RESPONSE, QUERY_PARAMS, DATA> {

  /**
   * Set DELETE as HTTP method
   *
   * @public
   * @returns this
   */
  delete(): this {
    return this.method('DELETE');
  }
}


export default APIResource
