import {APIEntity} from './APIEntity'


/**
 * APIResource
 *
 * @class
 * @extends APIEntity
 */
export class APIResource<T = any> extends APIEntity<T> {

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
