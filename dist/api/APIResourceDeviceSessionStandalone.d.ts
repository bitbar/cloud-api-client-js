import { APIAdminResourceUser } from './APIAdminResourceUser';
import { APIList } from './APIList';
import { APIResource } from './APIResource';
import { APIResourceUser } from './APIResourceUser';
import { InputFileset } from './class/InputFileset';
import { OutputFileset } from './class/OutputFileset';
import { DeviceSessionStandalone } from './interface/DeviceSessionStandalone';
import { Connection, ConnectionData } from './models/Connection';
import { DeviceSession } from './models/DeviceSession';
import { CollectionBasicQueryParams, NoQueryParams } from './models/HTTP';
export declare class APIResourceDeviceSessionStandalone extends APIResource<DeviceSession> implements DeviceSessionStandalone {
    constructor(parent: APIResourceUser | APIAdminResourceUser, id: number);
    connections(): APIList<Connection, CollectionBasicQueryParams, ConnectionData>;
    connection(id: number): APIResource<Connection, NoQueryParams, void>;
    input(): InputFileset;
    output(): OutputFileset;
    release(): APIResource<DeviceSession, NoQueryParams, void>;
}
export default APIResourceDeviceSessionStandalone;
