import {APIList} from '../APIList';
import {APIResource} from '../APIResource';
import {DeviceSessionBase} from './DeviceSessionBase';

export interface DeviceSessionStandalone extends DeviceSessionBase {
  connections (): APIList;
  connection (id: number): APIResource;
  release (): APIResource;
}

export default DeviceSessionStandalone;
