import {API} from "../API";
import {APIEntity} from './APIEntity';
import {APIList} from './APIList'


/**
 * APIAdminListServices
 *
 * @class
 * @extends APIList
 */
export class APIAdminListServices extends APIList {

  // Constructor
  constructor (parent: APIEntity<any> | API) {
    super(parent);
    this.push('admin', 'services');
  }

  // /services/available
  available () {
    return new APIList(this).push('available');
  }

  active () {
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

  activated () {
    const a = this.active();
    a.params({
      filter: 'activated_eq_true',
      limit: 0,
      sort: 'name_a'
    })
    return a;
  }

  inUse () {
    const a = new APIList(this);
    a.params({
      inUse: true,
      limit: 0,
      sort: 'name_a'
    })
    return a;
  }

  byPrice () {
    const a = new APIList(this);
    a.params({
      sort: 'centPrice_a'
    })
    return a;
  }

}

export default APIAdminListServices
