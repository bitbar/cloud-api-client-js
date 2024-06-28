import {APIAdminResource} from './APIAdminResource';
import {APIAdminResourceUserAccount} from './APIAdminResourceUserAccount';
import {APIList} from './APIList';
import {APIResource} from './APIResource';
import {APIResourceDeviceSessionStandalone} from './APIResourceDeviceSessionStandalone';
import {NonRequestable} from './decorators/NonRequestable';
import {CollectionQueryParams, NoData, NoQueryParams} from './models/HTTP';
import {License} from './models/License';
import {Role, RoleParams} from './models/Role';
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

  // /admin/users/{id}/disable
  disable() {
    return new APIResource<User, NoQueryParams, NoData>(this).push('disable');
  }

  // /admin/users/{id}/enable
  enable() {
    return new APIResource<User, NoQueryParams, NoData>(this).push('enable');
  }

  // /admin/users/{id}/licenses
  licenses() {
    return new APIList<License, CollectionQueryParams, NoData>(this).push('licenses');
  }

  // /admin/users/{id}/resend-activation
  resendActivation() {
    return new APIResource<User, NoQueryParams, NoData>(this).push('resend-activation').post();
  }

  // /admin/users/{id}/account
  account() {
    return new APIAdminResourceUserAccount(this);
  }

  // /admin/users/{id}/device-sessions/{id}
  deviceSession(id: number) {
    return new APIResourceDeviceSessionStandalone(this, id);
  }

  // /admin/users/{id}/roles
  roles() {
    return new APIList<Role, RoleParams, NoData>(this).push('roles');
  }

  // /admin/users/{id}/roles/{id}
  role(id: number) {
    return new APIResource<Role, RoleParams, NoData>(this).push('roles', id);
  }

}

export default APIAdminResourceUser;
