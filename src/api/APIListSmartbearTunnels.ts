import {Method} from "axios";
import {APIList, CollectionQueryParams} from './APIList'
import APIResourceUser from "./APIResourceUser";
import {SmartbearTunnel} from "./models/SmartbearTunnel";


export interface TunnelQueryParams extends CollectionQueryParams{
  active: boolean;
}

export class APIListSmartbearTunnels extends APIList<SmartbearTunnel, TunnelQueryParams, void> {

  protected ALLOWED_HTTP_METHODS: Array<Method> = ["GET"];

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
