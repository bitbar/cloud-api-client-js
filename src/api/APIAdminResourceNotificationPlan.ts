import APIResource from './APIResource'
import APIList from './APIList'


/**
 * APIAdminResourceNotificationPlan
 *
 * @class
 * @extends APIResource
 */
class APIAdminResourceNotificationPlan extends APIResource {

  /**
   * /notification-plans/{id}
   *
   * Constructor
   */
  constructor (parent: object, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('notification-plans', id);
  }

  // /notification-plans/{id}/check
  public check () {
    return new APIList(this).push('check');
  }

  // /notification-plans/{id}/test
  public test () {
    return new APIResource(this).push('test');
  }

  // /notification-plans/{id}/execute
  public execute () {
    return new APIResource(this).push('execute');
  }

}

export default APIAdminResourceNotificationPlan
