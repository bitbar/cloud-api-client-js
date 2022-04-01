import {API} from '../API';
import {APIEntity} from './APIEntity';
import {APIResource} from './APIResource'

/**
 * APIResourceAccount
 *
 * @class
 * @extends APIResource
 */
export class APIResourceAccount extends APIResource {

  /**
   * /accounts/{id}
   *
   * Constructor
   */
  constructor(parent: APIEntity<any> | API, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('accounts', id);
  }

  // /accounts/{id}/concurrency-status
  public concurrencyStatus() {
    return new APIResource(this).push('concurrency-status');
  }

  // /accounts/{id}/preferences
  public preferences() {
    return new APIResource(this).push('preferences');
  }

}

export default APIResourceAccount
