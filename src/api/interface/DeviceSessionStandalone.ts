import {APIList, NoQueryParams} from '../APIList';
import {APIResource} from '../APIResource';
import {DeviceSession, DeviceSessionConnection} from "../models/DeviceSession";
import {DeviceSessionBase} from './DeviceSessionBase';

export interface DeviceSessionStandalone extends DeviceSessionBase {
  connections(): APIList<DeviceSessionConnection>;
  connection(id: number): APIResource<DeviceSessionConnection, NoQueryParams, void>;
  release(): APIResource<DeviceSession, NoQueryParams, void>;
}

export default DeviceSessionStandalone;
