import APIResource from './APIResource'
import APIList from './APIList'


/**
 * APIResourceFile
 *
 * @class
 * @extends APIResource
 */
class APIResourceFile extends APIResource {

  /**
   * /files/{id}
   *
   * Constructor
   */
  constructor (parent: object, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('files', id);
  }

  // /files/{id}/file
  public file () {
    return new APIResource(this).push('file');
  }

  // /files/{id}/icon
  public icon () {
    return new APIResource(this).push('icon');
  }

  // /files/{id}/tags
  public tags () {
    return new APIList(this).push('tags');
  }

}

export default APIResourceFile
