import {APIEntity} from './APIEntity'


/**
 * APIResource
 *
 * @class
 * @extends APIEntity
 */
export class APIResource<T = any, P = T> extends APIEntity<T, P> {

  /**
   * Set DELETE as HTTP method
   *
   * @public
   * @returns this
   */
  public delete(): this {
    return this.method('DELETE');
  }
}


export default APIResource
