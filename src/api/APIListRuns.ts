import {API} from '../API';
import {APIEntity} from './APIEntity';
import {APIList} from './APIList'
import {APIResource} from './APIResource'

/**
 * APIListRuns
 *
 * @class
 * @extends APIList
 */
export class APIListRuns extends APIList {

  /**
   * /runs
   *
   * Constructor
   */
  constructor(parent: APIEntity<any> | API) {
    super(parent);
    this.push('runs');
  }

  // /runs/config
  public config() {
    return new APIResource(this).push('config');
  }

}

export default APIListRuns
