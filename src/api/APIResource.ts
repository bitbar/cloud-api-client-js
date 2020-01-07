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
    this.method('DELETE');
  }
}


interface APIResource {

  /**
   * Alias for 'post'
   *
   * @public
   * @see post
   * @returns this
   */
  update: typeof APIResource.prototype.post;
}


export default APIResource
