import {APIResource} from '../APIResource';
import {DeviceSessionCommon} from './DeviceSessionCommon';
import {DeviceSession as DeviceSessionDTO} from '../models/DeviceSession';

export interface DeviceSession extends DeviceSessionCommon {
  abort(): APIResource<DeviceSessionDTO>;
  retry(): APIResource<DeviceSessionDTO>;
}

export default DeviceSession;
