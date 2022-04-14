import {APIList} from '../APIList';
import {APIResource} from '../APIResource';
import {DeviceSession, DeviceSessionConnection} from "../models/DeviceSession";
import {DeviceSessionBase} from './DeviceSessionBase';

export interface DeviceSessionStandalone extends DeviceSessionBase {
  connections(): APIList<DeviceSessionConnection>;
  connection(id: number): APIResource<DeviceSessionConnection>;
  release(): APIResource<DeviceSession>;
}

export default DeviceSessionStandalone;
