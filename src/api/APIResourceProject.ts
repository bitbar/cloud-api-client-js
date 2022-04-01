import {API} from '../API';
import {APIEntity} from './APIEntity';
import {APIList} from './APIList'
import {APIResource} from './APIResource'
import {APIResourceRun} from './APIResourceRun'


/**
 * APIResourceFile
 *
 * @class
 * @extends APIResource
 */
export class APIResourceProject extends APIResource {

  /**
   * /projects/{id}
   *
   * Constructor
   */
  constructor(parent: APIEntity<any> | API, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('projects', id);
  }

  // /projects/{id}/runs
  public runs() {
    return new APIList(this).push('runs');
  }

  // /projects/{id}/runs/{id}
  public run(id: number) {
    return new APIResourceRun(this, id);
  }

  // /projects/{id}/runs-extended
  public runsExtended() {
    return new APIList(this).push('runs-extended');
  }

  // /projects/{id}/runs-extended/{id}
  public runExtended(id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    return new APIResource(this).push('runs-extended', id);
  }

  // /projects/{id}/files
  public files() {
    return new APIList(this).push('files');
  }

  // /projects/{id}/files.zip
  public filesZip() {
    return new APIResource(this).push('files.zip');
  }

  // /projects/{id}/sharings
  public sharings() {
    return new APIList(this).push('sharings');
  }

  // /projects/{id}/sharings/{id}
  public sharing(id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    return new APIResource(this).push('sharings', id);
  }

}

export default APIResourceProject
