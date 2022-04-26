import {API} from '../API';
import {APIEntity} from './APIEntity';
import {APIList} from './APIList'

/**
 * APIListServices
 *
 * @class
 * @extends APIList
 */
export class APIListServices extends APIList {

  // Constructor
  constructor(parent: APIEntity<any> | API) {
    super(parent);
    this.push('services');
  }

  // /services/available
  available() {
    return new APIList(this).push('available');
  }

  active() {
    const a = new APIList(this);
    if (this.first === 'me') {
      a.push('active');
    } else {
      a.params({
        notArchived: true
      });
    }
    return a;
  }

}

export default APIListServices
