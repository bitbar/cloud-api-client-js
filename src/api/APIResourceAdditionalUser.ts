import APIResource from './APIResource'

/**
 * APIResourceAdditionalUser
 *
 * @class
 * @extends APIResource
 */
class APIResourceAdditionalUser extends APIResource {

  /**
   * /additional-users/{id}
   *
   * Constructor
   */
  constructor (parent: object, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('additional-users', id);
  }

  // /account/resend-activation
  public resendActivation () {
    return new APIResource(this).push('resend-activation');
  }

}

export default APIResourceAdditionalUser
