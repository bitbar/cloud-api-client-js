import { Method } from 'axios';
import { APIList } from './APIList';
import { APIResourceUser } from './APIResourceUser';
import { NoData } from './models/HTTP';
import { SmartbearTunnel, TunnelQueryParams } from './models/SmartbearTunnel';
export declare class APIListSmartbearTunnels extends APIList<SmartbearTunnel, TunnelQueryParams, NoData> {
    protected ALLOWED_HTTP_METHODS: Array<Method>;
    constructor(parent: APIResourceUser);
    active(active: boolean): this;
}
export default APIListSmartbearTunnels;
