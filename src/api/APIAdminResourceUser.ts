import {Method} from "axios";
import APIAdminResource from "./APIAdminResource";
import {APIAdminResourceUserAccount} from './APIAdminResourceUserAccount';
import {APIList} from './APIList'
import {APIResource} from './APIResource'
import {License} from "./models/License";
import {User} from "./models/User";


export class APIAdminResourceUser extends APIResource<User> {
  protected ALLOWED_HTTP_METHODS: Array<Method> = ["POST"];

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
    return new APIResource<User>(this).push('disable');
  }

  // /users/{id}/enable
  enable() {
    return new APIResource<User>(this).push('enable');
  }

  // /users/{id}/licenses
  licenses() {
    return new APIList<License>(this).push('licenses');
  }

  // /users/{id}/resend-activation
  resendActivation() {
    return new APIResource<User>(this).push('resend-activation').post();
  }

  // users/{id}/account
  account() {
    return new APIAdminResourceUserAccount(this);
  }

}

export default APIAdminResourceUser
