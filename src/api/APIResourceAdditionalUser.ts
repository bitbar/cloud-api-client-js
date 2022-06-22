import {API} from '../API';
import {APIEntity} from './APIEntity';
import {APIResource} from './APIResource'
import {User} from './models/User';

export class APIResourceAdditionalUser extends APIResource<User> {

  /**
   * /additional-users/{id}
   */
  constructor(parent: APIEntity<any> | API, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('additional-users', id);
  }

  // /account/additional-users/{id}/resend-activation
  resendActivation() {
    return new APIResource<User, void, void>(this).push('resend-activation');
  }

}

export default APIResourceAdditionalUser
