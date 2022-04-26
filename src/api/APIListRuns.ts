import {APIList} from './APIList'
import {APIResource} from './APIResource'
import APIResourceUser from "./APIResourceUser";

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
  constructor(parent: APIResourceUser) {
    super(parent);
    this.push('runs');
  }

  // /runs/config
  config() {
    return new APIResource(this).push('config');
  }

}

export default APIListRuns
