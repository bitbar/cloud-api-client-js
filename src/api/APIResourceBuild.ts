import APIResource from './APIResource'
import APIList from './APIList'


/**
 * APIResourceBuild
 *
 * @class
 * @extends APIResource
 */
class APIResourceBuild extends APIResource {

  /**
   * /builds/{id}
   *
   * Constructor
   */
  constructor (parent: object, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('builds', id);
  }

  // /builds/{id}/abort
  public abort () {
    return new APIResource(this).push('abort');
  }

  // /builds/{id}/output-file-set/files
  public outputFiles () {
    return new APIList(this).push('output-file-set', 'files');
  }

}

export default APIResourceBuild
