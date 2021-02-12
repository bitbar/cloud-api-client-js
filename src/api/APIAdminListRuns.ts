import APIList from './APIList'
import APIResource from './APIResource';


/**
 * APIAdminListRuns
 *
 * @class
 * @extends APIList
 */
class APIAdminListRuns extends APIList {

  /**
   * /admin/runs
   * Constructor
   */
  constructor (parent: object) {
    super(parent);
    this.push('admin', 'runs');
  }

  // /runs/config
  public config () {
    const a = new APIResource(this);
    a.stack = ['runs', 'config'];
    return a;
  }

}


export default APIAdminListRuns
