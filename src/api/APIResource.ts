import {APIEntity} from './APIEntity'
import {QueryParams} from './models/HTTP';


/**
 * APIResource
 *
 * @class
 * @extends APIEntity
 */
export class APIResource<RESPONSE = any, QUERY_PARAMS extends QueryParams | void = QueryParams, DATA = QUERY_PARAMS>
  extends APIEntity<RESPONSE, QUERY_PARAMS, DATA> {
}


export default APIResource;
