import {Method} from 'axios';
import {NoData} from './APIEntity';
import {APIList} from './APIList'
import {APIResourceUser} from './APIResourceUser';
import {CollectionQueryParams} from './models/HTTP';
import {SmartbearTunnel} from './models/SmartbearTunnel';


export interface TunnelQueryParams extends CollectionQueryParams {
  active: boolean;
}

export class APIListSmartbearTunnels extends APIList<SmartbearTunnel, TunnelQueryParams, NoData> {

  protected ALLOWED_HTTP_METHODS: Array<Method> = ['GET'];

  /**
   * /tunnels
   */
  constructor(parent: APIResourceUser) {
    super(parent);
    this.push('tunnels');
  }

  /**
   * Sets tunnel activity parameter
   */
  active(active: boolean): this {
    return this.params({active: active});
  }
}

export default APIListSmartbearTunnels;
