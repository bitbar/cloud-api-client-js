import {API} from '../API';
import {APIEntity} from './APIEntity';
import {APIList} from './APIList'
import {APIResource} from './APIResource';


/**
 * APIAdminListRuns
 *
 * @class
 * @extends APIList
 */
export class APIAdminListRuns extends APIList {

  /**
   * /admin/runs
   * Constructor
   */
  constructor (parent: APIEntity<any> | API) {
    super(parent);
    this.push('admin', 'runs');
  }

  // /runs/config
  config () {
    const a = new APIResource(this);
    a.restack('runs', 'config');
    return a;
  }

}


export default APIAdminListRuns
