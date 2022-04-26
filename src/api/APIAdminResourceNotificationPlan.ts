import {API} from '../API';
import {APIEntity} from './APIEntity';
import {APIList} from './APIList'
import {APIResource} from './APIResource'

/**
 * APIAdminResourceNotificationPlan
 *
 * @class
 * @extends APIResource
 */
export class APIAdminResourceNotificationPlan extends APIResource {

  /**
   * /notification-plans/{id}
   *
   * Constructor
   */
  constructor (parent: APIEntity<any> | API, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('admin', 'notification-plans', id);
  }

  // /notification-plans/{id}/check
  check () {
    return new APIList(this).push('check');
  }

  // /notification-plans/{id}/test
  test () {
    return new APIResource(this).push('test');
  }

  // /notification-plans/{id}/execute
  execute () {
    return new APIResource(this).push('execute');
  }

}

export default APIAdminResourceNotificationPlan
