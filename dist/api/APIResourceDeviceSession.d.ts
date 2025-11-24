import { APIResource } from './APIResource';
import { APIResourceDeviceSessionCommon } from './APIResourceDeviceSessionCommon';
import { DeviceSession as DeviceSessionModel, SessionQueryParams } from './models/DeviceSession';
import APIListTestCaseRuns from './APIListTestCaseRuns';
import { APIListQuery } from './APIList';
export declare class APIResourceDeviceSession<QUERY_PARAMS extends APIListQuery = SessionQueryParams> extends APIResourceDeviceSessionCommon {
    abort(): APIResource<DeviceSessionModel, import("..").QueryParams, import("..").QueryParams>;
    retry(): APIResource<DeviceSessionModel, import("..").QueryParams, import("..").QueryParams>;
    testCaseRuns(): APIListTestCaseRuns<QUERY_PARAMS>;
}
export default APIResourceDeviceSession;
