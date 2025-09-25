import {APIAdminResource} from './APIAdminResource';
import {APIList} from './APIList';
import {APIResource} from './APIResource'
import {
  Account, AccountData,
  AccountUsage,
  AccountUsageParams,
  AccountUsageSummary,
  AccountUsageSummaryParams
} from './models/Account';
import {NoData, NoQueryParams, SimpleCollectionResponse} from './models/HTTP';
import {Role, RoleData, RoleParams} from './models/Role';
import {AccountService} from './models/AccountService';
import {AccountPreferences, AccountPreferencesData} from './models/AccountPreference';


export class APIAdminResourceAccount extends APIResource<Account, NoQueryParams, AccountData> {

  /**
   * /admin/accounts/{id}
   */
  constructor(parent: APIAdminResource, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('admin', 'accounts', id);
  }

  // /admin/accounts/{id}/roles
  roles() {
    return new APIList<Role, RoleParams, RoleData>(this).push('roles');
  }

  // /admin/accounts/{id}/roles/{id}
  role(id: number) {
    return new APIResource<Role, RoleParams, NoData>(this).push('roles', id);
  }

  // /admin/accounts/{id}/account-services
  accountServices() {
    return new APIList<AccountService>(this).push('account-services');
  }

  // /accounts/{id}/preferences
  preferences() {
    return new APIResource<AccountPreferences, NoQueryParams, AccountPreferencesData>(this).push('preferences');
  }

  // /admin/accounts/{id}/usage
  usage() {
    return new APIList<SimpleCollectionResponse<AccountUsage>, AccountUsageParams>(this).push('usage');
  }

  // /admin/accounts/{id}/usage-summary
  usageSummary() {
    return new APIResource<AccountUsageSummary, AccountUsageSummaryParams>(this).push('usage-summary');
  }

}

export default APIAdminResourceAccount
