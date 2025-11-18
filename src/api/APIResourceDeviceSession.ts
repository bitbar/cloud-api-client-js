import {APIResource} from './APIResource';
import {APIResourceDeviceSessionCommon} from './APIResourceDeviceSessionCommon';
import {DeviceSession as DeviceSessionModel, SessionQueryParams} from './models/DeviceSession';
import APIListTestCaseRuns from './APIListTestCaseRuns';
import {APIListQuery} from './APIList';

export class APIResourceDeviceSession<QUERY_PARAMS extends APIListQuery = SessionQueryParams> extends APIResourceDeviceSessionCommon {

  // /device-sessions/{id}/abort
  abort() {
    return new APIResource<DeviceSessionModel>(this).push('abort').post();
  }

  // /device-sessions/{id}/retry
  retry() {
    return new APIResource<DeviceSessionModel>(this).push('retry').post();
  }

  // /device-sessions/{id}/test-case-runs
  testCaseRuns() {
    return new APIListTestCaseRuns<QUERY_PARAMS>(this);
  }
}

export default APIResourceDeviceSession
