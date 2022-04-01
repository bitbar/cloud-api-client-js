import {API} from '../API';
import {APIEntity} from './APIEntity';
import {APIList} from './APIList'
import {APIResource} from './APIResource'

/**
 * APIResourceBuild
 *
 * @class
 * @extends APIResource
 */
export class APIResourceBuild extends APIResource {

  /**
   * /builds/{id}
   *
   * Constructor
   */
  constructor(parent: APIEntity<any> | API, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('builds', id);
  }

  // /builds/{id}/abort
  public abort() {
    return new APIResource(this).push('abort');
  }

  // /builds/{id}/output-file-set/files
  public outputFiles() {
    return new APIList(this).push('output-file-set', 'files');
  }

}

export default APIResourceBuild
