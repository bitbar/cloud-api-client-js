import {APIList} from './APIList'
import {APIListNotifications} from './APIListNotifications';
import {APIResource} from './APIResource'


export class APIResourceChannel extends APIResource {

  /**
   * /users/{id}/notifications/channels/{type}
   */
  constructor(parent: APIListNotifications, type: string) {
    if (type == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('channels', type);
  }

  // /channels/{type}/scopes
  scopes() {
    return new APIList(this).push('scopes');
  }

}

export default APIResourceChannel;
