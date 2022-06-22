import {APIResource} from '../APIResource';
import {DeviceSessionCommon} from './DeviceSessionCommon';
import {DeviceSession as DeviceSessionDTO, DeviceSessionConfig} from '../models/DeviceSession';
import {CollectionBasicQueryParams} from '../APIList';

export interface DeviceSession extends DeviceSessionCommon {
  abort(): APIResource<DeviceSessionDTO>;
  retry(): APIResource<DeviceSessionDTO>;
}

export default DeviceSession;

export type DeviceSessionData = Omit<DeviceSessionConfig, 'adbVersion' | 'id' | 'tunnelSettings' | 'type'> & {configuration: DeviceSessionConfig};

export interface DeviceSessionQueryParams extends CollectionBasicQueryParams {
  withProperties: boolean;
}

