import {API} from '../API';
import {NoData} from './APIEntity';
import {APIList} from './APIList'
import {APIResource} from './APIResource'
import {Broker} from './models/Broker';
import {NoQueryParams} from './models/HTTP';

export class APIResourceBroker extends APIResource {

  /**
   * /broker
   */
  constructor(parent: API) {

    super(parent);
    this.push('broker');
  }

  // /broker/hubs
  hubs() {
    return new APIList<Broker, NoQueryParams, NoData>(this).push('hubs');
  }

}

export default APIResourceBroker
