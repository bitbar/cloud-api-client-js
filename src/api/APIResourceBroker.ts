import {API} from '../API';
import {APIEntity} from './APIEntity';
import {APIList, NoQueryParams} from './APIList'
import {APIResource} from './APIResource'
import {Broker} from './models/Broker';

export class APIResourceBroker extends APIResource {

  /**
   * /broker
   */
  constructor(parent: APIEntity<any> | API) {

    super(parent);
    this.push('broker');
  }

  // /broker/hubs
  hubs() {
    return new APIList<Broker, NoQueryParams, void>(this).push('hubs');
  }

}

export default APIResourceBroker
