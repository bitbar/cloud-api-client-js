import {API} from "../API";
import {APIEntity} from './APIEntity';
import {APIList} from './APIList'
import {APIListPurchased} from './APIListPurchased'


/**
 * APIAdminListServices
 *
 * @class
 * @extends APIList
 */
export class APIAdminListServices extends APIList<any> {

  // Constructor
  constructor (parent: APIEntity<any> | API) {
    super(parent);
    this.push('admin', 'services');
  }

  // /services/purchased
  public purchased () {
    return new APIListPurchased(this);
  }

  // /services/available
  public available () {
    return new APIList(this).push('available');
  }

  public active () {
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

  public activated () {
    const a = this.active();
    a.params({
      filter: 'activated_eq_true',
      limit: 0,
      sort: 'name_a'
    })
    return a;
  }

  public inUse () {
    const a = new APIList(this);
    a.params({
      inUse: true,
      limit: 0,
      sort: 'name_a'
    })
    return a;
  }

  public byPrice () {
    const a = new APIList(this);
    a.params({
      sort: 'centPrice_a'
    })
    return a;
  }

}

export default APIAdminListServices
