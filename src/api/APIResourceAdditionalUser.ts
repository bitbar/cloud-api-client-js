import {APIResource} from './APIResource'
import {APIUserResourceAccount} from './APIUserResourceAccount';
import {NoData, NoQueryParams} from './models/HTTP';
import {User} from './models/User';


export class APIResourceAdditionalUser extends APIResource<User> {

  /**
   * /additional-users/{id}
   */
  constructor(parent: APIUserResourceAccount, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('additional-users', id);
  }

  // /account/additional-users/{id}/resend-activation
  resendActivation() {
    return new APIResource<User, NoQueryParams, NoData>(this).push('resend-activation');
  }

}

export default APIResourceAdditionalUser
