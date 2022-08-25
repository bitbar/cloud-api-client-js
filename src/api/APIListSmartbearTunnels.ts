import {Method} from 'axios';
import {APIList} from './APIList';
import {APIResourceUser} from './APIResourceUser';
import {NoData} from './models/HTTP';
import {SmartbearTunnel, TunnelQueryParams} from './models/SmartbearTunnel';


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
