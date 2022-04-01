import {API} from '../API';
import {APIEntity} from './APIEntity';
import {APIResource} from './APIResource'

/**
 * APIResourceAdditionalUser
 *
 * @class
 * @extends APIResource
 */
export class APIResourceAdditionalUser extends APIResource {

  /**
   * /additional-users/{id}
   *
   * Constructor
   */
  constructor(parent: APIEntity<any> | API, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('additional-users', id);
  }

  // /account/resend-activation
  public resendActivation() {
    return new APIResource(this).push('resend-activation');
  }

}

export default APIResourceAdditionalUser
