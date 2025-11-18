import { APIList } from '../APIList';
import { APIResource } from '../APIResource';
import { DeviceSessionCommand, DeviceSessionStep } from '../models/DeviceSession';
import { NoData, NoQueryParams } from '../models/HTTP';
import { Screenshot } from '../models/Screenshot';
import { DeviceSessionBase } from './DeviceSessionBase';
export interface DeviceSessionCommon extends DeviceSessionBase {
    commands(): APIList<DeviceSessionCommand>;
    screenshots(): APIList<Screenshot>;
    screenshot(id: number): APIResource<Screenshot>;
    steps(): APIList<DeviceSessionStep>;
    step(id: number | 'current'): APIResource<DeviceSessionStep, NoQueryParams, NoData>;
    currentStep(): APIResource<DeviceSessionStep, NoQueryParams, NoData>;
}
export default DeviceSessionCommon;
