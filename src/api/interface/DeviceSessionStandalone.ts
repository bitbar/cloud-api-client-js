import {NoData} from '../APIEntity';
import {APIList} from '../APIList';
import {APIResource} from '../APIResource';
import {DeviceSession, DeviceSessionConnection} from '../models/DeviceSession';
import {NoQueryParams} from '../models/HTTP';
import {DeviceSessionBase} from './DeviceSessionBase';

export interface DeviceSessionStandalone extends DeviceSessionBase {
  connections(): APIList<DeviceSessionConnection>;
  connection(id: number): APIResource<DeviceSessionConnection, NoQueryParams, NoData>;
  release(): APIResource<DeviceSession, NoQueryParams, NoData>;
}

export default DeviceSessionStandalone;
