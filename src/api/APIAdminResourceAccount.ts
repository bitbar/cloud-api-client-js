import APIResource from './APIResource'


/**
 * APIAdminResourceAccount
 *
 * @class
 * @extends APIResource
 */
class APIAdminResourceAccount extends APIResource {

  /**
   * /services/{id}
   *
   * Constructor
   */
  constructor (parent: object) {
    super(parent);
    this.push('account');
  }

}

export default APIAdminResourceAccount
