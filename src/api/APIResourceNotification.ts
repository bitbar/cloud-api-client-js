import {API} from '../API';
import {APIEntity} from './APIEntity';
import {APIResource} from './APIResource'

/**
 * APIResourceNotification
 *
 * @class
 * @extends APIResource
 */
export class APIResourceNotification extends APIResource {

  /**
   * /notifications/{id}
   *
   * Constructor
   */
  constructor(parent: APIEntity<any> | API, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('notifications', id);
  }

  // /notifications/{id}/test
  test() {
    return new APIResource(this).push('test');
  }

}

export default APIResourceNotification
