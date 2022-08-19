import {APIResource} from '../APIResource';
import APIResourceDeviceSessionCommon from '../APIResourceDeviceSessionCommon';
import {DeviceSession} from '../models/DeviceSession';

export function postAdminDeviceSessionChangeBillable(parent: APIResourceDeviceSessionCommon, billable: boolean) {
  const apiResource = new APIResource<DeviceSession>(parent);
  const deviceSessionId = apiResource.last;

  return apiResource.restack('admin', 'device-sessions', deviceSessionId, 'changebillable').params({
    billable
  }).post();
}

export default postAdminDeviceSessionChangeBillable;
