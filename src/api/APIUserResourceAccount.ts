import {APIResource} from './APIResource';
import {APIResourceUser} from './APIResourceUser';
import {Account} from './models/Account';
import {NoQueryParams} from './models/HTTP';
import {VisualTestAccess} from './models/VisualTest';


export class APIUserResourceAccount extends APIResource<Account> {

  /**
   * /account
   */
  constructor(parent: APIResourceUser) {
    super(parent);
    this.push('account');
  }

  // /account/visualtest/access
  visualTestAccess() {
    return new APIResource<VisualTestAccess, NoQueryParams, VisualTestAccess>(this).push('visualtest', 'access');
  }

}

export default APIUserResourceAccount
