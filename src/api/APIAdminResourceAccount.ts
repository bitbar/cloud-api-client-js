import APIResource from './APIResource'


/**
 * APIAdminResourceAccount
 *
 * @class
 * @extends APIResource
 */
class APIAdminResourceAccount extends APIResource {

  /**
   * /admin/accounts/{id}
   *
   * Constructor
   */
  constructor (parent: object, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('admin', 'accounts', id);
  }

}

export default APIAdminResourceAccount
