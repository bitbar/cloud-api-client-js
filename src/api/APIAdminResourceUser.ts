import {APIAdminResource} from './APIAdminResource';
import {APIAdminResourceUserAccount} from './APIAdminResourceUserAccount';
import {APIList} from './APIList';
import {APIResource} from './APIResource';
import {APIResourceDeviceSessionStandalone} from './APIResourceDeviceSessionStandalone';
import {NonRequestable} from './decorators/NonRequestable';
import {CollectionQueryParams, NoData, NoQueryParams} from './models/HTTP';
import {License} from './models/License';
import {User} from './models/User';


@NonRequestable
export class APIAdminResourceUser extends APIResource<User> {

  /**
   * /admin/users/{id}
   */
  constructor(parent: APIAdminResource, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('admin', 'users', id);
  }

  // /users/{id}/disable
  disable() {
    return new APIResource<User, NoQueryParams, NoData>(this).push('disable');
  }

  // /users/{id}/enable
  enable() {
    return new APIResource<User, NoQueryParams, NoData>(this).push('enable');
  }

  // /users/{id}/licenses
  licenses() {
    return new APIList<License, CollectionQueryParams, NoData>(this).push('licenses');
  }

  // /users/{id}/resend-activation
  resendActivation() {
    return new APIResource<User, NoQueryParams, NoData>(this).push('resend-activation').post();
  }

  // users/{id}/account
  account() {
    return new APIAdminResourceUserAccount(this);
  }

  // /users/{id}/device-sessions/{id}
  deviceSession(id: number) {
    return new APIResourceDeviceSessionStandalone(this, id);
  }

}

export default APIAdminResourceUser;
