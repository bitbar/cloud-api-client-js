import APIList from './APIList'
import APIResource from './APIResource'


/**
 * APIListRuns
 *
 * @class
 * @extends APIList
 */
class APIListRuns extends APIList {

  /**
   * /runs
   *
   * Constructor
   */
  constructor (parent: object) {
    super(parent);
    this.push('runs');
  }

  // /runs/config
  public config () {
    return new APIResource(this).push('config');
  }

}

export default APIListRuns
