import APIEntity from './APIEntity'


/**
 * APIResource
 *
 * @class
 * @extends APIEntity
 */
class APIResource extends APIEntity {

  /**
   * Set DELETE as HTTP method
   *
   * @public
   * @returns this
   */
  public delete () {
    return this.method('DELETE');
  }
}


export default APIResource
