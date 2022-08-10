import {API} from '../API';
import {NoData} from './APIEntity';
import {APIList, NoQueryParams} from './APIList'
import {APIResource} from './APIResource'
import {Broker} from './models/Broker';

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
