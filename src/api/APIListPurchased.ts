import {API} from '../API';
import {APIEntity} from './APIEntity';
import {APIList} from './APIList'

/**
 * APIListPurchased
 *
 * @class
 * @extends APIList
 */
export class APIListPurchased extends APIList {

  /**
   * /purchased
   *
   * Constructor
   */
  constructor(parent: APIEntity<any> | API) {
    super(parent);
    this.push('purchased');
  }

}

export default APIListPurchased
